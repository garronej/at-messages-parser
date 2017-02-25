require("colors");

import {
        atMessagesParser,
        AtMessage,
        AtMessagesParserError
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "Exception";


let expectLeftToParse = String.raw
  `"\r\n+CMGL: (0-4)\r\n\r\nOK\r\n\r\n+CMGL: 666,1,,22\r\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\r\n\r\nOK\r\n\r\n+CMGL: 0,1,,22\r\n07913306007110811094904003CF7A1A\r\n+CMGL: 4,0,,24\r\n0797649"`;

expect = String.raw
  `[
  {
    "raw": "\r\n+CMTI: \"SM\",26\r\n",
    "id": "P_CMTI_URC",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  },
  {
    "raw": "\r\n^BOOT:37478870,0,0,0,77\r\n",
    "id": "CX_BOOT_URC",
    "isUnsolicited": true
  }
]`;

try {

  atMessages = atMessagesParser([
    '\r\n+CMGL: (0-4)\r\n',
    '\r\nOK\r\n',
    '\r\n+CMGL: 666,1,,22\r\nAAAAAAAAAAAAA',
    '\r\n+CMTI: "SM",26\r\n',
    'AAAAAAAAAAAAAAAA\r\n',
    '\r\nOK\r\n',
    '\r\n+CMGL: 0,1,,22\r\n079133060071108',
    '\r\n^BOOT:37478870,0,0,0,77\r\n',
    '11094904003CF7A1A',
    '\r\n+CMGL: 4,0,,24\r\n0797649'
  ].join(""));

} catch (error) {

  console.assert(error instanceof AtMessagesParserError);

  let parserError = error as AtMessagesParserError;

  console.assert(expectLeftToParse === JSON.stringify(parserError.leftToParse, null, 2),
    `Fail test ${test}`.red);


  console.assert(expect === JSON.stringify(parserError.urcMessages, null, 2),
    `Fail test ${test}`.red);


  console.log(`Pass test ${test}`.green);

}