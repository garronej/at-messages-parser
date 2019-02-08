"use strict";
let fs = require("fs");
let path = require("path");

let unsoTokens = [
        "+CMTI" , "+CDSI", "^SIMST" , "^SRVST" , "^MODE" ,
        "^RSSI" , "^CSNR" , "^DSFLOWRPT" , "^EARST" , "^ACTIVEBAND" , "^RSSILVL" , 
        "^HRSSILVL" , "^HDRRSSI" , "^CRSSI" , "^ANLEVEL" , "^BOOT" , "+CLIP", 
        "+CCWA" , "+CRING" , "+CUSD" , "+CUSATP" , "+CUSATEND" , "+PACSP" , 
        "^NWTIME" , "^SYSSTART" , "^ORIG" , "^THERM" , "^CONF" , "^CONN" , 
        "^CEND" , "^SMMEMFULL" , "^IPDATA" , "^IPSTATE" , "^TIMESETRULT" , 
        "^DATASETRULT" , "^XDSTATUS" , "^POSITION" , "^POSEND" , "^WNINV" , 
        "^FOTASTATE" , "^FWLSTATE" , "^NDISEND" , "^NDISSTAT", "+CREG",
        "^STIN", "+CGREG", "^LOCCHD", "^SIMFILEREFRES", "^DATAVALIDIT",
        "^WPDCP","^WPDDL", "^WPDOP", "^CTZV", "^RFSWITCH", "+CBM",
        "^OTACMSG", "^DSDORMANT", "^ECLSTAT",
        "RING"
];

let unsoTokensPdu = [
    "+CMT", "+CDS"
];

let finalTokens = [ "INVITE", "OK", "CONNECT" ];

let errorTokens = [
    "NO CARRIER", "NO DIALTONE", "BUSY", "NO ANSWER", "COMMAND NOT SUPPORT", 
    "TOO MANY PARAMETERS", "ERROR", "+CME ERROR","+CMS ERROR"
];

let ids = (() => {

    let out = [ "ECHO" ];

    for (let token of unsoTokens.concat(unsoTokensPdu)) {

        let id = token;
        id = id.replace(/^\^/, "CX_");
        id = id.replace(/^\+/, "P_");
        id += "_URC";

        out.push(id);

    }

    for (let token of finalTokens.concat(errorTokens)) {

        let id = token;

        id = id.replace(/^\+/, "P_");
        id = id.replace(/\ /g, "_");

        out.push(id);

    }

    let implementedIds = (() => {

        let _AtMessImps_ts = fs.readFileSync(
            path.join(__dirname, "..", "lib" , "AtMessage.ts"),
            { "encoding": "utf8" }
        );

        let out = [];

        for (let line of _AtMessImps_ts.match(/\ [^\ ]+\ extends\ AtMessage/g)) {

            out.push(line.match(/\ ([^\ ]+)\ extends\ AtMessage/)[1]);

        }

        return out;

    })();

    for (let id of implementedIds) {

        if (out.indexOf(id) < 0) out.push(id);

    }

    return out;

})();

let _AtMessageId_ts = (() => {

    let genArray = (arr, name) => {

        let out = `export let ${name} = [\n`;

        for (let i = 0; i < arr.length - 1; i++)
            out += `    "${arr[i]}",\n`;

        out += `    "${arr[arr.length - 1]}"\n];`;

        return out;

    };

    let _AtId = "export type AtId =\n";
    let _atIdDict = "export let atIdDict = {\n";

    let id;
    for (let i = 0; i < ids.length - 1; i++) {
        let id = ids[i];
        _AtId += `    "${id}" |\n`;
        _atIdDict += `    "${id}": "${id}" as AtId,\n`;
    }

    id = ids[ids.length - 1];

    _AtId += `    "${id}" \n;`;
    _atIdDict += `    "${id}": "${id}" as AtId\n};`;

    return [
        genArray(unsoTokens, "unsoTokens"),
        genArray( unsoTokensPdu, "unsoTokensPdu"),
        genArray(finalTokens, "finalTokens"),
        genArray(errorTokens, "errorTokens"),
        _AtId,
        _atIdDict
    ].join("\n");

})();

const outDir = path.join(__dirname, "..", "lib", "generated");

if (!fs.existsSync(outDir))
    fs.mkdirSync(outDir);

fs.writeFileSync(
    path.join(outDir, "AtMessageId.ts"),
    _AtMessageId_ts,
    { "encoding": "utf8", "flag": "w" }
);
