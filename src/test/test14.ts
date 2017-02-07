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

test= "exceptions";

atMessages = atMessagesParser([
        'ATE0\r',
        '\r\nOK\r\n'
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
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);


atMessages = atMessagesParser('ATE0\r');

expect = 
`[
  {
    "id": "ECHO",
    "raw": "ATE0\\r"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

atMessages = atMessagesParser([
  '\r\n^SIMST: 255,1\r\n',
  "ATE0\r",
  '\r\n+CDS: 12\r\n0891683108608805509134430000\r\n',
  "\r\nOK\r\n"
].join(""));

expect=
`[
  {
    "id": "^SIMST",
    "raw": "\\r\\n^SIMST: 255,1\\r\\n",
    "isUnsolicited": true,
    "simState": 255,
    "simStateName": "NO_SIM",
    "lock": true
  },
  {
    "id": "ECHO",
    "raw": "ATE0\\r"
  },
  {
    "id": "+CDS",
    "raw": "\\r\\n+CDS: 12\\r\\n0891683108608805509134430000\\r\\n",
    "isUnsolicited": true,
    "length": 12,
    "pdu": "0891683108608805509134430000"
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

atMessages = atMessagesParser([
  '\r\n^SIMST: 255,1\r\n',
  "\r\n",
  '\r\n+CDS: 12\r\n0891683108608805509134430000\r\n',
].join(""));

expect =
`[
  {
    "id": "^SIMST",
    "raw": "\\r\\n^SIMST: 255,1\\r\\n",
    "isUnsolicited": true,
    "simState": 255,
    "simStateName": "NO_SIM",
    "lock": true
  },
  {
    "id": "ECHO",
    "raw": "\\r\\n"
  },
  {
    "id": "+CDS",
    "raw": "\\r\\n+CDS: 12\\r\\n0891683108608805509134430000\\r\\n",
    "isUnsolicited": true,
    "length": 12,
    "pdu": "0891683108608805509134430000"
  }
]`;


console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

atMessages= atMessagesParser("\r\n");

expect= 
`[
  {
    "id": "ECHO",
    "raw": "\\r\\n"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

atMessages= atMessagesParser("\r\n> ");

expect= 
`[
  {
    "id": ">",
    "raw": "\\r\\n> ",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

console.log(`Pass test ${test}`.green);