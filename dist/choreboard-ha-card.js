function t(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new r(o,t,i)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",b=g.reactiveElementPolyfillSupport,v=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},y=(t,e)=>!c(t,e),_={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);s?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:x).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=i;const r=s.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){const i=this.constructor,s=this[t];if(o??=i.getPropertyOptions(t),!((o.hasChanged??y)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:s},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,b?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.1");const w=globalThis,C=w.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,U=`<${S}>`,P=document,O=()=>P.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,z="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,B=/>/g,N=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,j=/"/g,D=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),L=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),q=new WeakMap,V=P.createTreeWalker(P,129);function F(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const J=(t,e)=>{const o=t.length-1,i=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=M;for(let e=0;e<o;e++){const o=t[e];let a,c,l=-1,d=0;for(;d<o.length&&(n.lastIndex=d,c=n.exec(o),null!==c);)d=n.lastIndex,n===M?"!--"===c[1]?n=T:void 0!==c[1]?n=B:void 0!==c[2]?(D.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=N):void 0!==c[3]&&(n=N):n===N?">"===c[0]?(n=s??M,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?N:'"'===c[3]?j:R):n===j||n===R?n=N:n===T||n===B?n=M:(n=N,s=void 0);const h=n===N&&t[e+1].startsWith("/>")?" ":"";r+=n===M?o+U:l>=0?(i.push(a),o.slice(0,l)+k+o.slice(l)+E+h):o+E+(-2===l?e:h)}return[F(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,o),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=l[r++],o=i.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:o,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?ot:X}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(D.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=C?C.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],O()),V.nextNode(),a.push({type:2,index:++s});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const o=P.createElement("template");return o.innerHTML=t,o}}function Z(t,e,o=t,i){if(e===L)return e;let s=void 0!==i?o._$Co?.[i]:o._$Cl;const r=I(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=s:o._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);V.currentNode=i;let s=V.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new it(s,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(s=V.nextNode(),r++)}return V.currentNode=P,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),I(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=K.createElement(F(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new Q(this.O(O()),this.O(O()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=Y}_$AI(t,e=this,o,i){const s=this.strings;let r=!1;if(void 0===s)t=Z(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==L,r&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Z(this,i[o+n],e,n),a===L&&(a=this._$AH[n]),r||=!I(a)||a!==this._$AH[n],a===Y?t=Y:t!==Y&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class ot extends X{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??Y)===L)return;const o=this._$AH,i=t===Y&&o!==Y||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==Y&&(o===Y||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(K,Q),(w.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=o?.renderBefore??null;i._$litPart$=s=new Q(e.insertBefore(O(),t),t,void 0,o??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.1");const ct=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:y},dt=(t=lt,e,o)=>{const{kind:i,metadata:s}=o;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,s,t)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const s=this[i];e.call(this,o),this.requestUpdate(i,s,t)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,o)=>"object"==typeof o?dt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function pt(t){return ht({...t,state:!0,attribute:!1})}let ut=class extends nt{setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity)throw new Error('You must specify an "entity" (e.g., sensor.choreboard_my_chores_ash). Please configure the ChoreBoard integration first.');this.config={show_header:!0,show_points:!0,show_completed:!0,show_overdue_only:!1,...t}}getCardSize(){const t=this.getChores();return Math.max(2,Math.ceil(t.length/2)+1)}static getStubConfig(){return{type:"custom:choreboard-card",title:"My Chores",entity:"sensor.choreboard_my_chores_ash",show_header:!0,show_points:!0,show_completed:!0}}static getConfigElement(){return document.createElement("choreboard-card-editor")}getChores(){if(!this.hass||!this.config.entity)return[];const t=this.hass.states[this.config.entity];if(!t)return console.warn(`ChoreBoard entity not found: ${this.config.entity}`),[];return(t.attributes.chores||[]).filter(t=>!(!this.config.show_completed&&"completed"===t.status)&&!(this.config.show_overdue_only&&!t.is_overdue))}async completeChore(t){if(this.hass)if("completed"!==t.status)try{await this.hass.callService("choreboard","complete_chore",{instance_id:t.id}),this.showToast(`Marked "${t.name}" as complete`)}catch(t){console.error("Error marking chore as complete:",t),this.showToast("Failed to mark chore as complete",!0)}else this.showToast("This chore is already marked as completed")}showToast(t,e=!1){const o=new CustomEvent("hass-notification",{detail:{message:t,duration:e?5e3:3e3},bubbles:!0,composed:!0});this.dispatchEvent(o)}getChoreStateClass(t){return"completed"===t.status?"state-completed":t.is_overdue?"state-overdue":"state-pending"}getChoreStateIcon(t){return"completed"===t.status?"mdi:check-circle":t.is_overdue?"mdi:alert-circle":"mdi:circle-outline"}getUsername(){if(!this.hass||!this.config.entity)return"";const t=this.hass.states[this.config.entity];if(!t)return"";return t.attributes.username||""}isPoolChore(t){return"pool"===t.status||this.config.entity.endsWith("_chores")&&!this.config.entity.includes("_my_chores")}getUsers(){if(!this.hass)return[];const t=this.hass.states["sensor.users"];if(t?.attributes.users&&Array.isArray(t.attributes.users))return t.attributes.users;const e=this.hass.states["sensor.choreboard_users"];if(e?.attributes.users&&Array.isArray(e.attributes.users))return e.attributes.users;for(const t of Object.keys(this.hass.states))if(t.startsWith("sensor.choreboard_")){const e=this.hass.states[t];if(e.attributes.users&&Array.isArray(e.attributes.users))return e.attributes.users}return[]}async claimChore(t){if(!this.hass)return;const e=this.getUsers();if(0===e.length)return void this.showToast("Unable to load users list",!0);await Promise.resolve().then(function(){return ft});const o=document.createElement("claim-chore-dialog");o.users=e,o.chore=t,o.addEventListener("dialog-confirmed",async e=>{const i=e.detail.userId;try{await this.hass.callService("choreboard","claim_chore",{chore_id:t.id,assign_to_user_id:i}),this.showToast("Chore claimed successfully")}catch(t){console.error("Error claiming chore:",t),this.showToast("Failed to claim chore",!0)}finally{o.remove()}}),o.addEventListener("dialog-closed",()=>{o.remove()}),document.body.appendChild(o)}async completePoolChore(t){if(!this.hass)return;const e=this.getUsers();if(0===e.length)return void this.showToast("Unable to load users list",!0);await Promise.resolve().then(function(){return vt});const o=document.createElement("complete-chore-dialog");o.users=e,o.chore=t,o.addEventListener("dialog-confirmed",async e=>{const i=e,s=i.detail.userId,r=i.detail.helperIds||[];try{await this.hass.callService("choreboard","mark_complete",{chore_id:t.id,completed_by_user_id:s,helpers:r}),this.showToast("Chore marked as complete")}catch(t){console.error("Error completing chore:",t),this.showToast("Failed to complete chore",!0)}finally{o.remove()}}),o.addEventListener("dialog-closed",()=>{o.remove()}),document.body.appendChild(o)}render(){if(!this.config||!this.hass)return W``;const t=this.getUsername(),e=this.config.title||`${t}'s Chores`||"Chores",o=this.getChores();return 0===o.length?W`
        <ha-card>
          ${this.config.show_header?W`
                <div class="card-header">
                  <div class="name">${e}</div>
                </div>
              `:""}
          <div class="card-content">
            <div class="warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <div>
                <strong>No chores found</strong>
                <p>
                  ${t?`${t} has no chores matching the current filters.`:"Please ensure the ChoreBoard integration is installed and configured."}
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
                <div class="name">${e}</div>
                <div class="badge">${o.length} chores</div>
              </div>
            `:""}
        <div class="card-content">
          <div class="chore-list">
            ${o.map(t=>W`
                <div class="chore-item ${this.getChoreStateClass(t)}">
                  <div class="chore-status">
                    <ha-icon icon="${this.getChoreStateIcon(t)}"></ha-icon>
                  </div>
                  <div class="chore-details">
                    <div class="chore-header">
                      <div class="chore-name">${t.name}</div>
                      ${this.config.show_points&&t.points?W`<div class="chore-points">
                            ${"string"==typeof t.points?parseFloat(t.points):t.points} pts
                          </div>`:""}
                    </div>
                    <div class="chore-meta">
                      ${t.due_date?W`<span class="meta-item"
                            ><ha-icon icon="mdi:calendar"></ha-icon
                            >${t.due_date}</span
                          >`:""}
                      ${t.is_overdue?W`<span class="meta-item overdue"
                            ><ha-icon icon="mdi:clock-alert"></ha-icon
                            >Overdue</span
                          >`:""}
                    </div>
                  </div>
                  <div class="chore-action">
                    ${"completed"===t.status?W`<div class="completed-badge">✓ Done</div>`:this.isPoolChore(t)?W`
                            <div class="pool-actions">
                              <button
                                class="action-button action-button--primary"
                                @click=${()=>this.completePoolChore(t)}
                                aria-label="Mark chore as complete"
                              >
                                <ha-icon icon="mdi:check-circle"></ha-icon>
                                <span>Complete</span>
                              </button>
                              <button
                                class="action-button action-button--secondary"
                                @click=${()=>this.claimChore(t)}
                                aria-label="Claim this chore"
                              >
                                <ha-icon icon="mdi:hand-okay"></ha-icon>
                                <span>Claim</span>
                              </button>
                            </div>
                          `:W`
                            <button
                              class="action-button action-button--primary"
                              @click=${()=>this.completeChore(t)}
                              aria-label="Mark chore as complete"
                            >
                              <ha-icon icon="mdi:check-circle"></ha-icon>
                              <span>Complete</span>
                            </button>
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
        display: inline-flex;
        align-items: center;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        line-height: 1;
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
        display: inline-flex;
        align-items: center;
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        line-height: 1;
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

      /* Button Container */
      .pool-actions {
        display: flex;
        gap: 12px;
        width: 100%;
        margin-top: 8px;
      }

      /* Responsive Layout */
      @media (min-width: 600px) {
        .pool-actions {
          flex-direction: row;
        }

        .pool-actions .action-button {
          flex: 1;
          min-width: 120px;
        }
      }

      @media (max-width: 599px) {
        .pool-actions {
          flex-direction: column;
        }

        .pool-actions .action-button {
          width: 100%;
        }
      }

      /* Base Button Styles */
      .action-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 24px;
        min-height: 48px;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        line-height: 1;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        outline: none;
        position: relative;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
      }

      .action-button ha-icon {
        --mdc-icon-size: 20px;
        flex-shrink: 0;
      }

      .action-button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .action-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Primary Button (Filled) */
      .action-button--primary {
        background: var(--primary-color);
        color: var(--text-primary-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      }

      .action-button--primary:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
      }

      .action-button--primary:active {
        transform: translateY(0);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        transition: all 0.1s;
      }

      /* Secondary Button (Outlined) */
      .action-button--secondary {
        background: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        box-shadow: none;
      }

      .action-button--secondary:hover {
        background: var(--secondary-background-color);
        transform: translateY(-2px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .action-button--secondary:active {
        background: var(--divider-color);
        transform: translateY(0);
        box-shadow: none;
        transition: all 0.1s;
      }

      /* Single Action Button (Not in pool-actions) */
      .chore-action .action-button {
        min-width: 120px;
      }

      .completed-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: var(--success-color, #4caf50);
        color: white;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `}};t([ht({attribute:!1})],ut.prototype,"hass",void 0),t([pt()],ut.prototype,"config",void 0),ut=t([ct("choreboard-card")],ut),console.info("%c ChoreBoard Card %c 1.1.2 ","color: white; background: #039be5; font-weight: 700;","color: #039be5; background: white; font-weight: 700;");let gt=class extends nt{setConfig(t){this.config=t}getMyChoresSensors(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("sensor.choreboard_my_chores_")||t.startsWith("sensor.choreboard_my_immediate_chores_")||t.startsWith("sensor.")&&t.endsWith("_my_chores")||t.startsWith("sensor.")&&t.endsWith("_my_immediate_chores")||t.startsWith("sensor.")&&t.endsWith("_chores")):[]}render(){if(!this.hass||!this.config)return W``;const t=this.getMyChoresSensors();return W`
      <div class="card-config">
        ${0===t.length?W`
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
            ${t.map(t=>W`
                <option
                  value=${t}
                  ?selected=${this.config.entity===t}
                >
                  ${this.getEntityDisplayName(t)}
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
    `}getEntityDisplayName(t){const e=this.hass?.states[t];if(e?.attributes?.friendly_name)return e.attributes.friendly_name;const o=t.split(".");if(2===o.length&&o[1].startsWith("choreboard_")){const t=o[1].replace("choreboard_","").replace(/_/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}return t}entityChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,entity:e.value},this.configChanged())}titleChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,title:e.value},this.configChanged())}showHeaderChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,show_header:e.checked},this.configChanged())}showPointsChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,show_points:e.checked},this.configChanged())}showCompletedChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,show_completed:e.checked},this.configChanged())}showOverdueOnlyChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,show_overdue_only:e.checked},this.configChanged())}configChanged(){const t=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(t)}static get styles(){return n`
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
    `}};t([ht({attribute:!1})],gt.prototype,"hass",void 0),t([pt()],gt.prototype,"config",void 0),gt=t([ct("choreboard-card-editor")],gt),window.customCards=window.customCards||[],window.customCards.push({type:"choreboard-card",name:"ChoreBoard Card",description:"A custom card for managing and tracking chores in Home Assistant",preview:!0,documentationURL:"https://github.com/yourusername/choreboard-ha-card"}),customElements.get("choreboard-card")?console.warn("ChoreBoard Card was already registered - skipping duplicate registration"):(customElements.define("choreboard-card",ut),console.info("ChoreBoard Card registered")),customElements.get("choreboard-card-editor")?console.warn("ChoreBoard Card Editor was already registered - skipping duplicate registration"):(customElements.define("choreboard-card-editor",gt),console.info("ChoreBoard Card Editor registered")),console.info("ChoreBoard Card has been loaded");let mt=class extends nt{constructor(){super(...arguments),this.users=[],this.selectedUserId=null}render(){return W`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Claim: ${this.chore.name}</div>

        <div class="dialog-content">
          <div class="section">
            <h3>Who is claiming this chore?</h3>
            <div class="user-list">
              ${this.users.map(t=>W`
                  <div
                    class="user-option ${this.selectedUserId===t.id?"selected":""}"
                    @click=${()=>this._selectUser(t.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${t.display_name}</span>
                    ${this.selectedUserId===t.id?W`<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`:""}
                  </div>
                `)}
            </div>
          </div>
        </div>

        <div slot="secondaryAction">
          <button
            class="dialog-button dialog-button--text"
            @click=${this._cancel}
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
        <div slot="primaryAction">
          <button
            class="dialog-button dialog-button--primary"
            @click=${this._confirm}
            ?disabled=${!this.selectedUserId}
            aria-label="Claim this chore"
          >
            <ha-icon icon="mdi:check"></ha-icon>
            <span>Claim</span>
          </button>
        </div>
      </ha-dialog>
    `}_selectUser(t){this.selectedUserId=t}_handleClosed(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed"))}_confirm(){this.selectedUserId&&this.dispatchEvent(new CustomEvent("dialog-confirmed",{detail:{userId:this.selectedUserId}}))}static get styles(){return n`
      ha-dialog {
        --dialog-content-padding: 24px;
        --dialog-border-radius: 12px;
      }

      .dialog-content {
        min-width: 300px;
        max-width: 500px;
      }

      .section {
        margin-bottom: 24px;
      }

      .section:last-child {
        margin-bottom: 0;
      }

      .section h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .user-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 400px;
        overflow-y: auto;
      }

      .user-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        position: relative;
      }

      .user-option:hover {
        border-color: var(--primary-color);
        background: var(--secondary-background-color);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .user-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color);
        box-shadow: 0 2px 8px rgba(var(--rgb-primary-color, 3, 169, 244), 0.3);
      }

      .user-option.selected:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(var(--rgb-primary-color, 3, 169, 244), 0.4);
      }

      .user-option ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }

      .user-option .check-icon {
        margin-left: auto;
        --mdc-icon-size: 24px;
        animation: checkmark 0.2s ease-in-out;
      }

      @keyframes checkmark {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }

      .user-option span {
        flex: 1;
        font-size: 16px;
        font-weight: 500;
      }

      /* Dialog Buttons */
      .dialog-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px 24px;
        min-height: 40px;
        min-width: 80px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.15s ease;
        border: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      .dialog-button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .dialog-button ha-icon {
        --mdc-icon-size: 18px;
      }

      /* Primary Dialog Button */
      .dialog-button--primary {
        background: var(--primary-color);
        color: var(--text-primary-color);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }

      .dialog-button--primary:hover:not(:disabled) {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }

      .dialog-button--primary:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      }

      .dialog-button--primary:disabled {
        background: var(--disabled-text-color);
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Text Dialog Button (Cancel) */
      .dialog-button--text {
        background: transparent;
        color: var(--primary-color);
        box-shadow: none;
      }

      .dialog-button--text:hover {
        background: var(--secondary-background-color);
      }

      .dialog-button--text:active {
        background: var(--divider-color);
      }
    `}};t([ht({type:Array})],mt.prototype,"users",void 0),t([ht({type:Object})],mt.prototype,"chore",void 0),t([pt()],mt.prototype,"selectedUserId",void 0),mt=t([ct("claim-chore-dialog")],mt);var ft=Object.freeze({__proto__:null,get ClaimChoreDialog(){return mt}});let bt=class extends nt{constructor(){super(...arguments),this.users=[],this.selectedUserId=null,this.selectedHelperIds=[]}render(){const t=this.users.filter(t=>t.id!==this.selectedUserId);return W`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Complete: ${this.chore.name}</div>

        <div class="dialog-content">
          <!-- Who completed section -->
          <div class="section">
            <h3>Who completed this chore? <span class="required">*</span></h3>
            <div class="user-list">
              ${this.users.map(t=>W`
                  <div
                    class="user-option ${this.selectedUserId===t.id?"selected":""}"
                    @click=${()=>this._selectUser(t.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${t.display_name}</span>
                    ${this.selectedUserId===t.id?W`<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`:""}
                  </div>
                `)}
            </div>
          </div>

          <!-- Helpers section -->
          ${this.selectedUserId&&t.length>0?W`
                <div class="section">
                  <h3>Who helped? <span class="optional">(optional)</span></h3>
                  <div class="helper-list">
                    ${t.map(t=>W`
                        <label class="helper-option">
                          <ha-checkbox
                            .checked=${this.selectedHelperIds.includes(t.id)}
                            @change=${e=>this._toggleHelper(t.id,e.target.checked)}
                          ></ha-checkbox>
                          <span>${t.display_name}</span>
                        </label>
                      `)}
                  </div>
                </div>
              `:""}
        </div>

        <div slot="secondaryAction">
          <button
            class="dialog-button dialog-button--text"
            @click=${this._cancel}
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
        <div slot="primaryAction">
          <button
            class="dialog-button dialog-button--primary"
            @click=${this._confirm}
            ?disabled=${!this.selectedUserId}
            aria-label="Mark chore as complete"
          >
            <ha-icon icon="mdi:check"></ha-icon>
            <span>Complete</span>
          </button>
        </div>
      </ha-dialog>
    `}_selectUser(t){this.selectedUserId!==t&&(this.selectedHelperIds=this.selectedHelperIds.filter(e=>e!==t)),this.selectedUserId=t}_toggleHelper(t,e){e?this.selectedHelperIds.includes(t)||(this.selectedHelperIds=[...this.selectedHelperIds,t]):this.selectedHelperIds=this.selectedHelperIds.filter(e=>e!==t)}_handleClosed(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed"))}_confirm(){this.selectedUserId&&this.dispatchEvent(new CustomEvent("dialog-confirmed",{detail:{userId:this.selectedUserId,helperIds:this.selectedHelperIds}}))}static get styles(){return n`
      ha-dialog {
        --dialog-content-padding: 24px;
        --dialog-border-radius: 12px;
      }

      .dialog-content {
        min-width: 300px;
        max-width: 500px;
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
        margin: 0 0 16px 0;
        font-size: 16px;
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
        font-size: 14px;
      }

      .user-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 300px;
        overflow-y: auto;
      }

      .user-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        position: relative;
      }

      .user-option:hover {
        border-color: var(--primary-color);
        background: var(--secondary-background-color);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .user-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color);
        box-shadow: 0 2px 8px rgba(var(--rgb-primary-color, 3, 169, 244), 0.3);
      }

      .user-option.selected:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(var(--rgb-primary-color, 3, 169, 244), 0.4);
      }

      .user-option ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }

      .user-option .check-icon {
        margin-left: auto;
        --mdc-icon-size: 24px;
        animation: checkmark 0.2s ease-in-out;
      }

      @keyframes checkmark {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
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
        padding: 12px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
      }

      .helper-option:hover {
        background: var(--secondary-background-color);
        border-color: var(--primary-color);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .helper-option span {
        flex: 1;
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      ha-checkbox {
        --mdc-checkbox-size: 24px;
      }

      /* Dialog Buttons */
      .dialog-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px 24px;
        min-height: 40px;
        min-width: 80px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.15s ease;
        border: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      .dialog-button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .dialog-button ha-icon {
        --mdc-icon-size: 18px;
      }

      /* Primary Dialog Button */
      .dialog-button--primary {
        background: var(--primary-color);
        color: var(--text-primary-color);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }

      .dialog-button--primary:hover:not(:disabled) {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }

      .dialog-button--primary:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      }

      .dialog-button--primary:disabled {
        background: var(--disabled-text-color);
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Text Dialog Button (Cancel) */
      .dialog-button--text {
        background: transparent;
        color: var(--primary-color);
        box-shadow: none;
      }

      .dialog-button--text:hover {
        background: var(--secondary-background-color);
      }

      .dialog-button--text:active {
        background: var(--divider-color);
      }
    `}};t([ht({type:Array})],bt.prototype,"users",void 0),t([ht({type:Object})],bt.prototype,"chore",void 0),t([pt()],bt.prototype,"selectedUserId",void 0),t([pt()],bt.prototype,"selectedHelperIds",void 0),bt=t([ct("complete-chore-dialog")],bt);var vt=Object.freeze({__proto__:null,get CompleteChoreDialog(){return bt}});
