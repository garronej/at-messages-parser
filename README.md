# at-messages-parser

Parse AT command response send my a GSM modem independently from the command issued.
This module implement a parser method for EmergingTechnologyAdvisors/node-serialport.

If the message is a response to a known command it will be compiled into an object
so the relevant information can be extracted easily.
When the parser does not recognize the message it transform it in generic
AtMessage an continue parsing.

Note: AT+CPBR will be parsed correctly only if you read one entry at the time.
(e.g. response to AT+CPBR=0,250\r will not be parsed, but AT+CPBR=4,4\r will)
Note: This parser will only work for for GSM modem in PDU mode (not text mode)


# Technical specifications

This module have been build according to this specification document:

https://www.paoli.cz/out/media/HUAWEI_MU609_HSPA_LGA_Modul_AT_Command_Interface_Specification_V100R002_04.pdf

# Install 

```bash
npm install garronej/at-messages-parser

