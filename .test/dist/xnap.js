"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tcListXnap = void 0;
var assert_1 = __importDefault(require("assert"));
var definitions_1 = require("lib3rd/dist/ran3/classes/definitions");
exports.tcListXnap = [
    {
        specNumbering: "38423",
        type: "tabular",
        versionFrom: "15.2.0",
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it("SN UL PDCP UP TNL Information of PDU Session Resource Setup Response Info - SN terminated should refer 9.2.3.76", function () {
                var defFound = def.findDefinition("9.2.1.6");
                (0, assert_1.default)(defFound);
                var elemFound = defFound === null || defFound === void 0 ? void 0 : defFound.elementList.find(function (elem) {
                    var name = elem.name;
                    return name === "SN UL PDCP UP TNL Information";
                });
                (0, assert_1.default)(elemFound);
                var tokenList = elemFound === null || elemFound === void 0 ? void 0 : elemFound.reference.trim().split(" ");
                (0, assert_1.default)(tokenList === null || tokenList === void 0 ? void 0 : tokenList.includes("9.2.3.76"));
            });
        },
    },
    {
        specNumbering: "38423",
        type: "tabular",
        versionFrom: "15.0.0",
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it("9.1.1.8 RETRIEVE UE CONTEXT REQUEST should exist", function () {
                var defFound = def.findDefinition("9.1.1.8");
                (0, assert_1.default)(defFound);
            });
        },
    },
    {
        specNumbering: "38423",
        type: "tabular",
        versionFrom: "15.0.0",
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it("9.1.1.9 RETRIEVE UE CONTEXT RESPONSE should exist", function () {
                var defFound = def.findDefinition("9.1.1.9");
                (0, assert_1.default)(defFound);
            });
        },
    },
    {
        specNumbering: "38423",
        type: "tabular",
        versionFrom: "15.0.0",
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it("9.1.1.10 RETRIEVE UE CONTEXT FAILURE should exist", function () {
                var defFound = def.findDefinition("9.1.1.10");
                (0, assert_1.default)(defFound);
            });
        },
    },
    {
        specNumbering: "38423",
        type: "tabular",
        versionFrom: "17.0.0",
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it("9.1.1.12 RETRIEVE UE CONTEXT CONFIRM should exist", function () {
                var defFound = def.findDefinition("9.1.1.12");
                (0, assert_1.default)(defFound);
            });
        },
    },
];
