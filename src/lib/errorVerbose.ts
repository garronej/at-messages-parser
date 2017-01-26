import { readFileSync } from "fs";

let cmeErrorDictionary = JSON.parse(
    readFileSync(
        __dirname + "/../../res/cmeErrorDictionary.json",
        { "encoding": "utf8" }
    )
);

export function getCmeErrorVerbose(errorNo: number): string {

    return cmeErrorDictionary[errorNo];

}


let cmsErrorDictionary = JSON.parse(
    readFileSync(
        __dirname + "/../../res/cmsErrorDictionary.json",
        { "encoding": "utf8" }
    )
);

export function getCmsErrorVerbose(errorNo: number): string {
    if (0 <= errorNo && errorNo <= 127) return cmsErrorDictionary["0-127"];
    if (128 <= errorNo && errorNo <= 255) return cmsErrorDictionary["128-255"];
    if (512 <= errorNo) return cmsErrorDictionary["512.."];

    let out: string = undefined;

    out = cmsErrorDictionary[errorNo];

    if (out === undefined) return "reserved"
    else return out
}

