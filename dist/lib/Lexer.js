var Lexer = (function (undefined) {
function CDFA_base(){
	this.ss=undefined;
	this.as=undefined;
	this.tt=undefined;
this.stt={};
}
CDFA_base.prototype.reset = function (state) {
	this.cs = state || 	this.ss;
this.bol=false;
};
CDFA_base.prototype.readSymbol = function (c) {
	this.cs = this.nextState(this.cs, c);
};
CDFA_base.prototype.isAccepting = function () {
	var acc = this.as.indexOf(this.cs)>=0;
if((this.stt[this.cs]===-1)&&!this.bol){
acc=false;}
return acc;};
CDFA_base.prototype.isInDeadState = function () {
	return this.cs === undefined || this.cs === 0;
};
CDFA_base.prototype.getCurrentToken = function(){
	var t= this.tt[this.cs];
var s=this.stt[this.cs];
if(s!==undefined){return this.bol?t:s;}
return t;};

function CDFA_DEFAULT(){
	this.ss=1;
	this.as=[6];
	this.tt=[null,null,null,null,null,null,0];
this.stt={};
}
CDFA_DEFAULT.prototype= new CDFA_base();
CDFA_DEFAULT.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if(("N" === c )){
next = 2;
}
break;
case 2:
if(("E" === c )){
next = 3;
}
break;
case 3:
if(("V" === c )){
next = 4;
}
break;
case 4:
if(("E" === c )){
next = 5;
}
break;
case 5:
if(("R" === c )){
next = 6;
}
break;
	}
	return next;
};

function CDFA_UNSO(){
	this.ss=1;
	this.as=[2,3,4,9,14];
	this.tt=[null,null,1,1,1,null,null,null,null,3,null,null,null,null,2];
this.stt={};
}
CDFA_UNSO.prototype= new CDFA_base();
CDFA_UNSO.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 2;
} else if(("\n" === c )){
next = 2;
} else if(("\r" === c )){
next = 4;
}
break;
case 4:
if(("\n" === c )){
next = 5;
}
break;
case 5:
if(("+" === c )){
next = 6;
} else if(("R" === c )){
next = 7;
} else if(("^" === c )){
next = 6;
}
break;
case 6:
if(("A" <= c && c <= "Z") ){
next = 9;
}
break;
case 7:
if(("I" === c )){
next = 10;
}
break;
case 9:
if(("A" <= c && c <= "Z") ){
next = 9;
}
break;
case 10:
if(("N" === c )){
next = 11;
}
break;
case 11:
if(("G" === c )){
next = 12;
}
break;
case 12:
if(("\r" === c )){
next = 13;
}
break;
case 13:
if(("\n" === c )){
next = 14;
}
break;
	}
	return next;
};

function CDFA_UNSO_END_PDU(){
	this.ss=1;
	this.as=[7];
	this.tt=[null,null,null,null,null,null,null,4];
this.stt={};
}
CDFA_UNSO_END_PDU.prototype= new CDFA_base();
CDFA_UNSO_END_PDU.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 1;
} else if(("\r" === c )){
next = 3;
}
break;
case 3:
if(("\n" === c )){
next = 4;
}
break;
case 4:
if(("0" <= c && c <= "9")  || ("A" <= c && c <= "F")  || ("a" <= c && c <= "f") ){
next = 5;
}
break;
case 5:
if(("\r" === c )){
next = 6;
} else if(("0" <= c && c <= "9")  || ("A" <= c && c <= "F")  || ("a" <= c && c <= "f") ){
next = 5;
}
break;
case 6:
if(("\n" === c )){
next = 7;
}
break;
	}
	return next;
};

function CDFA_UNSO_END(){
	this.ss=1;
	this.as=[4];
	this.tt=[null,null,null,null,5];
this.stt={};
}
CDFA_UNSO_END.prototype= new CDFA_base();
CDFA_UNSO_END.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 1;
} else if(("\r" === c )){
next = 3;
}
break;
case 3:
if(("\n" === c )){
next = 4;
}
break;
	}
	return next;
};

