import * as errors from "./errors";

import * as en from "./enums";

import { AtMessage } from "./AtMessage";

export class P_CMEE_READ extends AtMessage {
    public readonly reportModeName: string;
    constructor(raw: string,
        public readonly reportMode: en.ReportMode) {
        super(raw);

        this.reportModeName = en.ReportMode[reportMode];
    }
}

export class CX_SIMST_URC extends AtMessage {

    public readonly simStateName: string;
    public readonly lock?: boolean;

    constructor(raw: string,
        public readonly simState: en.SimState,
        lock: boolean) {

        super(raw);

        this.simStateName = en.SimState[simState];

        if (typeof (lock) === "boolean") this.lock = lock;

    }

}

export class CX_SRVST_URC extends AtMessage {
    public readonly serviceStatusName: string;
    constructor(raw: string,
        public readonly serviceStatus: en.ServiceStatus) {
        super(raw);
        this.serviceStatusName = en.ServiceStatus[serviceStatus];
    }
}

export class P_CME_ERROR extends AtMessage {

    public readonly verbose: string;
    public readonly code: number;

    constructor(raw: string,
        info: number | string) {

        super(raw);

        switch (typeof (info)) {
            case "number":
                this.code = info as number;
                this.verbose = errors.getCmeErrorVerbose(this.code);
                break;
            case "string":
                this.verbose = info as string;
                let code = errors.getCmeErrorCode(this.verbose);
                if (code) this.code = code;
                break;
        }

    }
}

export class P_CMS_ERROR extends AtMessage {
    public readonly verbose: string;
    public readonly code: number;

    constructor(raw: string,
        info: number | string) {

        super(raw);

        switch (typeof (info)) {
            case "number":
                this.code = info as number;
                this.verbose = errors.getCmsErrorVerbose(this.code);
                break;
            case "string":
                this.verbose = info as string;
                let code = errors.getCmsErrorCode(this.verbose);
                if (code) this.code = code;
                break;
        }

    }
}

export class P_CMGR_SET extends AtMessage {
    public readonly statName: string;

    constructor(raw: string,
        public readonly stat: en.MessageStat,
        public readonly length: number,
        public readonly pdu: string, ) {

        super(raw);

        this.statName = en.MessageStat[stat];
    }

}

export class P_CMTI_URC extends AtMessage {
    constructor(raw: string,
        public readonly mem: en.MemStorage,
        public readonly index: number) {

        super(raw);

    }

}

export class P_CMT_URC extends AtMessage {
    constructor(raw: string,
        public readonly length: number,
        public readonly pdu: string) {
        super(raw);
    }
}

export class P_CDSI_URC extends AtMessage {
    constructor(raw: string,
        public readonly mem: en.MemStorage,
        public readonly index: number) {

        super(raw);
    }
}

export class P_CDS_URC extends AtMessage {
    constructor(raw: string,
        public readonly length: number,
        public readonly pdu: string) {
        super(raw);
    }
}

export class P_CNUM_EXEC extends AtMessage {

    public readonly typeOfNumber: en.TypeOfNumber;
    public readonly typeOfNumberName: string;
    public readonly numberingPlanId: en.NumberingPlanIdentification;
    public readonly numberingPlanIdName: string;

    constructor(raw: string,
        public readonly alpha: string,
        public readonly number: string,
        type: number) {

        super(raw);

        this.numberingPlanId = getBits(type, 4, 1);
        this.typeOfNumber = getBits(type, 7, 5);

        this.numberingPlanIdName = en.NumberingPlanIdentification[this.numberingPlanId] || "RESERVED";
        this.typeOfNumberName = en.TypeOfNumber[this.typeOfNumber] || "RESERVED";

    }
}

function getBits(bits: number, to: number, from: number): number {

    let getBit = (str: string, i: number): string => {
        let index = str.length - i;
        if (index >= 0) return str[index];
        else return "0";
    };

    let str = bits.toString(2);

    let chunk = "";

    for (let i = from; i <= to; i++) chunk = getBit(str, i) + chunk;

    return parseInt(chunk, 2);

}

