require("colors");

import {
        atMessagesParser,
        atIds,
        AtMessage,
        AtMessageList,
        AtImps
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;


test= "unsolicited";

atMessages = atMessagesParser([
        '\r\n+CMTI: "SM",26\r\n',
        '\r\n+CDSI: "SM",0\r\n',
        '\r\n^SIMST: 255,1\r\n',
        '\r\n^SRVST: 0\r\n',
        '\r\n^MODE: 3,4\r\n'
].join(""));

expect=
`[
  {
    "id": "+CMTI",
    "raw": "\\r\\n+CMTI: \\"SM\\",26\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  },
  {
    "id": "+CDSI",
    "raw": "\\r\\n+CDSI: \\"SM\\",0\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 0
  },
  {
    "id": "^SIMST",
    "raw": "\\r\\n^SIMST: 255,1\\r\\n",
    "isUnsolicited": true,
    "simState": 255,
    "simStateName": "NO_SIM",
    "lock": true
  },
  {
    "id": "^SRVST",
    "raw": "\\r\\n^SRVST: 0\\r\\n",
    "isUnsolicited": true,
    "serviceStatus": 0,
    "serviceStatusName": "NO_SERVICES"
  },
  {
    "id": "^MODE",
    "raw": "\\r\\n^MODE: 3,4\\r\\n",
    "isUnsolicited": true,
    "sysMode": 3,
    "sysSubMode": 4,
    "sysModeName": "GSM_GPRS",
    "sysSubModeName": "WCDMA"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "unsolicited pdu";

atMessages = atMessagesParser([
        '\r\n+CMT: ,13\r\n0891683108608805F9240D91683109\r\n',
        '\r\n+CDS: 12\r\n0891683108608805509134430000\r\n',
].join(""));

expect=
`[
  {
    "id": "+CMT",
    "raw": "\\r\\n+CMT: ,13\\r\\n0891683108608805F9240D91683109\\r\\n",
    "isUnsolicited": true,
    "length": 13,
    "pdu": "0891683108608805F9240D91683109"
  },
  {
    "id": "+CDS",
    "raw": "\\r\\n+CDS: 12\\r\\n0891683108608805509134430000\\r\\n",
    "isUnsolicited": true,
    "length": 12,
    "pdu": "0891683108608805509134430000"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "single line message";

atMessages = atMessagesParser([
  '\r\n+CPIN: SIM PIN\r\n',
  '\r\nOK\r\n',
  '\r\n+CMEE: 1\r\n',
  '\r\nOK\r\n',
  '\r\n^CPIN: READY,,10,3,10,3\r\n',
  '\r\nOK\r\n',
  '\r\n^SYSINFO:2,3,0,5,1,1,0\r\n',
  '\r\nOK\r\n',
  '\r\n+CMGS: 135\r\n',
  '\r\nOK\r\n',
  '\r\n+CPBS: "SM",3,50\r\n',
  '\r\nOK\r\n',
  '\r\n+CPBR: 34,"+33678047133",145,"Sabine"\r\n',
  '\r\nOK\r\n',
  '\r\n+CPBR: (1-250),24,30\r\n',
  '\r\nOK\r\n'
].join(""));

expect= 
`[
  {
    "id": "+CPIN",
    "raw": "\\r\\n+CPIN: SIM PIN\\r\\n",
    "pinState": "SIM PIN"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CMEE",
    "raw": "\\r\\n+CMEE: 1\\r\\n",
    "reportMode": 1,
    "reportModeName": "DEBUG_INFO_CODE"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "^CPIN",
    "raw": "\\r\\n^CPIN: READY,,10,3,10,3\\r\\n",
    "pinState": "READY",
    "pukTimes": 10,
    "pinTimes": 3,
    "puk2Times": 10,
    "pin2Times": 3
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "^SYSINFO",
    "raw": "\\r\\n^SYSINFO:2,3,0,5,1,1,0\\r\\n",
    "serviceStatus": 2,
    "serviceDomain": 3,
    "isRoaming": false,
    "sysMode": 5,
    "simState": 1,
    "cardLock": true,
    "sysSubMode": 0,
    "serviceStatusName": "VALID_SERVICES",
    "serviceDomainName": "PS_AND_CS_SERVICES",
    "sysSubModeName": "NO_SERVICES",
    "sysModeName": "WCDMA",
    "simStateName": "VALID_SIM"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CMGS",
    "raw": "\\r\\n+CMGS: 135\\r\\n",
    "mr": 135
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CPBS",
    "raw": "\\r\\n+CPBS: \\"SM\\",3,50\\r\\n",
    "storage": "SM",
    "used": 3,
    "total": 50
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CPBR",
    "raw": "\\r\\n+CPBR: 34,\\"+33678047133\\",145,\\"Sabine\\"\\r\\n",
    "index": 34,
    "number": "+33678047133",
    "text": "Sabine",
    "numberingPlanId": 1,
    "typeOfNumber": 1,
    "numberingPlanIdName": "ISDN_OR_TELEPHONY",
    "typeOfNumberName": "INTERNATIONAL_NUMBER"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CPBR TEST",
    "raw": "\\r\\n+CPBR: (1-250),24,30\\r\\n",
    "range": [
      1,
      250
    ],
    "nLength": 24,
    "tLength": 30
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "reordering 1";

atMessages = atMessagesParser([
        '\r\n^SYSINFO:2,3,0,5,1,,4\r\n',
        '\r\n+CMTI: "SM",26\r\n',
        '\r\nOK\r\n',
        '\r\n+CMTI: "SM",26\r\n'
].join(""));

expect=
`[
  {
    "id": "^SYSINFO",
    "raw": "\\r\\n^SYSINFO:2,3,0,5,1,,4\\r\\n",
    "serviceStatus": 2,
    "serviceDomain": 3,
    "isRoaming": false,
    "sysMode": 5,
    "simState": 1,
    "sysSubMode": 4,
    "serviceStatusName": "VALID_SERVICES",
    "serviceDomainName": "PS_AND_CS_SERVICES",
    "sysSubModeName": "WCDMA",
    "sysModeName": "WCDMA",
    "simStateName": "VALID_SIM"
  },
  {
    "id": "+CMTI",
    "raw": "\\r\\n+CMTI: \\"SM\\",26\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CMTI",
    "raw": "\\r\\n+CMTI: \\"SM\\",26\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "reordering 2";

atMessages = atMessagesParser([
  '\r\n^SYSIN',
  '\r\n+CMTI: "SM",26\r\n',
  'FO:2,3,0,5,1,,4\r\n',
  '\r\nOK\r\n'
].join(""));

expect=
`[
  {
    "id": "^SYSINFO",
    "raw": "\\r\\n^SYSINFO:2,3,0,5,1,,4\\r\\n",
    "serviceStatus": 2,
    "serviceDomain": 3,
    "isRoaming": false,
    "sysMode": 5,
    "simState": 1,
    "sysSubMode": 4,
    "serviceStatusName": "VALID_SERVICES",
    "serviceDomainName": "PS_AND_CS_SERVICES",
    "sysSubModeName": "WCDMA",
    "sysModeName": "WCDMA",
    "simStateName": "VALID_SIM"
  },
  {
    "id": "+CMTI",
    "raw": "\\r\\n+CMTI: \\"SM\\",26\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "unknown messages";

atMessages = atMessagesParser([
  '\r\nOK\r\n',
  '\r\n+CPIN: SIM PIN\r\n',
  '\r\nOK\r\n',
  "\r\n" + [
    "Manufacturer: huawei\r\n",
    "Model: K3520\r\n",
    "Revision: 11.314.12.02.00\r\n",
    "IMEI: 353284020952548\r\n",
    "+GCAP: +CGSM,+DS,+ES"
  ].join("") + "\r\n",
  "\r\nOK\r\n",
  '\r\n+CMT: ,13\r\n0891683108608805F9240D91683109\r\n'
].join(""));

expect= 
`[
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CPIN",
    "raw": "\\r\\n+CPIN: SIM PIN\\r\\n",
    "pinState": "SIM PIN"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "raw": "\\r\\nManufacturer: huawei\\r\\nModel: K3520\\r\\nRevision: 11.314.12.02.00\\r\\nIMEI: 353284020952548\\r\\n+GCAP: +CGSM,+DS,+ES\\r\\n"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CMT",
    "raw": "\\r\\n+CMT: ,13\\r\\n0891683108608805F9240D91683109\\r\\n",
    "isUnsolicited": true,
    "length": 13,
    "pdu": "0891683108608805F9240D91683109"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "final messages";

atMessages = atMessagesParser([
  '\r\nERROR\r\n',
  '\r\nCONNECT\r\n',
  '\r\nRING\r\n',
  '\r\nNO CARRIER\r\n',
  '\r\nNO DIALTONE\r\n',
  '\r\nBUSY\r\n',
  '\r\nNO ANSWER\r\n',
  '\r\nCOMMAND NOT SUPPORT\r\n',
  '\r\nTOO MANY PARAMETERS\r\n'
].join(""));

expect = 
`[
  {
    "id": "ERROR",
    "raw": "\\r\\nERROR\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "CONNECT",
    "raw": "\\r\\nCONNECT\\r\\n",
    "isFinal": true
  },
  {
    "id": "RING",
    "raw": "\\r\\nRING\\r\\n",
    "isFinal": true
  },
  {
    "id": "NO CARRIER",
    "raw": "\\r\\nNO CARRIER\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "NO DIALTONE",
    "raw": "\\r\\nNO DIALTONE\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "BUSY",
    "raw": "\\r\\nBUSY\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "NO ANSWER",
    "raw": "\\r\\nNO ANSWER\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "COMMAND NOT SUPPORT",
    "raw": "\\r\\nCOMMAND NOT SUPPORT\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "TOO MANY PARAMETERS",
    "raw": "\\r\\nTOO MANY PARAMETERS\\r\\n",
    "isFinal": true,
    "isError": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "unimplemented test version of command"

atMessages = atMessagesParser([
  '\r\n+CPBS: ("SM","EN","ON")\r\n',
  '\r\nOK\r\n'
].join(""));

expect=
`[
  {
    "raw": "\\r\\n+CPBS: (\\"SM\\",\\"EN\\",\\"ON\\")\\r\\n"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "CM error";

atMessages= atMessagesParser([
  '\r\n+CMS ERROR: 301\r\n',
  '\r\n+CME ERROR: 3\r\n',
  '\r\n+CMS ERROR: SMS service of ME reserved\r\n',
  '\r\n+CME ERROR: operation not allowed\r\n',
].join(""));

expect= 
`[
  {
    "id": "+CMS ERROR",
    "raw": "\\r\\n+CMS ERROR: 301\\r\\n",
    "isFinal": true,
    "isError": true,
    "code": 301,
    "verbose": "SMS service of ME reserved"
  },
  {
    "id": "+CME ERROR",
    "raw": "\\r\\n+CME ERROR: 3\\r\\n",
    "isFinal": true,
    "isError": true,
    "code": 3,
    "verbose": "operation not allowed"
  },
  {
    "id": "+CMS ERROR",
    "raw": "\\r\\n+CMS ERROR: SMS service of ME reserved\\r\\n",
    "isFinal": true,
    "isError": true,
    "verbose": "SMS service of ME reserved",
    "code": 301
  },
  {
    "id": "+CME ERROR",
    "raw": "\\r\\n+CME ERROR: operation not allowed\\r\\n",
    "isFinal": true,
    "isError": true,
    "verbose": "operation not allowed",
    "code": 3
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);