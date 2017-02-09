require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "unimplemented test version of command"

atMessages = atMessagesParser([
  '\r\n+CPBS: ("SM","EN","ON")\r\n',
  '\r\nOK\r\n'
].join(""));

expect = 
`[
  {
    "raw": "\\r\\n+CPBS: (\\"SM\\",\\"EN\\",\\"ON\\")\\r\\n"
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
