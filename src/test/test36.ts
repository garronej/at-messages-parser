require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "test CMSS";

atMessages = atMessagesParser([
  `\r\n+CMSS: 35\r\n`,
  `\r\nOK\r\n`,
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\n+CMSS: 35\r\n",
    "id": "P_CMSS_EXEC",
    "mr": 35
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  }
]`;


console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);