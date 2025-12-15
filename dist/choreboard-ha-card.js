function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",$=g.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...l(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s){if(void 0!==t){const i=this.constructor,o=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??y)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,$?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.1");const x=globalThis,A=x.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+S,P=`<${k}>`,O=document,U=()=>O.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,B=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,F=O.createTreeWalker(O,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<s;e++){const s=t[e];let a,h,c=-1,d=0;for(;d<s.length&&(n.lastIndex=d,h=n.exec(s),null!==h);)d=n.lastIndex,n===N?"!--"===h[1]?n=z:void 0!==h[1]?n=R:void 0!==h[2]?(I.test(h[2])&&(o=RegExp("</"+h[2],"g")),n=B):void 0!==h[3]&&(n=B):n===B?">"===h[0]?(n=o??N,c=-1):void 0===h[1]?c=-2:(c=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?B:'"'===h[3]?D:j):n===D||n===j?n=B:n===z||n===R?n=N:(n=B,o=void 0);const l=n===B&&t[e+1].startsWith("/>")?" ":"";r+=n===N?s+P:c>=0?(i.push(a),s.slice(0,c)+E+s.slice(c)+S+l):s+S+(-2===c?e:l)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[h,c]=K(t,e);if(this.el=Y.createElement(h,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=c[r++],s=i.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?st:X}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),F.nextNode(),a.push({type:2,index:++o});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=M(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);F.currentNode=i;let o=F.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new it(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=F.nextNode(),r++)}return F.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Y.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Q(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=Z(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Z(this,i[s+n],e,n),a===W&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends X{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(Y,Q),(x.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Q(e.insertBefore(U(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.1");const ht=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},dt=(t=ct,e,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t)}}throw Error("Unsupported decorator location: "+i)};function lt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function pt(t){return lt({...t,state:!0,attribute:!1})}let ut=class extends nt{setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity)throw new Error('You must specify an "entity" (e.g., sensor.choreboard_my_chores_ash). Please configure the ChoreBoard integration first.');this.config={show_header:!0,show_points:!0,show_completed:!0,show_overdue_only:!1,...t}}getCardSize(){const t=this.getChores();return Math.max(2,Math.ceil(t.length/2)+1)}static getStubConfig(){return{type:"custom:choreboard-card",title:"My Chores",entity:"sensor.choreboard_my_chores_ash",show_header:!0,show_points:!0,show_completed:!0}}getChores(){if(!this.hass||!this.config.entity)return[];const t=this.hass.states[this.config.entity];if(!t)return console.warn(`ChoreBoard entity not found: ${this.config.entity}`),[];return(t.attributes.chores||[]).filter(t=>!(!this.config.show_completed&&"completed"===t.status)&&!(this.config.show_overdue_only&&!t.is_overdue))}async completeChore(t){if(this.hass)if("completed"!==t.status)try{await this.hass.callService("choreboard","complete_chore",{instance_id:t.id}),this.showToast(`Marked "${t.name}" as complete`)}catch(t){console.error("Error marking chore as complete:",t),this.showToast("Failed to mark chore as complete",!0)}else this.showToast("This chore is already marked as completed")}showToast(t,e=!1){const s=new CustomEvent("hass-notification",{detail:{message:t,duration:e?5e3:3e3},bubbles:!0,composed:!0});this.dispatchEvent(s)}getChoreStateClass(t){return"completed"===t.status?"state-completed":t.is_overdue?"state-overdue":"state-pending"}getChoreStateIcon(t){return"completed"===t.status?"mdi:check-circle":t.is_overdue?"mdi:alert-circle":"mdi:circle-outline"}getUsername(){if(!this.hass||!this.config.entity)return"";const t=this.hass.states[this.config.entity];if(!t)return"";return t.attributes.username||""}render(){if(!this.config||!this.hass)return L``;const t=this.getUsername(),e=this.config.title||`${t}'s Chores`||"Chores",s=this.getChores();return 0===s.length?L`
        <ha-card>
          ${this.config.show_header?L`
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
      `:L`
      <ha-card>
        ${this.config.show_header?L`
              <div class="card-header">
                <div class="name">${e}</div>
                <div class="badge">${s.length} chores</div>
              </div>
            `:""}
        <div class="card-content">
          <div class="chore-list">
            ${s.map(t=>L`
                <div class="chore-item ${this.getChoreStateClass(t)}">
                  <div class="chore-status">
                    <ha-icon icon="${this.getChoreStateIcon(t)}"></ha-icon>
                  </div>
                  <div class="chore-details">
                    <div class="chore-header">
                      <div class="chore-name">${t.name}</div>
                      ${this.config.show_points&&t.points?L`<div class="chore-points">
                            ${t.points} pts
                          </div>`:""}
                    </div>
                    <div class="chore-meta">
                      ${t.due_date?L`<span class="meta-item"
                            ><ha-icon icon="mdi:calendar"></ha-icon
                            >${t.due_date}</span
                          >`:""}
                      ${t.is_overdue?L`<span class="meta-item overdue"
                            ><ha-icon icon="mdi:clock-alert"></ha-icon
                            >Overdue</span
                          >`:""}
                    </div>
                  </div>
                  <div class="chore-action">
                    ${"completed"!==t.status?L`
                          <mwc-button @click=${()=>this.completeChore(t)}>
                            Complete
                          </mwc-button>
                        `:L`<div class="completed-badge">✓ Done</div>`}
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
    `}};t([lt({attribute:!1})],ut.prototype,"hass",void 0),t([pt()],ut.prototype,"config",void 0),ut=t([ht("choreboard-card")],ut),console.info("%c ChoreBoard Card %c 0.1.0 ","color: white; background: #039be5; font-weight: 700;","color: #039be5; background: white; font-weight: 700;");let gt=class extends nt{setConfig(t){this.config=t}getMyChoresSensors(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("sensor.choreboard_my_chores_")||t.startsWith("sensor.choreboard_my_immediate_chores_")):[]}render(){if(!this.hass||!this.config)return L``;const t=this.getMyChoresSensors();return L`
      <div class="card-config">
        ${0===t.length?L`
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
            ${t.map(t=>L`
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
    `}getEntityDisplayName(t){const e=this.hass?.states[t];if(e?.attributes?.friendly_name)return e.attributes.friendly_name;const s=t.split(".");if(2===s.length&&s[1].startsWith("choreboard_")){const t=s[1].replace("choreboard_","").replace(/_/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}return t}entityChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,entity:e.value},this.configChanged())}titleChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,title:e.value},this.configChanged())}showHeaderChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,show_header:e.checked},this.configChanged())}showPointsChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,show_points:e.checked},this.configChanged())}showCompletedChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,show_completed:e.checked},this.configChanged())}showOverdueOnlyChanged(t){const e=t.target;this.config&&this.hass&&(this.config={...this.config,show_overdue_only:e.checked},this.configChanged())}configChanged(){const t=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(t)}static get styles(){return n`
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
    `}};t([lt({attribute:!1})],gt.prototype,"hass",void 0),t([pt()],gt.prototype,"config",void 0),gt=t([ht("choreboard-card-editor")],gt),window.customCards=window.customCards||[],window.customCards.push({type:"choreboard-card",name:"ChoreBoard Card",description:"A custom card for managing and tracking chores in Home Assistant",preview:!0,documentationURL:"https://github.com/yourusername/choreboard-ha-card"}),customElements.define("choreboard-card",ut),customElements.define("choreboard-card-editor",gt),console.info("ChoreBoard Card has been loaded");