function CDFA_RESP(){
	this.ss=1;
	this.as=[2,3,4,21];
	this.tt=[null,null,6,6,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,7];
this.stt={};
}
CDFA_RESP.prototype= new CDFA_base();
CDFA_RESP.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 2;
} else if(("\n" === c )){
next = 2;
} else if(("\r" === c )){
next = 4;
}
break;
case 4:
if(("\n" === c )){
next = 5;
}
break;
case 5:
if(("+" === c )){
next = 6;
} else if(("^" === c )){
next = 6;
}
break;
case 6:
if(("A" <= c && c <= "Z") ){
next = 8;
}
break;
case 8:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "A" || "Z" < c) ){
next = 8;
} else if(("\r" === c )){
next = 10;
} else if(("A" <= c && c <= "Z") ){
next = 8;
}
break;
case 10:
if(("\n" === c )){
next = 12;
}
break;
case 12:
if(("\r" === c )){
next = 13;
} else if(("0" <= c && c <= "9")  || ("A" <= c && c <= "F")  || ("a" <= c && c <= "f") ){
next = 14;
}
break;
case 13:
if(("\n" === c )){
next = 15;
}
break;
case 14:
if(("\r" === c )){
next = 16;
} else if(("0" <= c && c <= "9")  || ("A" <= c && c <= "F")  || ("a" <= c && c <= "f") ){
next = 14;
}
break;
case 15:
if(("O" === c )){
next = 17;
}
break;
case 16:
if(("\n" === c )){
next = 18;
}
break;
case 17:
if(("K" === c )){
next = 19;
}
break;
case 18:
if(("\r" === c )){
next = 13;
}
break;
case 19:
if(("\r" === c )){
next = 20;
}
break;
case 20:
if(("\n" === c )){
next = 21;
}
break;
	}
	return next;
};

function CDFA_LIST_CMGL(){
	this.ss=1;
	this.as=[2,3,4,10];
	this.tt=[null,null,8,8,8,null,null,null,null,null,9];
this.stt={};
}
CDFA_LIST_CMGL.prototype= new CDFA_base();
CDFA_LIST_CMGL.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 2;
} else if(("\n" === c )){
next = 2;
} else if(("\r" === c )){
next = 4;
}
break;
case 4:
if(("\n" === c )){
next = 5;
}
break;
case 5:
if(("+" === c )){
next = 6;
}
break;
case 6:
if(("C" === c )){
next = 7;
}
break;
case 7:
if(("M" === c )){
next = 8;
}
break;
case 8:
if(("G" === c )){
next = 9;
}
break;
case 9:
if(("L" === c )){
next = 10;
}
break;
	}
	return next;
};

function CDFA_LIST_CMGL_EXPECT(){
	this.ss=1;
	this.as=[14,21];
	this.tt=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,11,null,null,null,null,null,null,10];
this.stt={};
}
CDFA_LIST_CMGL_EXPECT.prototype= new CDFA_base();
CDFA_LIST_CMGL_EXPECT.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if(("\r" === c )){
next = 2;
}
break;
case 2:
if(("\n" === c )){
next = 3;
}
break;
case 3:
if(("\r" === c )){
next = 4;
} else if(("+" === c )){
next = 5;
}
break;
case 4:
if(("\n" === c )){
next = 6;
}
break;
case 5:
if(("C" === c )){
next = 7;
}
break;
case 6:
if(("O" === c )){
next = 8;
}
break;
case 7:
if(("M" === c )){
next = 9;
}
break;
case 8:
if(("K" === c )){
next = 10;
}
break;
case 9:
if(("G" === c )){
next = 11;
}
break;
case 10:
if(("\r" === c )){
next = 12;
}
break;
case 11:
if(("L" === c )){
next = 13;
}
break;
case 12:
if(("\n" === c )){
next = 14;
}
break;
case 13:
if((":" === c )){
next = 15;
}
break;
case 15:
if((c < "\t" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < " " || " " < c)  && (c < " " || " " < c) ){
next = 16;
} else if(("\t" === c ) || (" " === c ) || (" " === c )){
next = 16;
} else if(("\n" === c ) || ("\r" === c )){
next = 18;
}
break;
case 16:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 16;
} else if(("\r" === c )){
next = 19;
}
break;
case 18:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 16;
}
break;
case 19:
if(("\n" === c )){
next = 20;
}
break;
case 20:
if(("0" <= c && c <= "9")  || ("A" <= c && c <= "F")  || ("a" <= c && c <= "f") ){
next = 21;
}
break;
case 21:
if(("0" <= c && c <= "9")  || ("A" <= c && c <= "F")  || ("a" <= c && c <= "f") ){
next = 21;
}
break;
	}
	return next;
};

