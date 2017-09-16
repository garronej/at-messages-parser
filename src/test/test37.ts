require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "test ^CVOICE";

atMessages = atMessagesParser([
  `\r\n^CVOICE:1\r\n`,
  `\r\nOK\r\n`,
  `\r\n^CVOICE:0,8000,16,20\r\n`,
  `\r\nOK\r\n`,
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\n^CVOICE:1\r\n",
    "id": "CX_CVOICE_READ",
    "isEnabled": false
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\r\n^CVOICE:0,8000,16,20\r\n",
    "id": "CX_CVOICE_READ",
    "isEnabled": true
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