export class P_CPBR_EXEC extends AtMessage {
    public readonly typeOfNumber: en.TypeOfNumber;
    public readonly typeOfNumberName: string;
    public readonly numberingPlanId: en.NumberingPlanIdentification;
    public readonly numberingPlanIdName: string;

    constructor(raw: string,
        public readonly index: number,
        public readonly number: string,
        type: number,
        public readonly text: string,
    ) {
        super(raw);

        this.numberingPlanId = getBits(type, 4, 1);
        this.typeOfNumber = getBits(type, 7, 5);

        this.numberingPlanIdName = en.NumberingPlanIdentification[this.numberingPlanId] || "RESERVED";
        this.typeOfNumberName = en.TypeOfNumber[this.typeOfNumber] || "RESERVED";

    }
}

export class P_CPBR_TEST extends AtMessage {
    constructor(raw: string,
        public readonly range: [number, number],
        public readonly nLength: number,
        public readonly tLength: number
    ) {
        super(raw);
    }
}

export class P_CPIN_READ extends AtMessage {
    constructor(raw: string,
        public readonly pinState: en.PinState) {

        super(raw);
    }
}

export class CX_CPIN_READ extends AtMessage {

    public readonly pinStateName: string;

    constructor(raw: string,
        public readonly pinState: en.PinState,
        public readonly times: number,
        public readonly pukTimes: number,
        public readonly pinTimes: number,
        public readonly puk2Times: number,
        public readonly pin2Times: number) {

        super(raw);

    }

}

export class CX_SYSINFO_EXEC extends AtMessage {
    public readonly serviceStatusName: string;
    public readonly serviceDomainName: string;
    public readonly sysModeName: string;
    public readonly simStateName: string;
    public readonly sysSubModeName: string;
    constructor(raw: string,
        public readonly serviceStatus: en.ServiceStatus,
        public readonly serviceDomain: en.ServiceDomain,
        public readonly isRoaming: boolean,
        public readonly sysMode: en.SysMode,
        public readonly simState: en.SimState,
        public readonly cardLock: boolean,
        public readonly sysSubMode: en.SysSubMode) {
        super(raw);

        this.serviceStatusName = en.ServiceStatus[serviceStatus];
        this.serviceDomainName = en.ServiceDomain[serviceDomain];
        if (typeof (sysSubMode) === "number") 
            this.sysSubModeName = en.SysSubMode[sysSubMode];
        this.sysModeName = en.SysMode[sysMode];
        this.simStateName = en.SimState[simState];

    }
}

export class CX_MODE_URC extends AtMessage {
    public readonly sysModeName: string;
    public readonly sysSubModeName: string;
    constructor(raw: string,
        public readonly sysMode: en.SysMode,
        public readonly sysSubMode: en.SysSubMode
    ) {
        super(raw);
        this.sysModeName = en.SysMode[this.sysMode];
        this.sysSubModeName = en.SysSubMode[this.sysSubMode];
    }
}

export class P_CMGL_SET extends AtMessage {

    public readonly statName: string;

    constructor(raw: string,
        public readonly index: number,
        public readonly stat: en.MessageStat,
        public readonly length: number,
        public readonly pdu: string) {
        super(raw);

        this.statName = en.MessageStat[stat];
    }
}

export class P_CMGL_TEST extends AtMessage {
    constructor(raw: string,
        public readonly range: [en.MessageStat, en.MessageStat]
    ) {
        super(raw);
    }
}

export class P_CMGS_SET extends AtMessage {
    constructor(raw: string,
        public readonly mr: number) {
        super(raw);
    }
}

export class P_CPBS_READ extends AtMessage {
    constructor(raw: string,
        public readonly storage: en.MemStorage,
        public readonly used: number,
        public readonly total: number
    ) {
        super(raw);
    }
}

export class CONNECT extends AtMessage {
    constructor(raw: string,
        public readonly baudRate: number){
            super(raw);
        }
}