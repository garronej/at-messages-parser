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

test= "fix 1";

atMessages = atMessagesParser([
  '\r\n^BOOT:37478870,0,0,0,77\r\n'
].join(""));

expect = 
`[
  {
    "id": "^BOOT",
    "raw": "\\r\\n^BOOT:37478870,0,0,0,77\\r\\n",
    "isUnsolicited": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);