require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "message with separator inside";

atMessages = atMessagesParser([
        "\r\n",
        [
                "Manufacturer: huawei\r\n",
                "Model: K3520\r\n",
                "Revision: 11.314.12.02.00\r\n",
                "IMEI: 353284020952548\r\n",
                "+GCAP: +CGSM,+DS,+ES"
        ].join(""),
        "\r\n",
        "\r\nOK\r\n"
].join(""));

expect = String.raw
`[
  {
    "raw": "\r\nManufacturer: huawei\r\nModel: K3520\r\nRevision: 11.314.12.02.00\r\nIMEI: 353284020952548\r\n+GCAP: +CGSM,+DS,+ES\r\n"
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
