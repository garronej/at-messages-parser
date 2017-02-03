# at-messages-parser

Parse AT command response send my a GSM modem independently from the command issued.

If the message is a response to a known command it will be compiled into an object
so the relevant information can be extracted easily.
When the parser does not recognize the message it transform it in generic
AtMessage an continue parsing.

This library is easier to use with TypeScript but is also usable in raw JavaScript.

Support only *AT+CMEE=0* and *AT+CMEE=1* mode, not *AT+CMEE=2*

#Technical specifications

This module have been build according to this specification document:

https://www.paoli.cz/out/media/HUAWEI_MU609_HSPA_LGA_Modul_AT_Command_Interface_Specification_V100R002_04.pdf

#Install 

npm install garronej/at-messages-parser

#Usage

./example/sample.ts

```` JavaScript
require("colors");

import {
        atMessagesParser,
        atIds,
        AtMessage,
        AtMessageList,
        AtImps
} from "at-messages-parser";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "unsolicited";

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
    "id": "^BOOT",
    "raw": "\\r\\n^BOOT:20952548,0,0,0,72\\r\\n",
    "isUnsolicited": true
  },
  {
    "id": "^RSSI",
    "raw": "\\r\\n^RSSI:99\\r\\n",
    "isUnsolicited": true
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

atMessages = atMessagesParser([
        '\r\n+CMTI: "SM",26\r\n',
        '\r\n+CDSI: "SM",0\r\n',
        '\r\n^BOOT:20952548,0,0,0,72\r\n',
        '\r\n^RSSI:99\r\n',
        '\r\n^SIMST: 255,1\r\n',
        '\r\n^SRVST: 0\r\n',
        '\r\n^MODE: 3,4\r\n'
].join(""));

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "unsolicited pdu";

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

atMessages = atMessagesParser([
        '\r\n+CMT: ,13\r\n0891683108608805F9240D91683109\r\n',
        '\r\n+CDS: 12\r\n0891683108608805509134430000\r\n',
].join(""));


console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);


test= "single line message";

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

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "reordering 1";

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

atMessages = atMessagesParser([
        '\r\n^SYSINFO:2,3,0,5,1,,4\r\n',
        '\r\n+CMTI: "SM",26\r\n',
        '\r\nOK\r\n',
        '\r\n+CMTI: "SM",26\r\n'
].join(""));

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);


test= "reordering 2";

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

atMessages = atMessagesParser([
  '\r\n^SYSIN',
  '\r\n+CMTI: "SM",26\r\n',
  'FO:2,3,0,5,1,,4\r\n',
  '\r\nOK\r\n'
].join(""));

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

console.log("All tests passed".green);
````