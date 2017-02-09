require("colors");

import {
        atMessagesParser,
        AtMessage
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
    "raw": "ATE0\\r",
    "id": "ECHO"
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  }
]`;



console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);


atMessages = atMessagesParser('ATE0\r');

expect = 
`[
  {
    "raw": "ATE0\\r",
    "id": "ECHO"
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


expect =
`[
  {
    "raw": "\\r\\n^SIMST: 255,1\\r\\n",
    "id": "CX_SIMST_URC",
    "isUnsolicited": true,
    "simState": 255,
    "simStateName": "NO_SIM",
    "lock": true
  },
  {
    "raw": "ATE0\\r",
    "id": "ECHO"
  },
  {
    "raw": "\\r\\n+CDS: 12\\r\\n0891683108608805509134430000\\r\\n",
    "id": "P_CDS_URC",
    "isUnsolicited": true,
    "length": 12,
    "pdu": "0891683108608805509134430000"
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
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
    "raw": "\\r\\n^SIMST: 255,1\\r\\n",
    "id": "CX_SIMST_URC",
    "isUnsolicited": true,
    "simState": 255,
    "simStateName": "NO_SIM",
    "lock": true
  },
  {
    "raw": "\\r\\n",
    "id": "ECHO"
  },
  {
    "raw": "\\r\\n+CDS: 12\\r\\n0891683108608805509134430000\\r\\n",
    "id": "P_CDS_URC",
    "isUnsolicited": true,
    "length": 12,
    "pdu": "0891683108608805509134430000"
  }
]`;


console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);


atMessages= atMessagesParser("\r\n");


expect =
`[
  {
    "raw": "\\r\\n",
    "id": "ECHO"
  }
]`;


console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

atMessages= atMessagesParser("\r\n> ");

expect =
`[
  {
    "raw": "\\r\\n> ",
    "id": "INVITE",
    "isFinal": true
  }
]`;


console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

console.log(`Pass test ${test}`.green);