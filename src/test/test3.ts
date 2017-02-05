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