function CDFA_LIST_CNUM(){
	this.ss=1;
	this.as=[2,3,4,17,28,37];
	this.tt=[null,null,12,12,12,null,null,null,null,null,null,null,null,null,null,null,null,17,null,null,null,null,null,null,null,null,null,null,16,null,null,null,null,null,null,null,null,13];
this.stt={};
}
CDFA_LIST_CNUM.prototype= new CDFA_base();
CDFA_LIST_CNUM.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 2;
} else if(("\n" === c )){
next = 2;
} else if(("\r" === c )){
next = 4;
}
break;
case 4:
if(("\n" === c )){
next = 5;
}
break;
case 5:
if(("+" === c )){
next = 6;
} else if(("E" === c )){
next = 7;
}
break;
case 6:
if(("C" === c )){
next = 8;
}
break;
case 7:
if(("R" === c )){
next = 9;
}
break;
case 8:
if(("M" === c )){
next = 10;
} else if(("N" === c )){
next = 11;
}
break;
case 9:
if(("R" === c )){
next = 12;
}
break;
case 10:
if(("E" === c )){
next = 13;
}
break;
case 11:
if(("U" === c )){
next = 14;
}
break;
case 12:
if(("O" === c )){
next = 15;
}
break;
case 13:
if(("\t" <= c && c <= "\n")  || ("\r" === c ) || (" " === c ) || (" " === c )){
next = 16;
}
break;
case 14:
if(("M" === c )){
next = 17;
}
break;
case 15:
if(("R" === c )){
next = 18;
}
break;
case 16:
if(("E" === c )){
next = 19;
}
break;
case 18:
if(("+" === c )){
next = 20;
}
break;
case 19:
if(("R" === c )){
next = 21;
}
break;
case 20:
if(("C" === c )){
next = 22;
}
break;
case 21:
if(("R" === c )){
next = 23;
}
break;
case 22:
if(("N" === c )){
next = 24;
}
break;
case 23:
if(("O" === c )){
next = 25;
}
break;
case 24:
if(("U" === c )){
next = 26;
}
break;
case 25:
if(("R" === c )){
next = 27;
}
break;
case 26:
if(("M" === c )){
next = 28;
}
break;
case 27:
if((":" === c )){
next = 29;
}
break;
case 29:
if((c < "\t" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < " " || " " < c)  && (c < " " || " " < c) ){
next = 30;
} else if(("\t" === c ) || (" " === c ) || (" " === c )){
next = 30;
} else if(("\n" === c ) || ("\r" === c )){
next = 32;
}
break;
case 30:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c) ){
next = 30;
} else if(("+" === c )){
next = 33;
}
break;
case 32:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 30;
}
break;
case 33:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c)  && (c < "C" || "C" < c) ){
next = 30;
} else if(("+" === c )){
next = 33;
} else if(("C" === c )){
next = 34;
}
break;
case 34:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c)  && (c < "N" || "N" < c) ){
next = 30;
} else if(("+" === c )){
next = 33;
} else if(("N" === c )){
next = 35;
}
break;
case 35:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c)  && (c < "U" || "U" < c) ){
next = 30;
} else if(("+" === c )){
next = 33;
} else if(("U" === c )){
next = 36;
}
break;
case 36:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c)  && (c < "M" || "M" < c) ){
next = 30;
} else if(("+" === c )){
next = 33;
} else if(("M" === c )){
next = 37;
}
break;
case 37:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c) ){
next = 30;
} else if(("+" === c )){
next = 33;
}
break;
	}
	return next;
};

