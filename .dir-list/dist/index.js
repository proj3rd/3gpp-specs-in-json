"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var baseDir = '..';
function buildPath() {
    var dirList = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dirList[_i] = arguments[_i];
    }
    return __spreadArray([baseDir], dirList).join('/');
}
function isDir(path) {
    var stats = fs_1.statSync(path);
    return stats.isDirectory();
}
function isDotfile(name) {
    return name.startsWith('.');
}
var seriesList = fs_1.readdirSync(buildPath())
    .filter(function (series) { return !isDotfile(series) && isDir(buildPath(series)); })
    .map(function (series) {
    var children = fs_1.readdirSync(buildPath(series)).filter(function (spec) {
        return !isDotfile(spec) && isDir(buildPath(series, spec));
    }).map(function (spec) {
        var children = fs_1.readdirSync(buildPath(series, spec)).filter(function (version) {
            return !isDotfile(spec);
        });
        return { name: spec, children: children };
    });
    return { name: series, children: children };
});
fs_1.writeFileSync('directory-listing.json', JSON.stringify(seriesList, null, 2));
