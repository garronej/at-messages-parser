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

test= "unso unimplemented";

atMessages = atMessagesParser([
  '\r\n+PACSP0\r\n',
  '\r\n^SYSSTART\r\n'
].join(""));

expect= 
`[
  {
    "id": "+PACSP",
    "raw": "\\r\\n+PACSP0\\r\\n",
    "isUnsolicited": true
  },
  {
    "id": "^SYSSTART",
    "raw": "\\r\\n^SYSSTART\\r\\n",
    "isUnsolicited": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);