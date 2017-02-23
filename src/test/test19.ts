require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "ECHO with CMGS";

atMessages = atMessagesParser([
  'AT+CMGS=153\r',
  '\r\n> '
].join(""));


expect= String.raw
`[
  {
    "raw": "AT+CMGS=153\r",
    "id": "ECHO"
  },
  {
    "raw": "\r\n> ",
    "id": "INVITE",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

atMessages= atMessagesParser("0061000B9133365D9ECFC3E7B2220912D7D36C32280C6A97E7F3F0\r\n");

expect= String.raw
`[
  {
    "raw": "0061000B9133365D9ECFC3E7B2220912D7D36C32280C6A97E7F3F0\r\n",
    "id": "ECHO"
  }
]`;


atMessages= atMessagesParser("4882C4F5349B0C0A83DAE57E7F3F0\r\nB9AC4882C49220713DCD2683C2");

expect= String.raw
`[
  {
    "raw": "4882C4F5349B0C0A83DAE57E7F3F0\r\nB9AC4882C49220713DCD2683C2",
    "id": "ECHO"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);


atMessages = atMessagesParser([
  "2280C6A97E7F3F0\r\nB9AC4882C4F5349B0C0A83DAE5F93",
  "\r\n+CMGS: 34\r\n",
  "\r\nOK\r\n"
].join(""));


expect= String.raw
`[
  {
    "raw": "2280C6A97E7F3F0\r\nB9AC4882C4F5349B0C0A83DAE5F93",
    "id": "ECHO"
  },
  {
    "raw": "\r\n+CMGS: 34\r\n",
    "id": "P_CMGS_SET",
    "mr": 34
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