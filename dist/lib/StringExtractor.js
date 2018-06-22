"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trackable_map_1 = require("trackable-map");
var StringExtractor = /** @class */ (function () {
    function StringExtractor(source) {
        this.source = source;
        this.map = new trackable_map_1.MapExtended();
        for (var i = 0; i < source.length; i++)
            this.map.set(i, source[i]);
    }
    Object.defineProperty(StringExtractor.prototype, "state", {
        get: function () {
            var out = "";
            for (var _i = 0, _a = this.map.intKeysAsSortedArray(); _i < _a.length; _i++) {
                var index = _a[_i];
                out += this.map.get(index);
            }
            return out;
        },
        enumerable: true,
        configurable: true
    });
    StringExtractor.prototype.extract = function (part) {
        var mapIndexes = this.map.intKeysAsSortedArray();
        mapRun: for (var i = 0; i < mapIndexes.length; i++) {
            for (var j = 0; j < part.length; j++)
                if (this.map.get(mapIndexes[i + j]) !== part[j])
                    continue mapRun;
            for (var j = 0; j < part.length; j++)
                this.map.delete(mapIndexes[i + j]);
            return mapIndexes[i];
        }
        throw new Error("StringExtractor error: " + JSON.stringify(part) + " not found in " + JSON.stringify(this.state));
    };
    return StringExtractor;
}());
exports.StringExtractor = StringExtractor;
