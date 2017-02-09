require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;


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

expect =
`[
  {
    "raw": "\\r\\n+CPIN: SIM PIN\\r\\n",
    "id": "P_CPIN_READ",
    "pinState": "SIM PIN"
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n+CMEE: 1\\r\\n",
    "id": "P_CMEE_READ",
    "reportMode": 1,
    "reportModeName": "DEBUG_INFO_CODE"
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n^CPIN: READY,,10,3,10,3\\r\\n",
    "id": "CX_CPIN_READ",
    "pinState": "READY",
    "pukTimes": 10,
    "pinTimes": 3,
    "puk2Times": 10,
    "pin2Times": 3
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n^SYSINFO:2,3,0,5,1,1,0\\r\\n",
    "id": "CX_SYSINFO_EXEC",
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
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n+CMGS: 135\\r\\n",
    "id": "P_CMGS_SET",
    "mr": 135
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n+CPBS: \\"SM\\",3,50\\r\\n",
    "id": "P_CPBS_READ",
    "storage": "SM",
    "used": 3,
    "total": 50
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n+CPBR: 34,\\"+33678047133\\",145,\\"Sabine\\"\\r\\n",
    "id": "P_CPBR_EXEC",
    "index": 34,
    "number": "+33678047133",
    "text": "Sabine",
    "numberingPlanId": 1,
    "typeOfNumber": 1,
    "numberingPlanIdName": "ISDN_OR_TELEPHONY",
    "typeOfNumberName": "INTERNATIONAL_NUMBER"
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n+CPBR: (1-250),24,30\\r\\n",
    "id": "P_CPBR_TEST",
    "range": [
      1,
      250
    ],
    "nLength": 24,
    "tLength": 30
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
