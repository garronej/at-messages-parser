"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = require("path");
var cmeErrorDictionary = JSON.parse(fs_1.readFileSync(path.join(__dirname, "..", "..", "res", "cmeErrorDictionary.json"), { "encoding": "utf8" }));
function getCmeErrorVerbose(errorNo) {
    return cmeErrorDictionary[errorNo];
}
exports.getCmeErrorVerbose = getCmeErrorVerbose;
function getCmeErrorCode(verbose) {
    for (var _i = 0, _a = Object.keys(cmeErrorDictionary); _i < _a.length; _i++) {
        var iStr = _a[_i];
        if (cmeErrorDictionary[iStr] === verbose)
            return parseInt(iStr);
    }
    return NaN;
}
exports.getCmeErrorCode = getCmeErrorCode;
var cmsErrorDictionary = JSON.parse(fs_1.readFileSync(path.join(__dirname, "..", "..", "res", "cmsErrorDictionary.json"), { "encoding": "utf8" }));
function getCmsErrorCode(verbose) {
    for (var _i = 0, _a = Object.keys(cmsErrorDictionary); _i < _a.length; _i++) {
        var iStr = _a[_i];
        var i = parseInt(iStr);
        if (isNaN(i))
            continue;
        if (cmsErrorDictionary[iStr] === verbose)
            return i;
    }
    return NaN;
}
exports.getCmsErrorCode = getCmsErrorCode;
function getCmsErrorVerbose(errorNo) {
    if (0 <= errorNo && errorNo <= 127)
        return cmsErrorDictionary["0-127"];
    if (128 <= errorNo && errorNo <= 255)
        return cmsErrorDictionary["128-255"];
    if (512 <= errorNo)
        return cmsErrorDictionary["512.."];
    var out;
    out = cmsErrorDictionary[errorNo];
    if (out === undefined)
        return "reserved";
    else
        return out;
}
exports.getCmsErrorVerbose = getCmsErrorVerbose;
