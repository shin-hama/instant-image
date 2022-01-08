(this["webpackJsonpinstant-image"]=this["webpackJsonpinstant-image"]||[]).push([[0],{88:function(e,t,n){},99:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(33),o=n.n(c),i=(n(88),n(77)),u=n(154),s=n(11),l=n(2),d=r.createContext(void 0),f=function(e){var t=e.children,n=r.useState(),a=Object(s.a)(n,2),c=a[0],o=a[1],i=function(e){if(null!==e.clipboardData)if(e.clipboardData.files.length>0){var t=e.clipboardData.files[0];o(t)}else o(e.clipboardData.getData("Text"))};return r.useEffect((function(){return document.addEventListener("paste",i),function(){document.removeEventListener("paste",i)}}),[]),Object(l.jsx)(d.Provider,{value:c,children:t})},h=r.createContext(void 0),j=function(e){var t=e.children,n=r.useRef(null);return Object(l.jsx)(h.Provider,{value:n,children:t})},b=n(24),v=n(147),x=n(137),g=Object(x.a)("input")((function(e){var t=e.theme;return{width:"320px",fontSize:20,fontWeight:400,lineHeight:0,background:"transparent",borderRadius:"0px",padding:"0px",transition:"all 150ms ease",border:"none","&:focus":{outline:"none",border:"1px solid ".concat(t.palette.grey[900]),borderRadius:"0px"}}})),p=r.createContext((function(){return new Promise((function(e){var t="not implemented";console.log(t),e(t)}))})),O=function(e){var t=e.children,n=r.useState("default"),a=Object(s.a)(n,2),c=a[0],o=a[1],i=r.useState({pos:{x:0,y:0},value:""}),u=Object(s.a)(i,2),d=u[0],f=u[1],h=r.useState([]),j=Object(s.a)(h,2),x=j[0],O=j[1],y=Object(s.a)(x,2),m=y[0],w=y[1],C=r.useCallback((function(e){return f((function(t){return Object(b.a)(Object(b.a)({},t),e)})),new Promise((function(e,t){O([e,t])}))}),[]);r.useEffect((function(){o(d.value)}),[d]);var S=r.useCallback((function(){O([]),f({pos:{x:0,y:0},value:""})}),[]),k=r.useCallback((function(){w&&(w(c),S())}),[w,S,c]),T=r.useRef(),P=r.useCallback((function(){var e;console.log(null===(e=T.current)||void 0===e?void 0:e.getBoundingClientRect()),m&&(m(c),S())}),[m,c,S]);return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(p.Provider,{value:C,children:t}),x.length>0&&Object(l.jsx)("div",{style:{position:"absolute",left:d.pos.x-1,top:d.pos.y-3},children:Object(l.jsx)(v.a,{autoFocus:!0,value:c,placeholder:"Input Text",onChange:function(e){o(e.target.value)},onKeyDown:function(e){"Enter"===e.key?P():"Escape"===e.key&&k()},onBlur:function(){P()},components:{Input:g}})})]})},y=n(152),m=n(17),w=n(49),C=n.n(w),S=n(67),k=n(25),T=n(35),P=function(e){var t=e.point,n=e.value,a=void 0===n?"default":n,c=r.useState(a),o=Object(s.a)(c,2),i=o[0],u=o[1],d=r.useContext(p),f=Object(T.a)();return Object(l.jsx)(k.g,Object(b.a)(Object(b.a)({text:i,fontFamily:f.typography.fontFamily,fontSize:20},t),{},{draggable:!0,onDblClick:function(e){var t,n,r=e.target,a=r.absolutePosition(),c={x:a.x+((null===(t=r.getStage())||void 0===t?void 0:t.container().offsetLeft)||0),y:a.y+((null===(n=r.getStage())||void 0===n?void 0:n.container().offsetTop)||0)};r.hide(),d({pos:c,value:i}).then((function(e){u(e)})).catch((function(e){return console.log(e)})).finally((function(){return r.show()}))},onClick:function(e){return e.evt.preventDefault()}}))},E=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{draggable:!0},a=function(e){var t=e.target,n=t.scaleX(),r=t.scaleY();t.scaleX(1),t.scaleY(1),t.width(t.width()*n),t.height(t.height()*r)};switch(e){case"Circle":var c={x:(t.x+n.x)/2,y:(t.y+n.y)/2},o={x:Math.abs(t.x-n.x)/2,y:Math.abs(t.y-n.y)/2};return Object(l.jsx)(k.a,Object(b.a)({x:c.x,y:c.y,radiusX:o.x,radiusY:o.y,fill:"gray",stroke:"blue",onTransformEnd:a},r));case"Rect":var i={x:Math.min(t.x,n.x),y:Math.min(t.y,n.y)},u={x:Math.abs(t.x-n.x),y:Math.abs(t.y-n.y)};return Object(l.jsx)(k.e,Object(b.a)({x:i.x,y:i.y,width:u.x,height:u.y,fill:"gray",stroke:"blue",onTransformEnd:a},r));case"Line":return Object(l.jsx)(k.d,Object(b.a)({points:[t.x,t.y,n.x,n.y],stroke:"blue",strokeWidth:4,onTransformEnd:a},r))}},D=function(){var e=Object(S.a)(C.a.mark((function e(t){var n,r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t instanceof File&&t.type.startsWith("image"))){e.next=6;break}return e.next=3,new Promise((function(e,n){var r=new FileReader;r.onload=function(){var t,n=new Image;n.onload=function(){e(n)},n.src=(null===(t=r.result)||void 0===t?void 0:t.toString())||""},r.onerror=function(e){return n(e)},r.readAsDataURL(t)}));case 3:return n=e.sent,r={width:n.width,height:n.height},e.abrupt("return",Object(l.jsx)(k.b,{image:n,x:0,y:0,width:r.width,height:r.height}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=r.useContext(A).shapeType,t=r.useState(),n=Object(s.a)(t,2),a=n[0],c=n[1],o=r.useState({x:0,y:0}),i=Object(s.a)(o,2),u=i[0],f=i[1],j=r.useState([]),v=Object(s.a)(j,2),x=v[0],g=v[1],O=r.useState([]),y=Object(s.a)(O,2),w=y[0],T=y[1],F=r.useContext(d),R=r.useContext(p),L=r.useState(),M=Object(s.a)(L,2),I=M[0],W=M[1],B=r.useContext(h),X=r.useRef(null);r.useEffect((function(){void 0!==F&&function(){var e=Object(S.a)(C.a.mark((function e(){var t;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D(F);case 2:t=e.sent,g((function(e){return[].concat(Object(m.a)(e),[t])}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[F]);var Y=function(t){var n,r=null===(n=t.target.getStage())||void 0===n?void 0:n.getPointerPosition();if(r){if("Text"===e){var a=t.evt,o=a.clientX,i=a.clientY;W({x:o,y:i})}else if("Free"===e)return void T((function(e){return[r.x,r.y,r.x,r.y]}));var u=E(e,r,r);c(u),f(r)}},U=function(t){var n,r=null===(n=t.target.getStage())||void 0===n?void 0:n.getPointerPosition();if(r&&a){if("Free"===e)return void T((function(e){return[].concat(Object(m.a)(e),[r.x,r.y])}));var o=E(e,u,r);c(o)}},z=function(t){"Text"===e&&I&&(null===B||void 0===B?void 0:B.current)&&R({pos:I,value:""}).then((function(e){if(e){var t=Object(l.jsx)(P,{point:u,value:e});g((function(e){return[].concat(Object(m.a)(e),[t])}))}})),a&&g((function(e){return[].concat(Object(m.a)(e),[a])})),c(void 0),f({x:0,y:0})};r.useEffect((function(){var e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{draggable:!0};return Object(l.jsx)(k.d,Object(b.a)({points:e,mode:"source-over",stroke:"blue",strokeWidth:4},t))}(w);c(e)}),[w]);var J=r.useState(),G=Object(s.a)(J,2),H=G[0],K=G[1];r.useEffect((function(){if(null===B||void 0===B?void 0:B.current){var e={x:B.current.width(),y:B.current.height()},t=E("Rect",{x:0,y:0},e,{fill:"white",stroke:"transparent",listening:!1});K(t)}}),[B]);var $=function(t){null!==X.current&&"Select"===e&&(t.target!==t.target.getStage()?X.current.nodes([t.target]):X.current.nodes([]))},q=r.useRef(null);return r.useEffect((function(){X.current&&q.current&&X.current.nodes([q.current])}),[]),Object(l.jsx)(p.Consumer,{children:function(e){return Object(l.jsx)(k.f,{ref:B,width:1e3,height:1e3,onMouseDown:Y,onDragStart:function(){return a&&c(void 0)},onMouseMove:U,onMouseUp:z,onClick:$,children:Object(l.jsx)(p.Provider,{value:e,children:Object(l.jsxs)(k.c,{children:[H,r.Children.toArray(x).map((function(e){return e})),a,Object(l.jsx)(k.h,{ref:X})]})})})}})},R=n(7),L=n(155),M=n(153),I=n(150),W=n(151),B=n(148),X=n(145),Y=n(156),U=Object(R.a)("div")((function(e){return{flexGrow:1}})),z=function(){var e=r.useContext(A),t=e.shapeType,n=e.setShapeType,a=r.useContext(h);return Object(l.jsx)(L.a,{children:Object(l.jsxs)(Y.a,{children:[Object(l.jsxs)(I.a,{children:[Object(l.jsx)(W.a,{id:"shape-select-label",children:"Shape"}),Object(l.jsxs)(X.a,{labelId:"shape-select-label",id:"shape-select",value:t,label:"Shape",onChange:function(e){n(e.target.value)},children:[Object(l.jsx)(B.a,{value:"Select",children:"Select"}),Object(l.jsx)(B.a,{value:"Line",children:"Line"}),Object(l.jsx)(B.a,{value:"Free",children:"Free Line"}),Object(l.jsx)(B.a,{value:"Rect",children:"Rect"}),Object(l.jsx)(B.a,{value:"Circle",children:"Circle"}),Object(l.jsx)(B.a,{value:"Text",children:"Text"})]})]}),Object(l.jsx)(U,{}),Object(l.jsx)(M.a,{onClick:function(){if(null===a||void 0===a?void 0:a.current){var e=a.current.toDataURL(),t=document.createElement("a");t.download="stage.png",t.href=e,document.body.appendChild(t),t.click(),document.body.removeChild(t)}},variant:"contained",children:"Download"})]})})},A=r.createContext({shapeType:"Line",setShapeType:function(){}}),J=function(){var e=r.useState("Select"),t=Object(s.a)(e,2),n=t[0],a=t[1];return Object(l.jsx)(y.a,{children:Object(l.jsxs)(A.Provider,{value:{shapeType:n,setShapeType:a},children:[Object(l.jsx)(z,{}),Object(l.jsx)(y.a,{onCopy:function(){return console.log("handlePaste")},sx:{margin:10,border:"black"},onPaste:function(){return console.log("test")},children:Object(l.jsx)(F,{})})]})})},G=Object(i.a)();var H=function(){return Object(l.jsx)(u.a,{theme:G,children:Object(l.jsx)(f,{children:Object(l.jsx)(j,{children:Object(l.jsx)(O,{children:Object(l.jsx)(J,{})})})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var K=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,158)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};o.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(H,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),K()}},[[99,1,2]]]);
//# sourceMappingURL=main.48d6e80f.chunk.js.map