function CDFA__LA_13(){
	this.ss=1;
	this.as=[2,3,4,5,23];
	this.tt=[null,null,15,15,15,15,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,14];
this.stt={};
}
CDFA__LA_13.prototype= new CDFA_base();
CDFA__LA_13.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c) ){
next = 2;
} else if(("\n" === c )){
next = 2;
} else if(("\r" === c )){
next = 2;
} else if(("+" === c )){
next = 5;
}
break;
case 5:
if(("C" === c )){
next = 6;
}
break;
case 6:
if(("M" === c )){
next = 7;
}
break;
case 7:
if(("E" === c )){
next = 8;
}
break;
case 8:
if(("\t" <= c && c <= "\n")  || ("\r" === c ) || (" " === c ) || (" " === c )){
next = 9;
}
break;
case 9:
if(("E" === c )){
next = 10;
}
break;
case 10:
if(("R" === c )){
next = 11;
}
break;
case 11:
if(("R" === c )){
next = 12;
}
break;
case 12:
if(("O" === c )){
next = 13;
}
break;
case 13:
if(("R" === c )){
next = 14;
}
break;
case 14:
if((":" === c )){
next = 15;
}
break;
case 15:
if((c < "\t" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < " " || " " < c)  && (c < " " || " " < c) ){
next = 16;
} else if(("\t" === c ) || (" " === c ) || (" " === c )){
next = 16;
} else if(("\n" === c ) || ("\r" === c )){
next = 18;
}
break;
case 16:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c) ){
next = 16;
} else if(("+" === c )){
next = 19;
}
break;
case 18:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 16;
}
break;
case 19:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c)  && (c < "C" || "C" < c) ){
next = 16;
} else if(("+" === c )){
next = 19;
} else if(("C" === c )){
next = 20;
}
break;
case 20:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c)  && (c < "N" || "N" < c) ){
next = 16;
} else if(("+" === c )){
next = 19;
} else if(("N" === c )){
next = 21;
}
break;
case 21:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c)  && (c < "U" || "U" < c) ){
next = 16;
} else if(("+" === c )){
next = 19;
} else if(("U" === c )){
next = 22;
}
break;
case 22:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c)  && (c < "M" || "M" < c) ){
next = 16;
} else if(("+" === c )){
next = 19;
} else if(("M" === c )){
next = 23;
}
break;
case 23:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c)  && (c < "+" || "+" < c) ){
next = 16;
} else if(("+" === c )){
next = 19;
}
break;
	}
	return next;
};

function CDFA_LIST_CNUM_EXPECT(){
	this.ss=1;
	this.as=[6,12];
	this.tt=[null,null,null,null,null,null,18,null,null,null,null,null,19];
this.stt={};
}
CDFA_LIST_CNUM_EXPECT.prototype= new CDFA_base();
CDFA_LIST_CNUM_EXPECT.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 2;
} else if(("\r" === c )){
next = 3;
}
break;
case 2:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 2;
} else if(("\r" === c )){
next = 4;
}
break;
case 3:
if(("\n" === c )){
next = 5;
}
break;
case 4:
if(("\n" === c )){
next = 6;
}
break;
case 5:
if(("\r" === c )){
next = 7;
}
break;
case 7:
if(("\n" === c )){
next = 8;
}
break;
case 8:
if(("O" === c )){
next = 9;
}
break;
case 9:
if(("K" === c )){
next = 10;
}
break;
case 10:
if(("\r" === c )){
next = 11;
}
break;
case 11:
if(("\n" === c )){
next = 12;
}
break;
	}
	return next;
};

