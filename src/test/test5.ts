require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "reordering 2";

atMessages = atMessagesParser([
  '\r\n^SYSIN',
  '\r\n+CDS: 12\r\n0891683108608805509134430000\r\n',
  'FO:2,3,0,5,',
  '\r\n^BOOT:37478870,0,0,0,77\r\n',
  '1,,4\r\n',
  '\r\nOK\r\n'
].join(""));

expect =
`[
  {
    "raw": "\\r\\n^SYSINFO:2,3,0,5,1,,4\\r\\n",
    "id": "CX_SYSINFO_EXEC",
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
    "raw": "\\r\\n+CDS: 12\\r\\n0891683108608805509134430000\\r\\n",
    "id": "P_CDS_URC",
    "isUnsolicited": true,
    "length": 12,
    "pdu": "0891683108608805509134430000"
  },
  {
    "raw": "\\r\\n^BOOT:37478870,0,0,0,77\\r\\n",
    "id": "CX_BOOT_URC",
    "isUnsolicited": true
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

