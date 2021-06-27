#!/usr/bin/env mocha
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var compare_versions_1 = __importDefault(require("compare-versions"));
var fs_1 = require("fs");
var modules_1 = require("lib3rd/dist/asn1/classes/modules");
var definitions_1 = require("lib3rd/dist/ran3/classes/definitions");
var numbering_1 = require("lib3rd/dist/utils/numbering");
var tc_1 = require("./tc");
function isDotfile(filename) {
    return filename.startsWith('.');
}
function isDir(filename) {
    return fs_1.statSync(filename).isDirectory();
}
function isJson(filename) {
    return filename.endsWith('.json');
}
function getDirList(path) {
    return fs_1.readdirSync(path)
        .filter(function (filename) { return !isDotfile("" + filename); })
        .filter(function (filename) { return isDir(path + "/" + filename); });
}
// [36-series]
var seriesList = getDirList('.');
// console.log(seriesList);
seriesList.forEach(function (series) {
    // [36331]
    var specList = getDirList("./" + series);
    // console.log(specList);
    specList.forEach(function (spec) {
        // [36331-g00.asn1.json]
        var versionList = fs_1.readdirSync("./" + series + "/" + spec)
            .filter(function (filename) { return !isDotfile(filename); })
            .filter(function (filename) { return isJson(filename); });
        // console.log(versionList);
        versionList.forEach(function (version) {
            describe(version, function () {
                this.timeout(0);
                var def;
                var indexLastHyphen = version.lastIndexOf('-');
                var indexDot = version.substring(indexLastHyphen).indexOf('.');
                var versionCharacters = version.substring(indexLastHyphen + 1, indexLastHyphen + indexDot);
                var specNumbering = version.substring(0, indexLastHyphen);
                var semver = numbering_1.versionFromCharacters(versionCharacters).join(".");
                var type = version.includes('asn1') ? 'asn1' : 'tabular';
                var content = fs_1.readFileSync("./" + series + "/" + spec + "/" + version, 'utf8');
                var obj = JSON.parse(content);
                // ASN.1
                try {
                    def = modules_1.Modules.fromObject(obj);
                }
                catch (e) { }
                // RAN3 tabular
                try {
                    def = definitions_1.Definitions.fromObject(obj);
                }
                catch (e) { }
                it('Validate JSON format', function () {
                    assert_1.default(def);
                });
                tc_1.tcList.forEach(function (tc, index) {
                    if (semver === undefined) {
                        return false;
                    }
                    if (tc.specNumbering !== specNumbering) {
                        return false;
                    }
                    if (tc.type !== type) {
                        return false;
                    }
                    var versionFrom = tc.versionFrom, versionTo = tc.versionTo;
                    if (versionFrom && versionTo) {
                        if (compare_versions_1.default(semver, versionFrom) < 0 && compare_versions_1.default(versionTo, semver) < 0) {
                            return;
                        }
                    }
                    else if (versionFrom) {
                        if (compare_versions_1.default(semver, versionFrom) < 0) {
                            return;
                        }
                    }
                    else if (versionTo) {
                        if (compare_versions_1.default(versionTo, semver) < 0) {
                            return;
                        }
                    }
                    else { }
                    tc.func(def);
                });
            });
        });
    });
});
