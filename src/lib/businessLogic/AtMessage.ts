import { 
        AtId,
        atIdDict,
        unsoTokens,
        unsoTokensPdu,
        finalTokens,
        errorTokens
} from "./generated/AtMessageId";


export class AtMessage {

        public isUnsolicited?: boolean;
        public isFinal?: boolean;
        public isError?: boolean;
        public readonly id: AtId;

        constructor(
                public readonly raw: string,
                id?: AtId
        ) {
                this.id = atIdDict[this["constructor"]["name"]] || id;

                if (isUnso(this.id)) this.isUnsolicited = true;
                if (isFinal(this.id)) this.isFinal = true;
                if (isError(this.id)) this.isError = true;

        }

}

export class AtMessageList extends AtMessage {

        constructor(raw: string,
                public readonly atMessages: AtMessage[]
        ) {
                super(raw, atIdDict.LIST);
        }
}

export function isUnso(token: string): boolean;
export function isUnso(id: AtId): boolean;
export function isUnso(x): any {

        if( !x ) return false;

        let token: string;

        if (atIdDict[x]) token = idToToken(x);
        else token = x as string;

        return unsoTokens.concat(unsoTokensPdu).indexOf(token) >= 0;

};

export function isFinal(token: string): boolean;
export function isFinal(id: AtId): boolean;
export function isFinal(x): any {

        if( !x ) return false;

        let token: string;

        if (atIdDict[x]) token = idToToken(x);
        else token = x as string;


        return finalTokens.indexOf(token) >= 0 || errorTokens.indexOf(token) >= 0;


};


function isError(id: AtId): boolean {

        if( !id ) return false;

        let token = idToToken(id);

        return errorTokens.indexOf(token) >= 0;


};


export function hasPdu(unsoToken: string): boolean {

        return unsoTokensPdu.indexOf(unsoToken) >= 0;

};


function idToToken(id: AtId): string {

        //CX_SIMST_URC => "^SIMST"

        let token = id as string;

        token = token.replace(/^CX_/, "^");
        token = token.replace(/^P_/, "+");

        token = token.replace(/_(URC|READ|EXEC|SET|)$/, "");

        token = token.replace(/_/g, " ");

        return token;

};


export function tokenToId(
        token: string,
        type?: "READ" | "EXEC" | "SET"
): AtId {

        //^SIMST => CX_SIMST_URC
        //COMMAND NOT SUPPORT => COMMAND_NOT_SUPPORT

        let id = token;

        id = id.replace(/^\^/, "CX_");
        id = id.replace(/^\+/, "P_");
        id = id.replace(/\ /g, "_");

        if (isUnso(token))
                id += "_URC";
        else if (!isFinal(token) && type)
                id += "_" + type;

        return atIdDict[id];

}
















