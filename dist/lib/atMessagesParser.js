"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AtMessage_1 = require("./AtMessage");
var evt_1 = require("evt");
var StringExtractor_1 = require("./StringExtractor");
var trackable_map_1 = require("trackable-map");
var Lexer = require("./Lexer");
var Parser = require("./Parser");
function getSerialPortParser(delayBeforeFlush) {
    var delay = (typeof delayBeforeFlush === "number") ? delayBeforeFlush : 10000;
    var rawAtMessagesBuffer = "";
    var timer = null;
    var evtRawData = new evt_1.Evt();
    var out = function (emitter, buffer) {
        var bufferString = buffer.toString("utf8");
        evtRawData.post(bufferString);
        rawAtMessagesBuffer += bufferString;
        var parserError = undefined;
        var atMessages;
        try {
            atMessages = atMessagesParser(rawAtMessagesBuffer);
        }
        catch (error) {
            parserError = error;
            if (!timer)
                timer = setTimeout(function () {
                    timer = null;
                    emitter.emit("data", null, rawAtMessagesBuffer);
                    rawAtMessagesBuffer = "";
                }, delay);
            atMessages = parserError.urcMessages;
            rawAtMessagesBuffer = parserError.leftToParse;
        }
        if (!parserError) {
            rawAtMessagesBuffer = "";
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }
        for (var _i = 0, atMessages_1 = atMessages; _i < atMessages_1.length; _i++) {
            var atMessage = atMessages_1[_i];
            emitter.emit("data", atMessage, "");
        }
    };
    out.flush = function () {
        var out = rawAtMessagesBuffer;
        rawAtMessagesBuffer = "";
        if (timer)
            clearTimeout(timer);
        return out;
    };
    Object.defineProperty(out, "evtRawData", {
        get: function () { return evtRawData; }
    });
    return out;
}
exports.getSerialPortParser = getSerialPortParser;
var AtMessagesParserError = /** @class */ (function (_super) {
    __extends(AtMessagesParserError, _super);
    function AtMessagesParserError(rawAtMessages, originalError, urcMessages, leftToParse) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, AtMessagesParserError.name) || this;
        _this.rawAtMessages = rawAtMessages;
        _this.originalError = originalError;
        _this.urcMessages = urcMessages;
        _this.leftToParse = leftToParse;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return AtMessagesParserError;
}(Error));
exports.AtMessagesParserError = AtMessagesParserError;
function atMessagesParser(rawAtMessages) {
    var leftToParseAfterUrc = rawAtMessages;
    var output = {
        "leftToParse": rawAtMessages,
        "atMessages": [],
        "AtMessage": AtMessage_1.AtMessage
    };
    try {
        if (rawAtMessages === "\r\nOK\r\n")
            return [new AtMessage_1.AtMessage("\r\nOK\r\n", "OK")];
        var parser = new Parser();
        for (var _i = 0, _a = [
            "UNSO",
            "RESP",
            "LIST_CMGL",
            "LIST_CNUM",
            "FINAL"
        ]; _i < _a.length; _i++) {
            var phase = _a[_i];
            if (phase === "RESP" && output.leftToParse) {
                var match = void 0;
                match = output.leftToParse.match(/^((?:AT.*|A\/)\r)/);
                if (!match)
                    match = output.leftToParse.match(/^((?:[a-fA-F0-9]|\r\n)+)(?:$|\r\n\+CMGS)/);
                if (match) {
                    var atMessage = new AtMessage_1.AtMessage(match[1], "ECHO");
                    output.leftToParse = output.leftToParse.substring(atMessage.raw.length, output.leftToParse.length);
                    output.atMessages.push(atMessage);
                }
                if (output.leftToParse === "\r\n> ") {
                    output.atMessages.push(new AtMessage_1.AtMessage(output.leftToParse, "INVITE"));
                    output.leftToParse = "";
                }
            }
            if (!output.leftToParse)
                break;
            var lexer = new Lexer();
            lexer.AtMessage = AtMessage_1.AtMessage;
            lexer.setInput(output.leftToParse);
            output.leftToParse = "";
            lexer.pushState(phase);
            parser.parse(lexer, output);
            if (phase === "UNSO")
                leftToParseAfterUrc = output.leftToParse;
            /*
            console.log(`End ${phase}`.blue);
            console.log(`LeftToParse: \n${JSON.stringify(output.leftToParse)}`.blue);
            console.log(`atMessages: \n${JSON.stringify(output.atMessages,null,2)}`.green);
            */
        }
        var split = output.leftToParse.split("\r\nOK\r\n");
        if (split[split.length - 1])
            throw new Error("Malformed");
        for (var i = 0; i < split.length - 1; i++) {
            var raw = split[i];
            output.atMessages.push(new AtMessage_1.AtMessage("\r\nOK\r\n", "OK"));
            if (!raw)
                continue;
            if (!raw.match(/^\r\n(?:\r|\n|.)+\r\n$/))
                throw new Error("Malformed");
            output.atMessages.push(new AtMessage_1.AtMessage(raw));
        }
        return reorder(rawAtMessages, output.atMessages);
    }
    catch (originalError) {
        var urcMessages = [];
        for (var _b = 0, _c = output.atMessages; _b < _c.length; _b++) {
            var atMessage = _c[_b];
            if (atMessage.isUnsolicited)
                urcMessages.push(atMessage);
        }
        throw new AtMessagesParserError(rawAtMessages, originalError, urcMessages, leftToParseAfterUrc);
    }
}
exports.atMessagesParser = atMessagesParser;
function reorder(rawAtMessages, atMessages) {
    var stringExtractor = new StringExtractor_1.StringExtractor(rawAtMessages);
    var messageByPosition = new trackable_map_1.TrackableMap();
    for (var _i = 0, atMessages_2 = atMessages; _i < atMessages_2.length; _i++) {
        var atMessage = atMessages_2[_i];
        messageByPosition.set(stringExtractor.extract(atMessage.raw), atMessage);
    }
    console.assert(stringExtractor.state === "");
    var atMessagesSorted = messageByPosition.valuesAsArraySortedByKey();
    console.assert(atMessagesSorted.length === atMessages.length);
    return atMessagesSorted;
}
