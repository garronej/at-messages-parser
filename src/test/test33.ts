require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "test SPN";

atMessages = atMessagesParser([
  `\r\n^SPN:0,0,Free\r\n`,
  `\r\nOK\r\n`
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\n^SPN:0,0,Free\r\n",
    "id": "CX_SPN_SET",
    "p1": 0,
    "p2": 0,
    "serviceProviderName": "Free"
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