function CDFA_FINAL(){
	this.ss=1;
	this.as=[2,3,4,8];
	this.tt=[null,null,20,20,20,null,null,null,21];
this.stt={};
}
CDFA_FINAL.prototype= new CDFA_base();
CDFA_FINAL.prototype.nextState = function(state, c){
    var next = 0;
    switch(state){
case 1:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 2;
} else if(("\n" === c )){
next = 2;
} else if(("\r" === c )){
next = 4;
}
break;
case 4:
if(("\n" === c )){
next = 5;
}
break;
case 5:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 6;
}
break;
case 6:
if((c < "\n" || "\n" < c)  && (c < "\r" || "\r" < c) ){
next = 6;
} else if(("\r" === c )){
next = 7;
}
break;
case 7:
if(("\n" === c )){
next = 8;
}
break;
	}
	return next;
};

var EOF={};
function Lexer(){

if(!(this instanceof Lexer)) return new Lexer();

this.pos={line:0,col:0};

this.states={};
this.state = ['DEFAULT'];
this.lastChar = '\n';
this.actions = [,function anonymous() {


        this.jjval= this.jjtext;

        return "UNPARSED";

},function anonymous() {


        this.jjval= ["\r\nRING\r\n", "\r\nRING\r\n", "RING", "", "", ""];

        return "MESSAGE";


},function anonymous() {


        //console.log("MESSAGE UNSO", JSON.stringify(this.jjtext));

        var match= this.jjtext.match(/^\r\n([\+\^][A-Z]+)$/);
        
        var token= match[1];

        if( !this.AtMessage.isUnso(token) ){
                this.jjval= this.jjtext;
                return "UNPARSED";
        }

        this.jjtextPrev= this.jjtext;

        if( this.AtMessage.hasPdu(token) ){

                this.pushState("UNSO_END_PDU");

        }else{

                this.pushState("UNSO_END");

        }



},function anonymous() {


        this.popState();

        var regExp= /^(\r\n([\+\^][A-Z]+)(.*)\r\n([a-fA-F0-9]+)\r\n)$/;

        this.jjval= (this.jjtextPrev + this.jjtext).match(regExp);

        /*
        console.log("MESSAGE END", 
        JSON.stringify(this.jjtextPrev+ "\r\n"), 
        JSON.stringify(this.jjval)
        );
        */

        return "MESSAGE";


},function anonymous() {


        this.popState();

        var regExp= /^(\r\n([\+\^][A-Z]+)(.*)\r\n)$/;

        this.jjval= (this.jjtextPrev + this.jjtext).match(regExp);

        /*
        console.log("MESSAGE END", 
        JSON.stringify(this.jjtextPrev+ "\r\n"), 
        JSON.stringify(this.jjval)
        );
        */

        return "MESSAGE";


},function anonymous() {


        //console.log("UNPARSED FUCK", JSON.stringify(this.jjtext));


        this.jjval= this.jjtext;
        
        return "UNPARSED";

},function anonymous() {


        //console.log("MESSAGE", JSON.stringify(this.jjtext));
        var regExp= /^(\r\n([\+\^][A-Z]+)(.*)(?:\r\n([a-fA-F0-9]+))?\r\n)(\r\nOK\r\n)?$/;

        this.jjval= this.jjtext.match(regExp);

        return "MESSAGE";


},function anonymous() {


        this.jjval= this.jjtext;
        
        return "UNPARSED";

},function anonymous() {
this.evictTail(7);
return (function anonymous() {


        this.pushState("LIST_CMGL_EXPECT");


}).apply(this);
},function anonymous() {


        this.jjval= this.jjtext;

        return "CMGL";


},function anonymous() {


        this.popState();

        this.jjval= this.jjtext;

        return "END_LIST_CMGL";


},function anonymous() {


        this.jjval= this.jjtext;
        
        return "UNPARSED";

},function anonymous() {
this.pushState('_LA_13');
this.lawhole=this.jjtext;
},function anonymous() {
this.restoreLookAhead();
return (function anonymous() {


        this.pushState("LIST_CNUM_EXPECT");

        return "START_LIST_CNUM";


}).apply(this);
},function anonymous() {
this.less(2);

},function anonymous() {
this.evictTail(10);
return (function anonymous() {


        this.pushState("LIST_CNUM_EXPECT");

        return "START_LIST_CNUM";


}).apply(this);
},function anonymous() {
this.evictTail(5);
return (function anonymous() {


        this.pushState("LIST_CNUM_EXPECT");

        return "START_LIST_CNUM";


}).apply(this);
},function anonymous() {


        this.jjval= this.jjtext;

        return "CNUM";


},function anonymous() {


        this.popState();

        return "END_LIST_CNUM";

},function anonymous() {


        this.jjval= this.jjtext;
        
        return "UNPARSED";

},function anonymous() {


        if( this.jjtext.match(/^\r\n\+CM[ES]\ ERROR/) ){

                this.jjval= this.jjtext;

                return "CM_ERROR";

        }

        if( this.jjtext === "\r\nERROR\r\n" ){

                this.jjval= this.jjtext;

                return "ERROR";

        }
        
        var token= this.jjtext.substring(2, this.jjtext.length-2);

        if( !this.AtMessage.isFinal(token) || token === "OK" ){

                this.jjval= this.jjtext;
                return "UNPARSED";
        }

        this.jjval= token;

        return "FINAL";


}];
this.states["DEFAULT"] = {};
this.states["DEFAULT"].dfa = new CDFA_DEFAULT();
this.states["UNSO"] = {};
this.states["UNSO"].dfa = new CDFA_UNSO();
this.states["UNSO_END_PDU"] = {};
this.states["UNSO_END_PDU"].dfa = new CDFA_UNSO_END_PDU();
this.states["UNSO_END"] = {};
this.states["UNSO_END"].dfa = new CDFA_UNSO_END();
this.states["RESP"] = {};
this.states["RESP"].dfa = new CDFA_RESP();
this.states["LIST_CMGL"] = {};
this.states["LIST_CMGL"].dfa = new CDFA_LIST_CMGL();
this.states["LIST_CMGL_EXPECT"] = {};
this.states["LIST_CMGL_EXPECT"].dfa = new CDFA_LIST_CMGL_EXPECT();
this.states["LIST_CNUM"] = {};
this.states["LIST_CNUM"].dfa = new CDFA_LIST_CNUM();
this.states["_LA_13"] = {};
this.states["_LA_13"].dfa = new CDFA__LA_13();
this.states["LIST_CNUM_EXPECT"] = {};
this.states["LIST_CNUM_EXPECT"].dfa = new CDFA_LIST_CNUM_EXPECT();
this.states["FINAL"] = {};
this.states["FINAL"].dfa = new CDFA_FINAL();
}
Lexer.prototype.setInput=function (input){
        this.pos={row:0, col:0};
        if(typeof input === 'string')
        {input = new StringReader(input);}
        this.input = input;
        this.state = ['DEFAULT'];
        this.lastChar='\n';
        this.getDFA().reset();
        return this;
    };
