function e(e,t,s,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,o);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a);return r>3&&a&&Object.defineProperty(t,s,a),a}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;let r=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=i.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&i.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new r(s,e,o)},n=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},x=(e,t)=>!c(e,t),_={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,t);void 0!==o&&d(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){const{get:o,set:i}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const r=o?.call(this);i?.call(this,t),this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{if(s)e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of o){const o=document.createElement("style"),i=t.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=s.cssText,e.appendChild(o)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(void 0!==o&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(t,s.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const s=this.constructor,o=s._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=s.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=o;const r=i.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,s){if(void 0!==e){const o=this.constructor,i=this[e];if(s??=o.getPropertyOptions(e),!((s.hasChanged??x)(i,t)||s.useDefault&&s.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:i},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,s,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,v?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.1");const $=globalThis,C=$.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,T=`<${E}>`,U=document,j=()=>U.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,I="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,H=/>/g,J=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,L=/"/g,R=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),D=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,q=U.createTreeWalker(U,129);function V(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const Y=(e,t)=>{const s=e.length-1,o=[];let i,r=2===t?"<svg>":3===t?"<math>":"",a=M;for(let t=0;t<s;t++){const s=e[t];let n,c,d=-1,l=0;for(;l<s.length&&(a.lastIndex=l,c=a.exec(s),null!==c);)l=a.lastIndex,a===M?"!--"===c[1]?a=O:void 0!==c[1]?a=H:void 0!==c[2]?(R.test(c[2])&&(i=RegExp("</"+c[2],"g")),a=J):void 0!==c[3]&&(a=J):a===J?">"===c[0]?(a=i??M,d=-1):void 0===c[1]?d=-2:(d=a.lastIndex-c[2].length,n=c[1],a=void 0===c[3]?J:'"'===c[3]?L:N):a===L||a===N?a=J:a===O||a===H?a=M:(a=J,i=void 0);const h=a===J&&e[t+1].startsWith("/>")?" ":"";r+=a===M?s+T:d>=0?(o.push(n),s.slice(0,d)+k+s.slice(d)+S+h):s+S+(-2===d?t:h)}return[V(e,r+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class K{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let i=0,r=0;const a=e.length-1,n=this.parts,[c,d]=Y(e,t);if(this.el=K.createElement(c,s),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=q.nextNode())&&n.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(k)){const t=d[r++],s=o.getAttribute(e).split(S),a=/([.?@])?(.*)/.exec(t);n.push({type:1,index:i,name:a[2],strings:s,ctor:"."===a[1]?ee:"?"===a[1]?te:"@"===a[1]?se:X}),o.removeAttribute(e)}else e.startsWith(S)&&(n.push({type:6,index:i}),o.removeAttribute(e));if(R.test(o.tagName)){const e=o.textContent.split(S),t=e.length-1;if(t>0){o.textContent=C?C.emptyScript:"";for(let s=0;s<t;s++)o.append(e[s],j()),q.nextNode(),n.push({type:2,index:++i});o.append(e[t],j())}}}else if(8===o.nodeType)if(o.data===E)n.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(S,e+1));)n.push({type:7,index:i}),e+=S.length-1}i++}}static createElement(e,t){const s=U.createElement("template");return s.innerHTML=e,s}}function Q(e,t,s=e,o){if(t===D)return t;let i=void 0!==o?s._$Co?.[o]:s._$Cl;const r=z(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,s,o)),void 0!==o?(s._$Co??=[])[o]=i:s._$Cl=i),void 0!==i&&(t=Q(e,i._$AS(e,t.values),i,o)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,o=(e?.creationScope??U).importNode(t,!0);q.currentNode=o;let i=q.nextNode(),r=0,a=0,n=s[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new G(i,i.nextSibling,this,e):1===n.type?t=new n.ctor(i,n.name,n.strings,this,e):6===n.type&&(t=new oe(i,this,e)),this._$AV.push(t),n=s[++a]}r!==n?.index&&(i=q.nextNode(),r++)}return q.currentNode=U,o}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),z(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==D&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=K.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Z(o,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new K(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,o=0;for(const i of e)o===t.length?t.push(s=new G(this.O(j()),this.O(j()),this,this.options)):s=t[o],s._$AI(i),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,i){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(e,t=this,s,o){const i=this.strings;let r=!1;if(void 0===i)e=Q(this,e,t,0),r=!z(e)||e!==this._$AH&&e!==D,r&&(this._$AH=e);else{const o=e;let a,n;for(e=i[0],a=0;a<i.length-1;a++)n=Q(this,o[s+a],t,a),n===D&&(n=this._$AH[a]),r||=!z(n)||n!==this._$AH[a],n===W?e=W:e!==W&&(e+=(n??"")+i[a+1]),this._$AH[a]=n}r&&!o&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class te extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends X{constructor(e,t,s,o,i){super(e,t,s,o,i),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===D)return;const s=this._$AH,o=e===W&&s!==W||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==W&&(s===W||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ie=$.litHtmlPolyfillSupport;ie?.(K,G),($.litHtmlVersions??=[]).push("3.3.1");const re=globalThis;class ae extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const o=s?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=s?.renderBefore??null;o._$litPart$=i=new G(t.insertBefore(j(),e),e,void 0,s??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}ae._$litElement$=!0,ae.finalized=!0,re.litElementHydrateSupport?.({LitElement:ae});const ne=re.litElementPolyfillSupport;ne?.({LitElement:ae}),(re.litElementVersions??=[]).push("4.2.1");const ce=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x},le=(e=de,t,s)=>{const{kind:o,metadata:i}=s;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),r.set(s.name,e),"accessor"===o){const{name:o}=s;return{set(s){const i=t.get.call(this);t.set.call(this,s),this.requestUpdate(o,i,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=s;return function(s){const i=this[o];t.call(this,s),this.requestUpdate(o,i,e)}}throw Error("Unsupported decorator location: "+o)};function he(e){return(t,s)=>"object"==typeof s?le(e,t,s):((e,t,s)=>{const o=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),o?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function pe(e){return he({...e,state:!0,attribute:!1})}const ue="1.4.0",ge="ChoreBoard Card";let fe=class extends ae{constructor(){super(...arguments),this.arcadeSession=null,this.expandedLeaderboards=new Set,this.arcadeTimerInterval=null}setConfig(e){if(!e)throw new Error("Invalid configuration");if(!e.entity)throw new Error('You must specify an "entity" (e.g., sensor.choreboard_my_chores_ash). Please configure the ChoreBoard integration first.');this.config={show_header:!0,show_points:!0,show_completed:!0,show_overdue_only:!1,show_undo:!1,show_user_points:!1,show_arcade:!0,show_arcade_leaderboards:!0,show_judge_controls:!0,arcade_poll_interval:30,...e}}getCardSize(){const e=this.getChores();return Math.max(2,Math.ceil(e.length/2)+1)}static getStubConfig(){return{type:"custom:choreboard-card",title:"My Chores",entity:"sensor.choreboard_my_chores_ash",show_header:!0,show_points:!0,show_completed:!0}}static getConfigElement(){return document.createElement("choreboard-card-editor")}connectedCallback(){super.connectedCallback(),this.startArcadePolling()}disconnectedCallback(){super.disconnectedCallback(),this.stopArcadePolling()}startArcadePolling(){this.config?.show_arcade&&(this.stopArcadePolling(),this.arcadeTimerInterval=window.setInterval(()=>this.fetchArcadeStatus(),1e3*(this.config.arcade_poll_interval||30)),this.fetchArcadeStatus())}stopArcadePolling(){null!==this.arcadeTimerInterval&&(clearInterval(this.arcadeTimerInterval),this.arcadeTimerInterval=null)}async fetchArcadeStatus(){if(!this.hass||!this.config.entity)return;const e=this.hass.states[this.config.entity];if(e&&e.attributes.arcade_session)this.arcadeSession=e.attributes.arcade_session;else{for(const e of Object.keys(this.hass.states))if(e.startsWith("sensor.choreboard_")){const t=this.hass.states[e];if(t.attributes.arcade_session)return void(this.arcadeSession=t.attributes.arcade_session)}this.arcadeSession=null}}getChores(){if(!this.hass||!this.config.entity)return[];const e=this.hass.states[this.config.entity];if(!e)return console.warn(`ChoreBoard entity not found: ${this.config.entity}`),[];return(e.attributes.chores||[]).filter(e=>!(!this.config.show_completed&&"completed"===e.status)&&!(this.config.show_overdue_only&&!e.is_overdue))}async completeChore(e){if(!this.hass)return;if("completed"===e.status)return void this.showToast("This chore is already marked as completed");const t=this.getCurrentUserId();if(t)try{await this.hass.callService("choreboard","mark_complete",{chore_id:e.id,completed_by_user_id:t}),this.showToast(`Marked "${e.name}" as complete`)}catch(e){console.error("Error marking chore as complete:",e),this.showToast("Failed to mark chore as complete",!0)}else this.showToast("Unable to determine user for completion",!0)}async undoCompletion(e){if(!this.hass)return;if("completed"!==e.status)return void this.showToast("This chore is not marked as completed");if(confirm(`Are you sure you want to undo completion of "${e.name}"?`))try{await this.hass.callService("choreboard","undo_completion",{chore_id:e.id}),this.showToast(`Undid completion of "${e.name}"`)}catch(e){console.error("Error undoing chore completion:",e),this.showToast("Failed to undo completion",!0)}}showToast(e,t=!1){const s=new CustomEvent("hass-notification",{detail:{message:e,duration:t?5e3:3e3},bubbles:!0,composed:!0});this.dispatchEvent(s)}getChoreStateClass(e){return"completed"===e.status?"state-completed":e.is_overdue?"state-overdue":"state-pending"}getChoreStateIcon(e){return"completed"===e.status?"mdi:check-circle":e.is_overdue?"mdi:alert-circle":"mdi:circle-outline"}getUsername(){if(!this.hass||!this.config.entity)return"";const e=this.hass.states[this.config.entity];if(!e)return"";return e.attributes.username||""}getPointsName(){if(!this.hass||!this.config.entity)return"points";const e=this.hass.states[this.config.entity];if(!e)return"points";return e.attributes.points_label||"points"}getUserPoints(){if(!this.hass||!this.config.entity)return{weekly:null,allTime:null};const e=this.getUsername();if(!e)return{weekly:null,allTime:null};const t=`sensor.${e}_weekly_points`,s=`sensor.${e}_all_time_points`,o=this.hass.states[t],i=this.hass.states[s];return{weekly:o?parseFloat(o.state):null,allTime:i?parseFloat(i.state):null}}isPoolChore(e){return"pool"===e.status||this.config.entity.endsWith("_chores")&&!this.config.entity.includes("_my_chores")}getUsers(){if(!this.hass)return[];for(const e of Object.keys(this.hass.states))if(e.startsWith("sensor.choreboard_")){const t=this.hass.states[e];if(t.attributes.users&&Array.isArray(t.attributes.users))return t.attributes.users}return[]}async claimChore(e){if(!this.hass)return;const t=this.getUsers();if(0===t.length)return void this.showToast("Unable to load users list",!0);await Promise.resolve().then(function(){return xe});const s=document.createElement("claim-chore-dialog");s.users=t,s.chore=e,s.addEventListener("dialog-confirmed",async t=>{const o=t.detail.userId;try{await this.hass.callService("choreboard","claim_chore",{chore_id:e.id,assign_to_user_id:o}),this.showToast("Chore claimed successfully")}catch(e){console.error("Error claiming chore:",e),this.showToast("Failed to claim chore",!0)}finally{s.remove()}}),s.addEventListener("dialog-closed",()=>{s.remove()}),document.body.appendChild(s)}async completePoolChore(e){if(!this.hass)return;const t=this.getUsers();if(0===t.length)return void this.showToast("Unable to load users list",!0);await Promise.resolve().then(function(){return we});const s=document.createElement("complete-chore-dialog");s.users=t,s.chore=e,s.addEventListener("dialog-confirmed",async t=>{const o=t,i=o.detail.userId,r=o.detail.helperIds||[];try{await this.hass.callService("choreboard","mark_complete",{chore_id:e.id,completed_by_user_id:i,helpers:r}),this.showToast("Chore marked as complete")}catch(e){console.error("Error completing chore:",e),this.showToast("Failed to complete chore",!0)}finally{s.remove()}}),s.addEventListener("dialog-closed",()=>{s.remove()}),document.body.appendChild(s)}async startArcade(e){if(this.hass)if(this.arcadeSession&&"active"===this.arcadeSession.status)this.showToast("An arcade session is already in progress",!0);else try{await this.hass.callService("choreboard","start_arcade",{instance_id:e.id}),this.showToast(`Started arcade mode for "${e.name}"`),await this.fetchArcadeStatus()}catch(e){console.error("Error starting arcade mode:",e),this.showToast("Failed to start arcade mode",!0)}}async stopArcade(e){if(this.hass)try{await this.hass.callService("choreboard","stop_arcade",{session_id:e.id}),this.showToast("Arcade session stopped - awaiting judge approval"),await this.fetchArcadeStatus()}catch(e){console.error("Error stopping arcade mode:",e),this.showToast("Failed to stop arcade mode",!0)}}async cancelArcade(e){if(!this.hass)return;if(confirm(`Are you sure you want to cancel the arcade session for "${e.chore_name}"?`))try{await this.hass.callService("choreboard","cancel_arcade",{session_id:e.id}),this.showToast("Arcade session cancelled"),await this.fetchArcadeStatus()}catch(e){console.error("Error cancelling arcade mode:",e),this.showToast("Failed to cancel arcade mode",!0)}}async continueArcade(e){if(this.hass)try{await this.hass.callService("choreboard","continue_arcade",{session_id:e.id}),this.showToast("Arcade session resumed"),await this.fetchArcadeStatus()}catch(e){console.error("Error continuing arcade mode:",e),this.showToast("Failed to continue arcade mode",!0)}}async showJudgeDialog(e){if(!this.hass)return;const t=this.getUsers();await Promise.resolve().then(function(){return Ce});const s=document.createElement("arcade-judge-dialog");s.users=t,s.session=e,s.addEventListener("judge-approved",async t=>{const o=t,i=o.detail.judgeId,r=o.detail.notes;try{const t={session_id:e.id};i&&(t.judge_id=i),r&&(t.notes=r),await this.hass.callService("choreboard","approve_arcade",t),this.showToast("Arcade session approved - points awarded!"),await this.fetchArcadeStatus()}catch(e){console.error("Error approving arcade session:",e),this.showToast("Failed to approve arcade session",!0)}finally{s.remove()}}),s.addEventListener("judge-denied",async t=>{const o=t,i=o.detail.judgeId,r=o.detail.notes;try{const t={session_id:e.id};i&&(t.judge_id=i),r&&(t.notes=r),await this.hass.callService("choreboard","deny_arcade",t),this.showToast("Arcade session denied - user can continue"),await this.fetchArcadeStatus()}catch(e){console.error("Error denying arcade session:",e),this.showToast("Failed to deny arcade session",!0)}finally{s.remove()}}),s.addEventListener("dialog-closed",()=>{s.remove()}),document.body.appendChild(s)}formatTime(e){const t=Math.floor(e/3600),s=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}:${s.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${s}:${o.toString().padStart(2,"0")}`}getCurrentElapsedTime(e){const t=new Date(e.start_time).getTime(),s=Date.now()-t;return e.elapsed_seconds+Math.floor(s/1e3)}getLeaderboardForChore(e){if(!this.hass)return null;for(const t of Object.keys(this.hass.states))if(t.startsWith("sensor.choreboard_")){const s=this.hass.states[t].attributes.chore_leaderboards;if(Array.isArray(s)){const t=s.find(t=>t.chore_id===e);if(t)return t}}const t=`sensor.arcade_${e}`,s=this.hass.states[t];return s&&s.attributes.high_scores?{chore_id:e,chore_name:s.attributes.chore_name||"",high_scores:s.attributes.high_scores}:null}toggleLeaderboard(e){this.expandedLeaderboards.has(e)?this.expandedLeaderboards.delete(e):this.expandedLeaderboards.add(e),this.requestUpdate()}getCurrentUserId(){const e=this.getUsername();if(!e)return null;const t=this.getUsers().find(t=>t.username===e);return t?t.id:null}renderLeaderboard(e){if(!this.config.show_arcade_leaderboards)return B``;const t=this.getLeaderboardForChore(e.id);if(!t||0===t.high_scores.length)return B``;const s=this.expandedLeaderboards.has(e.id),o=s?t.high_scores:t.high_scores.slice(0,3),i=this.getCurrentUserId();return B`
      <div class="leaderboard-section">
        <div
          class="leaderboard-header"
          @click=${()=>this.toggleLeaderboard(e.id)}
        >
          <ha-icon icon="mdi:trophy"></ha-icon>
          <span>High Scores (${t.high_scores.length})</span>
          <ha-icon
            icon="${s?"mdi:chevron-up":"mdi:chevron-down"}"
          ></ha-icon>
        </div>
        ${s?B`
              <div class="leaderboard-list">
                ${o.map((e,t)=>B`
                    <div
                      class="leaderboard-entry ${i===e.user_id?"current-user":""}"
                    >
                      <span class="rank">#${t+1}</span>
                      <span class="user-name">${e.display_name}</span>
                      <span class="time"
                        >${this.formatTime(e.time_seconds)}</span
                      >
                    </div>
                  `)}
                ${t.high_scores.length>3&&!s?B`
                      <div class="leaderboard-more">
                        +${t.high_scores.length-3} more
                      </div>
                    `:""}
              </div>
            `:""}
      </div>
    `}renderArcadeControls(e){if(!this.config.show_arcade)return B``;const t=this.arcadeSession,s=t&&t.chore_id===e.id;if("completed"===e.status&&!s)return B``;if(s&&t){const e=this.getUsername(),s=t.user_name===e,o=this.getCurrentElapsedTime(t);if("active"===t.status)return B`
          <div class="arcade-controls active">
            <div class="arcade-timer">
              <ha-icon icon="mdi:timer"></ha-icon>
              <span class="timer-text">${this.formatTime(o)}</span>
              ${s?B`<span class="timer-label">(You)</span>`:B`<span class="timer-label">(${t.user_name})</span>`}
            </div>
            ${s?B`
                  <div class="arcade-buttons">
                    <mwc-button
                      class="arcade-button stop"
                      @click=${()=>this.stopArcade(t)}
                    >
                      Stop
                    </mwc-button>
                    <mwc-button
                      class="arcade-button cancel"
                      @click=${()=>this.cancelArcade(t)}
                    >
                      Cancel
                    </mwc-button>
                  </div>
                `:B` <div class="arcade-status">Session in progress...</div> `}
          </div>
        `;if("stopped"===t.status||"judging"===t.status)return B`
          <div class="arcade-controls judging">
            <div class="arcade-status">
              <ha-icon icon="mdi:gavel"></ha-icon>
              <span>Awaiting judge approval</span>
            </div>
            <div class="arcade-timer">
              Final time: ${this.formatTime(o)}
            </div>
            ${this.config.show_judge_controls?B`
                  <mwc-button
                    class="arcade-button judge"
                    @click=${()=>this.showJudgeDialog(t)}
                  >
                    <ha-icon icon="mdi:gavel"></ha-icon>
                    Judge
                  </mwc-button>
                `:""}
          </div>
        `;if("denied"===t.status)return B`
          <div class="arcade-controls denied">
            <div class="arcade-status">
              <ha-icon icon="mdi:close-circle"></ha-icon>
              <span>Judge denied - improvements needed</span>
            </div>
            ${s?B`
                  <mwc-button
                    class="arcade-button continue"
                    @click=${()=>this.continueArcade(t)}
                  >
                    Continue Arcade
                  </mwc-button>
                `:""}
          </div>
        `}return B`
      <div class="arcade-controls idle">
        <mwc-button
          class="arcade-button start"
          @click=${()=>this.startArcade(e)}
        >
          <ha-icon icon="mdi:play-circle"></ha-icon>
          Start Arcade
        </mwc-button>
      </div>
    `}render(){if(!this.config||!this.hass)return B``;const e=this.getUsername(),t=this.config.title||`${e}'s Chores`||"Chores",s=this.getChores();if(0===s.length)return B`
        <ha-card>
          ${this.config.show_header?B`
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
      `;const o=this.config.show_user_points?this.getUserPoints():{weekly:null,allTime:null};return B`
      <ha-card>
        ${this.config.show_header?B`
              <div class="card-header">
                <div class="name">${t}</div>
                <div class="header-badges">
                  <div class="badge">${s.length} chores</div>
                  ${this.config.show_user_points&&null!==o.weekly?B`<div class="badge points-badge">
                        ${o.weekly} ${this.getPointsName()} this week
                      </div>`:""}
                  ${this.config.show_user_points&&null!==o.allTime?B`<div class="badge points-badge">
                        ${o.allTime} ${this.getPointsName()} total
                      </div>`:""}
                </div>
              </div>
            `:""}
        <div class="card-content">
          <div class="chore-list">
            ${s.map(e=>B`
                <div class="chore-item ${this.getChoreStateClass(e)}">
                  <div class="chore-status">
                    <ha-icon icon="${this.getChoreStateIcon(e)}"></ha-icon>
                  </div>
                  <div class="chore-details">
                    <div class="chore-header">
                      <div class="chore-name">${e.name}</div>
                      ${this.config.show_points&&e.points?B`<div class="chore-points">
                            ${"string"==typeof e.points?parseFloat(e.points):e.points}
                            ${this.getPointsName()}
                          </div>`:""}
                    </div>
                    <div class="chore-meta">
                      ${e.due_date?B`<span class="meta-item"
                            ><ha-icon icon="mdi:calendar"></ha-icon
                            >${e.due_date}</span
                          >`:""}
                      ${e.is_overdue?B`<span class="meta-item overdue"
                            ><ha-icon icon="mdi:clock-alert"></ha-icon
                            >Overdue</span
                          >`:""}
                    </div>
                    ${this.renderArcadeControls(e)}
                    ${this.renderLeaderboard(e)}
                  </div>
                  <div class="chore-action">
                    ${"completed"===e.status?B`
                          <div class="completed-actions">
                            <div class="completed-badge">✓ Done</div>
                            ${this.config.show_undo?B`
                                  <mwc-button
                                    class="undo-button"
                                    @click=${()=>this.undoCompletion(e)}
                                  >
                                    Undo
                                  </mwc-button>
                                `:""}
                          </div>
                        `:this.isPoolChore(e)?B`
                            <div class="pool-actions">
                              <mwc-button
                                @click=${()=>this.claimChore(e)}
                              >
                                Claim
                              </mwc-button>
                              <mwc-button
                                @click=${()=>this.completePoolChore(e)}
                              >
                                Complete
                              </mwc-button>
                            </div>
                          `:B`
                            <mwc-button
                              @click=${()=>this.completeChore(e)}
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
    `}static get styles(){return a`
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
    `}};e([he({attribute:!1})],fe.prototype,"hass",void 0),e([pe()],fe.prototype,"config",void 0),e([pe()],fe.prototype,"arcadeSession",void 0),e([pe()],fe.prototype,"expandedLeaderboards",void 0),fe=e([ce("choreboard-card")],fe),console.info(`%c ${ge} %c ${ue} `,"color: white; background: #039be5; font-weight: 700;","color: #039be5; background: white; font-weight: 700;");let me=class extends ae{setConfig(e){this.config=e}getMyChoresSensors(){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.choreboard_my_chores_")||e.startsWith("sensor.choreboard_my_immediate_chores_")||"sensor.choreboard_outstanding_chores"===e||"sensor.choreboard_late_chores"===e||e.startsWith("sensor.")&&e.endsWith("_my_chores")||e.startsWith("sensor.")&&e.endsWith("_my_immediate_chores")||e.startsWith("sensor.")&&e.endsWith("_chores")):[]}render(){if(!this.hass||!this.config)return B``;const e=this.getMyChoresSensors();return B`
      <div class="card-config">
        ${0===e.length?B`
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
            ${e.map(e=>B`
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

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${!0===this.config.show_undo}
              @change=${this.showUndoChanged}
            />
            Show Undo Button for Completed Chores
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${!0===this.config.show_user_points}
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
              ?checked=${!1!==this.config.show_arcade}
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
              ?checked=${!1!==this.config.show_arcade_leaderboards}
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
              ?checked=${!1!==this.config.show_judge_controls}
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
            .value=${this.config.arcade_poll_interval||30}
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
    `}getEntityDisplayName(e){const t=this.hass?.states[e];if(t?.attributes?.friendly_name)return t.attributes.friendly_name;const s=e.split(".");if(2===s.length&&s[1].startsWith("choreboard_")){const e=s[1].replace("choreboard_","").replace(/_/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}return e}entityChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,entity:t.value},this.configChanged())}titleChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,title:t.value},this.configChanged())}showHeaderChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_header:t.checked},this.configChanged())}showPointsChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_points:t.checked},this.configChanged())}showCompletedChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_completed:t.checked},this.configChanged())}showOverdueOnlyChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_overdue_only:t.checked},this.configChanged())}showUndoChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_undo:t.checked},this.configChanged())}showUserPointsChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_user_points:t.checked},this.configChanged())}showArcadeChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_arcade:t.checked},this.configChanged())}showArcadeLeaderboardsChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_arcade_leaderboards:t.checked},this.configChanged())}showJudgeControlsChanged(e){const t=e.target;this.config&&this.hass&&(this.config={...this.config,show_judge_controls:t.checked},this.configChanged())}arcadePollIntervalChanged(e){const t=e.target;if(!this.config||!this.hass)return;const s=parseInt(t.value,10);!isNaN(s)&&s>=5&&s<=120&&(this.config={...this.config,arcade_poll_interval:s},this.configChanged())}configChanged(){const e=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(e)}static get styles(){return a`
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
    `}};e([he({attribute:!1})],me.prototype,"hass",void 0),e([pe()],me.prototype,"config",void 0),me=e([ce("choreboard-card-editor")],me);let ve=class extends ae{setConfig(e){if(!e)throw new Error("Invalid configuration");if(!e.entity)throw new Error('You must specify an "entity" (e.g., sensor.pending_arcade_sessions)');this.config={show_header:!0,auto_refresh:!0,refresh_interval:30,judge_mode:"ask",...e}}getCardSize(){const e=this.getSessions();return Math.max(2,Math.ceil(e.length/2)+2)}static getStubConfig(){return{type:"custom:choreboard-arcade-judge-card",title:"Arcade Judge Panel",entity:"sensor.pending_arcade_sessions",show_header:!0}}static getConfigElement(){return document.createElement("choreboard-arcade-judge-card-editor")}getSessions(){if(!this.hass||!this.config.entity)return[];const e=this.hass.states[this.config.entity];if(!e)return console.warn(`ChoreBoard Pending Arcade entity not found: ${this.config.entity}. Make sure the ChoreBoard integration is installed and the pending arcade sensor exists.`),[];return e.attributes.sessions||[]}getUsers(){if(!this.hass)return[];for(const e of Object.keys(this.hass.states))if(e.startsWith("sensor.choreboard_")||e.includes("pending_arcade")){const t=this.hass.states[e];if(t.attributes.users&&Array.isArray(t.attributes.users))return console.log(`Arcade Judge: Found users in ${e}:`,t.attributes.users),t.attributes.users}return console.warn("Arcade Judge: No users found in any ChoreBoard sensor attributes"),[]}getCurrentJudgeId(){if(!this.hass||!this.hass.user)return null;const e=this.hass.user,t=e.name?.toLowerCase();if(!t)return null;const s=this.getUsers().find(e=>e.username.toLowerCase()===t);return s?(console.log(`Arcade Judge: Mapped HA user "${t}" to ChoreBoard user ID ${s.id}`),s.id):(console.warn(`Arcade Judge: Could not find ChoreBoard user matching HA username "${t}"`),null)}async showJudgeDialog(e){if(!this.hass)return;const t=this.getUsers();if(console.log("Arcade Judge: Retrieved users for dialog:",t),0===t.length)return console.error("Arcade Judge: No users found for judge selection"),void this.showToast("No users available. Make sure ChoreBoard integration is properly configured.",!0);if("auto"===this.config.judge_mode){const t=this.getCurrentJudgeId();if(t)return void await this.showQuickJudgeDialog(e,t);this.showToast("Cannot determine current user. Please select a judge manually.",!0)}await Promise.resolve().then(function(){return Ce});const s=document.createElement("arcade-judge-dialog");s.users=t,s.session=e,console.log("Arcade Judge: Created dialog with",t.length,"users"),s.addEventListener("judge-approved",async t=>{const o=t,i=o.detail.judgeId,r=o.detail.notes;try{const t={session_id:e.id};i&&(t.judge_id=i),r&&(t.notes=r),await this.hass.callService("choreboard","approve_arcade",t),this.showToast("Arcade session approved - points awarded!")}catch(e){console.error("Error approving arcade session:",e),this.showToast("Failed to approve arcade session",!0)}finally{s.remove()}}),s.addEventListener("judge-denied",async t=>{const o=t,i=o.detail.judgeId,r=o.detail.notes;try{const t={session_id:e.id};i&&(t.judge_id=i),r&&(t.notes=r),await this.hass.callService("choreboard","deny_arcade",t),this.showToast("Arcade session denied - user can continue")}catch(e){console.error("Error denying arcade session:",e),this.showToast("Failed to deny arcade session",!0)}finally{s.remove()}}),s.addEventListener("dialog-closed",()=>{s.remove()}),document.body.appendChild(s)}async showQuickJudgeDialog(e,t){if(!this.hass)return;const s=this.getUsers().find(e=>e.id===t),o=s?s.display_name||s.username:"Current User",i=confirm(`Judge arcade session for "${e.chore_name}" by ${e.user_display_name||e.user_name}?\n\nTime: ${this.formatTime(e.elapsed_seconds)}\nJudge: ${o}\n\nClick OK to APPROVE or Cancel to DENY.`);try{const s={session_id:e.id,judge_id:t};i?(await this.hass.callService("choreboard","approve_arcade",s),this.showToast("Arcade session approved - points awarded!")):(await this.hass.callService("choreboard","deny_arcade",s),this.showToast("Arcade session denied - user can continue"))}catch(e){console.error("Error judging arcade session:",e),this.showToast("Failed to judge arcade session",!0)}}showToast(e,t=!1){const s=new CustomEvent("hass-notification",{detail:{message:e,duration:t?5e3:3e3},bubbles:!0,composed:!0});this.dispatchEvent(s)}formatTime(e){const t=Math.floor(e/3600),s=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}:${s.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${s}:${o.toString().padStart(2,"0")}`}render(){if(!this.config||!this.hass)return B``;const e=this.config.title||"Arcade Judge Panel",t=this.getSessions();return 0===t.length?B`
        <ha-card>
          ${this.config.show_header?B`
                <div class="card-header">
                  <div class="name">${e}</div>
                  <div class="badge success">All clear!</div>
                </div>
              `:""}
          <div class="card-content">
            <div class="empty-state">
              <ha-icon icon="mdi:check-circle"></ha-icon>
              <div>
                <strong>No pending arcade sessions</strong>
                <p>All arcade sessions have been judged or completed.</p>
              </div>
            </div>
          </div>
        </ha-card>
      `:B`
      <ha-card>
        ${this.config.show_header?B`
              <div class="card-header">
                <div class="name">${e}</div>
                <div class="badge">${t.length} pending</div>
              </div>
            `:""}
        <div class="card-content">
          <div class="session-list">
            ${t.map(e=>B`
                <div class="session-item">
                  <div class="session-icon">
                    <ha-icon icon="mdi:gavel"></ha-icon>
                  </div>
                  <div class="session-details">
                    <div class="session-header">
                      <div class="session-chore">${e.chore_name}</div>
                      <div class="session-time">
                        ${this.formatTime(e.elapsed_seconds)}
                      </div>
                    </div>
                    <div class="session-meta">
                      <span class="meta-item">
                        <ha-icon icon="mdi:account"></ha-icon>
                        ${e.user_display_name||e.user_name}
                      </span>
                      <span class="meta-item status">
                        <ha-icon icon="mdi:clock-alert"></ha-icon>
                        Awaiting Approval
                      </span>
                    </div>
                  </div>
                  <div class="session-action">
                    <mwc-button
                      class="judge-button"
                      @click=${()=>this.showJudgeDialog(e)}
                      raised
                    >
                      <ha-icon icon="mdi:gavel"></ha-icon>
                      Judge
                    </mwc-button>
                  </div>
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `}static get styles(){return a`
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
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .badge.success {
        background: var(--success-color, #4caf50);
      }

      .card-content {
        padding: 0;
      }

      .empty-state {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
        background: var(--success-color, #4caf50);
        color: var(--text-primary-color, white);
        border-radius: 8px;
      }

      .empty-state ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }

      .empty-state strong {
        display: block;
        margin-bottom: 4px;
      }

      .empty-state p {
        margin: 4px 0 0 0;
        font-size: 14px;
      }

      .session-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .session-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--card-background-color);
        border: 2px solid var(--warning-color, #ff9800);
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .session-item:hover {
        box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        transform: translateY(-2px);
      }

      .session-icon {
        flex-shrink: 0;
      }

      .session-icon ha-icon {
        --mdc-icon-size: 28px;
        color: var(--warning-color, #ff9800);
      }

      .session-details {
        flex: 1;
        min-width: 0;
      }

      .session-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .session-chore {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .session-time {
        font-family: monospace;
        font-size: 18px;
        font-weight: 700;
        color: var(--success-color, #4caf50);
        white-space: nowrap;
      }

      .session-meta {
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

      .meta-item.status {
        color: var(--warning-color, #ff9800);
        font-weight: 600;
      }

      .session-action {
        flex-shrink: 0;
      }

      .judge-button {
        --mdc-theme-primary: var(--warning-color, #ff9800);
      }

      .judge-button ha-icon {
        --mdc-icon-size: 20px;
        margin-right: 8px;
      }
    `}};e([he({attribute:!1})],ve.prototype,"hass",void 0),e([pe()],ve.prototype,"config",void 0),ve=e([ce("choreboard-arcade-judge-card")],ve),console.info(`%c ${ge} - Arcade Judge %c ${ue} `,"color: white; background: #ff9800; font-weight: 700;","color: #ff9800; background: white; font-weight: 700;");let be=class extends ae{setConfig(e){this.config=e}entityChanged(e){const t=e.target;this.config={...this.config,entity:t.value},this.configChanged()}titleChanged(e){const t=e.target;this.config={...this.config,title:t.value},this.configChanged()}showHeaderChanged(e){const t=e.target;this.config={...this.config,show_header:t.checked},this.configChanged()}autoRefreshChanged(e){const t=e.target;this.config={...this.config,auto_refresh:t.checked},this.configChanged()}refreshIntervalChanged(e){const t=e.target,s=parseInt(t.value);s>0&&(this.config={...this.config,refresh_interval:s},this.configChanged())}judgeModeChanged(e){const t=e.target;this.config={...this.config,judge_mode:t.value},this.configChanged()}configChanged(){const e=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(e)}getAvailableEntities(){if(!this.hass)return console.warn("ChoreBoard Arcade Judge Editor: hass not available yet"),[];const e=[];for(const t of Object.keys(this.hass.states))("sensor.pending_arcade_sessions"===t||"sensor.choreboard_pending_arcade"===t||t.startsWith("sensor.choreboard_pending_arcade")||t.includes("pending_arcade"))&&(console.log("ChoreBoard Arcade Judge Editor: Found pending arcade sensor:",t),e.push(t));return 0===e.length&&console.warn("ChoreBoard Arcade Judge Editor: No pending arcade sensors found in",Object.keys(this.hass.states).length,"entities"),e}render(){if(!this.hass||!this.config)return B``;const e=this.getAvailableEntities();return B`
      <div class="card-config">
        <div class="option">
          <label for="entity">Pending Arcade Sensor (Required)</label>
          ${e.length>0?B`
                <select id="entity" @change=${this.entityChanged}>
                  <option value="" ?selected=${!this.config.entity}>
                    Select a sensor...
                  </option>
                  ${e.map(e=>B`
                      <option
                        value="${e}"
                        ?selected=${this.config.entity===e}
                      >
                        ${e}
                      </option>
                    `)}
                </select>
              `:B`
                <input
                  type="text"
                  id="entity"
                  .value=${this.config.entity||""}
                  @input=${this.entityChanged}
                  placeholder="sensor.pending_arcade_sessions"
                />
                <div class="info">
                  <ha-icon icon="mdi:information"></ha-icon>
                  <span>
                    Enter the entity ID manually. The sensor should be named
                    <code>sensor.pending_arcade_sessions</code> if the
                    ChoreBoard integration is properly installed.
                  </span>
                </div>
              `}
        </div>

        <div class="option">
          <label for="title">Card Title (Optional)</label>
          <input
            type="text"
            id="title"
            .value=${this.config.title||""}
            @input=${this.titleChanged}
            placeholder="Arcade Judge Panel"
          />
        </div>

        <div class="option">
          <label class="checkbox-label">
            <input
              type="checkbox"
              ?checked=${!1!==this.config.show_header}
              @change=${this.showHeaderChanged}
            />
            <span>Show card header</span>
          </label>
        </div>

        <div class="option">
          <label class="checkbox-label">
            <input
              type="checkbox"
              ?checked=${!1!==this.config.auto_refresh}
              @change=${this.autoRefreshChanged}
            />
            <span>Auto-refresh pending sessions</span>
          </label>
        </div>

        ${!1!==this.config.auto_refresh?B`
              <div class="option">
                <label for="refresh_interval">Refresh Interval (seconds)</label>
                <input
                  type="number"
                  id="refresh_interval"
                  min="10"
                  max="300"
                  .value=${(this.config.refresh_interval||30).toString()}
                  @input=${this.refreshIntervalChanged}
                />
              </div>
            `:""}

        <div class="option">
          <label for="judge_mode">Judge Selection Mode</label>
          <select id="judge_mode" @change=${this.judgeModeChanged}>
            <option
              value="ask"
              ?selected=${"ask"===(this.config.judge_mode||"ask")}
            >
              Ask who is judging (Show user selector)
            </option>
            <option value="auto" ?selected=${"auto"===this.config.judge_mode}>
              Use logged-in Home Assistant user
            </option>
          </select>
          <div class="help-text">
            <strong>Ask mode:</strong> Shows user selector dialog when judging.
            <br />
            <strong>Auto mode:</strong> Automatically uses the currently
            logged-in Home Assistant user as the judge.
          </div>
        </div>
      </div>
    `}static get styles(){return a`
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

      .option label {
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .option select,
      .option input[type="text"],
      .option input[type="number"] {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-family: inherit;
        font-size: 14px;
      }

      .option select:focus,
      .option input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .checkbox-label input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }

      .checkbox-label span {
        font-weight: normal;
      }

      .warning {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color, white);
        border-radius: 4px;
        font-size: 13px;
      }

      .warning ha-icon {
        --mdc-icon-size: 20px;
        flex-shrink: 0;
      }

      .info {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 12px;
        background: var(--info-color, #2196f3);
        color: var(--text-primary-color, white);
        border-radius: 4px;
        font-size: 13px;
      }

      .info ha-icon {
        --mdc-icon-size: 20px;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .info code {
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 6px;
        border-radius: 3px;
        font-family: monospace;
        font-size: 12px;
      }

      .help-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        line-height: 1.5;
        margin-top: 4px;
      }

      .help-text strong {
        color: var(--primary-text-color);
      }
    `}};e([he({attribute:!1})],be.prototype,"hass",void 0),e([pe()],be.prototype,"config",void 0),be=e([ce("choreboard-arcade-judge-card-editor")],be),window.customCards=window.customCards||[],window.customCards.push({type:"choreboard-card",name:"ChoreBoard Card",description:"A custom card for managing and tracking chores in Home Assistant",preview:!0,documentationURL:"https://github.com/yourusername/choreboard-ha-card"}),window.customCards.push({type:"choreboard-arcade-judge-card",name:"ChoreBoard Arcade Judge Card",description:"A custom card for judging pending arcade sessions in ChoreBoard",preview:!0,documentationURL:"https://github.com/yourusername/choreboard-ha-card"}),customElements.get("choreboard-card")||customElements.define("choreboard-card",fe),customElements.get("choreboard-card-editor")||customElements.define("choreboard-card-editor",me),customElements.get("choreboard-arcade-judge-card")||customElements.define("choreboard-arcade-judge-card",ve),customElements.get("choreboard-arcade-judge-card-editor")||customElements.define("choreboard-arcade-judge-card-editor",be),console.info("ChoreBoard Card has been loaded"),console.info("ChoreBoard Arcade Judge Card has been loaded");let ye=class extends ae{constructor(){super(...arguments),this.users=[],this.selectedUserId=null}render(){return B`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Claim: ${this.chore.name}</div>

        <div class="dialog-content">
          <div class="section">
            <h3>Who is claiming this chore?</h3>
            <div class="user-list">
              ${this.users.map(e=>B`
                  <div
                    class="user-option ${this.selectedUserId===e.id?"selected":""}"
                    @click=${()=>this._selectUser(e.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${e.display_name}</span>
                    ${this.selectedUserId===e.id?B`<ha-icon
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
    `}_selectUser(e){this.selectedUserId=e}_handleClosed(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed"))}_confirm(){this.selectedUserId&&this.dispatchEvent(new CustomEvent("dialog-confirmed",{detail:{userId:this.selectedUserId}}))}static get styles(){return a`
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
    `}};e([he({type:Array})],ye.prototype,"users",void 0),e([he({type:Object})],ye.prototype,"chore",void 0),e([pe()],ye.prototype,"selectedUserId",void 0),ye=e([ce("claim-chore-dialog")],ye);var xe=Object.freeze({__proto__:null,get ClaimChoreDialog(){return ye}});let _e=class extends ae{constructor(){super(...arguments),this.users=[],this.selectedUserId=null,this.selectedHelperIds=[]}render(){const e=this.users.filter(e=>e.id!==this.selectedUserId);return B`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Complete: ${this.chore.name}</div>

        <div class="dialog-content">
          <!-- Who completed section -->
          <div class="section">
            <h3>Who completed this chore? <span class="required">*</span></h3>
            <div class="user-list">
              ${this.users.map(e=>B`
                  <div
                    class="user-option ${this.selectedUserId===e.id?"selected":""}"
                    @click=${()=>this._selectUser(e.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${e.display_name}</span>
                    ${this.selectedUserId===e.id?B`<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`:""}
                  </div>
                `)}
            </div>
          </div>

          <!-- Helpers section -->
          ${this.selectedUserId&&e.length>0?B`
                <div class="section">
                  <h3>Who helped? <span class="optional">(optional)</span></h3>
                  <div class="helper-list">
                    ${e.map(e=>B`
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
    `}_selectUser(e){this.selectedUserId!==e&&(this.selectedHelperIds=this.selectedHelperIds.filter(t=>t!==e)),this.selectedUserId=e}_toggleHelper(e,t){t?this.selectedHelperIds.includes(e)||(this.selectedHelperIds=[...this.selectedHelperIds,e]):this.selectedHelperIds=this.selectedHelperIds.filter(t=>t!==e)}_handleClosed(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed"))}_confirm(){this.selectedUserId&&this.dispatchEvent(new CustomEvent("dialog-confirmed",{detail:{userId:this.selectedUserId,helperIds:this.selectedHelperIds}}))}static get styles(){return a`
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
    `}};e([he({type:Array})],_e.prototype,"users",void 0),e([he({type:Object})],_e.prototype,"chore",void 0),e([pe()],_e.prototype,"selectedUserId",void 0),e([pe()],_e.prototype,"selectedHelperIds",void 0),_e=e([ce("complete-chore-dialog")],_e);var we=Object.freeze({__proto__:null,get CompleteChoreDialog(){return _e}});let $e=class extends ae{constructor(){super(...arguments),this.users=[],this.selectedJudgeId=null,this.notes="",this.action=null}render(){const e=this.formatTime(this.session.elapsed_seconds);return console.log("Arcade Judge Dialog: Rendering with",this.users.length,"users:",this.users),B`
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
              <span class="value time">${e}</span>
            </div>
          </div>

          <!-- Judge selection -->
          <div class="section">
            <h3>Who is judging? <span class="required">*</span></h3>
            <div class="user-list">
              ${this.users.map(e=>B`
                  <div
                    class="user-option ${this.selectedJudgeId===e.id?"selected":""}"
                    @click=${()=>this._selectJudge(e.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${e.display_name}</span>
                    ${this.selectedJudgeId===e.id?B`<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`:""}
                  </div>
                `)}
            </div>
          </div>

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
              @click=${()=>this._setAction("approve")}
              ?disabled=${!this.selectedJudgeId}
              raised
            >
              <ha-icon icon="mdi:check-circle"></ha-icon>
              Approve
            </mwc-button>
            <mwc-button
              class="deny-button"
              @click=${()=>this._setAction("deny")}
              ?disabled=${!this.selectedJudgeId}
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
    `}formatTime(e){const t=Math.floor(e/3600),s=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}:${s.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${s}:${o.toString().padStart(2,"0")}`}_selectJudge(e){this.selectedJudgeId=e}_notesChanged(e){this.notes=e.target.value}_setAction(e){this.action=e,this._confirm()}_handleClosed(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed"))}_confirm(){if(!this.action)return;const e="approve"===this.action?"judge-approved":"judge-denied";this.dispatchEvent(new CustomEvent(e,{detail:{judgeId:this.selectedJudgeId,notes:this.notes||void 0}}))}static get styles(){return a`
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

      .required {
        color: var(--error-color, #f44336);
        font-weight: 700;
        margin-left: 4px;
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
    `}};e([he({type:Array})],$e.prototype,"users",void 0),e([he({type:Object})],$e.prototype,"session",void 0),e([pe()],$e.prototype,"selectedJudgeId",void 0),e([pe()],$e.prototype,"notes",void 0),e([pe()],$e.prototype,"action",void 0),$e=e([ce("arcade-judge-dialog")],$e);var Ce=Object.freeze({__proto__:null,get ArcadeJudgeDialog(){return $e}});
//# sourceMappingURL=choreboard-ha-card.js.map
