(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports=n(46)},17:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(9),l=n.n(r),s=(n(17),n(7)),c=n(2),i=n(3),u=n(5),m=n(4),g=n(6);var f=function(e){e.status;var t=e.from,n=e.onLogout,o=e.onLogin,r=t?t.toUpperCase():"Stranger";return a.a.createElement("header",null,a.a.createElement("h1",null,r,", welcome to chat"),t?a.a.createElement("button",{onClick:function(){return n()}},"logout"):a.a.createElement("button",{onClick:function(){return o()}},"login"))},h=n(10),d=n.n(h),p=(n(42),n(43),Object(o.lazy)(function(){return new Promise(function(e){setTimeout(function(){return e(n.e(3).then(n.bind(null,48)))},2e3)})}));var v=function(e){var t=e.msgs,n=e.scrollTop,r=e.scrolling;return a.a.createElement("main",null,a.a.createElement(o.Suspense,{fallback:a.a.createElement(d.a,{className:"spiner",type:"Triangle",color:"#000"})},a.a.createElement(p,{msgs:t,scrollTop:n,scrolling:r})))},w=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){n.setState({value:e.target.value})},n.handleSubmit=function(e){var t={from:n.props.from,message:n.state.value};n.props.ws.send(JSON.stringify(t)),e.preventDefault(),n.setState({value:""})},n.state={value:""},n}return Object(g.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement(a.a.Fragment,null,a.a.createElement("form",{className:"mess-form",onSubmit:function(t){return e.handleSubmit(t)}},a.a.createElement("label",null,a.a.createElement("textarea",{type:"text",value:this.state.value,onChange:this.handleChange})),a.a.createElement("input",{type:"submit",value:"Send"})))}}]),t}(o.Component);var S=function(e){return a.a.createElement("div",{className:"login-attent"},a.a.createElement("h1",null,"For commenting, please, login!"),a.a.createElement("button",{onClick:function(){return e.onLogin()}},"Login"))};var b=function(e){var t=e.onLogin,n=e.from,o=e.ws;return a.a.createElement("footer",null,n?a.a.createElement(w,{ws:o,from:n}):a.a.createElement(S,{onLogin:t}),a.a.createElement("small",{className:"copyright"},"\xa9 pashax0 ",(new Date).getFullYear()))},E=(n(44),n(45),function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleLogout=function(){localStorage.removeItem("from"),n.setState({from:!1})},n.handleLogin=function(){localStorage.setItem("from","me"),n.setState({from:"me"})},n.handleScroll=function(e){var t=e.target.scrollHeight;n.setState({scrollTop:t})};var o=[],a=localStorage.getItem("notif")?localStorage.getItem("notif"):null,r=!!localStorage.getItem("from")&&localStorage.getItem("from");return localStorage.getItem("msgs")&&(o=localStorage.getItem("msgs")),n.state={notificationPerm:a,wsStatus:null,from:r,msgs:o,scrollTop:500},n.ws=new WebSocket("ws://st-chat.shas.tel"),n}return Object(g.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;"Notification"in window?this.state.notificationPerm||Notification.requestPermission().then(function(t){e.setState({notificationPerm:t})}):console.log("This browser does not support desktop notification"),this.ws.onmessage=function(t){e.setState(function(e){var n=JSON.parse(t.data).reverse();return{msgs:[].concat(Object(s.a)(e.msgs),Object(s.a)(n))}})},this.ws.onclose=function(e){return console.log(e.code)}}},{key:"componentDidUpdate",value:function(){console.log(this.ws.readyState)}},{key:"render",value:function(){var e=this.state,t=e.wsStatus,n=e.from,o=e.msgs,r=e.scrollTop;e.connectStatus;return a.a.createElement(a.a.Fragment,null,a.a.createElement(f,{from:n,onLogout:this.handleLogout,onLogin:this.handleLogin}),a.a.createElement(v,{wsStatus:t,msgs:o,onLogin:this.handleLogin,from:n,user:"test",ws:this.ws,scrollTop:r,scrolling:this.handleScroll}),a.a.createElement(b,{onLogin:this.handleLogin,from:n,ws:this.ws}))}}]),t}(o.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[11,1,2]]]);
//# sourceMappingURL=main.d11d7bc9.chunk.js.map