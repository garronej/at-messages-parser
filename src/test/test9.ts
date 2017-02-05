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

test= "CM error";

atMessages= atMessagesParser([
  '\r\n+CMS ERROR: 301\r\n',
  '\r\n+CME ERROR: 3\r\n',
  '\r\n+CMS ERROR: SMS service of ME reserved\r\n',
  '\r\n+CME ERROR: operation not allowed\r\n',
].join(""));

expect= 
`[
  {
    "id": "+CMS ERROR",
    "raw": "\\r\\n+CMS ERROR: 301\\r\\n",
    "isFinal": true,
    "isError": true,
    "code": 301,
    "verbose": "SMS service of ME reserved"
  },
  {
    "id": "+CME ERROR",
    "raw": "\\r\\n+CME ERROR: 3\\r\\n",
    "isFinal": true,
    "isError": true,
    "code": 3,
    "verbose": "operation not allowed"
  },
  {
    "id": "+CMS ERROR",
    "raw": "\\r\\n+CMS ERROR: SMS service of ME reserved\\r\\n",
    "isFinal": true,
    "isError": true,
    "verbose": "SMS service of ME reserved",
    "code": 301
  },
  {
    "id": "+CME ERROR",
    "raw": "\\r\\n+CME ERROR: operation not allowed\\r\\n",
    "isFinal": true,
    "isError": true,
    "verbose": "operation not allowed",
    "code": 3
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
