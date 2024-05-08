const fs = require("fs");
const path = require("path");
const base65536 = require("base65536");
const LZMA = require("lzma");

const wasm = fs.readFileSync(path.join(__dirname, "../pkg/hackmud_rust_script_bg.wasm"));
const encoded = base65536.encode(LZMA.compress(wasm, 7));


const bgJs = fs.readFileSync(path.join(__dirname, "../pkg/hackmud_rust_script_bg.js"), "utf8");

const script = `\
function(c,a) {
//${encoded}
let pairStrings=["㐀䴀一鼀ꄀꐀꔀꘀ𐘀𐜀𒀀𒌀𓀀𓐀𔐀𔘀𖠀𖨀𠀀𨘀","ᔀᘀ"],lookupE={},lookupD={},n=0
pairStrings.forEach((o,r)=>{const t=16-8*r
lookupE[t]={}
o.match(/../gu).forEach(o=>{const[r,e]=[...o].map(o=>o.codePointAt(0))
for(let o=r;o<e;o++){const r=String.fromCodePoint(o),e=16===t?n%256*256+(n>>8):n
lookupE[t][e]=r,lookupD[r]=[t,e],n++}})})
const d=o=>{const r=o.length,t=new Uint8Array(Math.floor(16*r/8))
let n=0,e=0,c=0,a=!1
for(const r of o){if(a)throw 1
if(!(r in lookupD))throw 2
const[o,i]=lookupD[r]
for(let r=o-1;r>=0;r--){e=(e<<1)+(i>>r&1),8===++c&&(t[n]=e,n++,e=0,c=0)}16!==o&&(a=!0)}if(e!==(1<<c)-1)throw 3
return new Uint8Array(t.buffer,0,n)}

var LZMA=function(){function e(e){var r=[]
return r[e-1]=void 0,r}function r(e,r){return n(e[0]+r[0],e[1]+r[1])}function o(e,r){var o,t
return e[0]==r[0]&&e[1]==r[1]?0:(t=0>r[1],(o=0>e[1])&&!t?-1:!o&&t?1:0>function(e,r){return n(e[0]-r[0],e[1]-r[1])}(e,r)[1]?-1:1)}function n(e,r){var o,n
for(r=(r%=0x10000000000000000)-(o=r%h)+(n=Math.floor((e%=0x10000000000000000)/h)*h),e=e-n+o;0>e;)e+=h,r-=h
for(;e>4294967295;)e-=h,r+=h
for(r%=0x10000000000000000;r>0x7fffffff00000000;)r-=0x10000000000000000
for(;-0x8000000000000000>r;)r+=0x10000000000000000
return[e,r]}function t(e){return 0>e?[e+h,-h]:[e,0]}function s(e){return 2147483648>e[0]?~~Math.max(Math.min(e[0],2147483647),-2147483648):~~Math.max(Math.min(e[0]-h,2147483647),-2147483648)}function u(e){return e.count>e.pos?255&e.buf[e.pos++]:-1}function i(r,o,n){var s,i,m,d,c="",a=[]
for(i=0;5>i;++i){if(-1==(m=u(o)))throw Error("truncated input")
a[i]=m<<24>>24}if(!function(r,o){var n,t,s,u,i,m,d
if(5>o.length)return 0
for(s=(d=255&o[0])%9,u=(m=~~(d/9))%5,i=~~(m/5),n=0,t=0;4>t;++t)n+=(255&o[1+t])<<8*t
if(n>99999999||!function(r,o,n,t){if(o>8||n>4||t>4)return 0
!function(r,o,n){var t,s
if(null!=r.m_Coders&&r.m_NumPrevBits==n&&r.m_NumPosBits==o)return
for(r.m_NumPosBits=o,r.m_PosMask=(1<<o)-1,r.m_NumPrevBits=n,r.m_Coders=e(s=1<<r.m_NumPrevBits+r.m_NumPosBits),t=0;s>t;++t)r.m_Coders[t]=l({})}(r.m_LiteralDecoder,n,o)
var s=1<<t
return f(r.m_LenDecoder,s),f(r.m_RepLenDecoder,s),r.m_PosStateMask=s-1,1}(r,s,u,i))return 0
return function(r,o){if(0>o)return 0
r.m_DictionarySize!=o&&(r.m_DictionarySize=o,r.m_DictionarySizeCheck=Math.max(r.m_DictionarySize,1),function(r,o){null!=r._buffer&&r._windowSize==o||(r._buffer=e(o))
r._windowSize=o,r._pos=0,r._streamPos=0}(r.m_OutWindow,Math.max(r.m_DictionarySizeCheck,4096)))
return 1}(r,n)}(s=function(r){r.m_OutWindow={},r.m_RangeDecoder={},r.m_IsMatchDecoders=e(192),r.m_IsRepDecoders=e(12),r.m_IsRepG0Decoders=e(12),r.m_IsRepG1Decoders=e(12),r.m_IsRepG2Decoders=e(12),r.m_IsRep0LongDecoders=e(192),r.m_PosSlotDecoder=e(4),r.m_PosDecoders=e(114),r.m_PosAlignDecoder=w({},4),r.m_LenDecoder=D({}),r.m_RepLenDecoder=D({}),r.m_LiteralDecoder={}
for(var o=0;4>o;++o)r.m_PosSlotDecoder[o]=w({},6)
return r}({}),a))throw Error("corrupted input")
for(i=0;64>i;i+=8){if(-1==(m=u(o)))throw Error("truncated input")
1==(m=m.toString(16)).length&&(m="0"+m),c=m+""+c}r.length_0=/^0+$|^f+$/i.test(c)?C:(d=parseInt(c,16))>4294967295?C:t(d),r.chunker=function(e,r,o,n){return e.m_RangeDecoder.Stream=r,_(e.m_OutWindow),e.m_OutWindow._stream=o,function(e){e.m_OutWindow._streamPos=0,e.m_OutWindow._pos=0,P(e.m_IsMatchDecoders),P(e.m_IsRep0LongDecoders),P(e.m_IsRepDecoders),P(e.m_IsRepG0Decoders),P(e.m_IsRepG1Decoders),P(e.m_IsRepG2Decoders),P(e.m_PosDecoders),function(e){var r,o
for(o=1<<e.m_NumPrevBits+e.m_NumPosBits,r=0;o>r;++r)P(e.m_Coders[r].m_Decoders)}(e.m_LiteralDecoder)
for(var r=0;4>r;++r)P(e.m_PosSlotDecoder[r].Models)
v(e.m_LenDecoder),v(e.m_RepLenDecoder),P(e.m_PosAlignDecoder.Models),function(e){e.Code=0,e.Range=-1
for(var r=0;5>r;++r)e.Code=e.Code<<8|u(e.Stream)}(e.m_RangeDecoder)}(e),e.state=0,e.rep0=0,e.rep1=0,e.rep2=0,e.rep3=0,e.outSize=n,e.nowPos64=S,e.prevByte=0,function(e,r){return e.decoder=r,e.encoder=null,e.alive=1,e}({},e)}(s,o,n,r.length_0)}function m(r,o){return r.output=function(r){return r.buf=e(32),r.count=0,r}({}),i(r,function(e,r){return e.buf=r,e.pos=0,e.count=r.length,e}({},o),r.output),r}function d(e){var r=e._pos-e._streamPos
r&&(!function(e,r,o,n){!function(e,r,o,n,t){for(var s=0;t>s;++s)o[n+s]=e[r+s]}(r,o,e.buf,e.count,n),e.count+=n}(e._stream,e._buffer,e._streamPos,r),e._windowSize>e._pos||(e._pos=0),e._streamPos=e._pos)}function c(e,r){var o=e._pos-r-1
return 0>o&&(o+=e._windowSize),e._buffer[o]}function _(e){d(e),e._stream=null}function a(e){if(!e.alive)throw Error("bad state")
if(e.encoder)throw Error("No encoding")
return function(e){var n=function(e){var n,i,m,_,a,f
if(f=s(e.nowPos64)&e.m_PosStateMask,g(e.m_RangeDecoder,e.m_IsMatchDecoders,(e.state<<4)+f)){if(g(e.m_RangeDecoder,e.m_IsRepDecoders,e.state))m=0,g(e.m_RangeDecoder,e.m_IsRepG0Decoders,e.state)?(g(e.m_RangeDecoder,e.m_IsRepG1Decoders,e.state)?(g(e.m_RangeDecoder,e.m_IsRepG2Decoders,e.state)?(i=e.rep3,e.rep3=e.rep2):i=e.rep2,e.rep2=e.rep1):i=e.rep1,e.rep1=e.rep0,e.rep0=i):g(e.m_RangeDecoder,e.m_IsRep0LongDecoders,(e.state<<4)+f)||(e.state=7>e.state?9:11,m=1),m||(m=p(e.m_RepLenDecoder,e.m_RangeDecoder,f)+2,e.state=7>e.state?8:11)
else if(e.rep3=e.rep2,e.rep2=e.rep1,e.rep1=e.rep0,m=2+p(e.m_LenDecoder,e.m_RangeDecoder,f),e.state=7>e.state?7:10,4>(a=R(e.m_PosSlotDecoder[function(e){return 4>(e-=2)?e:3}(m)],e.m_RangeDecoder)))e.rep0=a
else if(e.rep0=(2|1&a)<<(_=(a>>1)-1),14>a)e.rep0+=function(e,r,o,n){var t,s,u=1,i=0
for(s=0;n>s;++s)t=g(o,e,r+u),u<<=1,u+=t,i|=t<<s
return i}(e.m_PosDecoders,e.rep0-a-1,e.m_RangeDecoder,_)
else if(e.rep0+=function(e,r){var o,n,t=0
for(o=r;0!=o;--o)e.Range>>>=1,e.Code-=e.Range&(n=e.Code-e.Range>>>31)-1,t=t<<1|1-n,-16777216&e.Range||(e.Code=e.Code<<8|u(e.Stream),e.Range<<=8)
return t}(e.m_RangeDecoder,_-4)<<4,e.rep0+=function(e,r){var o,n,t=1,s=0
for(n=0;e.NumBitLevels>n;++n)o=g(r,e.Models,t),t<<=1,t+=o,s|=o<<n
return s}(e.m_PosAlignDecoder,e.m_RangeDecoder),0>e.rep0)return-1==e.rep0?1:-1
if(o(t(e.rep0),e.nowPos64)>=0||e.rep0>=e.m_DictionarySizeCheck)return-1
!function(e,r,o){var n=e._pos-r-1
for(0>n&&(n+=e._windowSize);0!=o;--o)e._windowSize>n||(n=0),e._buffer[e._pos++]=e._buffer[n++],e._windowSize>e._pos||d(e)}(e.m_OutWindow,e.rep0,m),e.nowPos64=r(e.nowPos64,t(m)),e.prevByte=c(e.m_OutWindow,0)}else n=function(e,r,o){return e.m_Coders[((r&e.m_PosMask)<<e.m_NumPrevBits)+((255&o)>>>8-e.m_NumPrevBits)]}(e.m_LiteralDecoder,s(e.nowPos64),e.prevByte),e.prevByte=7>e.state?function(e,r){var o=1
do{o=o<<1|g(r,e.m_Decoders,o)}while(256>o)
return o<<24>>24}(n,e.m_RangeDecoder):function(e,r,o){var n,t,s=1
do{if(t=o>>7&1,o<<=1,n=g(r,e.m_Decoders,(1+t<<8)+s),s=s<<1|n,t!=n){for(;256>s;)s=s<<1|g(r,e.m_Decoders,s)
break}}while(256>s)
return s<<24>>24}(n,e.m_RangeDecoder,c(e.m_OutWindow,e.rep0)),function(e,r){e._buffer[e._pos++]=r,e._windowSize>e._pos||d(e)}(e.m_OutWindow,e.prevByte),e.state=4>(D=e.state)?0:10>D?D-3:D-6,e.nowPos64=r(e.nowPos64,M)
var D
return 0}(e.decoder)
if(-1==n)throw Error("corrupted input")
e.inBytesProcessed=C,e.outBytesProcessed=e.decoder.nowPos64,(n||o(e.decoder.outSize,S)>=0&&o(e.decoder.nowPos64,e.decoder.outSize)>=0)&&(d(e.decoder.m_OutWindow),_(e.decoder.m_OutWindow),e.decoder.m_RangeDecoder.Stream=null,e.alive=0)}(e),e.alive}function f(e,r){for(;r>e.m_NumPosStates;++e.m_NumPosStates)e.m_LowCoder[e.m_NumPosStates]=w({},3),e.m_MidCoder[e.m_NumPosStates]=w({},3)}function p(e,r,o){if(!g(r,e.m_Choice,0))return R(e.m_LowCoder[o],r)
var n=8
return g(r,e.m_Choice,1)?n+=8+R(e.m_HighCoder,r):n+=R(e.m_MidCoder[o],r),n}function D(r){return r.m_Choice=e(2),r.m_LowCoder=e(16),r.m_MidCoder=e(16),r.m_HighCoder=w({},8),r.m_NumPosStates=0,r}function v(e){P(e.m_Choice)
for(var r=0;e.m_NumPosStates>r;++r)P(e.m_LowCoder[r].Models),P(e.m_MidCoder[r].Models)
P(e.m_HighCoder.Models)}function l(r){return r.m_Decoders=e(768),r}function w(r,o){return r.NumBitLevels=o,r.Models=e(1<<o),r}function R(e,r){var o,n=1
for(o=e.NumBitLevels;0!=o;--o)n=(n<<1)+g(r,e.Models,n)
return n-(1<<e.NumBitLevels)}function g(e,r,o){var n,t=r[o]
return(-2147483648^(n=(e.Range>>>11)*t))>(-2147483648^e.Code)?(e.Range=n,r[o]=t+(2048-t>>>5)<<16>>16,-16777216&e.Range||(e.Code=e.Code<<8|u(e.Stream),e.Range<<=8),0):(e.Range-=n,e.Code-=n,r[o]=t-(t>>>5)<<16>>16,-16777216&e.Range||(e.Code=e.Code<<8|u(e.Stream),e.Range<<=8),1)}function P(e){for(var r=e.length-1;r>=0;--r)e[r]=1024}var h=4294967296,C=[4294967295,-h],S=[0,0],M=[1,0]
return{decompress:function(e){for(var r={d:m({},e)};a(r.d.chunker););return function(e){var r=e.buf
return r.length=e.count,r}(r.d.output)}}}()



let x = new Int8Array(LZMA.decompress(d(#fs.scripts.quine().split\`
\`[1].slice(2))));
let mod = new WebAssembly.Module(x)
let wasm = new WebAssembly.Instance(mod).exports;

const glob = {};
(function(r){function x(){}function y(){}var z=String.fromCharCode,v={}.toString,A=v.call(r.SharedArrayBuffer),B=v(),q=r.Uint8Array,t=q||Array,w=q?ArrayBuffer:t,C=w.isView||function(g){return g&&"length"in g},D=v.call(w["prototype"]);w=y["prototype"];var E=r.TextEncoder,a=new (q?Uint16Array:t)(32);x["prototype"].decode=function(g){if(!C(g)){var l=v.call(g);if(l!==D&&l!==A&&l!==B)throw TypeError("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
g=q?new t(g):g||[]}for(var f=l="",b=0,c=g.length|0,u=c-32|0,e,d,h=0,p=0,m,k=0,n=-1;b<c;){for(e=b<=u?32:c-b|0;k<e;b=b+1|0,k=k+1|0){d=g[b]&255;switch(d>>4){case 15:m=g[b=b+1|0]&255;if(2!==m>>6||247<d){b=b-1|0;break}h=(d&7)<<6|m&63;p=5;d=256;case 14:m=g[b=b+1|0]&255,h<<=6,h|=(d&15)<<6|m&63,p=2===m>>6?p+4|0:24,d=d+256&768;case 13:case 12:m=g[b=b+1|0]&255,h<<=6,h|=(d&31)<<6|m&63,p=p+7|0,b<c&&2===m>>6&&h>>p&&1114112>h?(d=h,h=h-65536|0,0<=h&&(n=(h>>10)+55296|0,d=(h&1023)+56320|0,31>k?(a[k]=n,k=k+1|0,n=-1):
(m=n,n=d,d=m))):(d>>=8,b=b-d-1|0,d=65533),h=p=0,e=b<=u?32:c-b|0;default:a[k]=d;continue;case 11:case 10:case 9:case 8:}a[k]=65533}f+=z(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29],a[30],a[31]);32>k&&(f=f.slice(0,k-32|0));if(b<c){if(a[0]=n,k=~n>>>31,n=-1,f.length<l.length)continue}else-1!==n&&(f+=z(n));l+=f;f=""}return l};w.encode=function(g){g=void 0===g?"":""+g;var l=g.length|
0,f=new t((l<<1)+8|0),b,c=0,u=!q;for(b=0;b<l;b=b+1|0,c=c+1|0){var e=g.charCodeAt(b)|0;if(127>=e)f[c]=e;else{if(2047>=e)f[c]=192|e>>6;else{a:{if(55296<=e)if(56319>=e){var d=g.charCodeAt(b=b+1|0)|0;if(56320<=d&&57343>=d){e=(e<<10)+d-56613888|0;if(65535<e){f[c]=240|e>>18;f[c=c+1|0]=128|e>>12&63;f[c=c+1|0]=128|e>>6&63;f[c=c+1|0]=128|e&63;continue}break a}e=65533}else 57343>=e&&(e=65533);!u&&b<<1<c&&b<<1<(c-7|0)&&(u=!0,d=new t(3*l),d.set(f),f=d)}f[c]=224|e>>12;f[c=c+1|0]=128|e>>6&63}f[c=c+1|0]=128|e&63}}return q?
f.subarray(0,c):f.slice(0,c)};E||(r.TextDecoder=x,r.TextEncoder=y)})(glob);
const {TextDecoder, TextEncoder} = glob;

${bgJs.split("\n").slice(4).join("\n")
    .replace(/export function/g, "function")
    .replace(/cachedTextDecoder\.decode\(\);/g, "")}
return JSON.parse(run(JSON.stringify(c)))
}\
`;

fs.writeFileSync("out.js", script);