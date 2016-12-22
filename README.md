# at-messages-parser
Parse AT message sent by a modem

```` JavaScript

input "AT\rAT+CNUM=3,\"SM\"\r\r\n^BOOT:20952548,0,0,0,72\r\n\r\nERROR+CNUM: \"\",\"+393701307294\",145\r\n\r\n^RSSI:99\r\n\r\n+CNUM: \"CC\",\"+86139
87654321\",129\r\n\r\n+WTF:ié\"réflmmfe:eza&*\r\n\r\nERROR+WTF:ié\"réflmmfe:eza&*\r\n\r\nOK\r\n"
{ raw: 'AT\r', id: 0 } 'ECHO'
{ raw: 'AT+CNUM=3,"SM"\r', id: 0 } 'ECHO'
{ raw: '\r\n^BOOT:20952548,0,0,0,72\r\n', id: 3 } 'BOOT'
{ raw: '\r\nERROR+CNUM: "","+393701307294",145\r\n',
  id: 5,
  hasError: true } 'CNUM'
{ raw: '\r\n^RSSI:99\r\n', id: 4 } 'RSSI'
{ raw: '\r\n+CNUM: "CC","+8613987654321",129\r\n', id: 5 } 'CNUM'
{ raw: '\r\n+WTF:ié"réflmmfe:eza&*\r\n', id: 6 } 'OTHER'
{ raw: '\r\nERROR+WTF:ié"réflmmfe:eza&*\r\n',
  id: 6,
  hasError: true } 'OTHER'
{ raw: '\r\nOK\r\n', id: 1 } 'OK'

````
