!function(e){function t(t){for(var a,c,l=t[0],i=t[1],s=t[2],m=0,p=[];m<l.length;m++)c=l[m],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&p.push(r[c][0]),r[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);for(u&&u(t);p.length;)p.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,l=1;l<n.length;l++){var i=n[l];0!==r[i]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={1:0},o=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var l=this["webpackJsonptax-calculator"]=this["webpackJsonptax-calculator"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var u=i;o.push([9,0]),n()}({14:function(e,t,n){},2:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(3),c=n.n(o),l=(n(14),n(1));n(2),n(6);function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function u(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e,t){return!t||"object"!==f(t)&&"function"!==typeof t?d(e):t}function h(e){return function(){var t,n=m(e);if(p()){var a=m(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return b(this,t)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}var E=function(e){g(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).state={error:null,isLoaded:!1,taxRate:"no data;",taxRegion:"no data;"},console.log("display"),a}return u(n,[{key:"componentDidUpdate",value:function(e){var t=this;if(this.props.save!==e.save&&!0===this.props.save){console.log("saveindisplay");var n=this.props.zipcode;this.setState({taxRate:"fetching data",taxRegion:"fetching data"}),fetch("http://0.0.0.0:5000/taxrate/"+n,{methode:"GET"}).then((function(e){return e.json()})).then((function(e){console.log("inresult"),console.log(e),e.error?console.log("not valid zipcode."):chrome.storage.sync.set({currentTax:{rate:e.data.EstimatedCombinedRate,tReg:e.data.TaxRegionName,zip:n}},(function(){console.log("tax rate is saved.")})),t.setState({isLoaded:!0,taxRate:e.error?e.error:e.data.EstimatedCombinedRate,taxRegion:e.error?e.error:e.data.TaxRegionName}),t.props.updateTax(e.data.EstimatedCombinedRate)}),(function(e){console.log("inerror"),console.log(e),t.setState({error:!0,isLoaded:!0})}))}}},{key:"render",value:function(){return r.a.createElement("div",{className:"rate-display"},this.state.error?r.a.createElement("p",null,"error: $",this.state.error):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"tax rate: ",this.state.taxRate),r.a.createElement("p",null,"tax region: ",this.state.taxRegion)))}}]),n}(r.a.Component);function y(e){var t=Object(a.useState)(!1),n=Object(l.a)(t,2),o=n[0],c=n[1],i=Object(a.useState)(e.zipcode?e.zipcode:""),s=Object(l.a)(i,2),u=s[0],m=s[1],p=Object(a.useState)(e.name?e.name:""),f=Object(l.a)(p,2),d=f[0],b=f[1];return null===e.zipcode&&c(!0),o?r.a.createElement("div",{className:"edit-zip-card"},r.a.createElement("label",{htmlFor:"name"},"name:"),r.a.createElement("input",{name:"name",className:"card-input",type:"text",value:e.name?e.name:"",onChange:function(e){b(e.currentTarget.value)}}),r.a.createElement("label",{htmlFor:"zip"},"zip code:"),r.a.createElement("input",{name:"zip",type:"text",className:"card-input",onChange:function(e){var t=function(e){if(e.length>5)return e.slice(0,5);return e}(e.currentTarget.value);m(function(e){var t=e.slice(-1).charCodeAt(0);return 48<=t&&t<=57?e:e.slice(0,-1)}(t))},value:u}),r.a.createElement("button",{onClick:function(e){c(!1)}},"save"),r.a.createElement("button",null,"remove")):r.a.createElement("div",{className:"edit-zip-card"},r.a.createElement("label",{htmlFor:"name"},"name:"),r.a.createElement("input",{name:"name",className:"card-input card-input-readonly",type:"text",value:d,readOnly:!0}),r.a.createElement("label",{htmlFor:"zip"},"zip code:"),r.a.createElement("input",{name:"zip",type:"text",className:"card-input card-input-readonly",readOnly:!0,value:u}),r.a.createElement("button",{onClick:function(e){c(!0)}},"edit"),r.a.createElement("button",null,"remove"))}function O(e){var t=[];Object(a.useEffect)((function(){}),[e.editZipClick]);return e.editZipClick?(console.log(t),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"edit-window"},function(){var t=[];return Object.keys(e.savedZip).forEach((function(n){var a=r.a.createElement(y,{key:n,zipcode:n,name:e.savedZip[n].name});t.push(a)})),t}(),r.a.createElement("button",null,"done"),r.a.createElement("button",null,"cancel"),r.a.createElement("button",{onClick:function(e){t.push(r.a.createElement(y,null))}},"Add")))):r.a.createElement("div",null)}var j={14850:{name:"home"},12345:{name:"scl"}};function k(e){var t=e.updateTax,n=r.a.createRef(),o=r.a.createRef(),c=(r.a.createRef(),Object(a.useState)("")),i=Object(l.a)(c,2),s=i[0],u=i[1],m=Object(a.useState)(!1),p=Object(l.a)(m,2),f=p[0],d=p[1],b=Object(a.useState)({}),h=Object(l.a)(b,2),v=h[0],g=h[1],y=Object(a.useState)([]),k=Object(l.a)(y,2),x=k[0],S=k[1],N=Object(a.useState)(!1),C=Object(l.a)(N,2),w=C[0],R=C[1];Object(a.useEffect)((function(){g(j),n.current.focus()}),[]),Object(a.useEffect)((function(){(f||null===f)&&(o.current.classList.replace("green-outline","no-outline"),document.removeEventListener("click",(function(){})),n.current.removeEventListener("keyup",(function(){}))),!1===f&&o.current.classList.replace("no-outline","green-outline")}),[f]);var z=Object(a.useState)(),T=Object(l.a)(z,2),L=T[0],P=T[1],_=function(e){console.log("option click"),u(e.currentTarget.attributes.getNamedItem("data-zip").value),d(!0)},F=function(e){R(!0)};Object(a.useEffect)((function(){console.log("setSavedEDit"),S((function(e){return function(){console.log("make html is called");var e=[r.a.createElement("div",{className:"searchUnder"})];return console.log("savedZip"),console.log(v),Object.keys(v).forEach((function(t){var n=r.a.createElement("button",{className:"savedOptions",key:t,"data-zip":t,onClick:_},r.a.createElement("span",null,v[t].name),r.a.createElement("span",null,t));e.push(n)})),e.push(r.a.createElement("button",{key:"editsavedbutt",onClick:F},"Add/edit saved zip")),console.log(e),e}()}))}),[v]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{className:"ziplabel"},"Zipcode: \xa0"),r.a.createElement("div",{className:"multisearch-container green-outline",ref:o},r.a.createElement("div",{className:"searchBar-container normal"},r.a.createElement("input",{ref:n,className:"zip-input",type:"text",maxLength:"6",height:"3",value:s,size:"10",onChange:function(e){var t=function(e){if(e.length>5)return P("shake"),console.log("text is longer than 5 characters"),console.log("animation 1:",L),setTimeout((function(){P(),console.log("animation 2:",L)}),200),e.slice(0,5);return e}(e.currentTarget.value);u(function(e){var t=e.slice(-1).charCodeAt(0);return 48<=t&&t<=57?e:e.slice(0,-1)}(t))},onFocus:function(e){var t=o.current;o.current.classList.replace("no-outline","green-outline"),d(!1),e.currentTarget.addEventListener("keyup",(function(e){""!==e.currentTarget.value&&13===e.keyCode&&(console.log(s),d(!0),n.current.blur())})),document.addEventListener("click",(function(e){t.contains(e.target)||d(null)}))}}),f||null===f?r.a.createElement("button",{className:"glass-icon glass-grey",onClick:function(e){n.current.focus()}}):r.a.createElement("button",{className:"glass-icon glass-green",onClick:function(e){d(!0)}})),f||null===f?"":r.a.createElement("div",{className:"search-option-container"},x)),r.a.createElement(E,{save:f,zipcode:s,updateTax:t}),r.a.createElement(O,{editZipClick:w,savedZip:v}))}var x=function(e){g(n,e);var t=h(n);function n(e){var a;return i(this,n),(a=t.call(this,e)).handleSubmit=a.handleSubmit.bind(d(a)),a.reportIssue=a.reportIssue.bind(d(a)),a.cancelClick=a.cancelClick.bind(d(a)),a.process=r.a.createRef(),a.form=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"process process-invisible",ref:a.process},r.a.createElement("p",null,"processing...")),r.a.createElement("div",{className:"report-form-container"},r.a.createElement("button",{onClick:a.cancelClick},"cancel"),r.a.createElement("h3",null,"Report Issue"),r.a.createElement("form",{className:"report",onSubmit:a.handleSubmit},r.a.createElement("label",{htmlFor:"title"},"topic"),r.a.createElement("input",{name:"title",type:"text"}),r.a.createElement("label",{htmlFor:"email"},"email(optional in case you want to hear back from us)"),r.a.createElement("input",{name:"email",type:"text"}),r.a.createElement("label",{htmlFor:"message"},"Please provide detail"),r.a.createElement("input",{name:"message"}),r.a.createElement("button",{type:"submit"},"Submit")))),a.button=r.a.createElement("div",{className:"report-form-main"},r.a.createElement("div",{className:"informationIcon"}),r.a.createElement("div",{className:"report-text"},r.a.createElement("p",null,"If information is incorrect or there are any issues with your experience please",r.a.createElement("button",{id:"report-button",onClick:a.reportIssue},"Report")))),a.state={process:"open"},a}return u(n,[{key:"cancelClick",value:function(e){this.setState({process:"open"})}},{key:"handleSubmit",value:function(e){var t=this;console.log("handle supmit is called"),this.process.current.classList.remove("process-invisible");var n={},a=e.target.elements;Object.assign(n,{title:a.title.value,email:a.email.value,message:a.message.value}),JSON.stringify(n),fetch("http://0.0.0.0:5000/report/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(e){console.log("inresult"),e.error?(window.alert("sorry something is wrong"),console.log(e.error)):e.data&&(window.alert("Submitted, thank you for your feedback"),console.log(e.data))}),(function(e){console.log("inerror"),console.log(e),t.setState({error:!0,isLoaded:!0})}))}},{key:"reportIssue",value:function(e){this.setState({process:"write"})}},{key:"render",value:function(){return"open"===this.state.process?this.button:"write"===this.state.process?this.form:null}}]),n}(r.a.Component),S=function(e){var t=e.isChecked,n=e.handleToggle,a=e.size;return r.a.createElement("div",{className:"toggle tg-".concat(a)},r.a.createElement("label",{className:"switch tg-lab-".concat(a)},r.a.createElement("input",{type:"checkbox",className:"toggle-checkbox",checked:t,onChange:n}),r.a.createElement("span",{className:"slider tg-".concat(a)})))};var N=function(){var e=Object(a.useState)(),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(!1),i=Object(l.a)(c,2),s=i[0],u=i[1],m=Object(a.useState)([]),p=Object(l.a)(m,2),f=p[0],d=p[1];return Object(a.useEffect)((function(){console.log("running use effect"),chrome.tabs.query({active:!0,currentWindow:!0},(function(e){var t=new URL(e[0].url).hostname;s&&d(f.concat(t));var n=Object.assign({},f);s?t in f||(n[t]="tracking",d(n)):t in f&&(delete n[t],d(n))}))}),[s]),Object(a.useEffect)((function(){console.log("tax rate has changed",n),chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{type:"price",tax:n},(function(e){}))}))}),[n]),Object(a.useEffect)((function(){chrome.runtime.sendMessage({type:"URL",urlList:f},(function(e){console.log("sending url list")}))}),[f]),r.a.createElement("div",{className:"grid-container"},r.a.createElement("div",{className:"web-enable-container"},r.a.createElement("label",null,"Use tax calculator on this site?"),r.a.createElement("div",{className:"fill-space"}),r.a.createElement(S,{size:"small",handleToggle:function(){u(!s),console.log("tracksite",s)},isChecked:s})),r.a.createElement("div",{className:"divider"}),r.a.createElement(k,{updateTax:function(e){return o(parseFloat(e)+1)}}),r.a.createElement(x,null))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root"))},6:function(e,t,n){},9:function(e,t,n){e.exports=n(22)}});
//# sourceMappingURL=app.js.map