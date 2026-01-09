/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t$1.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n$1=`<${o$2}>`,r$2=document,l=()=>r$2.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$1.litHtmlPolyfillSupport;j?.(N,R),(t$1.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

const CARD_VERSION = "1.4.1";
const CARD_NAME = "ChoreBoard Card";

let ChoreboardCard = class ChoreboardCard extends i {
    constructor() {
        super(...arguments);
        this.arcadeSession = null;
        this.expandedLeaderboards = new Set();
        this.arcadeTimerInterval = null;
    }
    setConfig(config) {
        if (!config) {
            throw new Error("Invalid configuration");
        }
        if (!config.entity) {
            throw new Error('You must specify an "entity" (e.g., sensor.choreboard_my_chores_ash). Please configure the ChoreBoard integration first.');
        }
        this.config = {
            show_header: true,
            show_points: true,
            show_completed: true,
            show_overdue_only: false,
            show_undo: false,
            show_user_points: false,
            show_arcade: true,
            show_arcade_leaderboards: true,
            show_judge_controls: true,
            arcade_poll_interval: 30,
            ...config,
        };
    }
    getCardSize() {
        const chores = this.getChores();
        return Math.max(2, Math.ceil(chores.length / 2) + 1);
    }
    static getStubConfig() {
        return {
            type: "custom:choreboard-card",
            title: "My Chores",
            entity: "sensor.choreboard_my_chores_ash",
            show_header: true,
            show_points: true,
            show_completed: true,
        };
    }
    static getConfigElement() {
        return document.createElement("choreboard-card-editor");
    }
    connectedCallback() {
        super.connectedCallback();
        this.startArcadePolling();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.stopArcadePolling();
    }
    startArcadePolling() {
        if (!this.config?.show_arcade) {
            return;
        }
        this.stopArcadePolling();
        this.arcadeTimerInterval = window.setInterval(() => this.fetchArcadeStatus(), (this.config.arcade_poll_interval || 30) * 1000);
        this.fetchArcadeStatus();
    }
    stopArcadePolling() {
        if (this.arcadeTimerInterval !== null) {
            clearInterval(this.arcadeTimerInterval);
            this.arcadeTimerInterval = null;
        }
    }
    async fetchArcadeStatus() {
        if (!this.hass) {
            return;
        }
        for (const entityId of Object.keys(this.hass.states)) {
            if (entityId.startsWith("sensor.choreboard_")) {
                const state = this.hass.states[entityId];
                if (state.attributes.arcade_session) {
                    this.arcadeSession = state.attributes.arcade_session;
                    return;
                }
            }
        }
        this.arcadeSession = null;
    }
    getChores() {
        if (!this.hass || !this.config.entity) {
            return [];
        }
        const stateObj = this.hass.states[this.config.entity];
        if (!stateObj) {
            console.warn(`ChoreBoard entity not found: ${this.config.entity}`);
            return [];
        }
        const attributes = stateObj.attributes;
        const chores = attributes.chores || [];
        return chores.filter((chore) => {
            if (!this.config.show_completed && chore.status === "completed") {
                return false;
            }
            if (this.config.show_overdue_only && !chore.is_overdue) {
                return false;
            }
            return true;
        });
    }
    async completeChore(chore) {
        if (!this.hass)
            return;
        if (chore.status === "completed") {
            this.showToast("This chore is already marked as completed");
            return;
        }
        try {
            await this.hass.callService("choreboard", "mark_complete", {
                chore_id: chore.id,
            });
            this.showToast(`Marked "${chore.name}" as complete`);
        }
        catch (error) {
            console.error("Error marking chore as complete:", error);
            this.showToast("Failed to mark chore as complete", true);
        }
    }
    async undoCompletion(chore) {
        if (!this.hass)
            return;
        if (chore.status !== "completed") {
            this.showToast("This chore is not marked as completed");
            return;
        }
        const confirmed = confirm(`Are you sure you want to undo completion of "${chore.name}"?`);
        if (!confirmed) {
            return;
        }
        try {
            await this.hass.callService("choreboard", "undo_completion", {
                chore_id: chore.id,
            });
            this.showToast(`Undid completion of "${chore.name}"`);
        }
        catch (error) {
            console.error("Error undoing chore completion:", error);
            this.showToast("Failed to undo completion", true);
        }
    }
    showToast(message, isError = false) {
        const event = new CustomEvent("hass-notification", {
            detail: {
                message,
                duration: isError ? 5000 : 3000,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    getChoreStateClass(chore) {
        if (chore.status === "completed") {
            return "state-completed";
        }
        if (chore.is_overdue) {
            return "state-overdue";
        }
        return "state-pending";
    }
    getChoreStateIcon(chore) {
        if (chore.status === "completed") {
            return "mdi:check-circle";
        }
        if (chore.is_overdue) {
            return "mdi:alert-circle";
        }
        return "mdi:circle-outline";
    }
    getUsername() {
        if (!this.hass || !this.config.entity) {
            return "";
        }
        const stateObj = this.hass.states[this.config.entity];
        if (!stateObj) {
            return "";
        }
        const attributes = stateObj.attributes;
        return attributes.username || "";
    }
    getPointsName() {
        if (!this.hass || !this.config.entity) {
            return "points";
        }
        const stateObj = this.hass.states[this.config.entity];
        if (!stateObj) {
            return "points";
        }
        const attributes = stateObj.attributes;
        return attributes.points_label || "points";
    }
    getUserPoints() {
        if (!this.hass || !this.config.entity) {
            return { weekly: null, allTime: null };
        }
        const username = this.getUsername();
        if (!username) {
            return { weekly: null, allTime: null };
        }
        const weeklyEntity = `sensor.${username}_weekly_points`;
        const allTimeEntity = `sensor.${username}_all_time_points`;
        const weeklyState = this.hass.states[weeklyEntity];
        const allTimeState = this.hass.states[allTimeEntity];
        return {
            weekly: weeklyState ? parseFloat(weeklyState.state) : null,
            allTime: allTimeState ? parseFloat(allTimeState.state) : null,
        };
    }
    isPoolChore(chore) {
        return (chore.status === "pool" ||
            (this.config.entity.endsWith("_chores") &&
                !this.config.entity.includes("_my_chores")));
    }
    getUsers() {
        if (!this.hass) {
            return [];
        }
        for (const entityId of Object.keys(this.hass.states)) {
            if (entityId.startsWith("sensor.choreboard_")) {
                const state = this.hass.states[entityId];
                if (state.attributes.users && Array.isArray(state.attributes.users)) {
                    return state.attributes.users;
                }
            }
        }
        return [];
    }
    async claimChore(chore) {
        if (!this.hass)
            return;
        const users = this.getUsers();
        if (users.length === 0) {
            this.showToast("Unable to load users list", true);
            return;
        }
        await Promise.resolve().then(function () { return claimDialog; });
        const dialog = document.createElement("claim-chore-dialog");
        dialog.users = users;
        dialog.chore = chore;
        dialog.addEventListener("dialog-confirmed", async (e) => {
            const customEvent = e;
            const userId = customEvent.detail.userId;
            try {
                await this.hass.callService("choreboard", "claim_chore", {
                    chore_id: chore.id,
                    assign_to_user_id: userId,
                });
                this.showToast(`Chore claimed successfully`);
            }
            catch (error) {
                console.error("Error claiming chore:", error);
                this.showToast("Failed to claim chore", true);
            }
            finally {
                dialog.remove();
            }
        });
        dialog.addEventListener("dialog-closed", () => {
            dialog.remove();
        });
        document.body.appendChild(dialog);
    }
    async completePoolChore(chore) {
        if (!this.hass)
            return;
        const users = this.getUsers();
        if (users.length === 0) {
            this.showToast("Unable to load users list", true);
            return;
        }
        await Promise.resolve().then(function () { return completeDialog; });
        const dialog = document.createElement("complete-chore-dialog");
        dialog.users = users;
        dialog.chore = chore;
        dialog.addEventListener("dialog-confirmed", async (e) => {
            const customEvent = e;
            const completedByUserId = customEvent.detail.userId;
            const helperIds = customEvent.detail.helperIds || [];
            try {
                await this.hass.callService("choreboard", "mark_complete", {
                    chore_id: chore.id,
                    completed_by_user_id: completedByUserId,
                    helpers: helperIds,
                });
                this.showToast(`Chore marked as complete`);
            }
            catch (error) {
                console.error("Error completing chore:", error);
                this.showToast("Failed to complete chore", true);
            }
            finally {
                dialog.remove();
            }
        });
        dialog.addEventListener("dialog-closed", () => {
            dialog.remove();
        });
        document.body.appendChild(dialog);
    }
    async startArcade(chore) {
        if (!this.hass)
            return;
        if (this.arcadeSession && this.arcadeSession.status === "active") {
            this.showToast("An arcade session is already in progress", true);
            return;
        }
        try {
            await this.hass.callService("choreboard", "start_arcade", {
                instance_id: chore.id,
            });
            this.showToast(`Started arcade mode for "${chore.name}"`);
            await this.fetchArcadeStatus();
        }
        catch (error) {
            console.error("Error starting arcade mode:", error);
            this.showToast("Failed to start arcade mode", true);
        }
    }
    async stopArcade(session) {
        if (!this.hass)
            return;
        try {
            await this.hass.callService("choreboard", "stop_arcade", {
                session_id: session.id,
            });
            this.showToast("Arcade session stopped - awaiting judge approval");
            await this.fetchArcadeStatus();
        }
        catch (error) {
            console.error("Error stopping arcade mode:", error);
            this.showToast("Failed to stop arcade mode", true);
        }
    }
    async cancelArcade(session) {
        if (!this.hass)
            return;
        const confirmed = confirm(`Are you sure you want to cancel the arcade session for "${session.chore_name}"?`);
        if (!confirmed) {
            return;
        }
        try {
            await this.hass.callService("choreboard", "cancel_arcade", {
                session_id: session.id,
            });
            this.showToast("Arcade session cancelled");
            await this.fetchArcadeStatus();
        }
        catch (error) {
            console.error("Error cancelling arcade mode:", error);
            this.showToast("Failed to cancel arcade mode", true);
        }
    }
    async continueArcade(session) {
        if (!this.hass)
            return;
        try {
            await this.hass.callService("choreboard", "continue_arcade", {
                session_id: session.id,
            });
            this.showToast("Arcade session resumed");
            await this.fetchArcadeStatus();
        }
        catch (error) {
            console.error("Error continuing arcade mode:", error);
            this.showToast("Failed to continue arcade mode", true);
        }
    }
    async showJudgeDialog(session) {
        if (!this.hass)
            return;
        const users = this.getUsers();
        await Promise.resolve().then(function () { return arcadeJudgeDialog; });
        const dialog = document.createElement("arcade-judge-dialog");
        dialog.users = users;
        dialog.session = session;
        dialog.addEventListener("judge-approved", async (e) => {
            const customEvent = e;
            const judgeId = customEvent.detail.judgeId;
            const notes = customEvent.detail.notes;
            try {
                const serviceData = {
                    session_id: session.id,
                };
                if (judgeId) {
                    serviceData.judge_id = judgeId;
                }
                if (notes) {
                    serviceData.notes = notes;
                }
                await this.hass.callService("choreboard", "approve_arcade", serviceData);
                this.showToast("Arcade session approved - points awarded!");
                await this.fetchArcadeStatus();
            }
            catch (error) {
                console.error("Error approving arcade session:", error);
                this.showToast("Failed to approve arcade session", true);
            }
            finally {
                dialog.remove();
            }
        });
        dialog.addEventListener("judge-denied", async (e) => {
            const customEvent = e;
            const judgeId = customEvent.detail.judgeId;
            const notes = customEvent.detail.notes;
            try {
                const serviceData = {
                    session_id: session.id,
                };
                if (judgeId) {
                    serviceData.judge_id = judgeId;
                }
                if (notes) {
                    serviceData.notes = notes;
                }
                await this.hass.callService("choreboard", "deny_arcade", serviceData);
                this.showToast("Arcade session denied - user can continue");
                await this.fetchArcadeStatus();
            }
            catch (error) {
                console.error("Error denying arcade session:", error);
                this.showToast("Failed to deny arcade session", true);
            }
            finally {
                dialog.remove();
            }
        });
        dialog.addEventListener("dialog-closed", () => {
            dialog.remove();
        });
        document.body.appendChild(dialog);
    }
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }
    getCurrentElapsedTime(session) {
        const startTime = new Date(session.start_time).getTime();
        const now = Date.now();
        const elapsedMs = now - startTime;
        return session.elapsed_seconds + Math.floor(elapsedMs / 1000);
    }
    getLeaderboardForChore(choreId) {
        if (!this.hass)
            return null;
        for (const entityId of Object.keys(this.hass.states)) {
            if (entityId.startsWith("sensor.choreboard_")) {
                const state = this.hass.states[entityId];
                const leaderboards = state.attributes.chore_leaderboards;
                if (Array.isArray(leaderboards)) {
                    const leaderboard = leaderboards.find((lb) => lb.chore_id === choreId);
                    if (leaderboard) {
                        return leaderboard;
                    }
                }
            }
        }
        const leaderboardEntity = `sensor.arcade_${choreId}`;
        const state = this.hass.states[leaderboardEntity];
        if (state && state.attributes.high_scores) {
            return {
                chore_id: choreId,
                chore_name: state.attributes.chore_name || "",
                high_scores: state.attributes.high_scores,
            };
        }
        return null;
    }
    toggleLeaderboard(choreId) {
        if (this.expandedLeaderboards.has(choreId)) {
            this.expandedLeaderboards.delete(choreId);
        }
        else {
            this.expandedLeaderboards.add(choreId);
        }
        this.requestUpdate();
    }
    getCurrentUserId() {
        const username = this.getUsername();
        if (!username)
            return null;
        const users = this.getUsers();
        const user = users.find((u) => u.username === username);
        return user ? user.id : null;
    }
    renderLeaderboard(chore) {
        if (!this.config.show_arcade_leaderboards) {
            return x ``;
        }
        const leaderboard = this.getLeaderboardForChore(chore.id);
        if (!leaderboard || leaderboard.high_scores.length === 0) {
            return x ``;
        }
        const expanded = this.expandedLeaderboards.has(chore.id);
        const displayScores = expanded
            ? leaderboard.high_scores
            : leaderboard.high_scores.slice(0, 3);
        const currentUserId = this.getCurrentUserId();
        return x `
      <div class="leaderboard-section">
        <div
          class="leaderboard-header"
          @click=${() => this.toggleLeaderboard(chore.id)}
        >
          <ha-icon icon="mdi:trophy"></ha-icon>
          <span>High Scores (${leaderboard.high_scores.length})</span>
          <ha-icon
            icon="${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}"
          ></ha-icon>
        </div>
        ${expanded
            ? x `
              <div class="leaderboard-list">
                ${displayScores.map((score, idx) => x `
                    <div
                      class="leaderboard-entry ${currentUserId === score.user_id
                ? "current-user"
                : ""}"
                    >
                      <span class="rank">#${idx + 1}</span>
                      <span class="user-name">${score.display_name}</span>
                      <span class="time"
                        >${this.formatTime(score.time_seconds)}</span
                      >
                    </div>
                  `)}
                ${leaderboard.high_scores.length > 3 && !expanded
                ? x `
                      <div class="leaderboard-more">
                        +${leaderboard.high_scores.length - 3} more
                      </div>
                    `
                : ""}
              </div>
            `
            : ""}
      </div>
    `;
    }
    renderArcadeControls(chore) {
        if (!this.config.show_arcade || chore.status === "completed") {
            return x ``;
        }
        const session = this.arcadeSession;
        const isActiveForThisChore = session && session.chore_id === chore.id;
        if (isActiveForThisChore && session) {
            const username = this.getUsername();
            const isCurrentUserSession = session.user_name === username;
            const elapsedSeconds = this.getCurrentElapsedTime(session);
            if (session.status === "active") {
                return x `
          <div class="arcade-controls active">
            <div class="arcade-timer">
              <ha-icon icon="mdi:timer"></ha-icon>
              <span class="timer-text">${this.formatTime(elapsedSeconds)}</span>
              ${isCurrentUserSession
                    ? x `<span class="timer-label">(You)</span>`
                    : x `<span class="timer-label">(${session.user_name})</span>`}
            </div>
            ${isCurrentUserSession
                    ? x `
                  <div class="arcade-buttons">
                    <mwc-button
                      class="arcade-button stop"
                      @click=${() => this.stopArcade(session)}
                    >
                      Stop
                    </mwc-button>
                    <mwc-button
                      class="arcade-button cancel"
                      @click=${() => this.cancelArcade(session)}
                    >
                      Cancel
                    </mwc-button>
                  </div>
                `
                    : x ` <div class="arcade-status">Session in progress...</div> `}
          </div>
        `;
            }
            else if (session.status === "stopped" || session.status === "judging") {
                return x `
          <div class="arcade-controls judging">
            <div class="arcade-status">
              <ha-icon icon="mdi:gavel"></ha-icon>
              <span>Awaiting judge approval</span>
            </div>
            <div class="arcade-timer">
              Final time: ${this.formatTime(elapsedSeconds)}
            </div>
            ${this.config.show_judge_controls
                    ? x `
                  <mwc-button
                    class="arcade-button judge"
                    @click=${() => this.showJudgeDialog(session)}
                  >
                    <ha-icon icon="mdi:gavel"></ha-icon>
                    Judge
                  </mwc-button>
                `
                    : ""}
          </div>
        `;
            }
            else if (session.status === "denied") {
                return x `
          <div class="arcade-controls denied">
            <div class="arcade-status">
              <ha-icon icon="mdi:close-circle"></ha-icon>
              <span>Judge denied - improvements needed</span>
            </div>
            ${isCurrentUserSession
                    ? x `
                  <mwc-button
                    class="arcade-button continue"
                    @click=${() => this.continueArcade(session)}
                  >
                    Continue Arcade
                  </mwc-button>
                `
                    : ""}
          </div>
        `;
            }
        }
        return x `
      <div class="arcade-controls idle">
        <mwc-button
          class="arcade-button start"
          @click=${() => this.startArcade(chore)}
        >
          <ha-icon icon="mdi:play-circle"></ha-icon>
          Start Arcade
        </mwc-button>
      </div>
    `;
    }
    render() {
        if (!this.config || !this.hass) {
            return x ``;
        }
        const username = this.getUsername();
        const title = this.config.title || `${username}'s Chores` || "Chores";
        const chores = this.getChores();
        if (chores.length === 0) {
            return x `
        <ha-card>
          ${this.config.show_header
                ? x `
                <div class="card-header">
                  <div class="name">${title}</div>
                </div>
              `
                : ""}
          <div class="card-content">
            <div class="warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <div>
                <strong>No chores found</strong>
                <p>
                  ${username
                ? `${username} has no chores matching the current filters.`
                : "Please ensure the ChoreBoard integration is installed and configured."}
                  Visit the
                  <a
                    href="https://github.com/PhunkMaster/ChoreBoard-HA-Integration"
                    target="_blank"
                    rel="noopener noreferrer"
                    >ChoreBoard Integration</a
                  >
                  for setup instructions.
                </p>
              </div>
            </div>
          </div>
        </ha-card>
      `;
        }
        const userPoints = this.config.show_user_points
            ? this.getUserPoints()
            : { weekly: null, allTime: null };
        return x `
      <ha-card>
        ${this.config.show_header
            ? x `
              <div class="card-header">
                <div class="name">${title}</div>
                <div class="header-badges">
                  <div class="badge">${chores.length} chores</div>
                  ${this.config.show_user_points && userPoints.weekly !== null
                ? x `<div class="badge points-badge">
                        ${userPoints.weekly} ${this.getPointsName()} this week
                      </div>`
                : ""}
                  ${this.config.show_user_points && userPoints.allTime !== null
                ? x `<div class="badge points-badge">
                        ${userPoints.allTime} ${this.getPointsName()} total
                      </div>`
                : ""}
                </div>
              </div>
            `
            : ""}
        <div class="card-content">
          <div class="chore-list">
            ${chores.map((chore) => x `
                <div class="chore-item ${this.getChoreStateClass(chore)}">
                  <div class="chore-status">
                    <ha-icon icon="${this.getChoreStateIcon(chore)}"></ha-icon>
                  </div>
                  <div class="chore-details">
                    <div class="chore-header">
                      <div class="chore-name">${chore.name}</div>
                      ${this.config.show_points && chore.points
            ? x `<div class="chore-points">
                            ${typeof chore.points === "string"
                ? parseFloat(chore.points)
                : chore.points}
                            ${this.getPointsName()}
                          </div>`
            : ""}
                    </div>
                    <div class="chore-meta">
                      ${chore.due_date
            ? x `<span class="meta-item"
                            ><ha-icon icon="mdi:calendar"></ha-icon
                            >${chore.due_date}</span
                          >`
            : ""}
                      ${chore.is_overdue
            ? x `<span class="meta-item overdue"
                            ><ha-icon icon="mdi:clock-alert"></ha-icon
                            >Overdue</span
                          >`
            : ""}
                    </div>
                    ${this.renderArcadeControls(chore)}
                    ${this.renderLeaderboard(chore)}
                  </div>
                  <div class="chore-action">
                    ${chore.status === "completed"
            ? x `
                          <div class="completed-actions">
                            <div class="completed-badge">✓ Done</div>
                            ${this.config.show_undo
                ? x `
                                  <mwc-button
                                    class="undo-button"
                                    @click=${() => this.undoCompletion(chore)}
                                  >
                                    Undo
                                  </mwc-button>
                                `
                : ""}
                          </div>
                        `
            : this.isPoolChore(chore)
                ? x `
                            <div class="pool-actions">
                              <mwc-button
                                @click=${() => this.claimChore(chore)}
                              >
                                Claim
                              </mwc-button>
                              <mwc-button
                                @click=${() => this.completePoolChore(chore)}
                              >
                                Complete
                              </mwc-button>
                            </div>
                          `
                : x `
                            <mwc-button
                              @click=${() => this.completeChore(chore)}
                            >
                              Complete
                            </mwc-button>
                          `}
                  </div>
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `;
    }
    static get styles() {
        return i$3 `
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .card-header .name {
        font-size: 24px;
        font-weight: 500;
      }

      .header-badges {
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: flex-end;
      }

      .badge {
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .points-badge {
        background: var(--info-color, #2196f3);
      }

      .card-content {
        padding: 0;
      }

      .warning {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color, white);
        border-radius: 8px;
      }

      .warning ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }

      .warning strong {
        display: block;
        margin-bottom: 4px;
      }

      .warning p {
        margin: 4px 0 0 0;
        font-size: 14px;
      }

      .warning a {
        color: var(--text-primary-color, white);
        text-decoration: underline;
      }

      .chore-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .chore-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .chore-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .chore-item.state-completed {
        opacity: 0.7;
        border-color: var(--success-color, #4caf50);
      }

      .chore-item.state-overdue {
        border-color: var(--error-color, #f44336);
        background: rgba(244, 67, 54, 0.05);
      }

      .chore-item.state-pending {
        border-color: var(--info-color, #2196f3);
      }

      .chore-status {
        flex-shrink: 0;
      }

      .chore-status ha-icon {
        --mdc-icon-size: 28px;
      }

      .state-completed .chore-status ha-icon {
        color: var(--success-color, #4caf50);
      }

      .state-overdue .chore-status ha-icon {
        color: var(--error-color, #f44336);
      }

      .state-pending .chore-status ha-icon {
        color: var(--info-color, #2196f3);
      }

      .chore-details {
        flex: 1;
        min-width: 0;
      }

      .chore-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .chore-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .state-completed .chore-name {
        text-decoration: line-through;
        opacity: 0.7;
      }

      .chore-points {
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
      }

      .chore-description {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        line-height: 1.4;
      }

      .chore-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .meta-item ha-icon {
        --mdc-icon-size: 16px;
      }

      .meta-item.overdue {
        color: var(--error-color, #f44336);
        font-weight: 600;
      }

      .chore-action {
        flex-shrink: 0;
      }

      .pool-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .completed-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-end;
      }

      mwc-button {
        --mdc-theme-primary: var(--primary-color);
      }

      .undo-button {
        --mdc-theme-primary: var(--warning-color, #ff9800);
      }

      .completed-badge {
        background: var(--success-color, #4caf50);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
      }

      /* Arcade mode styles */
      .arcade-controls {
        margin-top: 12px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        border-left: 4px solid var(--info-color, #2196f3);
      }

      .arcade-controls.active {
        border-left-color: var(--success-color, #4caf50);
        background: rgba(76, 175, 80, 0.1);
      }

      .arcade-controls.judging {
        border-left-color: var(--warning-color, #ff9800);
        background: rgba(255, 152, 0, 0.1);
      }

      .arcade-controls.denied {
        border-left-color: var(--error-color, #f44336);
        background: rgba(244, 67, 54, 0.1);
      }

      .arcade-controls.idle {
        border-left-color: var(--primary-color);
        background: rgba(3, 155, 229, 0.05);
        padding: 8px;
      }

      .arcade-timer {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .arcade-controls.active .arcade-timer {
        color: var(--success-color, #4caf50);
      }

      .arcade-timer ha-icon {
        --mdc-icon-size: 20px;
      }

      .timer-text {
        font-family: monospace;
        font-size: 18px;
      }

      .timer-label {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .arcade-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .arcade-button {
        min-width: 80px;
      }

      .arcade-button.start {
        --mdc-theme-primary: var(--primary-color);
      }

      .arcade-button.stop {
        --mdc-theme-primary: var(--warning-color, #ff9800);
      }

      .arcade-button.cancel {
        --mdc-theme-primary: var(--error-color, #f44336);
      }

      .arcade-button.continue {
        --mdc-theme-primary: var(--success-color, #4caf50);
      }

      .arcade-button.judge {
        --mdc-theme-primary: var(--warning-color, #ff9800);
        margin-top: 8px;
        width: 100%;
      }

      .arcade-button ha-icon {
        --mdc-icon-size: 18px;
        margin-right: 4px;
      }

      .arcade-status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
      }

      .arcade-status ha-icon {
        --mdc-icon-size: 18px;
      }

      .arcade-controls.judging .arcade-status {
        color: var(--warning-color, #ff9800);
        font-weight: 600;
      }

      .arcade-controls.denied .arcade-status {
        color: var(--error-color, #f44336);
        font-weight: 600;
      }

      /* Leaderboard styles */
      .leaderboard-section {
        margin-top: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }

      .leaderboard-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        background: var(--secondary-background-color, #f5f5f5);
        cursor: pointer;
        transition: background 0.2s ease;
        user-select: none;
      }

      .leaderboard-header:hover {
        background: var(--divider-color);
      }

      .leaderboard-header ha-icon:first-child {
        --mdc-icon-size: 18px;
        color: var(--warning-color, #ff9800);
      }

      .leaderboard-header ha-icon:last-child {
        --mdc-icon-size: 20px;
        margin-left: auto;
        color: var(--secondary-text-color);
      }

      .leaderboard-header span {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        flex: 1;
      }

      .leaderboard-list {
        display: flex;
        flex-direction: column;
        background: var(--card-background-color);
      }

      .leaderboard-entry {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-top: 1px solid var(--divider-color);
        transition: background 0.2s ease;
      }

      .leaderboard-entry:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .leaderboard-entry.current-user {
        background: rgba(3, 155, 229, 0.1);
        font-weight: 600;
      }

      .leaderboard-entry.current-user:hover {
        background: rgba(3, 155, 229, 0.15);
      }

      .leaderboard-entry .rank {
        font-size: 16px;
        font-weight: 700;
        color: var(--warning-color, #ff9800);
        min-width: 32px;
      }

      .leaderboard-entry:nth-child(1) .rank {
        color: #ffd700; /* Gold */
      }

      .leaderboard-entry:nth-child(2) .rank {
        color: #c0c0c0; /* Silver */
      }

      .leaderboard-entry:nth-child(3) .rank {
        color: #cd7f32; /* Bronze */
      }

      .leaderboard-entry .user-name {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .leaderboard-entry .time {
        font-size: 14px;
        font-weight: 600;
        font-family: monospace;
        color: var(--success-color, #4caf50);
      }

      .leaderboard-more {
        padding: 8px 12px;
        text-align: center;
        font-size: 12px;
        color: var(--secondary-text-color);
        border-top: 1px solid var(--divider-color);
        font-style: italic;
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], ChoreboardCard.prototype, "hass", void 0);
__decorate([
    r()
], ChoreboardCard.prototype, "config", void 0);
__decorate([
    r()
], ChoreboardCard.prototype, "arcadeSession", void 0);
__decorate([
    r()
], ChoreboardCard.prototype, "expandedLeaderboards", void 0);
ChoreboardCard = __decorate([
    t("choreboard-card")
], ChoreboardCard);
console.info(`%c ${CARD_NAME} %c ${CARD_VERSION} `, "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;");

let ChoreboardCardEditor = class ChoreboardCardEditor extends i {
    setConfig(config) {
        this.config = config;
    }
    getMyChoresSensors() {
        if (!this.hass)
            return [];
        return Object.keys(this.hass.states).filter((entityId) => entityId.startsWith("sensor.choreboard_my_chores_") ||
            entityId.startsWith("sensor.choreboard_my_immediate_chores_") ||
            entityId === "sensor.choreboard_outstanding_chores" ||
            entityId === "sensor.choreboard_late_chores" ||
            (entityId.startsWith("sensor.") && entityId.endsWith("_my_chores")) ||
            (entityId.startsWith("sensor.") &&
                entityId.endsWith("_my_immediate_chores")) ||
            (entityId.startsWith("sensor.") && entityId.endsWith("_chores")));
    }
    render() {
        if (!this.hass || !this.config) {
            return x ``;
        }
        const myChoresSensors = this.getMyChoresSensors();
        return x `
      <div class="card-config">
        ${myChoresSensors.length === 0
            ? x `
              <div class="warning">
                <ha-icon icon="mdi:alert"></ha-icon>
                <div>
                  <strong>No ChoreBoard sensors found</strong>
                  <p>
                    Please install and configure the
                    <a
                      href="https://github.com/PhunkMaster/ChoreBoard-HA-Integration"
                      target="_blank"
                      rel="noopener noreferrer"
                      >ChoreBoard Integration</a
                    >
                    first.
                  </p>
                </div>
              </div>
            `
            : ""}

        <div class="option">
          <label for="title">Title:</label>
          <input
            id="title"
            type="text"
            .value=${this.config.title || ""}
            @input=${this.titleChanged}
            placeholder="My Chores"
          />
        </div>

        <div class="option">
          <label for="entity">ChoreBoard Sensor:</label>
          <select
            id="entity"
            .value=${this.config.entity || ""}
            @change=${this.entityChanged}
          >
            <option value="">Select a sensor...</option>
            ${myChoresSensors.map((entityId) => x `
                <option
                  value=${entityId}
                  ?selected=${this.config.entity === entityId}
                >
                  ${this.getEntityDisplayName(entityId)}
                </option>
              `)}
          </select>
          <p class="hint">
            Select the "My Chores" sensor for the user you want to display. The
            card will show all chores from that sensor.
          </p>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_header !== false}
              @change=${this.showHeaderChanged}
            />
            Show Header
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_points !== false}
              @change=${this.showPointsChanged}
            />
            Show Points
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_completed !== false}
              @change=${this.showCompletedChanged}
            />
            Show Completed Chores
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_overdue_only === true}
              @change=${this.showOverdueOnlyChanged}
            />
            Show Only Overdue Chores
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_undo === true}
              @change=${this.showUndoChanged}
            />
            Show Undo Button for Completed Chores
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_user_points === true}
              @change=${this.showUserPointsChanged}
            />
            Show User Points in Header
          </label>
        </div>

        <div class="section-header">
          <ha-icon icon="mdi:gamepad-variant"></ha-icon>
          <span>Arcade Mode Settings</span>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_arcade !== false}
              @change=${this.showArcadeChanged}
            />
            Enable Arcade Mode Controls
          </label>
          <p class="hint">
            Show arcade mode buttons and timer for competitive chore completion
          </p>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_arcade_leaderboards !== false}
              @change=${this.showArcadeLeaderboardsChanged}
            />
            Show Arcade Leaderboards
          </label>
          <p class="hint">Display high scores for each chore (expandable)</p>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_judge_controls !== false}
              @change=${this.showJudgeControlsChanged}
            />
            Show Judge Controls
          </label>
          <p class="hint">
            Display judge button for approving/denying arcade completions
          </p>
        </div>

        <div class="option">
          <label for="arcade_poll_interval"
            >Timer Update Interval (seconds):</label
          >
          <input
            id="arcade_poll_interval"
            type="number"
            min="5"
            max="120"
            .value=${this.config.arcade_poll_interval || 30}
            @input=${this.arcadePollIntervalChanged}
          />
          <p class="hint">
            How often to update the arcade timer (5-120 seconds, default: 30)
          </p>
        </div>

        <div class="info">
          <ha-icon icon="mdi:information"></ha-icon>
          <div>
            <strong>About ChoreBoard Card</strong>
            <p>
              This card displays chores from the ChoreBoard integration's "My
              Chores" sensors. Each user has their own sensor containing their
              assigned chores.
            </p>
            <p>
              Mark chores as complete directly from the card using the
              "Complete" button.
            </p>
          </div>
        </div>
      </div>
    `;
    }
    getEntityDisplayName(entityId) {
        const stateObj = this.hass?.states[entityId];
        if (stateObj?.attributes?.friendly_name) {
            return stateObj.attributes.friendly_name;
        }
        const parts = entityId.split(".");
        if (parts.length === 2 && parts[1].startsWith("choreboard_")) {
            const name = parts[1].replace("choreboard_", "").replace(/_/g, " ");
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
        return entityId;
    }
    entityChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, entity: target.value };
        this.configChanged();
    }
    titleChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, title: target.value };
        this.configChanged();
    }
    showHeaderChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_header: target.checked };
        this.configChanged();
    }
    showPointsChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_points: target.checked };
        this.configChanged();
    }
    showCompletedChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_completed: target.checked };
        this.configChanged();
    }
    showOverdueOnlyChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_overdue_only: target.checked };
        this.configChanged();
    }
    showUndoChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_undo: target.checked };
        this.configChanged();
    }
    showUserPointsChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_user_points: target.checked };
        this.configChanged();
    }
    showArcadeChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_arcade: target.checked };
        this.configChanged();
    }
    showArcadeLeaderboardsChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_arcade_leaderboards: target.checked };
        this.configChanged();
    }
    showJudgeControlsChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        this.config = { ...this.config, show_judge_controls: target.checked };
        this.configChanged();
    }
    arcadePollIntervalChanged(ev) {
        const target = ev.target;
        if (!this.config || !this.hass) {
            return;
        }
        const value = parseInt(target.value, 10);
        if (!isNaN(value) && value >= 5 && value <= 120) {
            this.config = { ...this.config, arcade_poll_interval: value };
            this.configChanged();
        }
    }
    configChanged() {
        const event = new CustomEvent("config-changed", {
            detail: { config: this.config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    static get styles() {
        return i$3 `
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 0;
        margin-top: 16px;
        border-top: 2px solid var(--divider-color);
        font-weight: 600;
        font-size: 15px;
        color: var(--primary-color);
      }

      .section-header ha-icon {
        --mdc-icon-size: 22px;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .option > label {
        font-weight: 500;
        font-size: 14px;
      }

      .option input[type="text"],
      .option select {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        font-size: 14px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .option select {
        width: 100%;
        cursor: pointer;
      }

      .option input[type="checkbox"] {
        margin-right: 8px;
      }

      .option label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .hint {
        color: var(--secondary-text-color);
        font-size: 13px;
        margin: 4px 0 0 0;
        line-height: 1.4;
      }

      .info {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
        font-size: 14px;
      }

      .info ha-icon {
        --mdc-icon-size: 20px;
        color: var(--primary-color);
        flex-shrink: 0;
        margin-top: 2px;
      }

      .info strong {
        display: block;
        margin-bottom: 4px;
      }

      .info p {
        margin: 4px 0;
        line-height: 1.4;
      }

      .info ul {
        margin: 8px 0;
        padding-left: 20px;
      }

      .info li {
        margin: 4px 0;
        line-height: 1.4;
      }

      .warning {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px;
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color, white);
        border-radius: 4px;
        font-size: 14px;
      }

      .warning ha-icon {
        --mdc-icon-size: 20px;
        flex-shrink: 0;
      }

      .warning strong {
        display: block;
        margin-bottom: 4px;
      }

      .warning p {
        margin: 4px 0;
      }

      .warning a {
        color: var(--text-primary-color, white);
        text-decoration: underline;
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], ChoreboardCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], ChoreboardCardEditor.prototype, "config", void 0);
ChoreboardCardEditor = __decorate([
    t("choreboard-card-editor")
], ChoreboardCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "choreboard-card",
    name: "ChoreBoard Card",
    description: "A custom card for managing and tracking chores in Home Assistant",
    preview: true,
    documentationURL: "https://github.com/yourusername/choreboard-ha-card",
});
console.info("ChoreBoard Card has been loaded");

let ClaimChoreDialog = class ClaimChoreDialog extends i {
    constructor() {
        super(...arguments);
        this.users = [];
        this.selectedUserId = null;
    }
    render() {
        return x `
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Claim: ${this.chore.name}</div>

        <div class="dialog-content">
          <div class="section">
            <h3>Who is claiming this chore?</h3>
            <div class="user-list">
              ${this.users.map((user) => x `
                  <div
                    class="user-option ${this.selectedUserId === user.id
            ? "selected"
            : ""}"
                    @click=${() => this._selectUser(user.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${user.display_name}</span>
                    ${this.selectedUserId === user.id
            ? x `<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`
            : ""}
                  </div>
                `)}
            </div>
          </div>
        </div>

        <mwc-button slot="secondaryAction" @click=${this._cancel}>
          Cancel
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._confirm}
          .disabled=${!this.selectedUserId}
        >
          Claim
        </mwc-button>
      </ha-dialog>
    `;
    }
    _selectUser(userId) {
        this.selectedUserId = userId;
    }
    _handleClosed() {
        this._cancel();
    }
    _cancel() {
        this.dispatchEvent(new CustomEvent("dialog-closed"));
    }
    _confirm() {
        if (!this.selectedUserId) {
            return;
        }
        this.dispatchEvent(new CustomEvent("dialog-confirmed", {
            detail: {
                userId: this.selectedUserId,
            },
        }));
    }
    static get styles() {
        return i$3 `
      .dialog-content {
        padding: 16px 24px;
      }

      .section {
        margin-bottom: 24px;
      }

      .section:last-child {
        margin-bottom: 0;
      }

      .section h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .user-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .user-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .user-option:hover {
        border-color: var(--primary-color);
        background: var(--secondary-background-color);
      }

      .user-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .user-option ha-icon {
        --mdc-icon-size: 24px;
      }

      .user-option .check-icon {
        margin-left: auto;
        --mdc-icon-size: 20px;
      }

      .user-option span {
        flex: 1;
        font-size: 16px;
        font-weight: 500;
      }
    `;
    }
};
__decorate([
    n({ type: Array })
], ClaimChoreDialog.prototype, "users", void 0);
__decorate([
    n({ type: Object })
], ClaimChoreDialog.prototype, "chore", void 0);
__decorate([
    r()
], ClaimChoreDialog.prototype, "selectedUserId", void 0);
ClaimChoreDialog = __decorate([
    t("claim-chore-dialog")
], ClaimChoreDialog);

var claimDialog = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ClaimChoreDialog () { return ClaimChoreDialog; }
});

let CompleteChoreDialog = class CompleteChoreDialog extends i {
    constructor() {
        super(...arguments);
        this.users = [];
        this.selectedUserId = null;
        this.selectedHelperIds = [];
    }
    render() {
        const availableHelpers = this.users.filter((user) => user.id !== this.selectedUserId);
        return x `
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Complete: ${this.chore.name}</div>

        <div class="dialog-content">
          <!-- Who completed section -->
          <div class="section">
            <h3>Who completed this chore? <span class="required">*</span></h3>
            <div class="user-list">
              ${this.users.map((user) => x `
                  <div
                    class="user-option ${this.selectedUserId === user.id
            ? "selected"
            : ""}"
                    @click=${() => this._selectUser(user.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${user.display_name}</span>
                    ${this.selectedUserId === user.id
            ? x `<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`
            : ""}
                  </div>
                `)}
            </div>
          </div>

          <!-- Helpers section -->
          ${this.selectedUserId && availableHelpers.length > 0
            ? x `
                <div class="section">
                  <h3>Who helped? <span class="optional">(optional)</span></h3>
                  <div class="helper-list">
                    ${availableHelpers.map((user) => x `
                        <label class="helper-option">
                          <ha-checkbox
                            .checked=${this.selectedHelperIds.includes(user.id)}
                            @change=${(e) => this._toggleHelper(user.id, e.target.checked)}
                          ></ha-checkbox>
                          <span>${user.display_name}</span>
                        </label>
                      `)}
                  </div>
                </div>
              `
            : ""}
        </div>

        <mwc-button slot="secondaryAction" @click=${this._cancel}>
          Cancel
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._confirm}
          .disabled=${!this.selectedUserId}
        >
          Complete
        </mwc-button>
      </ha-dialog>
    `;
    }
    _selectUser(userId) {
        if (this.selectedUserId !== userId) {
            this.selectedHelperIds = this.selectedHelperIds.filter((id) => id !== userId);
        }
        this.selectedUserId = userId;
    }
    _toggleHelper(userId, checked) {
        if (checked) {
            if (!this.selectedHelperIds.includes(userId)) {
                this.selectedHelperIds = [...this.selectedHelperIds, userId];
            }
        }
        else {
            this.selectedHelperIds = this.selectedHelperIds.filter((id) => id !== userId);
        }
    }
    _handleClosed() {
        this._cancel();
    }
    _cancel() {
        this.dispatchEvent(new CustomEvent("dialog-closed"));
    }
    _confirm() {
        if (!this.selectedUserId) {
            return;
        }
        this.dispatchEvent(new CustomEvent("dialog-confirmed", {
            detail: {
                userId: this.selectedUserId,
                helperIds: this.selectedHelperIds,
            },
        }));
    }
    static get styles() {
        return i$3 `
      .dialog-content {
        padding: 16px 24px;
        max-height: 60vh;
        overflow-y: auto;
      }

      .section {
        margin-bottom: 24px;
      }

      .section:last-child {
        margin-bottom: 0;
      }

      .section h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .required {
        color: var(--error-color, #f44336);
        font-weight: 600;
      }

      .optional {
        color: var(--secondary-text-color);
        font-weight: 400;
        font-size: 12px;
      }

      .user-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .user-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .user-option:hover {
        border-color: var(--primary-color);
        background: var(--secondary-background-color);
      }

      .user-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .user-option ha-icon {
        --mdc-icon-size: 24px;
      }

      .user-option .check-icon {
        margin-left: auto;
        --mdc-icon-size: 20px;
      }

      .user-option span {
        flex: 1;
        font-size: 16px;
        font-weight: 500;
      }

      .helper-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .helper-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .helper-option:hover {
        background: var(--secondary-background-color);
      }

      .helper-option span {
        font-size: 14px;
        color: var(--primary-text-color);
      }

      ha-checkbox {
        --mdc-checkbox-size: 20px;
      }
    `;
    }
};
__decorate([
    n({ type: Array })
], CompleteChoreDialog.prototype, "users", void 0);
__decorate([
    n({ type: Object })
], CompleteChoreDialog.prototype, "chore", void 0);
__decorate([
    r()
], CompleteChoreDialog.prototype, "selectedUserId", void 0);
__decorate([
    r()
], CompleteChoreDialog.prototype, "selectedHelperIds", void 0);
CompleteChoreDialog = __decorate([
    t("complete-chore-dialog")
], CompleteChoreDialog);

var completeDialog = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get CompleteChoreDialog () { return CompleteChoreDialog; }
});

let ArcadeJudgeDialog = class ArcadeJudgeDialog extends i {
    constructor() {
        super(...arguments);
        this.users = [];
        this.selectedJudgeId = null;
        this.notes = "";
        this.action = null;
    }
    render() {
        const elapsedTime = this.formatTime(this.session.elapsed_seconds);
        return x `
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Judge Arcade Session</div>

        <div class="dialog-content">
          <!-- Session details -->
          <div class="session-info">
            <h3>Session Details</h3>
            <div class="info-row">
              <span class="label">Chore:</span>
              <span class="value">${this.session.chore_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Completed by:</span>
              <span class="value">${this.session.user_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Time:</span>
              <span class="value time">${elapsedTime}</span>
            </div>
          </div>

          <!-- Judge selection -->
          ${this.users.length > 1
            ? x `
                <div class="section">
                  <h3>Select Judge <span class="optional">(optional)</span></h3>
                  <div class="user-list">
                    ${this.users.map((user) => x `
                        <div
                          class="user-option ${this.selectedJudgeId === user.id
                ? "selected"
                : ""}"
                          @click=${() => this._selectJudge(user.id)}
                        >
                          <ha-icon icon="mdi:account"></ha-icon>
                          <span>${user.display_name}</span>
                          ${this.selectedJudgeId === user.id
                ? x `<ha-icon
                                icon="mdi:check"
                                class="check-icon"
                              ></ha-icon>`
                : ""}
                        </div>
                      `)}
                  </div>
                </div>
              `
            : ""}

          <!-- Notes section -->
          <div class="section">
            <h3>Judge Notes <span class="optional">(optional)</span></h3>
            <textarea
              class="notes-textarea"
              placeholder="Add notes about the completion quality, issues found, etc."
              .value=${this.notes}
              @input=${this._notesChanged}
              rows="4"
            ></textarea>
          </div>

          <!-- Action buttons -->
          <div class="action-section">
            <mwc-button
              class="approve-button"
              @click=${() => this._setAction("approve")}
              raised
            >
              <ha-icon icon="mdi:check-circle"></ha-icon>
              Approve
            </mwc-button>
            <mwc-button
              class="deny-button"
              @click=${() => this._setAction("deny")}
              raised
            >
              <ha-icon icon="mdi:close-circle"></ha-icon>
              Deny
            </mwc-button>
          </div>
        </div>

        <mwc-button slot="secondaryAction" @click=${this._cancel}>
          Cancel
        </mwc-button>
      </ha-dialog>
    `;
    }
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }
    _selectJudge(userId) {
        this.selectedJudgeId = userId;
    }
    _notesChanged(e) {
        this.notes = e.target.value;
    }
    _setAction(action) {
        this.action = action;
        this._confirm();
    }
    _handleClosed() {
        this._cancel();
    }
    _cancel() {
        this.dispatchEvent(new CustomEvent("dialog-closed"));
    }
    _confirm() {
        if (!this.action) {
            return;
        }
        const eventName = this.action === "approve" ? "judge-approved" : "judge-denied";
        this.dispatchEvent(new CustomEvent(eventName, {
            detail: {
                judgeId: this.selectedJudgeId,
                notes: this.notes || undefined,
            },
        }));
    }
    static get styles() {
        return i$3 `
      .dialog-content {
        padding: 16px 24px;
        max-height: 70vh;
        overflow-y: auto;
      }

      .session-info {
        background: var(--secondary-background-color, #f5f5f5);
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 24px;
      }

      .session-info h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
      }

      .info-row:last-child {
        border-bottom: none;
      }

      .info-row .label {
        font-size: 14px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .info-row .value {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 600;
      }

      .info-row .value.time {
        font-family: monospace;
        font-size: 16px;
        color: var(--success-color, #4caf50);
      }

      .section {
        margin-bottom: 24px;
      }

      .section:last-child {
        margin-bottom: 0;
      }

      .section h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .optional {
        color: var(--secondary-text-color);
        font-weight: 400;
        font-size: 12px;
      }

      .user-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .user-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .user-option:hover {
        border-color: var(--primary-color);
        background: var(--secondary-background-color);
      }

      .user-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .user-option ha-icon {
        --mdc-icon-size: 24px;
      }

      .user-option .check-icon {
        margin-left: auto;
        --mdc-icon-size: 20px;
      }

      .user-option span {
        flex: 1;
        font-size: 16px;
        font-weight: 500;
      }

      .notes-textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        font-family: inherit;
        font-size: 14px;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        resize: vertical;
        min-height: 80px;
      }

      .notes-textarea:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .notes-textarea::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .action-section {
        display: flex;
        gap: 12px;
        margin-top: 24px;
      }

      .approve-button {
        flex: 1;
        --mdc-theme-primary: var(--success-color, #4caf50);
      }

      .approve-button ha-icon {
        --mdc-icon-size: 20px;
        margin-right: 8px;
      }

      .deny-button {
        flex: 1;
        --mdc-theme-primary: var(--error-color, #f44336);
      }

      .deny-button ha-icon {
        --mdc-icon-size: 20px;
        margin-right: 8px;
      }
    `;
    }
};
__decorate([
    n({ type: Array })
], ArcadeJudgeDialog.prototype, "users", void 0);
__decorate([
    n({ type: Object })
], ArcadeJudgeDialog.prototype, "session", void 0);
__decorate([
    r()
], ArcadeJudgeDialog.prototype, "selectedJudgeId", void 0);
__decorate([
    r()
], ArcadeJudgeDialog.prototype, "notes", void 0);
__decorate([
    r()
], ArcadeJudgeDialog.prototype, "action", void 0);
ArcadeJudgeDialog = __decorate([
    t("arcade-judge-dialog")
], ArcadeJudgeDialog);

var arcadeJudgeDialog = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ArcadeJudgeDialog () { return ArcadeJudgeDialog; }
});
//# sourceMappingURL=choreboard-ha-card.js.map
