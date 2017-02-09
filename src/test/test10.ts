require("colors");

import {
        atMessagesParser,
        AtMessage
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
    "raw": "\\r\\n+CME ERROR: 25+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n\\r\\n",
    "id": "LIST",
    "atMessages": [
      {
        "raw": "+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n",
        "id": "P_CNUM_EXEC",
        "alpha": "",
        "number": "+33671651906",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER",
        "error": {
          "raw": "+CME ERROR: 25",
          "id": "P_CME_ERROR",
          "isError": true,
          "code": 25,
          "verbose": "invalid characters in text string"
        }
      }
    ]
  },
  {
    "raw": "OK",
    "id": "\\r\\nOK\\r\\n"
  },
  {
    "raw": "\\r\\n+CME ERROR: invalid characters in text string+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n\\r\\n",
    "id": "LIST",
    "atMessages": [
      {
        "raw": "+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n",
        "id": "P_CNUM_EXEC",
        "alpha": "",
        "number": "+33671651906",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER",
        "error": {
          "raw": "+CME ERROR: invalid characters in text string",
          "id": "P_CME_ERROR",
          "isError": true,
          "verbose": "invalid characters in text string",
          "code": 25
        }
      }
    ]
  },
  {
    "raw": "OK",
    "id": "\\r\\nOK\\r\\n"
  },
  {
    "raw": "\\r\\nERROR+CNUM: \\"\\",\\"+33671651907\\",145\\r\\n\\r\\n",
    "id": "LIST",
    "atMessages": [
      {
        "raw": "+CNUM: \\"\\",\\"+33671651907\\",145\\r\\n",
        "id": "P_CNUM_EXEC",
        "alpha": "",
        "number": "+33671651907",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER",
        "error": {
          "raw": "ERROR",
          "id": "ERROR",
          "isError": true
        }
      }
    ]
  },
  {
    "raw": "OK",
    "id": "\\r\\nOK\\r\\n"
  },
  {
    "raw": "\\r\\n+CNUM: \\"\\",\\"+33606894175\\",145\\r\\n+CME ERROR: 25+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n+CNUM: \\"Donn�es\\",\\"\\",0\\r\\n+CNUM: \\"Fax\\",\\"\\",0\\r\\n\\r\\n",
    "id": "LIST",
    "atMessages": [
      {
        "raw": "+CNUM: \\"\\",\\"+33606894175\\",145\\r\\n",
        "id": "P_CNUM_EXEC",
        "alpha": "",
        "number": "+33606894175",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER"
      },
      {
        "raw": "+CNUM: \\"\\",\\"+33671651906\\",145\\r\\n",
        "id": "P_CNUM_EXEC",
        "alpha": "",
        "number": "+33671651906",
        "numberingPlanId": 1,
        "typeOfNumber": 1,
        "numberingPlanIdName": "ISDN_OR_TELEPHONY",
        "typeOfNumberName": "INTERNATIONAL_NUMBER",
        "error": {
          "raw": "+CME ERROR: 25",
          "id": "P_CME_ERROR",
          "isError": true,
          "code": 25,
          "verbose": "invalid characters in text string"
        }
      },
      {
        "raw": "+CNUM: \\"Donn�es\\",\\"\\",0\\r\\n",
        "id": "P_CNUM_EXEC",
        "alpha": "Donn�es",
        "number": "",
        "numberingPlanId": 0,
        "typeOfNumber": 0,
        "numberingPlanIdName": "UNKNOWN",
        "typeOfNumberName": "UNKNOWN"
      },
      {
        "raw": "+CNUM: \\"Fax\\",\\"\\",0\\r\\n",
        "id": "P_CNUM_EXEC",
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
    "raw": "OK",
    "id": "\\r\\nOK\\r\\n"
  }
]`;


console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);