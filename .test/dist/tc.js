"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tcList = void 0;
var assert_1 = __importDefault(require("assert"));
var definitions_1 = require("lib3rd/dist/ran3/classes/definitions");
var ngap_1 = require("./ngap");
exports.tcList = __spreadArray(__spreadArray([], ngap_1.tcListNgap, true), [
    {
        specNumbering: '38423', type: 'tabular', versionFrom: '15.2.0',
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it('SN UL PDCP UP TNL Information of PDU Session Resource Setup Response Info - SN terminated should refer 9.2.3.76', function () {
                var defFound = def.findDefinition('9.2.1.6');
                (0, assert_1.default)(defFound);
                var elemFound = defFound.elementList.find(function (elem) {
                    var name = elem.name;
                    return name === 'SN UL PDCP UP TNL Information';
                });
                (0, assert_1.default)(elemFound);
                var tokenList = elemFound.reference.trim().split(' ');
                (0, assert_1.default)(tokenList.includes('9.2.3.76'));
            });
        },
    },
    {
        specNumbering: '38455', type: 'tabular', versionFrom: '16.1.0',
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it('9.2.26 should exists', function () {
                var defFound = def.findDefinition('9.2.26');
                (0, assert_1.default)(defFound);
            });
        },
    },
    {
        specNumbering: '37483', type: 'tabular', versionFrom: '17.0.0',
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it('9.3.1.57 should exists', function () {
                var defFound = def.findDefinition('9.3.1.57');
                (0, assert_1.default)(defFound);
            });
        },
    },
    {
        specNumbering: '37483', type: 'tabular', versionFrom: '17.0.0',
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it('Trace Collection Entity IP Address of CELL TRAFFIC TRACE should refer 9.3.2.4', function () {
                var defFound = def.findDefinition('CELL TRAFFIC TRACE');
                (0, assert_1.default)(defFound);
                var elemFound = defFound.elementList.find(function (elem) {
                    var name = elem.name;
                    return name === 'Trace Collection Entity IP Address';
                });
                (0, assert_1.default)(elemFound);
                var tokenList = elemFound.reference.trim().split(' ');
                (0, assert_1.default)(tokenList.includes('9.3.2.4'));
            });
        },
    },
    {
        specNumbering: '37483', type: 'tabular', versionFrom: '17.0.0',
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it('9.3.1.74 should exists', function () {
                var defFound = def.findDefinition('9.3.1.74');
                (0, assert_1.default)(defFound);
            });
        },
    },
    {
        specNumbering: '38463', type: 'tabular', versionFrom: '15.2.0',
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it('9.3.1.57 should exists', function () {
                var defFound = def.findDefinition('9.3.1.57');
                (0, assert_1.default)(defFound);
            });
        },
    },
    {
        specNumbering: '38463', type: 'tabular', versionFrom: '16.3.0',
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it('Trace Collection Entity IP Address of CELL TRAFFIC TRACE should refer 9.3.2.4', function () {
                var defFound = def.findDefinition('CELL TRAFFIC TRACE');
                (0, assert_1.default)(defFound);
                var elemFound = defFound.elementList.find(function (elem) {
                    var name = elem.name;
                    return name === 'Trace Collection Entity IP Address';
                });
                (0, assert_1.default)(elemFound);
                var tokenList = elemFound.reference.trim().split(' ');
                (0, assert_1.default)(tokenList.includes('9.3.2.4'));
            });
        },
    },
    {
        specNumbering: '38463', type: 'tabular', versionFrom: '16.2.0',
        func: function (def) {
            if (!(def instanceof definitions_1.Definitions)) {
                return;
            }
            it('9.3.1.74 should exists', function () {
                var defFound = def.findDefinition('9.3.1.74');
                (0, assert_1.default)(defFound);
            });
        },
    },
], false);
