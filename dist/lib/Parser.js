var Parser = (function (undefined) {
function Parser(environment){
if(!(this instanceof Parser)) return new Parser(environment);
var env,modules,imports;
env=modules=imports=environment;
this.action={"0":{"8":["shift",[8]],"9":["shift",[9]],"12":["shift",[16]],"13":["shift",[11]],"17":["shift",[12]],"18":["shift",[13]],"19":["shift",[14]],"20":["shift",[15]]},"1":{"0":["accept",[]]},"2":{"0":["reduce",[1,1,0]],"8":["shift",[8]],"9":["shift",[9]],"12":["shift",[16]],"13":["shift",[11]],"17":["shift",[12]],"18":["shift",[13]],"19":["shift",[14]],"20":["shift",[15]]},"3":{"0":["reduce",[2,1,2]],"8":["reduce",[2,1,2]],"9":["reduce",[2,1,2]],"12":["reduce",[2,1,2]],"13":["reduce",[2,1,2]],"17":["reduce",[2,1,2]],"18":["reduce",[2,1,2]],"19":["reduce",[2,1,2]],"20":["reduce",[2,1,2]]},"4":{"0":["reduce",[3,1,3]],"8":["reduce",[3,1,3]],"9":["reduce",[3,1,3]],"12":["reduce",[3,1,3]],"13":["reduce",[3,1,3]],"17":["reduce",[3,1,3]],"18":["reduce",[3,1,3]],"19":["reduce",[3,1,3]],"20":["reduce",[3,1,3]]},"5":{"0":["reduce",[3,1,4]],"8":["reduce",[3,1,4]],"9":["reduce",[3,1,4]],"12":["reduce",[3,1,4]],"13":["reduce",[3,1,4]],"17":["reduce",[3,1,4]],"18":["reduce",[3,1,4]],"19":["reduce",[3,1,4]],"20":["reduce",[3,1,4]]},"6":{"0":["reduce",[3,1,5]],"8":["reduce",[3,1,5]],"9":["reduce",[3,1,5]],"12":["reduce",[3,1,5]],"13":["reduce",[3,1,5]],"17":["reduce",[3,1,5]],"18":["reduce",[3,1,5]],"19":["reduce",[3,1,5]],"20":["reduce",[3,1,5]]},"7":{"0":["reduce",[3,1,6]],"8":["reduce",[3,1,6]],"9":["reduce",[3,1,6]],"12":["reduce",[3,1,6]],"13":["reduce",[3,1,6]],"17":["reduce",[3,1,6]],"18":["reduce",[3,1,6]],"19":["reduce",[3,1,6]],"20":["reduce",[3,1,6]]},"8":{"0":["reduce",[3,1,7]],"8":["reduce",[3,1,7]],"9":["reduce",[3,1,7]],"12":["reduce",[3,1,7]],"13":["reduce",[3,1,7]],"17":["reduce",[3,1,7]],"18":["reduce",[3,1,7]],"19":["reduce",[3,1,7]],"20":["reduce",[3,1,7]]},"9":{"0":["reduce",[4,1,8]],"8":["reduce",[4,1,8]],"9":["reduce",[4,1,8]],"12":["reduce",[4,1,8]],"13":["reduce",[4,1,8]],"17":["reduce",[4,1,8]],"18":["reduce",[4,1,8]],"19":["reduce",[4,1,8]],"20":["reduce",[4,1,8]]},"10":{"11":["shift",[18]],"12":["shift",[19]]},"11":{"16":["shift",[21]]},"12":{"0":["reduce",[7,1,15]],"8":["reduce",[7,1,15]],"9":["reduce",[7,1,15]],"12":["reduce",[7,1,15]],"13":["reduce",[7,1,15]],"17":["reduce",[7,1,15]],"18":["reduce",[7,1,15]],"19":["reduce",[7,1,15]],"20":["reduce",[7,1,15]]},"13":{"0":["reduce",[7,1,16]],"8":["reduce",[7,1,16]],"9":["reduce",[7,1,16]],"12":["reduce",[7,1,16]],"13":["reduce",[7,1,16]],"17":["reduce",[7,1,16]],"18":["reduce",[7,1,16]],"19":["reduce",[7,1,16]],"20":["reduce",[7,1,16]]},"14":{"0":["reduce",[7,1,17]],"8":["reduce",[7,1,17]],"9":["reduce",[7,1,17]],"12":["reduce",[7,1,17]],"13":["reduce",[7,1,17]],"17":["reduce",[7,1,17]],"18":["reduce",[7,1,17]],"19":["reduce",[7,1,17]],"20":["reduce",[7,1,17]]},"15":{"0":["reduce",[7,1,18]],"8":["reduce",[7,1,18]],"9":["reduce",[7,1,18]],"12":["reduce",[7,1,18]],"13":["reduce",[7,1,18]],"17":["reduce",[7,1,18]],"18":["reduce",[7,1,18]],"19":["reduce",[7,1,18]],"20":["reduce",[7,1,18]]},"16":{"11":["reduce",[10,1,11]],"12":["reduce",[10,1,11]]},"17":{"0":["reduce",[2,2,1]],"8":["reduce",[2,2,1]],"9":["reduce",[2,2,1]],"12":["reduce",[2,2,1]],"13":["reduce",[2,2,1]],"17":["reduce",[2,2,1]],"18":["reduce",[2,2,1]],"19":["reduce",[2,2,1]],"20":["reduce",[2,2,1]]},"18":{"0":["reduce",[5,2,9]],"8":["reduce",[5,2,9]],"9":["reduce",[5,2,9]],"12":["reduce",[5,2,9]],"13":["reduce",[5,2,9]],"17":["reduce",[5,2,9]],"18":["reduce",[5,2,9]],"19":["reduce",[5,2,9]],"20":["reduce",[5,2,9]]},"19":{"11":["reduce",[10,2,10]],"12":["reduce",[10,2,10]]},"20":{"15":["shift",[22]],"16":["shift",[23]]},"21":{"15":["reduce",[14,1,14]],"16":["reduce",[14,1,14]]},"22":{"0":["reduce",[6,3,12]],"8":["reduce",[6,3,12]],"9":["reduce",[6,3,12]],"12":["reduce",[6,3,12]],"13":["reduce",[6,3,12]],"17":["reduce",[6,3,12]],"18":["reduce",[6,3,12]],"19":["reduce",[6,3,12]],"20":["reduce",[6,3,12]]},"23":{"15":["reduce",[14,2,13]],"16":["reduce",[14,2,13]]}};
this.goto={"0":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"10":10},"2":{"3":17,"4":4,"5":5,"6":6,"7":7,"10":10},"11":{"14":20}};
this.actions=[,,,,,,,function (unparsed){

    this.leftToParse+= unparsed;

},function (full_raw_token_rest_pdu_ok) {
    "use strict";

    let full= full_raw_token_rest_pdu_ok[0];
    let raw= full_raw_token_rest_pdu_ok[1];
    let token= full_raw_token_rest_pdu_ok[2];
    let rest= full_raw_token_rest_pdu_ok[3];
    let pdu= full_raw_token_rest_pdu_ok[4]
    let ok= full_raw_token_rest_pdu_ok[5];
    
    let AtMessage= this.AtMessage;
    
    let atMessage;
    let match;
    switch (token) {
        case "+CMTI":
            match= rest.match(/^:\ ?"([A-Z]{2})",(\-?[0-9]+)$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CMTI_URC(
                raw,
                match[1],
                parseInt(match[2])
            );
            break;
        case "+CDSI":
            match= rest.match(/^:\ ?"([A-Z]{2})",([0-9]+)$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CDSI_URC(
                raw,
                match[1],
                parseInt(match[2])
            );
            break;
        case "^SIMST":
            match= rest.match(/^:\ ?([0-9]+)(?:,([01]))?$/);
            if( !match ) break;
            var lock= undefined;
            if( match[2] !== undefined ) lock= (match[2] === "1")
                atMessage = new AtMessage.CX_SIMST_URC(
                    raw,
                    parseInt(match[1]),
                    lock
                );
            break;
        case "^SRVST":
            match= rest.match(/^:\ ?([0-9]+)$/);
            if( !match ) break;
            atMessage = new AtMessage.CX_SRVST_URC(
                raw,
                parseInt(match[1])
            );
            break;
        case "^MODE":
            match= rest.match(/^:\ ?([0-9]+),([0-9]+)$/);
            if( !match ) break;
            atMessage= new AtMessage.CX_MODE_URC(
                raw,
                parseInt(match[1]),
                parseInt(match[2])
            );
            break;
        case "+CMT":
            match= rest.match(/^:\ ?(?:.+)?,([0-9]+)$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CMT_URC(
                raw,
                parseInt(match[1]),
                pdu
            );
            break;
        case "+CDS":
            match= rest.match(/^:\ ?([0-9]+)$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CDS_URC(
                raw,
                parseInt(match[1]),
                pdu
            );
            break;
        case "+CMGR":
            match= rest.match(/^:\ ?([0-9]+),[0-9]*,([0-9]+)$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CMGR_SET(
                raw,
                parseInt(match[1]),
                parseInt(match[2]),
                pdu
            );
            break;
        case "+CPIN":
            match= rest.match(/^:\ ?([\ A-Z]+)$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CPIN_READ(
                raw,
                match[1]
            );
            break;
        case "+CMEE":
            match= rest.match(/^:\ ?([0-9]+)$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CMEE_READ(
                raw,
                parseInt(match[1])
            );
            break;
        case "+CREG": {
            match= rest.match(/^:\ ?(.*)$/);
            if( !match ) break;
            var list =match[1].split(",").map(str=> str.replace(/\s/g,""));
            var isUrc;
            if( [ 2, 5].indexOf(list.length) >= 0 ){
                isUrc= false;
            }else if( [1,3].indexOf(list.length) >= 0 ) {
                isUrc= true;
            }else if( list.length === 4 ){
                isUrc= !list[1].match(/^[012345]$/);
            }
            var statStr= list[isUrc?0:1];
            if( !statStr.match(/^[012345]$/) ) break;
            var stat= parseInt(statStr);
            atMessage= isUrc ? 
                new AtMessage.P_CREG_URC( raw, stat):
                new AtMessage.P_CREG_READ( raw, stat)
                ;
        } break;
        case "^CPIN":
            match= rest.match(/^:\ ?([\ A-Z]+),((?:[0-9]+)?),([0-9]+),([0-9]+),([0-9]+),([0-9]+)$/);
            if( !match ) break;
            var times= undefined;
            if( match[2] !== "" ) times= parseInt(match[2]);
            atMessage = new AtMessage.CX_CPIN_READ(
                raw,
                match[1],
                times,
                parseInt(match[3]),
                parseInt(match[4]),
                parseInt(match[5]),
                parseInt(match[6])
            );
            break;
        case "^SYSINFO":
            match= rest.match(/:\ ?([0-9]+),([0-9]+),(0|1),([0-9]+),([0-9]+)(?:,(0|1)?(?:,([0-9]+))?)?$/);
            if( !match ) break;
            var cardLock= undefined;
            if( match[6] !== undefined ) cardLock= ( match[6] === "1" );
            var sysSubMode= undefined;
            if( match[7] !== undefined ) sysSubMode= parseInt(match[7]);
            atMessage = new AtMessage.CX_SYSINFO_EXEC(
                raw,
                parseInt(match[1]),
                parseInt(match[2]),
                match[3] === "1",
                parseInt(match[4]),
                parseInt(match[5]),
                cardLock,
                sysSubMode
            );
            break;
        case "+CMGS":
            match= rest.match(/^:\ ?([0-9]+)(?:,.*)?$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CMGS_SET(
                raw,
                parseInt(match[1])
            );
            break;
        case "+CMSS":
            match= rest.match(/^:\ ?([0-9]+)(?:,.*)?$/);
            if( !match ) break;
            atMessage = new AtMessage.P_CMSS_EXEC(
                raw,
                parseInt(match[1])
            );
            break;
        case "+CPBS":
            match= rest.match(/:\ ?"([A-Z]{2})"(?:,([0-9]+)?(?:,([0-9]+))?)?$/);
            if( !match ) break;
            var used= undefined;
            if( match[2] !== undefined ) used= parseInt(match[2]);
            var total= undefined;
            if( match[3] !== undefined ) total= parseInt(match[3]);
            atMessage= new AtMessage.P_CPBS_READ(
                raw,
                match[1],
                used,
                total
            );
            break;
        case "^CVOICE":
            match= rest.match(/^:\ ?([0-9]+)/);
            if( !match ) break;
            atMessage= new AtMessage.CX_CVOICE_READ(
                raw,
                match[1] === "0"
            );
            break;
        case "+CPBR":
            if( match= rest.match(/^:\ ?([0-9]+),"([^"]*)",([0-9]+),"(.*)"$/) ){
                atMessage= new AtMessage.P_CPBR_EXEC(
                    raw,
                    parseInt(match[1]),
                    match[2],
                    parseInt(match[3]),
                    match[4]
                );
                break;
            }
            if( match= rest.match(/:\ ?\(([0-9]+)-([0-9]+)\),([0-9]+),([0-9]+)/) ){
                atMessage= new AtMessage.P_CPBR_TEST(
                    raw,
                    [ parseInt(match[1]), parseInt(match[2]) ],
                    parseInt(match[3]),
                    parseInt(match[4])
                );
                break;
            }
        case "+CPMS":
            if( match= rest.match(/^:\ ?([0-9]+),([0-9]+),([0-9]+),([0-9]+),([0-9]+),([0-9]+)$/) ){
                atMessage= new AtMessage.P_CPMS_SET(
                    raw,
                    parseInt(match[1]),
                    parseInt(match[2]),
                    parseInt(match[3]),
                    parseInt(match[4]),
                    parseInt(match[5]),
                    parseInt(match[6])
                );
                break;
            }
            if( match= rest.match(/^:\ ?"([^"]+)",([0-9]+),([0-9]+),"([^"]+)",([0-9]+),([0-9]+),"([^"]+)",([0-9]+),([0-9]+)$/) ){
                atMessage= new AtMessage.P_CPMS_READ(
                    raw,
                    match[1],
                    parseInt(match[2]),
                    parseInt(match[3]),
                    match[4],
                    parseInt(match[5]),
                    parseInt(match[6]),
                    match[7],
                    parseInt(match[8]),
                    parseInt(match[9])
                );
                break;
            }
        case "+CMGL":
            match= rest.match(/^:\ ?\(([0-9]+)-([0-9]+)\)$/);
            if( !match ) break;
            atMessage= new AtMessage.P_CMGL_TEST(
                raw,
                [parseInt(match[1]), parseInt(match[2])]
            );
            break;
        case "^ICCID":
            match= rest.match(/^:\ ?"([a-zA-Z0-9]{19,20})"$/);
            if( !match ) break;
            atMessage= new AtMessage.CX_ICCID_SET(
                raw,
                match[1]
            );
            break;
        case "+CLAC":
            match= rest.match(/^:(.*)$/);
            if( !match ) break;
            atMessage= new AtMessage.P_CLAC_EXEC(
                raw,
                (function(){
                    "use strict";

                    let arr= match[1].replace(/\ /g, "").split(",");

                    let pop= arr.pop();

                    if( pop ) arr.push(pop);

                    return arr;

                })()
            );
            break;
        case "+CRSM":
            match= rest.match(/^:\ ?([0-9]+),([0-9]+)(?:,"([^"]+)")?$/);
            if( !match ) break;
            atMessage= new AtMessage.P_CRSM_SET(
                raw,
                parseInt(match[1]),
                parseInt(match[2]),
                match[3]
            );
            break;
        case "^SPN":
            match= rest.match(/^:\ ?([0-9]+),([0-9]+),(.*)$/);
            if( !match ) break;
            atMessage= new AtMessage.CX_SPN_SET(
                raw,
                parseInt(match[1]),
                parseInt(match[2]),
                match[3]
            );
            break;
        case "+CMGW":
            match= rest.match(/^: ?([0-9]+)$/);
            if( !match ) break;
            atMessage= new AtMessage.P_CMGW_EXEC(
                raw,
                parseInt(match[1])
            );
            break;
        default: 
            if( AtMessage.isUnso(token) )
                atMessage= new AtMessage(raw, AtMessage.tokenToId(token));
    }
    
    if( !atMessage ) return this.leftToParse+= full;
    
    this.atMessages.push(atMessage);
    
    if( ok ) this.atMessages.push(new AtMessage("\r\nOK\r\n", "OK"));

},function (listRawCMGL) {
    "use strict";

    let AtMessage= this.AtMessage;

    let atMessages= [];
    let regExp= /^\r\n\+CMGL:\ ?([0-9]+),([0-9]+),(?:[0-9]+)?,([0-9]+)\r\n([a-fA-F0-9]+)$/;
    let raw= "";

    for( let rawCMGL of listRawCMGL){

        raw+= rawCMGL;

        let match= rawCMGL.match(regExp);

        atMessages.push(new AtMessage.P_CMGL_SET(rawCMGL,
           parseInt(match[1]),
           parseInt(match[2]),
           parseInt(match[3]),
           match[4]
        ));

    }

    raw+="\r\n";

    this.atMessages.push(new AtMessage.LIST(raw, atMessages));
    this.atMessages.push(new AtMessage("\r\nOK\r\n", "OK"));

},function (listRaw, raw){

    listRaw.push(raw);

    return listRaw;

},function (raw){

    return [ raw ];

},function (_, listRawCNUM){
    "use strict";

    let AtMessage= this.AtMessage;

    let atMessages= [];

    let raw= "\r\n";

    for( let rawCNUM of listRawCNUM ){

        raw+= rawCNUM;

        let split= rawCNUM.split("+CNUM");

        let rawError= split[0];
        let rest= split[1];

        let match= rest.match(/^:\ ?"(.*)","([^"]*)",([0-9]+)/);

        let atMessageCNUM= new AtMessage.P_CNUM_EXEC("+CNUM"+rest,
            match[1],
            match[2],
            parseInt(match[3])
        );

        atMessages.push(atMessageCNUM);

        if( !rawError ) continue;

        let error;
        let token= "ERROR";
        let info;

        if( match= rawError.match(/^(\+CME\ ERROR):\ ?(.+)$/) ){

            token= match[1];

            info= parseInt(match[2]);

            if( isNaN(info) ) info= match[2];

        }

        switch (token) {
            case "+CME ERROR":
                error = new AtMessage.P_CME_ERROR(rawError, info);
                break;
            case "ERROR":
                error= new AtMessage.ERROR(rawError);
                break;
        }

        delete error.isFinal;

        atMessageCNUM.raw= error.raw + atMessageCNUM.raw;

        atMessageCNUM.error= error;

    }

    raw+= "\r\n";

    this.atMessages.push(new AtMessage.LIST(raw, atMessages));

    this.atMessages.push(new AtMessage("\r\nOK\r\n", "OK"));

},function (listRaw, raw){

    listRaw.push(raw);

    return listRaw;

},function (raw){

    return [ raw ];

},function (token){

    this.atMessages.push(new this.AtMessage(
        "\r\n"+token+"\r\n", 
        this.AtMessage.tokenToId(token)
    ));
},function (raw){

    this.atMessages.push(new this.AtMessage.ERROR(raw));

},function (raw){
    "use strict";

    let AtMessage= this.AtMessage;

    let atMessage;

    let match= raw.match(/^\r\n(\+CM[ES]\ ERROR):\ ?(.+)\r\n$/);

    let token= match[1];
    let info= parseInt(match[2]);

    if( isNaN(info) ) info= match[2];

    switch (token) {
        case "+CME ERROR":
            atMessage = new AtMessage.P_CME_ERROR(raw, info);
            break;
        case "+CMS ERROR":
            atMessage = new AtMessage.P_CMS_ERROR(raw, info);
            break;
    }

    this.atMessages.push(atMessage);

},function (raw){

    var match= raw.match(/^\r\nCONNECT\ ?([0-9]+)\r\n$/);

    this.atMessages.push(new this.AtMessage.CONNECT(
        raw, 
        parseInt(match[1])
    ));

}];
this.startstate=0;
this.symbolsTable={"<<EOF>>":0,"Program":1,"Instructions":2,"Instruction":3,"Message":4,"ListCMGL":5,"ListCNUM":6,"Final":7,"UNPARSED":8,"MESSAGE":9,"ListRawCMGL":10,"END_LIST_CMGL":11,"CMGL":12,"START_LIST_CNUM":13,"ListRawCNUM":14,"END_LIST_CNUM":15,"CNUM":16,"FINAL":17,"ERROR":18,"CM_ERROR":19,"CONNECT":20};
this.actionMode='function';
}
Parser.prototype.identity=function (x) {
        "use strict";
        return x;
    };
Parser.prototype.parse=function (lexer, context) {
        this.stack = [];
        this.context =  context || {};

        this.lexer = lexer;
        this.a = this.lexer.nextToken();
        this.stack.push({s: this.startstate, i: 0});
        this.accepted = false;
        this.inerror = false;
        while (!this.accepted && !this.inerror) {
            var top = this.stack[this.stack.length - 1];
            var s = top.s;
            //this.a = this.currentToken;
            if(lexer.isEOF(this.a))
                this.an = 0;
            else
                this.an = this.symbolsTable[this.a.name];
            var action = this.action[s][this.an];
            if (action !== undefined) {
                this[action[0]].apply(this, action[1]);
            } else {
                this.inerror = true;
                this.error(this.a,this);
            }
        }
        return top.i.value;
    };
Parser.prototype.shift=function (state) {
        "use strict";
        this.stack.push({s: state, i: this.a});
        this.a = this.lexer.nextToken();

    };
Parser.prototype.reduce=function (head, length, prodindex) {
        "use strict";
        //var prod = this.productions[prodnumber];
        var self = this;
        var rhs = this.stack.splice(-length, length);
        var t = this.stack[this.stack.length - 1];
        var ns = this.goto[t.s][head];
        var value;
        if (this.actions) {
            var action = this.actions[prodindex] || this.identity;
            var values = rhs.map(function (si) {
                return si.i.value;
            });

            if(self.actionMode==='constructor')
                value =  this.create(action,values);
            else
                value =  action.apply(this.context, values);
        }
        //If we are debugging

        if(this.symbols) {
            var nt = {name: this.symbols[head].name, value:value};
            this.stack.push({s: ns, i: nt});
        }
        else
        {
            this.stack.push({s: ns,i:{value: value}});
        }

    };
Parser.prototype.accept=function () {
        "use strict";
        this.accepted = true;
    };
Parser.prototype.error=function (token){
        if(typeof token === 'string')
        {
            throw Error(token);
        }
        if(this.lexer.isEOF(token)){
            throw Error("Unexpected EOF at "+this.lexer.jjline+':'+this.lexer.jjcol);
        } else
        throw Error('Unexpected token '+token.name+' "'+token.lexeme+'" at ('+token.pos.line+':'+token.pos.col+')');
    };
Parser.prototype.create=function (ctor,args){
        var args = [this.context].concat(args);
        var factory = ctor.bind.apply(ctor,args);
        return new factory();
    };
if (typeof(module) !== 'undefined') { module.exports = Parser; }
return Parser;
})();