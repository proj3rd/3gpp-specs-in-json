#!/usr/bin/env mocha

import assert from "assert";
import compareVersions from "compare-versions";
import { readdirSync, readFileSync, statSync } from "fs";
import { Modules } from "lib3rd/dist/asn1/classes/modules";
import { Definitions } from "lib3rd/dist/ran3/classes/definitions";
import { versionFromCharacters } from "lib3rd/dist/utils/numbering";
import { tcList } from "./tc";

function isDotfile(filename: string) {
  return filename.startsWith('.');
}

function isDir(filename: string) {
  return statSync(filename).isDirectory();
}

function isJson(filename: string) {
  return filename.endsWith('.json');
}

function getDirList(path: string) {
  return readdirSync(path)
    .filter((filename) => !isDotfile(`${filename}`))
    .filter((filename) => isDir(`${path}/${filename}`));
}

// [36-series]
const seriesList = getDirList('.');
// console.log(seriesList);
seriesList.forEach((series) => {
  // [36331]
  const specList = getDirList(`./${series}`);
  // console.log(specList);
  specList.forEach((spec) => {
    // [36331-g00.asn1.json]
    const versionList = readdirSync(`./${series}/${spec}`)
      .filter((filename) => !isDotfile(filename))
      .filter((filename) => isJson(filename));
    // console.log(versionList);
    versionList.forEach((version) => {
      describe(version, function() {
        this.timeout(0);

        let def: Modules | Definitions | undefined;

        const indexLastHyphen = version.lastIndexOf('-');
        const indexDot = version.substring(indexLastHyphen).indexOf('.');
        const versionCharacters = version.substring(indexLastHyphen + 1, indexLastHyphen + indexDot);
        const specNumbering = version.substring(0, indexLastHyphen);
        const semver = versionFromCharacters(versionCharacters).join(".");
        const type = version.includes('asn1') ? 'asn1' : 'tabular';
        const content = readFileSync(`./${series}/${spec}/${version}`, 'utf8');
        const obj = JSON.parse(content);
        // ASN.1
        try {
          def = Modules.fromObject(obj);
        } catch (e) {}
        // RAN3 tabular
        try {
          def = Definitions.fromObject(obj);
        } catch (e) {}

        it('Validate JSON format', function() {
          assert(def);
        });

        tcList.forEach((tc, index) => {
          if (semver === undefined) { return false; }
          if (tc.specNumbering !== specNumbering) { return false; }
          if (tc.type !== type) { return false; }
          const { versionFrom, versionTo } = tc;
          if (versionFrom && versionTo) {
            if (compareVersions(semver, versionFrom) < 0 && compareVersions(versionTo, semver) < 0) {
              return;
            }
          } else if (versionFrom) {
            if (compareVersions(semver, versionFrom) < 0) {
              return;
            }
          } else if (versionTo) {
            if (compareVersions(versionTo, semver) < 0) {
              return;
            }
          } else {}
          tc.func(def);
        });
      });
    });
  });
});
