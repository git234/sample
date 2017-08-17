/*

Copyright (C) 2015 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("groovy",function(f){function h(a){var b={};a=a.split(" ");for(var c=0;c<a.length;++c)b[a[c]]=!0;return b}function l(a,b){var c=a.next();if('"'==c||"'"==c)return n(c,a,b);if(/[\[\]{}\(\),;\:\.]/.test(c))return e=c,null;if(/\d/.test(c))return a.eatWhile(/[\w\.]/),a.eat(/eE/)&&(a.eat(/\+\-/),
a.eatWhile(/\d/)),"number";if("/"==c){if(a.eat("*"))return b.tokenize.push(p),p(a,b);if(a.eat("/"))return a.skipToEnd(),"comment";if(m(b.lastToken,!1))return n(c,a,b)}if("-"==c&&a.eat(">"))return e="->",null;if(/[+\-*&%=<>!?|\/~]/.test(c))return a.eatWhile(/[+\-*&%=<>|~]/),"operator";a.eatWhile(/[\w\$_]/);if("@"==c)return a.eatWhile(/[\w\$_\.]/),"meta";if("."==b.lastToken)return"property";if(a.eat(":"))return e="proplabel","property";c=a.current();return r.propertyIsEnumerable(c)?"atom":s.propertyIsEnumerable(c)?
(t.propertyIsEnumerable(c)?e="newstatement":u.propertyIsEnumerable(c)&&(e="standalone"),"keyword"):"variable"}function n(a,b,c){function d(c,b){for(var d=!1,f,g=!e;null!=(f=c.next());){if(f==a&&!d){if(!e)break;if(c.match(a+a)){g=!0;break}}if('"'==a&&"$"==f&&!d&&c.eat("{"))return b.tokenize.push(v()),"string";d=!d&&"\\"==f}g&&b.tokenize.pop();return"string"}var e=!1;if("/"!=a&&b.eat(a))if(b.eat(a))e=!0;else return"string";c.tokenize.push(d);return d(b,c)}function v(){function a(a,d){if("}"==a.peek()){if(b--,
0==b)return d.tokenize.pop(),d.tokenize[d.tokenize.length-1](a,d)}else"{"==a.peek()&&b++;return l(a,d)}var b=1;a.isBase=!0;return a}function p(a,b){for(var c=!1,d;d=a.next();){if("/"==d&&c){b.tokenize.pop();break}c="*"==d}return"comment"}function m(a,b){return!a||"operator"==a||"->"==a||/[\.\[\{\(,;:]/.test(a)||"newstatement"==a||"keyword"==a||"proplabel"==a||"standalone"==a&&!b}function q(a,b,c,d,e){this.indented=a;this.column=b;this.type=c;this.align=d;this.prev=e}function k(a,b,c){return a.context=
new q(a.indented,b,c,null,a.context)}function g(a){var b=a.context.type;if(")"==b||"]"==b||"}"==b)a.indented=a.context.indented;return a.context=a.context.prev}var s=h("abstract as assert boolean break byte case catch char class const continue def default do double else enum extends final finally float for goto if implements import in instanceof int interface long native new package private protected public return short static strictfp super switch synchronized threadsafe throw throws transient try void volatile while"),
t=h("catch class do else finally for if switch try while enum interface def"),u=h("return break continue"),r=h("null true false this"),e;l.isBase=!0;return{startState:function(a){return{tokenize:[l],context:new q((a||0)-f.indentUnit,0,"top",!1),indented:0,startOfLine:!0,lastToken:null}},token:function(a,b){var c=b.context;a.sol()&&(null==c.align&&(c.align=!1),b.indented=a.indentation(),b.startOfLine=!0,"statement"!=c.type||m(b.lastToken,!0)||(g(b),c=b.context));if(a.eatSpace())return null;e=null;
var d=b.tokenize[b.tokenize.length-1](a,b);if("comment"==d)return d;null==c.align&&(c.align=!0);if(";"!=e&&":"!=e||"statement"!=c.type)if("->"==e&&"statement"==c.type&&"}"==c.prev.type)g(b),b.context.align=!1;else if("{"==e)k(b,a.column(),"}");else if("["==e)k(b,a.column(),"]");else if("("==e)k(b,a.column(),")");else if("}"==e){for(;"statement"==c.type;)c=g(b);for("}"==c.type&&(c=g(b));"statement"==c.type;)c=g(b)}else e==c.type?g(b):("}"==c.type||"top"==c.type||"statement"==c.type&&"newstatement"==
e)&&k(b,a.column(),"statement");else g(b);b.startOfLine=!1;b.lastToken=e||d;return d},indent:function(a,b){if(!a.tokenize[a.tokenize.length-1].isBase)return 0;var c=b&&b.charAt(0),d=a.context;"statement"!=d.type||m(a.lastToken,!0)||(d=d.prev);var e=c==d.type;return"statement"==d.type?d.indented+("{"==c?0:f.indentUnit):d.align?d.column+(e?0:1):d.indented+(e?0:f.indentUnit)},electricChars:"{}",closeBrackets:{triples:"'\""},fold:"brace"}});f.defineMIME("text/x-groovy","groovy")});
