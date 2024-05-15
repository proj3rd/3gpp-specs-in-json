"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lib_1 = require("get-3gpp-spec/dist/lib");
const path_1 = require("path");
const WILD_CARD = "*";
const SPEC_NUMBER_LIST = [
    "36.331",
    "36.413",
    "36.423",
    "37.355",
    "37.483",
    "38.331",
    "38.413",
    "38.423",
    "38.455",
    "38.463",
    "38.473",
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const supportStatusList = [];
        for (const specNumber of SPEC_NUMBER_LIST) {
            (yield (0, lib_1.getSpec)(specNumber, WILD_CARD, WILD_CARD)).forEach(({ name, date }) => {
                const series = `${specNumber.substring(0, 2)}-series`;
                const specNumberNoDot = `${specNumber.substring(0, 2)}${specNumber.substring(3)}`;
                const { year, quarter } = getYearQuarter(date);
                const dateString = `${year}.Q${quarter}`;
                const { name: version } = (0, path_1.parse)(name);
                const supportStatus = supportStatusList.find((supportStatus) => supportStatus.date === dateString &&
                    supportStatus.specNumber === specNumber &&
                    supportStatus.version === version);
                const asn1 = (0, fs_1.existsSync)((0, path_1.resolve)(__dirname, `../../${series}/${specNumberNoDot}/${version}.asn1.json`));
                const tabular = (0, fs_1.existsSync)((0, path_1.resolve)(__dirname, `../../${series}/${specNumberNoDot}/${version}.tabular.json`));
                if (supportStatus) {
                    supportStatus.asn1 = asn1;
                    supportStatus.tabular = tabular;
                    return;
                }
                supportStatusList.push({
                    date: dateString,
                    specNumber,
                    version,
                    asn1,
                    tabular,
                });
            });
        }
        const template = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../template/index.html"), "utf8");
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dayOfMonth = date.getDate();
        const rendered = template
            .replace("last-update-placeholder", `${year}-${month}-${dayOfMonth}`)
            .replace("support-status-list-placeholder", JSON.stringify(supportStatusList));
        (0, fs_1.writeFileSync)((0, path_1.resolve)(__dirname, "../../index.html"), rendered);
    });
}
main();
function getYearQuarter(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month <= 2) {
        return { year: year - 1, quarter: 4 };
    }
    if (month <= 5) {
        return { year, quarter: 1 };
    }
    if (month <= 8) {
        return { year, quarter: 2 };
    }
    if (month <= 11) {
        return { year, quarter: 3 };
    }
    return { year, quarter: 4 };
}
//# sourceMappingURL=index.js.map