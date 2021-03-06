require("colors");

import {
  atMessagesParser,
  AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "+CREG is both URC and a response";

atMessages = atMessagesParser([
  '\r\n^SRVST:0\r\n\r\n^MODE:0,0\r\n\r\n+CREG: 2\r\n',
  '\r\n+CREG: 2,5, 1607, 14DB\r\n'
].join(""));

expect = String.raw
  `[
  {
    "raw": "\r\n^SRVST:0\r\n",
    "id": "CX_SRVST_URC",
    "isUnsolicited": true,
    "serviceStatus": 0,
    "serviceStatusName": "NO_SERVICES"
  },
  {
    "raw": "\r\n^MODE:0,0\r\n",
    "id": "CX_MODE_URC",
    "isUnsolicited": true,
    "sysMode": 0,
    "sysSubMode": 0,
    "sysModeName": "NO_SERVICES",
    "sysSubModeName": "NO_SERVICES"
  },
  {
    "raw": "\r\n+CREG: 2\r\n",
    "id": "P_CREG_URC",
    "isUnsolicited": true,
    "stat": 2,
    "statName": "NOT_REGISTERED_BUT_SEARCHING"
  },
  {
    "raw": "\r\n+CREG: 2,5, 1607, 14DB\r\n",
    "id": "P_CREG_READ",
    "stat": 5,
    "statName": "REGISTERED_ROAMING"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