Lexer.prototype.nextToken=function () {


        var ret = undefined;
        while(ret === undefined){
            this.resetToken();
            ret = this.more();
        }


        if (ret === EOF) {
            this.current = EOF;
        } else {
            this.current = {};
            this.current.name = ret;
            this.current.value = this.jjval;
            this.current.lexeme = this.jjtext;
            this.current.position = this.jjpos;
            this.current.pos = {col: this.jjcol, line: this.jjline};
        }
        return this.current;
    };
Lexer.prototype.resetToken=function (){
        this.getDFA().reset();
        this.getDFA().bol = (this.lastChar === '\n');
        this.lastValid = undefined;
        this.lastValidPos = -1;
        this.jjtext = '';
        this.remains = '';
        this.buffer = '';
        this.startpos = this.input.getPos();
        this.jjline = this.input.line;
        this.jjcol = this.input.col;
    };
Lexer.prototype.halt=function () {
        if (this.lastValidPos >= 0) {
            var lastValidLength = this.lastValidPos-this.startpos+1;
            this.jjtext = this.buffer.substring(0, lastValidLength);
            this.remains = this.buffer.substring(lastValidLength);
            this.jjval = this.jjtext;
            this.jjpos = this.lastValidPos + 1-this.jjtext.length;
            this.input.rollback(this.remains);
            var action = this.getAction(this.lastValid);
            if (typeof ( action) === 'function') {
                return action.call(this);
            }
            this.resetToken();
        }
        else if(!this.input.more()){//EOF
            var actionid = this.states[this.getState()].eofaction;
            if(actionid){
                action = this.getAction(actionid);
                if (typeof ( action) === 'function') {
                    //Note we don't care of returned token, must return 'EOF'
                    action.call(this);
                }
            }
            return EOF;
        } else {//Unexpected character
            throw new Error('Unexpected char \''+this.input.peek()+'\' at '+this.jjline +':'+this.jjcol);
        }
    };
