require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "fix 1";

atMessages = atMessagesParser([
  '\r\n^BOOT:37478870,0,0,0,77\r\n'
].join(""));

expect = String.raw
`[
  {
    "raw": "\r\n^BOOT:37478870,0,0,0,77\r\n",
    "id": "CX_BOOT_URC",
    "isUnsolicited": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
