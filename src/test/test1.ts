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