(()=>{"use strict";var t={};({823:function(t,e){var o=this&&this.__awaiter||function(t,e,o,n){return new(o||(o=Promise))((function(r,i){function d(t){try{u(n.next(t))}catch(t){i(t)}}function a(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?r(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(d,a)}u((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.getByIdHandler=void 0,e.getByIdHandler=t=>o(void 0,void 0,void 0,(function*(){if("GET"!==t.httpMethod)throw new Error(`getMethod only accept GET method, you tried: ${t.httpMethod}`);const e={statusCode:200,body:JSON.stringify({id:1,name:"item 1",order:1})};return console.info(`response from: ${t.path} statusCode: ${e.statusCode} body: ${e.body}`),e}))}})[823](0,t),module.exports=t})();
//# sourceMappingURL=app.js.map