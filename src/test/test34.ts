require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "test CPMS";

atMessages = atMessagesParser([
  `\r\n+CPMS: 65,100,12,250,0,30\r\n`,
  `\r\nOK\r\n`,
  `\r\n+CPMS: "SM",65,100,"ME",12,250,"BM",0,30\r\n`,
  `\r\nOK\r\n`
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\n+CPMS: 65,100,12,250,0,30\r\n",
    "id": "P_CPMS_SET",
    "readingAndDeleting": {
      "used": 65,
      "capacity": 100
    },
    "writingAndSending": {
      "used": 12,
      "capacity": 250
    },
    "receiving": {
      "used": 0,
      "capacity": 30
    }
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\r\n+CPMS: \"SM\",65,100,\"ME\",12,250,\"BM\",0,30\r\n",
    "id": "P_CPMS_READ",
    "readingAndDeleting": {
      "mem": "SM",
      "used": 65,
      "capacity": 100
    },
    "writingAndSending": {
      "mem": "ME",
      "used": 12,
      "capacity": 250
    },
    "receiving": {
      "mem": "BM",
      "used": 0,
      "capacity": 30
    }
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