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

test= "test echo and invite";

atMessages = atMessagesParser([
        'ATE0\r',
        '\r\nOK\r\n',
        '\r\n> '
].join(""));

expect = 
`[
  {
    "id": "ECHO",
    "raw": "ATE0\\r"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": ">",
    "raw": "\\r\\n> ",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);