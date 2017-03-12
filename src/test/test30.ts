require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "test ICCID";

atMessages = atMessagesParser([
  '\r\n^ICCID: "983351106111005079F8"\r\n',
  '\r\nOK\r\n'
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\n^ICCID: \"983351106111005079F8\"\r\n",
    "id": "CX_ICCID_SET",
    "iccid": "983351106111005079F8"
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
