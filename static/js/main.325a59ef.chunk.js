(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(53)},23:function(e,t,n){},24:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),s=n(2),r=n.n(s),l=(n(23),n(10)),i=n(3),c=n(4),u=n(8),m=n(6),d=n(7),g=n(9),f=n(57),h=(n(24),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){n.setState({value:e.target.value})},n.handleSubmit=function(e){n.props.onLogin(n.state.value),e.preventDefault(),n.setState({value:""})},n.state={value:""},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"login-form"},o.a.createElement("h1",null,"Hello!"),o.a.createElement("form",{onSubmit:function(t){return e.handleSubmit(t)}},o.a.createElement("label",null,o.a.createElement("p",null,"Nickname:"),o.a.createElement("input",{type:"text",value:this.state.value,onChange:this.handleChange})),o.a.createElement("input",{type:"submit",value:"ok"})))}}]),t}(a.Component));function p(e){var t=e.onLogin,n=o.a.useState(!1),a=Object(g.a)(n,2),s=a[0],r=a[1];return o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{type:"button",onClick:function(){r(!0)}},"login"),o.a.createElement(f.a,{className:"modal",disableAutoFocus:!0,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",open:s,onClose:function(){r(!1)}},o.a.createElement(h,{onLogin:t})))}var S=function(e){var t=e.from,n=e.onLogout,a=e.onLogin,s=t||"Stranger";return o.a.createElement("header",null,o.a.createElement("h1",null,s,", welcome to chat"),t?o.a.createElement("button",{onClick:function(){return n()}},"logout"):o.a.createElement(p,{onLogin:a}))},v=n(15),w=n.n(v),b=(n(49),n(50),Object(a.lazy)(function(){return new Promise(function(e){setTimeout(function(){return e(n.e(3).then(n.bind(null,59)))},2e3)})}));var E=function(e){var t=e.wsStatus,n=e.from,s=e.ws,r=e.msgs,l=e.scrollTop,i=e.scrolling,c=e.addToMsg;return o.a.createElement("main",null,1===t?o.a.createElement(a.Suspense,{fallback:o.a.createElement(w.a,{className:"spiner",type:"Triangle",color:"#000"})},o.a.createElement(b,{wsStatus:t,ws:s,from:n,msgs:r,scrollTop:l,scrolling:i,addToMsg:c})):o.a.createElement("div",{className:"error"},o.a.createElement("p",null,"Error with connection!")))},T=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){},n.handleSubmit=function(e){n.props.onSendMsg(),e.preventDefault(),n.setState({value:""})},n.state={value:""},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("form",{className:"mess-form",onSubmit:function(t){return e.handleSubmit(t)}},o.a.createElement("label",null,o.a.createElement("textarea",{type:"text",value:this.props.msgTempl,onChange:function(t){return e.props.addToMsg(t.target.value)}})),o.a.createElement("input",{type:"submit",value:"Send"})))}}]),t}(a.Component);var y=function(e){var t=e.onLogin,n=e.from,a=e.onSendMsg,s=e.msgTempl,r=e.addToMsg;return o.a.createElement("footer",null,n?o.a.createElement(T,{onSendMsg:a,from:n,msgTempl:s,addToMsg:r}):o.a.createElement("div",{className:"login-attent"},o.a.createElement("h1",null,"For commenting, please, login!"),o.a.createElement(p,{onLogin:t})),o.a.createElement("small",{className:"copyright"},"\xa9 pashax0 ",(new Date).getFullYear()))},k=(n(51),n(52),function(e){function t(e){var n;Object(i.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleLogout=function(){localStorage.removeItem("from"),localStorage.removeItem("notif"),n.setState({from:!1})},n.handleLogin=function(e){localStorage.setItem("from",e),n.setState({from:e})},n.handleScroll=function(e){var t=e.target.scrollHeight;n.setState({scrollTop:t})},n.handleSendMsg=function(){var e=n.state.msgTempl;if(1===n.state.wsStatus){var t={from:n.state.from,message:e};n.ws.send(JSON.stringify(t))}else{var a=JSON.parse(localStorage.getItem("msgs"))||[];a.push(e),localStorage.setItem("msgs",JSON.stringify(a))}n.setState({msgTempl:""})},n.handleAddToMsgFor=function(e){n.setState(function(t){return{msgTempl:t.msgTempl.concat("@".concat(e," "))}})},n.handleAddToMsgText=function(e){n.setState({msgTempl:e})};var a=[],o=!!localStorage.getItem("from")&&localStorage.getItem("from");return localStorage.getItem("msgs")&&(a=localStorage.getItem("msgs")),n.state={online:null,isActiveWindow:!0,wsStatus:null,from:o,msgs:a,scrollTop:500,msgTempl:""},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.handleInternetStatus(),this.handleWindowStatus(),this.connectWs()}},{key:"componentDidUpdate",value:function(e,t){var n=this;clearInterval(this.timer),this.state.wsStatus!==t.wsStatus&&this.setState({msgs:[]}),1!==this.state.wsStatus&&(this.timer=setInterval(function(){return n.connectWs()},1e4))}},{key:"handleInternetStatus",value:function(){var e=this;this.setState({online:navigator.onLine}),window.addEventListener("offline",function(){return e.setState({online:!1,wsStatus:"offline"})}),window.addEventListener("online",function(){return e.setState({online:!0})})}},{key:"handleWindowStatus",value:function(){var e=this;window.addEventListener("focus",function(){return e.setState({isActiveWindow:!0})}),window.addEventListener("blur",function(){return e.setState({isActiveWindow:!1})})}},{key:"connectWs",value:function(){var e=this;this.ws=new WebSocket("wss://wssproxy.herokuapp.com/"),this.ws.onopen=function(){console.log("onopen - ".concat(e.ws.readyState)),e.setState({wsStatus:e.ws.readyState})},this.ws.onerror=function(){console.log("onerror - ".concat(e.ws.readyState))},this.ws.onclose=function(t){e.setState({wsStatus:t.code}),console.log("onclose ".concat(t.code," - ").concat(e.ws.readyState))},this.ws.onmessage=function(t){e.setState(function(e){var n=JSON.parse(t.data).reverse();return{msgs:[].concat(Object(l.a)(e.msgs),Object(l.a)(n))}})}}},{key:"setNotification",value:function(){"Notification"in window?"default"===Notification.permission&&Notification.requestPermission().then(function(e){"granted"===e?alert("Thank, you!"):alert("If you change your mind, please - click this button!")}):console.log("This browser does not support desktop notification")}},{key:"render",value:function(){var e=this.state,t=e.wsStatus,n=e.from,a=e.msgs,s=e.scrollTop,r=e.msgTempl;return o.a.createElement(o.a.Fragment,null,o.a.createElement(S,{from:n,onLogout:this.handleLogout,onLogin:this.handleLogin}),o.a.createElement(E,{wsStatus:t,from:n,msgs:a,scrollTop:s,scrolling:this.handleScroll,addToMsg:this.handleAddToMsgFor}),o.a.createElement(y,{onLogin:this.handleLogin,from:n,msgTempl:r,onSendMsg:this.handleSendMsg,addToMsg:this.handleAddToMsgText}))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.325a59ef.chunk.js.map