"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tcListNgap = void 0;
var assert_1 = __importDefault(require("assert"));
var definitions_1 = require("lib3rd/dist/ran3/classes/definitions");
exports.tcListNgap = [
    {
        specNumbering: "38413",
        type: "tabular",
        versionFrom: "16.2.0",
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it("Handover Cause in HO Report (9.3.3.39) should point Cause (9.3.1.2)", function () {
                var defFound = def.findDefinition("9.3.3.39");
                (0, assert_1.default)(defFound);
                var elemFound = defFound === null || defFound === void 0 ? void 0 : defFound.elementList.find(function (elem) {
                    var name = elem.name;
                    return name === "Handover Cause";
                });
                (0, assert_1.default)(elemFound);
                var tokenList = elemFound === null || elemFound === void 0 ? void 0 : elemFound.reference.trim().split(" ");
                (0, assert_1.default)(tokenList === null || tokenList === void 0 ? void 0 : tokenList.includes("9.3.1.2"));
            });
        },
    },
];
