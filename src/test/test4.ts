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

