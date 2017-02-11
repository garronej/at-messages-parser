require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";



let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "implemented urc";

atMessages = atMessagesParser([
        '\r\n+CMTI: "SM",26\r\n',
        '\r\n+CDSI: "SM",0\r\n',
        '\r\n^SIMST: 255,1\r\n',
        '\r\n^SRVST: 0\r\n',
        '\r\n^MODE: 3,4\r\n'
].join(""));

expect = String.raw
`[
  {
    "raw": "\r\n+CMTI: \"SM\",26\r\n",
    "id": "P_CMTI_URC",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  },
  {
    "raw": "\r\n+CDSI: \"SM\",0\r\n",
    "id": "P_CDSI_URC",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 0
  },
  {
    "raw": "\r\n^SIMST: 255,1\r\n",
    "id": "CX_SIMST_URC",
    "isUnsolicited": true,
    "simState": 255,
    "simStateName": "NO_SIM",
    "lock": true
  },
  {
    "raw": "\r\n^SRVST: 0\r\n",
    "id": "CX_SRVST_URC",
    "isUnsolicited": true,
    "serviceStatus": 0,
    "serviceStatusName": "NO_SERVICES"
  },
  {
    "raw": "\r\n^MODE: 3,4\r\n",
    "id": "CX_MODE_URC",
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
