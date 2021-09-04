(()=>{"use strict";var e,t,r,n,o,a,i,s={4:(e,t,r)=>{var n=r(703),o=0,a="",i="",s="";async function c(e){let t=await fetch(a+"//"+i+(""==s?"":":"+s)+"/"+e,{method:"GET"});return new Uint8Array(await t.arrayBuffer())}onmessage=function(e){o=e.data[0],a=e.data[1],i=e.data[2],s=e.data[3],(0,n.j)().then((e=>{var t={},r={};let n=c("program.txt"),p=async function(e){return(await fetch(a+"//"+i+(""==s?"":":"+s)+"//abi.txt",{method:"GET"})).text()}(),u=c("pk.txt"),l=async function(e){return(await fetch(a+"//"+i+(""==s?"":":"+s)+"/vk.txt",{method:"GET"})).json()}();n.then((n=>p.then((a=>u.then((i=>l.then((s=>{t.program=n,t.abi=a,r.pk=i,r.vk=s;var c=Date.now();const{witness:p,output:u}=e.computeWitness(t,["0"]);console.log(o,"witness",Date.now()-c),c=Date.now();const l=e.generateProof(t.program,p,r.pk);console.log(o,"proof",Date.now()-c),c=Date.now();const f=e.verify(r.vk,l);console.log(o,"verifier",Date.now()-c),console.log(o,f,l.inputs),postMessage(o)}))))))))}))}}},c={};function p(e){var t=c[e];if(void 0!==t)return t.exports;var r=c[e]={id:e,loaded:!1,exports:{}};return s[e](r,r.exports,p),r.loaded=!0,r.exports}p.m=s,p.x=()=>{var e=p.O(void 0,[703],(()=>p(4)));return p.O(e)},e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",r=e=>{e&&(e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},n=e=>!--e.r&&e(),o=(e,t)=>e?e.push(t):n(t),p.a=(a,i,s)=>{var c,p,u,l=s&&[],f=a.exports,h=!0,m=!1,b=(t,r,n)=>{m||(m=!0,r.r+=t.length,t.map(((t,o)=>t[e](r,n))),m=!1)},d=new Promise(((e,t)=>{u=t,p=()=>(e(f),r(l),l=0)}));d[t]=f,d[e]=(e,t)=>{if(h)return n(e);c&&b(c,e,t),o(l,e),d.catch(t)},a.exports=d,i((a=>{if(!a)return p();var i,s;c=(a=>a.map((a=>{if(null!==a&&"object"==typeof a){if(a[e])return a;if(a.then){var i=[];a.then((e=>{s[t]=e,r(i),i=0}));var s={[e]:(e,t)=>(o(i,e),a.catch(t))};return s}}return{[e]:e=>n(e),[t]:a}})))(a);var u=new Promise(((e,r)=>{(i=()=>e(s=c.map((e=>e[t])))).r=0,b(c,i,r)}));return i.r?u:s})).then(p,u),h=!1},a=[],p.O=(e,t,r,n)=>{if(!t){var o=1/0;for(c=0;c<a.length;c++){for(var[t,r,n]=a[c],i=!0,s=0;s<t.length;s++)(!1&n||o>=n)&&Object.keys(p.O).every((e=>p.O[e](t[s])))?t.splice(s--,1):(i=!1,n<o&&(o=n));i&&(a.splice(c--,1),e=r())}return e}n=n||0;for(var c=a.length;c>0&&a[c-1][2]>n;c--)a[c]=a[c-1];a[c]=[t,r,n]},p.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return p.d(t,{a:t}),t},p.d=(e,t)=>{for(var r in t)p.o(t,r)&&!p.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},p.f={},p.e=e=>Promise.all(Object.keys(p.f).reduce(((t,r)=>(p.f[r](e,t),t)),[])),p.u=e=>e+".main.js",p.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),p.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),p.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),p.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;p.g.importScripts&&(e=p.g.location+"");var t=p.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),p.p=e})(),(()=>{var e={4:1};p.f.i=(t,r)=>{e[t]||importScripts(p.p+p.u(t))};var t=self.webpackChunkwebpack_demo=self.webpackChunkwebpack_demo||[],r=t.push.bind(t);t.push=t=>{var[n,o,a]=t;for(var i in o)p.o(o,i)&&(p.m[i]=o[i]);for(a&&a(p);n.length;)e[n.pop()]=1;r(t)}})(),p.v=(e,t,r,n)=>{var o=fetch(p.p+""+r+".module.wasm");return"function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(o,n).then((t=>Object.assign(e,t.instance.exports))):o.then((e=>e.arrayBuffer())).then((e=>WebAssembly.instantiate(e,n))).then((t=>Object.assign(e,t.instance.exports)))},i=p.x,p.x=()=>p.e(703).then(i),p.x()})();