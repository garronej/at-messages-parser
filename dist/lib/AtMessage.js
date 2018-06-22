"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AtMessageId_1 = require("./generated/AtMessageId");
var errors = require("./errors");
var AtMessage = /** @class */ (function () {
    function AtMessage(raw, id) {
        var _newTarget = this.constructor;
        this.raw = raw;
        this.id = AtMessage.idDict[this["constructor"]["name"]] || id;
        if (!this.id)
            return;
        if (_newTarget.isUnso(this.id))
            this.isUnsolicited = true;
        if (_newTarget.isFinal(this.id))
            this.isFinal = true;
        if (_newTarget.isError(this.id))
            this.isError = true;
    }
    AtMessage.isUnso = function (x) {
        var token;
        if (AtMessage.idDict[x])
            token = this.idToToken(x);
        else
            token = x;
        return AtMessageId_1.unsoTokens.concat(AtMessageId_1.unsoTokensPdu).indexOf(token) >= 0;
    };
    ;
    AtMessage.isFinal = function (x) {
        var token;
        if (AtMessage.idDict[x])
            token = this.idToToken(x);
        else
            token = x;
        return AtMessageId_1.finalTokens.indexOf(token) >= 0 || AtMessageId_1.errorTokens.indexOf(token) >= 0;
    };
    ;
    AtMessage.hasPdu = function (unsoToken) {
        return AtMessageId_1.unsoTokensPdu.indexOf(unsoToken) >= 0;
    };
    ;
    AtMessage.tokenToId = function (token, type) {
        //^SIMST => CX_SIMST_URC
        //COMMAND NOT SUPPORT => COMMAND_NOT_SUPPORT
        var id = token;
        id = id.replace(/^\^/, "CX_");
        id = id.replace(/^\+/, "P_");
        id = id.replace(/\ /g, "_");
        if (this.isUnso(token))
            id += "_URC";
        else if (!this.isFinal(token) && type)
            id += "_" + type;
        return AtMessage.idDict[id];
    };
    AtMessage.isError = function (id) {
        var token = this.idToToken(id);
        return AtMessageId_1.errorTokens.indexOf(token) >= 0;
    };
    ;
    AtMessage.idToToken = function (id) {
        //CX_SIMST_URC => "^SIMST"
        var token = id;
        token = token.replace(/^CX_/, "^");
        token = token.replace(/^P_/, "+");
        token = token.replace(/_(URC|READ|EXEC|SET|)$/, "");
        token = token.replace(/_/g, " ");
        return token;
    };
    ;
    return AtMessage;
}());
exports.AtMessage = AtMessage;
(function (AtMessage) {
    AtMessage.idDict = AtMessageId_1.atIdDict;
    var ServiceStatus;
    (function (ServiceStatus) {
        ServiceStatus[ServiceStatus["NO_SERVICES"] = 0] = "NO_SERVICES";
        ServiceStatus[ServiceStatus["RESTRICTED_SERVICES"] = 1] = "RESTRICTED_SERVICES";
        ServiceStatus[ServiceStatus["VALID_SERVICES"] = 2] = "VALID_SERVICES";
        ServiceStatus[ServiceStatus["RESTRICTED_REGIONAL_SERVICES"] = 3] = "RESTRICTED_REGIONAL_SERVICES";
        ServiceStatus[ServiceStatus["POWER_SAVING_OR_HIBERNATE_STATE"] = 4] = "POWER_SAVING_OR_HIBERNATE_STATE";
    })(ServiceStatus = AtMessage.ServiceStatus || (AtMessage.ServiceStatus = {}));
    var ServiceDomain;
    (function (ServiceDomain) {
        ServiceDomain[ServiceDomain["NO_SERVICES"] = 0] = "NO_SERVICES";
        ServiceDomain[ServiceDomain["ONLY_CS_SERVICES"] = 1] = "ONLY_CS_SERVICES";
        ServiceDomain[ServiceDomain["ONLY_PS_SERVICES"] = 2] = "ONLY_PS_SERVICES";
        ServiceDomain[ServiceDomain["PS_AND_CS_SERVICES"] = 3] = "PS_AND_CS_SERVICES";
        ServiceDomain[ServiceDomain["CS_AND_PS_NOT_REGISTERED_SEARCHING"] = 4] = "CS_AND_PS_NOT_REGISTERED_SEARCHING";
    })(ServiceDomain = AtMessage.ServiceDomain || (AtMessage.ServiceDomain = {}));
    var SysMode;
    (function (SysMode) {
        SysMode[SysMode["NO_SERVICES"] = 0] = "NO_SERVICES";
        SysMode[SysMode["AMPS"] = 1] = "AMPS";
        SysMode[SysMode["CDMA"] = 2] = "CDMA";
        SysMode[SysMode["GSM_GPRS"] = 3] = "GSM_GPRS";
        SysMode[SysMode["HDR"] = 4] = "HDR";
        SysMode[SysMode["WCDMA"] = 5] = "WCDMA";
        SysMode[SysMode["GPS"] = 6] = "GPS";
        SysMode[SysMode["GSM_WCDMA"] = 7] = "GSM_WCDMA";
        SysMode[SysMode["CDMA_HDR_HYBRID"] = 8] = "CDMA_HDR_HYBRID";
        SysMode[SysMode["TD_SCDMA"] = 15] = "TD_SCDMA";
    })(SysMode = AtMessage.SysMode || (AtMessage.SysMode = {}));
    var SysSubMode;
    (function (SysSubMode) {
        SysSubMode[SysSubMode["NO_SERVICES"] = 0] = "NO_SERVICES";
        SysSubMode[SysSubMode["GSM"] = 1] = "GSM";
        SysSubMode[SysSubMode["GPRS"] = 2] = "GPRS";
        SysSubMode[SysSubMode["EDGE"] = 3] = "EDGE";
        SysSubMode[SysSubMode["WCDMA"] = 4] = "WCDMA";
        SysSubMode[SysSubMode["HSDPA"] = 5] = "HSDPA";
        SysSubMode[SysSubMode["HSUPA"] = 6] = "HSUPA";
        SysSubMode[SysSubMode["HSUPAHSDPA"] = 7] = "HSUPAHSDPA";
        SysSubMode[SysSubMode["TD_SCDMA"] = 8] = "TD_SCDMA";
        SysSubMode[SysSubMode["HSPA_P"] = 9] = "HSPA_P";
        SysSubMode[SysSubMode["EVDO_REV_0"] = 10] = "EVDO_REV_0";
        SysSubMode[SysSubMode["EVDO_REV_A"] = 11] = "EVDO_REV_A";
        SysSubMode[SysSubMode["EVDO_REV_B"] = 12] = "EVDO_REV_B";
        SysSubMode[SysSubMode["ONE_X_RTT"] = 13] = "ONE_X_RTT";
        SysSubMode[SysSubMode["UMB"] = 14] = "UMB";
        SysSubMode[SysSubMode["ONE_X_EVDV"] = 15] = "ONE_X_EVDV";
        SysSubMode[SysSubMode["TREE_X_RTT"] = 16] = "TREE_X_RTT";
        SysSubMode[SysSubMode["HSPA_P_64QAM"] = 17] = "HSPA_P_64QAM";
        SysSubMode[SysSubMode["HSPA_P_MIMO"] = 18] = "HSPA_P_MIMO";
    })(SysSubMode = AtMessage.SysSubMode || (AtMessage.SysSubMode = {}));
    var SimState;
    (function (SimState) {
        SimState[SimState["INVALID_SIM"] = 0] = "INVALID_SIM";
        SimState[SimState["VALID_SIM"] = 1] = "VALID_SIM";
        SimState[SimState["INVALID_SIM_CS"] = 2] = "INVALID_SIM_CS";
        SimState[SimState["INVALID_SIM_PS"] = 3] = "INVALID_SIM_PS";
        SimState[SimState["INVALID_SIM_PS_CS"] = 4] = "INVALID_SIM_PS_CS";
        SimState[SimState["ROM_SIM"] = 240] = "ROM_SIM";
        SimState[SimState["NO_SIM"] = 255] = "NO_SIM";
    })(SimState = AtMessage.SimState || (AtMessage.SimState = {}));
    var ReportMode;
    (function (ReportMode) {
        ReportMode[ReportMode["NO_DEBUG_INFO"] = 0] = "NO_DEBUG_INFO";
        ReportMode[ReportMode["DEBUG_INFO_CODE"] = 1] = "DEBUG_INFO_CODE";
        ReportMode[ReportMode["DEBUG_INFO_VERBOSE"] = 2] = "DEBUG_INFO_VERBOSE";
    })(ReportMode = AtMessage.ReportMode || (AtMessage.ReportMode = {}));
    var MessageStat;
    (function (MessageStat) {
        MessageStat[MessageStat["REC_UNREAD"] = 0] = "REC_UNREAD";
        MessageStat[MessageStat["REC_READ"] = 1] = "REC_READ";
        MessageStat[MessageStat["STO_UNSENT"] = 2] = "STO_UNSENT";
        MessageStat[MessageStat["STO_SENT"] = 3] = "STO_SENT";
        MessageStat[MessageStat["ALL"] = 4] = "ALL";
    })(MessageStat = AtMessage.MessageStat || (AtMessage.MessageStat = {}));
    //TS 24.008 10.5.4.7 145 === 10010001
    var TypeOfNumber;
    (function (TypeOfNumber) {
        TypeOfNumber[TypeOfNumber["UNKNOWN"] = 0] = "UNKNOWN";
        TypeOfNumber[TypeOfNumber["INTERNATIONAL_NUMBER"] = 1] = "INTERNATIONAL_NUMBER";
        TypeOfNumber[TypeOfNumber["NATIONAL_NUMBER"] = 2] = "NATIONAL_NUMBER";
        TypeOfNumber[TypeOfNumber["NETWORK_SPECIFIC"] = 3] = "NETWORK_SPECIFIC";
        TypeOfNumber[TypeOfNumber["DEDICATED_ACCESS_AKA_SHORT_CODE"] = 4] = "DEDICATED_ACCESS_AKA_SHORT_CODE";
        TypeOfNumber[TypeOfNumber["RESERVED_FOR_EXTENSION"] = 7] = "RESERVED_FOR_EXTENSION";
    })(TypeOfNumber = AtMessage.TypeOfNumber || (AtMessage.TypeOfNumber = {}));
    var NumberingPlanIdentification;
    (function (NumberingPlanIdentification) {
        NumberingPlanIdentification[NumberingPlanIdentification["UNKNOWN"] = 0] = "UNKNOWN";
        NumberingPlanIdentification[NumberingPlanIdentification["ISDN_OR_TELEPHONY"] = 1] = "ISDN_OR_TELEPHONY";
        NumberingPlanIdentification[NumberingPlanIdentification["DATA"] = 3] = "DATA";
        NumberingPlanIdentification[NumberingPlanIdentification["TELEX"] = 4] = "TELEX";
        NumberingPlanIdentification[NumberingPlanIdentification["NATIONAL"] = 8] = "NATIONAL";
        NumberingPlanIdentification[NumberingPlanIdentification["PRIVATE"] = 9] = "PRIVATE";
        NumberingPlanIdentification[NumberingPlanIdentification["RESERVED_FOR_CTS"] = 11] = "RESERVED_FOR_CTS";
        NumberingPlanIdentification[NumberingPlanIdentification["RESERVED_FOR_EXTENSION"] = 15] = "RESERVED_FOR_EXTENSION";
    })(NumberingPlanIdentification = AtMessage.NumberingPlanIdentification || (AtMessage.NumberingPlanIdentification = {}));
    /* END ENUM */
    var LIST = /** @class */ (function (_super) {
        __extends(LIST, _super);
        function LIST(raw, atMessages) {
            var _this = _super.call(this, raw, AtMessage.idDict.LIST) || this;
            _this.atMessages = atMessages;
            return _this;
        }
        return LIST;
    }(AtMessage));
    AtMessage.LIST = LIST;
    var P_CMEE_READ = /** @class */ (function (_super) {
        __extends(P_CMEE_READ, _super);
        function P_CMEE_READ(raw, reportMode) {
            var _this = _super.call(this, raw) || this;
            _this.reportMode = reportMode;
            _this.reportModeName = ReportMode[reportMode];
            return _this;
        }
        return P_CMEE_READ;
    }(AtMessage));
    AtMessage.P_CMEE_READ = P_CMEE_READ;
    var CX_SIMST_URC = /** @class */ (function (_super) {
        __extends(CX_SIMST_URC, _super);
        function CX_SIMST_URC(raw, simState, lock) {
            var _this = _super.call(this, raw) || this;
            _this.simState = simState;
            _this.simStateName = SimState[simState];
            if (typeof (lock) === "boolean")
                _this.lock = lock;
            return _this;
        }
        return CX_SIMST_URC;
    }(AtMessage));
    AtMessage.CX_SIMST_URC = CX_SIMST_URC;
    var CX_SRVST_URC = /** @class */ (function (_super) {
        __extends(CX_SRVST_URC, _super);
        function CX_SRVST_URC(raw, serviceStatus) {
            var _this = _super.call(this, raw) || this;
            _this.serviceStatus = serviceStatus;
            _this.serviceStatusName = ServiceStatus[serviceStatus];
            return _this;
        }
        return CX_SRVST_URC;
    }(AtMessage));
    AtMessage.CX_SRVST_URC = CX_SRVST_URC;
    var P_CME_ERROR = /** @class */ (function (_super) {
        __extends(P_CME_ERROR, _super);
        function P_CME_ERROR(raw, info) {
            var _this = _super.call(this, raw) || this;
            switch (typeof (info)) {
                case "number":
                    _this.code = info;
                    _this.verbose = errors.getCmeErrorVerbose(_this.code);
                    break;
                case "string":
                    _this.verbose = info;
                    var code = errors.getCmeErrorCode(_this.verbose);
                    if (code)
                        _this.code = code;
                    break;
            }
            return _this;
        }
        return P_CME_ERROR;
    }(AtMessage));
    AtMessage.P_CME_ERROR = P_CME_ERROR;
    var P_CMS_ERROR = /** @class */ (function (_super) {
        __extends(P_CMS_ERROR, _super);
        function P_CMS_ERROR(raw, info) {
            var _this = _super.call(this, raw) || this;
            switch (typeof (info)) {
                case "number":
                    _this.code = info;
                    _this.verbose = errors.getCmsErrorVerbose(_this.code);
                    break;
                case "string":
                    _this.verbose = info;
                    var code = errors.getCmsErrorCode(_this.verbose);
                    if (code)
                        _this.code = code;
                    break;
            }
            return _this;
        }
        return P_CMS_ERROR;
    }(AtMessage));
    AtMessage.P_CMS_ERROR = P_CMS_ERROR;
    var P_CMGR_SET = /** @class */ (function (_super) {
        __extends(P_CMGR_SET, _super);
        function P_CMGR_SET(raw, stat, length, pdu) {
            var _this = _super.call(this, raw) || this;
            _this.stat = stat;
            _this.length = length;
            _this.pdu = pdu;
            _this.statName = MessageStat[stat];
            return _this;
        }
        return P_CMGR_SET;
    }(AtMessage));
    AtMessage.P_CMGR_SET = P_CMGR_SET;
    var P_CMTI_URC = /** @class */ (function (_super) {
        __extends(P_CMTI_URC, _super);
        function P_CMTI_URC(raw, mem, index) {
            var _this = _super.call(this, raw) || this;
            _this.mem = mem;
            _this.index = index;
            return _this;
        }
        return P_CMTI_URC;
    }(AtMessage));
    AtMessage.P_CMTI_URC = P_CMTI_URC;
    var P_CMT_URC = /** @class */ (function (_super) {
        __extends(P_CMT_URC, _super);
        function P_CMT_URC(raw, length, pdu) {
            var _this = _super.call(this, raw) || this;
            _this.length = length;
            _this.pdu = pdu;
            return _this;
        }
        return P_CMT_URC;
    }(AtMessage));
    AtMessage.P_CMT_URC = P_CMT_URC;
    var P_CDSI_URC = /** @class */ (function (_super) {
        __extends(P_CDSI_URC, _super);
        function P_CDSI_URC(raw, mem, index) {
            var _this = _super.call(this, raw) || this;
            _this.mem = mem;
            _this.index = index;
            return _this;
        }
        return P_CDSI_URC;
    }(AtMessage));
    AtMessage.P_CDSI_URC = P_CDSI_URC;
    var P_CDS_URC = /** @class */ (function (_super) {
        __extends(P_CDS_URC, _super);
        function P_CDS_URC(raw, length, pdu) {
            var _this = _super.call(this, raw) || this;
            _this.length = length;
            _this.pdu = pdu;
            return _this;
        }
        return P_CDS_URC;
    }(AtMessage));
    AtMessage.P_CDS_URC = P_CDS_URC;
    var P_CNUM_EXEC = /** @class */ (function (_super) {
        __extends(P_CNUM_EXEC, _super);
        function P_CNUM_EXEC(raw, alpha, number, type) {
            var _this = _super.call(this, raw) || this;
            _this.alpha = alpha;
            _this.number = number;
            _this.numberingPlanId = getBits(type, 4, 1);
            _this.typeOfNumber = getBits(type, 7, 5);
            _this.numberingPlanIdName = NumberingPlanIdentification[_this.numberingPlanId] || "RESERVED";
            _this.typeOfNumberName = TypeOfNumber[_this.typeOfNumber] || "RESERVED";
            return _this;
        }
        return P_CNUM_EXEC;
    }(AtMessage));
    AtMessage.P_CNUM_EXEC = P_CNUM_EXEC;
    function getBits(bits, to, from) {
        var getBit = function (str, i) {
            var index = str.length - i;
            if (index >= 0)
                return str[index];
            else
                return "0";
        };
        var str = bits.toString(2);
        var chunk = "";
        for (var i = from; i <= to; i++)
            chunk = getBit(str, i) + chunk;
        return parseInt(chunk, 2);
    }
    var P_CPBR_EXEC = /** @class */ (function (_super) {
        __extends(P_CPBR_EXEC, _super);
        function P_CPBR_EXEC(raw, index, number, type, text) {
            var _this = _super.call(this, raw) || this;
            _this.index = index;
            _this.number = number;
            _this.text = text;
            _this.numberingPlanId = getBits(type, 4, 1);
            _this.typeOfNumber = getBits(type, 7, 5);
            _this.numberingPlanIdName = NumberingPlanIdentification[_this.numberingPlanId] || "RESERVED";
            _this.typeOfNumberName = TypeOfNumber[_this.typeOfNumber] || "RESERVED";
            return _this;
        }
        return P_CPBR_EXEC;
    }(AtMessage));
    AtMessage.P_CPBR_EXEC = P_CPBR_EXEC;
    var P_CPBR_TEST = /** @class */ (function (_super) {
        __extends(P_CPBR_TEST, _super);
        function P_CPBR_TEST(raw, range, nLength, tLength) {
            var _this = _super.call(this, raw) || this;
            _this.range = range;
            _this.nLength = nLength;
            _this.tLength = tLength;
            return _this;
        }
        return P_CPBR_TEST;
    }(AtMessage));
    AtMessage.P_CPBR_TEST = P_CPBR_TEST;
    var CX_CVOICE_READ = /** @class */ (function (_super) {
        __extends(CX_CVOICE_READ, _super);
        function CX_CVOICE_READ(raw, isEnabled) {
            var _this = _super.call(this, raw) || this;
            _this.isEnabled = isEnabled;
            return _this;
        }
        return CX_CVOICE_READ;
    }(AtMessage));
    AtMessage.CX_CVOICE_READ = CX_CVOICE_READ;
    var P_CPIN_READ = /** @class */ (function (_super) {
        __extends(P_CPIN_READ, _super);
        function P_CPIN_READ(raw, pinState) {
            var _this = _super.call(this, raw) || this;
            _this.pinState = pinState;
            return _this;
        }
        return P_CPIN_READ;
    }(AtMessage));
    AtMessage.P_CPIN_READ = P_CPIN_READ;
    var CX_CPIN_READ = /** @class */ (function (_super) {
        __extends(CX_CPIN_READ, _super);
        function CX_CPIN_READ(raw, pinState, times, pukTimes, pinTimes, puk2Times, pin2Times) {
            var _this = _super.call(this, raw) || this;
            _this.pinState = pinState;
            _this.times = times;
            _this.pukTimes = pukTimes;
            _this.pinTimes = pinTimes;
            _this.puk2Times = puk2Times;
            _this.pin2Times = pin2Times;
            return _this;
        }
        return CX_CPIN_READ;
    }(AtMessage));
    AtMessage.CX_CPIN_READ = CX_CPIN_READ;
    var CX_SYSINFO_EXEC = /** @class */ (function (_super) {
        __extends(CX_SYSINFO_EXEC, _super);
        function CX_SYSINFO_EXEC(raw, serviceStatus, serviceDomain, isRoaming, sysMode, simState, cardLock, sysSubMode) {
            var _this = _super.call(this, raw) || this;
            _this.serviceStatus = serviceStatus;
            _this.serviceDomain = serviceDomain;
            _this.isRoaming = isRoaming;
            _this.sysMode = sysMode;
            _this.simState = simState;
            _this.cardLock = cardLock;
            _this.sysSubMode = sysSubMode;
            _this.serviceStatusName = ServiceStatus[serviceStatus];
            _this.serviceDomainName = ServiceDomain[serviceDomain];
            if (typeof (sysSubMode) === "number")
                _this.sysSubModeName = SysSubMode[sysSubMode];
            _this.sysModeName = SysMode[sysMode];
            _this.simStateName = SimState[simState];
            return _this;
        }
        return CX_SYSINFO_EXEC;
    }(AtMessage));
    AtMessage.CX_SYSINFO_EXEC = CX_SYSINFO_EXEC;
    var CX_MODE_URC = /** @class */ (function (_super) {
        __extends(CX_MODE_URC, _super);
        function CX_MODE_URC(raw, sysMode, sysSubMode) {
            var _this = _super.call(this, raw) || this;
            _this.sysMode = sysMode;
            _this.sysSubMode = sysSubMode;
            _this.sysModeName = SysMode[_this.sysMode];
            _this.sysSubModeName = SysSubMode[_this.sysSubMode];
            return _this;
        }
        return CX_MODE_URC;
    }(AtMessage));
    AtMessage.CX_MODE_URC = CX_MODE_URC;
    var P_CMGL_SET = /** @class */ (function (_super) {
        __extends(P_CMGL_SET, _super);
        function P_CMGL_SET(raw, index, stat, length, pdu) {
            var _this = _super.call(this, raw) || this;
            _this.index = index;
            _this.stat = stat;
            _this.length = length;
            _this.pdu = pdu;
            _this.statName = MessageStat[stat];
            return _this;
        }
        return P_CMGL_SET;
    }(AtMessage));
    AtMessage.P_CMGL_SET = P_CMGL_SET;
    var P_CMGL_TEST = /** @class */ (function (_super) {
        __extends(P_CMGL_TEST, _super);
        function P_CMGL_TEST(raw, range) {
            var _this = _super.call(this, raw) || this;
            _this.range = range;
            return _this;
        }
        return P_CMGL_TEST;
    }(AtMessage));
    AtMessage.P_CMGL_TEST = P_CMGL_TEST;
    var P_CMGS_SET = /** @class */ (function (_super) {
        __extends(P_CMGS_SET, _super);
        function P_CMGS_SET(raw, mr) {
            var _this = _super.call(this, raw) || this;
            _this.mr = mr;
            return _this;
        }
        return P_CMGS_SET;
    }(AtMessage));
    AtMessage.P_CMGS_SET = P_CMGS_SET;
    var P_CMSS_EXEC = /** @class */ (function (_super) {
        __extends(P_CMSS_EXEC, _super);
        function P_CMSS_EXEC(raw, mr) {
            var _this = _super.call(this, raw) || this;
            _this.mr = mr;
            return _this;
        }
        return P_CMSS_EXEC;
    }(AtMessage));
    AtMessage.P_CMSS_EXEC = P_CMSS_EXEC;
    var P_CPBS_READ = /** @class */ (function (_super) {
        __extends(P_CPBS_READ, _super);
        function P_CPBS_READ(raw, storage, used, total) {
            var _this = _super.call(this, raw) || this;
            _this.storage = storage;
            _this.used = used;
            _this.total = total;
            return _this;
        }
        return P_CPBS_READ;
    }(AtMessage));
    AtMessage.P_CPBS_READ = P_CPBS_READ;
    var CX_ICCID_SET = /** @class */ (function (_super) {
        __extends(CX_ICCID_SET, _super);
        function CX_ICCID_SET(raw, iccid) {
            var _this = _super.call(this, raw) || this;
            _this.iccid = iccid;
            return _this;
        }
        return CX_ICCID_SET;
    }(AtMessage));
    AtMessage.CX_ICCID_SET = CX_ICCID_SET;
    var CX_SPN_SET = /** @class */ (function (_super) {
        __extends(CX_SPN_SET, _super);
        function CX_SPN_SET(raw, p1, p2, serviceProviderName) {
            var _this = _super.call(this, raw) || this;
            _this.p1 = p1;
            _this.p2 = p2;
            _this.serviceProviderName = serviceProviderName;
            return _this;
        }
        return CX_SPN_SET;
    }(AtMessage));
    AtMessage.CX_SPN_SET = CX_SPN_SET;
    var P_CLAC_EXEC = /** @class */ (function (_super) {
        __extends(P_CLAC_EXEC, _super);
        function P_CLAC_EXEC(raw, supportedCommands) {
            var _this = _super.call(this, raw) || this;
            _this.supportedCommands = supportedCommands;
            return _this;
        }
        return P_CLAC_EXEC;
    }(AtMessage));
    AtMessage.P_CLAC_EXEC = P_CLAC_EXEC;
    var P_CRSM_SET = /** @class */ (function (_super) {
        __extends(P_CRSM_SET, _super);
        function P_CRSM_SET(raw, sw1, sw2, response) {
            var _this = _super.call(this, raw) || this;
            _this.sw1 = sw1;
            _this.sw2 = sw2;
            _this.response = response;
            return _this;
        }
        return P_CRSM_SET;
    }(AtMessage));
    AtMessage.P_CRSM_SET = P_CRSM_SET;
    var P_CPMS_SET = /** @class */ (function (_super) {
        __extends(P_CPMS_SET, _super);
        function P_CPMS_SET(raw, used1, total1, used2, total2, used3, total3) {
            var _this = _super.call(this, raw) || this;
            _this.readingAndDeleting = {
                "used": used1,
                "capacity": total1
            };
            _this.writingAndSending = {
                "used": used2,
                "capacity": total2
            };
            _this.receiving = {
                "used": used3,
                "capacity": total3
            };
            return _this;
        }
        return P_CPMS_SET;
    }(AtMessage));
    AtMessage.P_CPMS_SET = P_CPMS_SET;
    var P_CPMS_READ = /** @class */ (function (_super) {
        __extends(P_CPMS_READ, _super);
        function P_CPMS_READ(raw, mem1, used1, total1, mem2, used2, total2, mem3, used3, total3) {
            var _this = _super.call(this, raw) || this;
            _this.readingAndDeleting = {
                "mem": mem1,
                "used": used1,
                "capacity": total1
            };
            _this.writingAndSending = {
                "mem": mem2,
                "used": used2,
                "capacity": total2
            };
            _this.receiving = {
                "mem": mem3,
                "used": used3,
                "capacity": total3
            };
            return _this;
        }
        return P_CPMS_READ;
    }(AtMessage));
    AtMessage.P_CPMS_READ = P_CPMS_READ;
    var P_CMGW_EXEC = /** @class */ (function (_super) {
        __extends(P_CMGW_EXEC, _super);
        function P_CMGW_EXEC(raw, index) {
            var _this = _super.call(this, raw) || this;
            _this.index = index;
            return _this;
        }
        return P_CMGW_EXEC;
    }(AtMessage));
    AtMessage.P_CMGW_EXEC = P_CMGW_EXEC;
    var CONNECT = /** @class */ (function (_super) {
        __extends(CONNECT, _super);
        function CONNECT(raw, baudRate) {
            var _this = _super.call(this, raw) || this;
            _this.baudRate = baudRate;
            return _this;
        }
        return CONNECT;
    }(AtMessage));
    AtMessage.CONNECT = CONNECT;
    var ERROR = /** @class */ (function (_super) {
        __extends(ERROR, _super);
        function ERROR(raw) {
            return _super.call(this, raw) || this;
        }
        return ERROR;
    }(AtMessage));
    AtMessage.ERROR = ERROR;
})(AtMessage = exports.AtMessage || (exports.AtMessage = {}));
exports.AtMessage = AtMessage;
