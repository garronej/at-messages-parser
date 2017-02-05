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

test= "CNUM";

atMessages= atMessagesParser([
        '\r\n+CME ERROR: 25',
        '+CNUM: "","+33671651906",145\r\n\r\n',
        '\r\nOK\r\n',
        '\r\n+CME ERROR: invalid characters in text string',
        '+CNUM: "","+33671651906",145\r\n\r\n',
        '\r\nOK\r\n',
        '\r\nERROR+CNUM: "","+33671651907",145\r\n\r\n',
        '\r\nOK\r\n',
        [
                '\r\n',
                '+CNUM: "","+33606894175",145\r\n',
                '+CME ERROR: 25+CNUM: "","+33671651906",145\r\n',
                '+CNUM: "Donn�es","",0\r\n',
                '+CNUM: "Fax","",0\r\n',
                '\r\n'
        ].join(""),
        "\r\nOK\r\n"
].join(""));

expect =
`[
  {
    "id": "AT LIST",
    "raw": "\\r\\n+CME ERROR: 25+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n\\r\\n",
    "atMessages": [
      {
        "id": "+CNUM",
        "raw": "+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n",
        "alpha": "",
        "number": "+33671651906",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER",
        "error": {
          "id": "+CME ERROR",
          "raw": "+CME ERROR: 25",
          "isError": true,
          "code": 25,
          "verbose": "invalid characters in text string"
        }
      }
    ]
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "AT LIST",
    "raw": "\\r\\n+CME ERROR: invalid characters in text string+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n\\r\\n",
    "atMessages": [
      {
        "id": "+CNUM",
        "raw": "+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n",
        "alpha": "",
        "number": "+33671651906",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER",
        "error": {
          "id": "+CME ERROR",
          "raw": "+CME ERROR: invalid characters in text string",
          "isError": true,
          "verbose": "invalid characters in text string",
          "code": 25
        }
      }
    ]
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "AT LIST",
    "raw": "\\r\\nERROR+CNUM: \\"\\",\\"+33671651907\\",145\\r\\n\\r\\n",
    "atMessages": [
      {
        "id": "+CNUM",
        "raw": "+CNUM: \\"\\",\\"+33671651907\\",145\\r\\n",
        "alpha": "",
        "number": "+33671651907",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER",
        "error": {
          "id": "ERROR",
          "raw": "ERROR",
          "isError": true
        }
      }
    ]
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "AT LIST",
    "raw": "\\r\\n+CNUM: \\"\\",\\"+33606894175\\",145\\r\\n+CME ERROR: 25+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n+CNUM: \\"Donn�es\\",\\"\\",0\\r\\n+CNUM: \\"Fax\\",\\"\\",0\\r\\n\\r\\n",
    "atMessages": [
      {
        "id": "+CNUM",
        "raw": "+CNUM: \\"\\",\\"+33606894175\\",145\\r\\n",
        "alpha": "",
        "number": "+33606894175",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER"
      },
      {
        "id": "+CNUM",
        "raw": "+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n",
        "alpha": "",
        "number": "+33671651906",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER",
        "error": {
          "id": "+CME ERROR",
          "raw": "+CME ERROR: 25",
          "isError": true,
          "code": 25,
          "verbose": "invalid characters in text string"
        }
      },
      {
        "id": "+CNUM",
        "raw": "+CNUM: \\"Donn�es\\",\\"\\",0\\r\\n",
        "alpha": "Donn�es",
        "number": "",
        "numberingPlanId": 0,
        "typeOfNumber": 0,
        "numberingPlanIdName": "UNKNOWN",
        "typeOfNumberName": "UNKNOWN"
      },
      {
        "id": "+CNUM",
        "raw": "+CNUM: \\"Fax\\",\\"\\",0\\r\\n",
        "alpha": "Fax",
        "number": "",
        "numberingPlanId": 0,
        "typeOfNumber": 0,
        "numberingPlanIdName": "UNKNOWN",
        "typeOfNumberName": "UNKNOWN"
      }
    ]
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);