import { readdirSync, statSync, writeFileSync } from "fs";
import { resolve } from "path";

const BASE_DIR = "..";

function path(...dirList: string[]): string {
  return resolve(BASE_DIR, ...dirList);
}

function isSpecDir(...paths: string[]) {
  const last = paths[paths.length - 1];
  if (last.startsWith(".")) {
    return false;
  }
  const stats = statSync(path(...paths));
  return stats.isDirectory();
}

const seriesList = readdirSync(path())
  .filter((series) => isSpecDir(series))
  .map((series) => {
    const children = readdirSync(path(series))
      .filter((spec) => isSpecDir(series, spec))
      .map((spec) => {
        const children = readdirSync(path(series, spec))
          .filter((child) => !child.startsWith("."));
        return { name: spec, children };
      });
    return { name: series, children };
  });

writeFileSync(path(".dir-list.json"), JSON.stringify(seriesList, null, 2));
