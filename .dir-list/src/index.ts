import { readdirSync, statSync, writeFileSync } from "fs";

const baseDir = "..";

function buildPath(...dirList: string[]): string {
  return [baseDir, ...dirList].join("/");
}

function isDir(path: string) {
  const stats = statSync(path);
  return stats.isDirectory();
}

function isDotfile(name: string) {
  return name.startsWith(".");
}

const seriesList = readdirSync(buildPath())
  .filter((series) => !isDotfile(series) && isDir(buildPath(series)))
  .map((series) => {
    const children = readdirSync(buildPath(series))
      .filter((spec) => {
        return !isDotfile(spec) && isDir(buildPath(series, spec));
      })
      .map((spec) => {
        const children = readdirSync(buildPath(series, spec)).filter(
          (version) => {
            return !isDotfile(spec);
          }
        );
        return { name: spec, children };
      });
    return { name: series, children };
  });

writeFileSync("../dir-list.json", JSON.stringify(seriesList, null, 2));
