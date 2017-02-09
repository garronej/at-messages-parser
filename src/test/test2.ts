require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "implemented urc with pdu";

atMessages = atMessagesParser([
        '\r\n+CMT: ,13\r\n0891683108608805F9240D91683109\r\n',
        '\r\n+CDS: 12\r\n0891683108608805509134430000\r\n',
].join(""));

expect = 
`[
  {
    "raw": "\\r\\n+CMT: ,13\\r\\n0891683108608805F9240D91683109\\r\\n",
    "id": "P_CMT_URC",
    "isUnsolicited": true,
    "length": 13,
    "pdu": "0891683108608805F9240D91683109"
  },
  {
    "raw": "\\r\\n+CDS: 12\\r\\n0891683108608805509134430000\\r\\n",
    "id": "P_CDS_URC",
    "isUnsolicited": true,
    "length": 12,
    "pdu": "0891683108608805509134430000"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
