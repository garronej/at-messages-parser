require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "RING as URC";

atMessages = atMessagesParser([
  '\r\nRING\r\n'
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\nRING\r\n",
    "id": "RING_URC",
    "isUnsolicited": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
