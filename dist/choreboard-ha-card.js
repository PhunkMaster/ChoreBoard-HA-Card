function e(e,t,s,o){var i,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(r<3?i(n):r>3?i(t,s,n):i(t,s))||n);return r>3&&n&&Object.defineProperty(t,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;let r=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=i.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&i.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new r(s,e,o)},a=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},$=(e,t)=>!c(e,t),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,t);void 0!==o&&h(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){const{get:o,set:i}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const r=o?.call(this);i?.call(this,t),this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{if(s)e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of o){const o=document.createElement("style"),i=t.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=s.cssText,e.appendChild(o)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(void 0!==o&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(t,s.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const s=this.constructor,o=s._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=s.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=o;const r=i.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,s){if(void 0!==e){const o=this.constructor,i=this[e];if(s??=o.getPropertyOptions(e),!((s.hasChanged??$)(i,t)||s.useDefault&&s.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:i},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,s,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.1");const w=globalThis,C=w.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+k,U=`<${S}>`,P=document,O=()=>P.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,H=Array.isArray,T="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,N=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,D=/^(?:script|style|textarea|title)$/i,W=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),L=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,F=P.createTreeWalker(P,129);function J(e,t){if(!H(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const K=(e,t)=>{const s=e.length-1,o=[];let i,r=2===t?"<svg>":3===t?"<math>":"",n=M;for(let t=0;t<s;t++){const s=e[t];let a,c,h=-1,l=0;for(;l<s.length&&(n.lastIndex=l,c=n.exec(s),null!==c);)l=n.lastIndex,n===M?"!--"===c[1]?n=z:void 0!==c[1]?n=N:void 0!==c[2]?(D.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=R):void 0!==c[3]&&(n=R):n===R?">"===c[0]?(n=i??M,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?R:'"'===c[3]?B:j):n===B||n===j?n=R:n===z||n===N?n=M:(n=R,i=void 0);const d=n===R&&e[t+1].startsWith("/>")?" ":"";r+=n===M?s+U:h>=0?(o.push(a),s.slice(0,h)+E+s.slice(h)+k+d):s+k+(-2===h?t:d)}return[J(e,r+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Y{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let i=0,r=0;const n=e.length-1,a=this.parts,[c,h]=K(e,t);if(this.el=Y.createElement(c,s),F.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=F.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(E)){const t=h[r++],s=o.getAttribute(e).split(k),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:n[2],strings:s,ctor:"."===n[1]?ee:"?"===n[1]?te:"@"===n[1]?se:X}),o.removeAttribute(e)}else e.startsWith(k)&&(a.push({type:6,index:i}),o.removeAttribute(e));if(D.test(o.tagName)){const e=o.textContent.split(k),t=e.length-1;if(t>0){o.textContent=C?C.emptyScript:"";for(let s=0;s<t;s++)o.append(e[s],O()),F.nextNode(),a.push({type:2,index:++i});o.append(e[t],O())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(k,e+1));)a.push({type:7,index:i}),e+=k.length-1}i++}}static createElement(e,t){const s=P.createElement("template");return s.innerHTML=e,s}}function Z(e,t,s=e,o){if(t===L)return t;let i=void 0!==o?s._$Co?.[o]:s._$Cl;const r=I(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,s,o)),void 0!==o?(s._$Co??=[])[o]=i:s._$Cl=i),void 0!==i&&(t=Z(e,i._$AS(e,t.values),i,o)),t}class G{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,o=(e?.creationScope??P).importNode(t,!0);F.currentNode=o;let i=F.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new Q(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new oe(i,this,e)),this._$AV.push(t),a=s[++n]}r!==a?.index&&(i=F.nextNode(),r++)}return F.currentNode=P,o}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),I(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==L&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>H(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Y.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new G(o,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Y(e)),t}k(e){H(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,o=0;for(const i of e)o===t.length?t.push(s=new Q(this.O(O()),this.O(O()),this,this.options)):s=t[o],s._$AI(i),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(e,t=this,s,o){const i=this.strings;let r=!1;if(void 0===i)e=Z(this,e,t,0),r=!I(e)||e!==this._$AH&&e!==L,r&&(this._$AH=e);else{const o=e;let n,a;for(e=i[0],n=0;n<i.length-1;n++)a=Z(this,o[s+n],t,n),a===L&&(a=this._$AH[n]),r||=!I(a)||a!==this._$AH[n],a===q?e=q:e!==q&&(e+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!o&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class te extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class se extends X{constructor(e,t,s,o,i){super(e,t,s,o,i),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===L)return;const s=this._$AH,o=e===q&&s!==q||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==q&&(s===q||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ie=w.litHtmlPolyfillSupport;ie?.(Y,Q),(w.litHtmlVersions??=[]).push("3.3.1");const re=globalThis;class ne extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const o=s?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=s?.renderBefore??null;o._$litPart$=i=new Q(t.insertBefore(O(),e),e,void 0,s??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}ne._$litElement$=!0,ne.finalized=!0,re.litElementHydrateSupport?.({LitElement:ne});const ae=re.litElementPolyfillSupport;ae?.({LitElement:ne}),(re.litElementVersions??=[]).push("4.2.1");const ce=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},le=(e=he,t,s)=>{const{kind:o,metadata:i}=s;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),r.set(s.name,e),"accessor"===o){const{name:o}=s;return{set(s){const i=t.get.call(this);t.set.call(this,s),this.requestUpdate(o,i,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=s;return function(s){const i=this[o];t.call(this,s),this.requestUpdate(o,i,e)}}throw Error("Unsupported decorator location: "+o)};function de(e){return(t,s)=>"object"==typeof s?le(e,t,s):((e,t,s)=>{const o=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),o?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function pe(e){return de({...e,state:!0,attribute:!1})}let ue=class extends ne{setConfig(e){if(!e)throw new Error("Invalid configuration");if(!e.entity)throw new Error('You must specify an "entity" (e.g., sensor.choreboard_my_chores_ash). Please configure the ChoreBoard integration first.');this.config={show_header:!0,show_points:!0,show_completed:!0,show_overdue_only:!1,...e}}getCardSize(){const e=this.getChores();return Math.max(2,Math.ceil(e.length/2)+1)}static getStubConfig(){return{type:"custom:choreboard-card",title:"My Chores",entity:"sensor.choreboard_my_chores_ash",show_header:!0,show_points:!0,show_completed:!0}}static getConfigElement(){return document.createElement("choreboard-card-editor")}getChores(){if(!this.hass||!this.config.entity)return[];const e=this.hass.states[this.config.entity];if(!e)return console.warn(`ChoreBoard entity not found: ${this.config.entity}`),[];return(e.attributes.chores||[]).filter(e=>!(!this.config.show_completed&&"completed"===e.status)&&!(this.config.show_overdue_only&&!e.is_overdue))}async completeChore(e){if(this.hass)if("completed"!==e.status)try{await this.hass.callService("choreboard","complete_chore",{instance_id:e.id}),this.showToast(`Marked "${e.name}" as complete`)}catch(e){console.error("Error marking chore as complete:",e),this.showToast("Failed to mark chore as complete",!0)}else this.showToast("This chore is already marked as completed")}showToast(e,t=!1){const s=new CustomEvent("hass-notification",{detail:{message:e,duration:t?5e3:3e3},bubbles:!0,composed:!0});this.dispatchEvent(s)}getChoreStateClass(e){return"completed"===e.status?"state-completed":e.is_overdue?"state-overdue":"state-pending"}getChoreStateIcon(e){return"completed"===e.status?"mdi:check-circle":e.is_overdue?"mdi:alert-circle":"mdi:circle-outline"}getUsername(){if(!this.hass||!this.config.entity)return"";const e=this.hass.states[this.config.entity];if(!e)return"";return e.attributes.username||""}isPoolChore(e){return"pool"===e.status||this.config.entity.endsWith("_chores")&&!this.config.entity.includes("_my_chores")}getUsers(){if(!this.hass)return[];for(const e of Object.keys(this.hass.states))if(e.startsWith("sensor.choreboard_")){const t=this.hass.states[e];if(t.attributes.users&&Array.isArray(t.attributes.users))return t.attributes.users}return[]}async claimChore(e){if(!this.hass)return;const t=this.getUsers();if(0===t.length)return void this.showToast("Unable to load users list",!0);await Promise.resolve().then(function(){return fe});const s=document.createElement("claim-chore-dialog");s.users=t,s.chore=e,s.addEventListener("dialog-confirmed",async t=>{const o=t.detail.userId;try{await this.hass.callService("choreboard","claim_chore",{chore_id:e.id,assign_to_user_id:o}),this.showToast("Chore claimed successfully")}catch(e){console.error("Error claiming chore:",e),this.showToast("Failed to claim chore",!0)}finally{s.remove()}}),s.addEventListener("dialog-closed",()=>{s.remove()}),document.body.appendChild(s)}async completePoolChore(e){if(!this.hass)return;const t=this.getUsers();if(0===t.length)return void this.showToast("Unable to load users list",!0);await Promise.resolve().then(function(){return ye});const s=document.createElement("complete-chore-dialog");s.users=t,s.chore=e,s.addEventListener("dialog-confirmed",async t=>{const o=t,i=o.detail.userId,r=o.detail.helperIds||[];try{await this.hass.callService("choreboard","mark_complete",{chore_id:e.id,completed_by_user_id:i,helpers:r}),this.showToast("Chore marked as complete")}catch(e){console.error("Error completing chore:",e),this.showToast("Failed to complete chore",!0)}finally{s.remove()}}),s.addEventListener("dialog-closed",()=>{s.remove()}),document.body.appendChild(s)}render(){if(!this.config||!this.hass)return W``;const e=this.getUsername(),t=this.config.title||`${e}'s Chores`||"Chores",s=this.getChores();return 0===s.length?W`
        <ha-card>
          ${this.config.show_header?W`
                <div class="card-header">
                  <div class="name">${t}</div>
                </div>
              `:""}
          <div class="card-content">
            <div class="warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <div>
                <strong>No chores found</strong>
                <p>
                  ${e?`${e} has no chores matching the current filters.`:"Please ensure the ChoreBoard integration is installed and configured."}
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
      `:W`
      <ha-card>
        ${this.config.show_header?W`
              <div class="card-header">
                <div class="name">${t}</div>
                <div class="badge">${s.length} chores</div>
              </div>
            `:""}
        <div class="card-content">
          <div class="chore-list">
            ${s.map(e=>W`
                <div class="chore-item ${this.getChoreStateClass(e)}">
                  <div class="chore-status">
                    <ha-icon icon="${this.getChoreStateIcon(e)}"></ha-icon>
                  </div>
                  <div class="chore-details">
                    <div class="chore-header">
                      <div class="chore-name">${e.name}</div>
                      ${this.config.show_points&&e.points?W`<div class="chore-points">
                            ${"string"==typeof e.points?parseFloat(e.points):e.points} pts
                          </div>`:""}
                    </div>
                    <div class="chore-meta">
                      ${e.due_date?W`<span class="meta-item"
                            ><ha-icon icon="mdi:calendar"></ha-icon
                            >${e.due_date}</span
                          >`:""}
                      ${e.is_overdue?W`<span class="meta-item overdue"
                            ><ha-icon icon="mdi:clock-alert"></ha-icon
                            >Overdue</span
                          >`:""}
                    </div>
                  </div>
                  <div class="chore-action">
                    ${"completed"===e.status?W`<div class="completed-badge">✓ Done</div>`:this.isPoolChore(e)?W`
                            <div class="pool-actions">
                              <mwc-button @click=${()=>this.claimChore(e)}>
                                Claim
                              </mwc-button>
                              <mwc-button
                                @click=${()=>this.completePoolChore(e)}
                              >
                                Complete
                              </mwc-button>
                            </div>
                          `:W`
                            <mwc-button @click=${()=>this.completeChore(e)}>
                              Complete
                            </mwc-button>
                          `}
                  </div>
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `}static get styles(){return n`
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

      .badge {
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
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

      mwc-button {
        --mdc-theme-primary: var(--primary-color);
      }

      .completed-badge {
        background: var(--success-color, #4caf50);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
      }
    `}};e([de({attribute:!1})],ue.prototype,"hass",void 0),e([pe()],ue.prototype,"config",void 0),ue=e([ce("choreboard-card")],ue),console.info("%c ChoreBoard Card %c 0.1.0 ","color: white; background: #039be5; font-weight: 700;","color: #039be5; background: white; font-weight: 700;");let ge=class extends ne{setConfig(e){this.config=e}getMyChoresSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.choreboard_my_chores_")||e.startsWith("sensor.choreboard_my_immediate_chores_")||e.startsWith("sensor.")&&e.endsWith("_my_chores")||e.startsWith("sensor.")&&e.endsWith("_my_immediate_chores")||e.startsWith("sensor.")&&e.endsWith("_chores")):[]}render(){if(!this.hass||!this.config)return W``;const e=this.getMyChoresSensors();return W`
      <div class="card-config">
        ${0===e.length?W`
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
            `:""}

        <div class="option">
          <label for="title">Title:</label>
          <input
            id="title"
            type="text"
            .value=${this.config.title||""}
            @input=${this.titleChanged}
            placeholder="My Chores"
          />
        </div>

        <div class="option">
          <label for="entity">ChoreBoard Sensor:</label>
          <select
            id="entity"
            .value=${this.config.entity||""}
            @change=${this.entityChanged}
          >
            <option value="">Select a sensor...</option>
            ${e.map(e=>W`
                <option
                  value=${e}
                  ?selected=${this.config.entity===e}
                >
                  ${this.getEntityDisplayName(e)}
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
              ?checked=${!1!==this.config.show_header}
              @change=${this.showHeaderChanged}
            />
            Show Header
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${!1!==this.config.show_points}
              @change=${this.showPointsChanged}
            />
            Show Points
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${!1!==this.config.show_completed}
              @change=${this.showCompletedChanged}
            />
            Show Completed Chores
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${!0===this.config.show_overdue_only}
              @change=${this.showOverdueOnlyChanged}
            />
            Show Only Overdue Chores
          </label>
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
    `}getEntityDisplayName(e){const t=this.hass?.states[e];if(t?.attributes?.friendly_name)return t.attributes.friendly_name;const s=e.split(".");if(2===s.length&&s[1].startsWith("choreboard_")){const e=s[1].replace("choreboard_","").replace(/_/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}return e}entityChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,entity:t.value},this.configChanged())}titleChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,title:t.value},this.configChanged())}showHeaderChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_header:t.checked},this.configChanged())}showPointsChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_points:t.checked},this.configChanged())}showCompletedChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_completed:t.checked},this.configChanged())}showOverdueOnlyChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_overdue_only:t.checked},this.configChanged())}configChanged(){const e=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(e)}static get styles(){return n`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
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
    `}};e([de({attribute:!1})],ge.prototype,"hass",void 0),e([pe()],ge.prototype,"config",void 0),ge=e([ce("choreboard-card-editor")],ge),window.customCards=window.customCards||[],window.customCards.push({type:"choreboard-card",name:"ChoreBoard Card",description:"A custom card for managing and tracking chores in Home Assistant",preview:!0,documentationURL:"https://github.com/yourusername/choreboard-ha-card"}),customElements.define("choreboard-card",ue),customElements.define("choreboard-card-editor",ge),console.info("ChoreBoard Card has been loaded");let me=class extends ne{constructor(){super(...arguments),this.users=[],this.selectedUserId=null}render(){return W`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Claim: ${this.chore.name}</div>

        <div class="dialog-content">
          <div class="section">
            <h3>Who is claiming this chore?</h3>
            <div class="user-list">
              ${this.users.map(e=>W`
                  <div
                    class="user-option ${this.selectedUserId===e.id?"selected":""}"
                    @click=${()=>this._selectUser(e.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${e.display_name}</span>
                    ${this.selectedUserId===e.id?W`<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`:""}
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
    `}_selectUser(e){this.selectedUserId=e}_handleClosed(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed"))}_confirm(){this.selectedUserId&&this.dispatchEvent(new CustomEvent("dialog-confirmed",{detail:{userId:this.selectedUserId}}))}static get styles(){return n`
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
    `}};e([de({type:Array})],me.prototype,"users",void 0),e([de({type:Object})],me.prototype,"chore",void 0),e([pe()],me.prototype,"selectedUserId",void 0),me=e([ce("claim-chore-dialog")],me);var fe=Object.freeze({__proto__:null,get ClaimChoreDialog(){return me}});let ve=class extends ne{constructor(){super(...arguments),this.users=[],this.selectedUserId=null,this.selectedHelperIds=[]}render(){const e=this.users.filter(e=>e.id!==this.selectedUserId);return W`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Complete: ${this.chore.name}</div>

        <div class="dialog-content">
          <!-- Who completed section -->
          <div class="section">
            <h3>Who completed this chore? <span class="required">*</span></h3>
            <div class="user-list">
              ${this.users.map(e=>W`
                  <div
                    class="user-option ${this.selectedUserId===e.id?"selected":""}"
                    @click=${()=>this._selectUser(e.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${e.display_name}</span>
                    ${this.selectedUserId===e.id?W`<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`:""}
                  </div>
                `)}
            </div>
          </div>

          <!-- Helpers section -->
          ${this.selectedUserId&&e.length>0?W`
                <div class="section">
                  <h3>Who helped? <span class="optional">(optional)</span></h3>
                  <div class="helper-list">
                    ${e.map(e=>W`
                        <label class="helper-option">
                          <ha-checkbox
                            .checked=${this.selectedHelperIds.includes(e.id)}
                            @change=${t=>this._toggleHelper(e.id,t.target.checked)}
                          ></ha-checkbox>
                          <span>${e.display_name}</span>
                        </label>
                      `)}
                  </div>
                </div>
              `:""}
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
    `}_selectUser(e){this.selectedUserId!==e&&(this.selectedHelperIds=this.selectedHelperIds.filter(t=>t!==e)),this.selectedUserId=e}_toggleHelper(e,t){t?this.selectedHelperIds.includes(e)||(this.selectedHelperIds=[...this.selectedHelperIds,e]):this.selectedHelperIds=this.selectedHelperIds.filter(t=>t!==e)}_handleClosed(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed"))}_confirm(){this.selectedUserId&&this.dispatchEvent(new CustomEvent("dialog-confirmed",{detail:{userId:this.selectedUserId,helperIds:this.selectedHelperIds}}))}static get styles(){return n`
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
    `}};e([de({type:Array})],ve.prototype,"users",void 0),e([de({type:Object})],ve.prototype,"chore",void 0),e([pe()],ve.prototype,"selectedUserId",void 0),e([pe()],ve.prototype,"selectedHelperIds",void 0),ve=e([ce("complete-chore-dialog")],ve);var ye=Object.freeze({__proto__:null,get CompleteChoreDialog(){return ve}});
