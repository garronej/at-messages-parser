require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "unso unimplemented";

atMessages = atMessagesParser([
  '\r\n+PACSP0\r\n',
  '\r\n^SYSSTART\r\n',
  '\r\n^BOOT:37478870,0,0,0,77\r\n'
].join(""));


expect =
`[
  {
    "raw": "\\r\\n+PACSP0\\r\\n",
    "id": "P_PACSP_URC",
    "isUnsolicited": true
  },
  {
    "raw": "\\r\\n^SYSSTART\\r\\n",
    "id": "CX_SYSSTART_URC",
    "isUnsolicited": true
  },
  {
    "raw": "\\r\\n^BOOT:37478870,0,0,0,77\\r\\n",
    "id": "CX_BOOT_URC",
    "isUnsolicited": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);