Lexer.prototype.more=function (){
        var ret;
        while (this.input.more()) {
            var c = this.input.peek();
            this.getDFA().readSymbol(c);
            if (this.getDFA().isInDeadState()) {

                ret = this.halt();
                return ret;

            } else {
                if (this.getDFA().isAccepting()) {
                    this.lastValid = this.getDFA().getCurrentToken();
                    this.lastValidPos = this.input.getPos();

                }
                this.buffer = this.buffer + c;
                this.lastChar = c;
                this.input.next();
            }

        }
        ret = this.halt();
        return ret;
    };
Lexer.prototype.less=function (length){
        this.input.rollback(length);
    };
Lexer.prototype.getDFA=function (){
        return this.states[this.getState()].dfa;
    };
Lexer.prototype.getAction=function (i){
        return this.actions[i];
    };
Lexer.prototype.pushState=function (state){
        this.state.push(state);
        this.getDFA().reset();
    };
Lexer.prototype.popState=function (){
        if(this.state.length>1) {
            this.state.pop();
            this.getDFA().reset();
        }
    };
Lexer.prototype.getState=function (){
        return this.state[this.state.length-1];
    };
Lexer.prototype.restoreLookAhead=function (){
        this.tailLength = this.jjtext.length;
        this.popState();
        this.less(this.tailLength);
        this.jjtext = this.lawhole.substring(0,this.lawhole.length-this.tailLength);


    };
Lexer.prototype.evictTail=function (length){
        this.less(length);
        this.jjtext = this.jjtext.substring(0,this.jjtext.length-length);
    };
Lexer.prototype.isEOF=function (o){
        return o===EOF;
    }
;
function StringReader(str){
        if(!(this instanceof StringReader)) return new StringReader(str);
		this.str = str;
		this.pos = 0;
        this.line = 0;
        this.col = 0;
	}
StringReader.prototype.getPos=function (){
        return this.pos;
    };
StringReader.prototype.peek=function ()
	{
		//TODO: handle EOF
		return this.str.charAt(this.pos);
	};
StringReader.prototype.eat=function (str)
	{
		var istr = this.str.substring(this.pos,this.pos+str.length);
		if(istr===str){
			this.pos+=str.length;
            this.updatePos(str,1);
		} else {
			throw new Error('Expected "'+str+'", got "'+istr+'"!');
		}
	};
StringReader.prototype.updatePos=function (str,delta){
        for(var i=0;i<str.length;i++){
            if(str[i]=='\n'){
                this.col=0;
                this.line+=delta;
            }else{
                this.col+=delta;
            }
        }
    };
StringReader.prototype.rollback=function (str)
    {
        if(typeof str === 'string')
        {
            var istr = this.str.substring(this.pos-str.length,this.pos);
            if(istr===str){
                this.pos-=str.length;
                this.updatePos(str,-1);
            } else {
                throw new Error('Expected "'+str+'", got "'+istr+'"!');
            }
        } else {
            this.pos-=str;
            this.updatePos(str,-1);
        }

    };
StringReader.prototype.next=function ()
	{
		var s = this.str.charAt(this.pos);
		this.pos=this.pos+1;
		this.updatePos(s,1);
		return s;
	};
StringReader.prototype.more=function ()
	{
		return this.pos<this.str.length;
	};
StringReader.prototype.reset=function (){
        this.pos=0;
    };
if (typeof(module) !== 'undefined') { module.exports = Lexer; }
return Lexer;})();