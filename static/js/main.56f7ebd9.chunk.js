(this["webpackJsonpreact-video-playerlist"]=this["webpackJsonpreact-video-playerlist"]||[]).push([[0],{41:function(e,t,a){e.exports=a(79)},46:function(e,t,a){},79:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(19),c=a.n(r),i=(a(46),a(11)),o=a(28),s=a(9),d=a.n(s),m=a(16),u=a.n(m),f=a(39),v=a.n(f);var E=a(30);function p(e){var t=e.currentVideo;return l.a.createElement("div",{className:"video-player"},t?l.a.createElement("div",{className:"video-container"},l.a.createElement(E.a,{source:{type:"video",sources:[{src:t.url,type:"video/mp4",size:720}]}}),l.a.createElement("div",{className:"flex center label-name"},t.name)):l.a.createElement("div",{className:"text-muted"},l.a.createElement("p",null,"1. Click on the",l.a.createElement("span",{className:"c-icon"},l.a.createElement(u.a,null)),"Playlist icon"),l.a.createElement("p",null,"2. Add URLs separated by comma"),l.a.createElement("p",null,"3. Save playlist and watch video")))}var h=a(33),g=a.n(h),N=a(34),b=a.n(N),y=a(35),S=a.n(y),O=a(36),w=a.n(O);function V(e){var t=e.toggle,a=e.setSidebar,n=e.showSideBar;return l.a.createElement("div",{className:"toolbar"},l.a.createElement("span",{href:"#",onClick:function(){return a(!n)}},n?l.a.createElement(g.a,{fontSize:"small"}):l.a.createElement(b.a,{fontSize:"small"})),l.a.createElement("div",null,l.a.createElement("span",{"data-tip":"Change mode",className:"round-button-inverse",onClick:t},l.a.createElement(d.a,{effect:"solid",place:"right"}),l.a.createElement(S.a,{fontSize:"small"})),l.a.createElement("a",{target:"_BLANK",rel:"noopener noreferrer",href:"https://github.com/PJijin/React-Video-Playlist","data-tip":"View On Github",className:"round-button-inverse"},l.a.createElement(d.a,{effect:"solid",place:"right"}),l.a.createElement(w.a,{fontSize:"small"})," Github")))}var j=a(38),k=a.n(j),z=a(37),C=a.n(z);function x(e){var t=e.videos,a=e.currentVideo,n=e.setCurrentVideo,r=e.setVideos;return l.a.createElement(l.a.Fragment,null,l.a.createElement("h4",null,"Videos in Playlist ",0!==t.length?l.a.createElement("div",{className:"playlist-count"},t.length):""),l.a.createElement("ul",null,0===t.length?l.a.createElement("span",{className:"text-muted"},"No video's in the Playlist"):"",t.map((function(e,c){var i=e.name?e.name:"Video ".concat(c+1);return l.a.createElement("li",{key:e.url,className:a===e?"active":"",title:i},l.a.createElement("div",{onClick:function(){return n(e)},href:"#",className:"d-flex pl-5 nav-video"},l.a.createElement("div",{className:"select-video"},l.a.createElement(C.a,{fontSize:"small"})),l.a.createElement("div",{className:"video-title"},i),l.a.createElement("div",{className:"delete-video","data-tip":"Remove Video"},l.a.createElement(d.a,{effect:"solid",place:"right"}),l.a.createElement(k.a,{onClick:function(e){!function(e,t,a){var n=t.filter((function(t,a){return a!==e}));console.log(n),localStorage.setItem("videos",JSON.stringify(n)),a(n)}(c,t,r)}}))))}))))}var P=function(){var e=Object(o.a)(!1),t=Object(n.useState)(function(){var e=localStorage.getItem("videos");console.log(e);var t=JSON.parse(e);return t||[]}()),a=Object(i.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)(r[0]),m=Object(i.a)(s,2),f=m[0],E=m[1],h=Object(n.useState)(!1),g=Object(i.a)(h,2),N=g[0],b=g[1],y=Object(n.useState)(!0),S=Object(i.a)(y,2),O=S[0],w=S[1],j=Object(n.useState)(!1),k=Object(i.a)(j,2),z=k[0],C=k[1],P=function(){b(!N)};return l.a.createElement("div",{className:"App d-flex"},O&&l.a.createElement("div",{className:"sidebar"},l.a.createElement("div",{className:"right"},l.a.createElement("div",{"data-tip":"Add to Playlist",className:"round-button",onClick:function(){return P()}},l.a.createElement(d.a,{effect:"solid",place:"right"}),l.a.createElement(u.a,null)),l.a.createElement("div",{"data-tip":"Clear Playlist",className:"round-button",onClick:function(){c([]),localStorage.removeItem("videos")}},l.a.createElement(d.a,{effect:"solid",place:"right"}),l.a.createElement(v.a,{fontSize:"small"}))),N&&l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),!function(e,t,a){return function(e){var n=t.concat(e);localStorage.setItem("videos",JSON.stringify(n)),a(n)}(function(e){var t=[];return e.forEach((function(e){var a,n,l=e.trim(),r=l.indexOf(" ");r>=0?(a=l.slice(0,r),n=l.slice(r+1)):a=l,/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(a)&&t.push({url:a,name:n})})),t}(e.split("\n"))),!0}(e.target.playlisturls.value,r,c)?C("URL List contains invalid URL"):(P(),C())},className:"playlist-form"},z&&l.a.createElement("div",{className:"alert-error"},z),l.a.createElement("textarea",{name:"playlisturls",required:!0,placeholder:"Add videos to playlist (separated by newline). You can add custom name to videos (separated by space) Eg: VideoURL NAME."}),l.a.createElement("button",{className:"right button-primary"},"Add to Playlist")),l.a.createElement(x,{videos:r,currentVideo:f,setCurrentVideo:E,setVideos:c})),l.a.createElement("div",{className:"video-player-section"},l.a.createElement(V,{toggle:e.toggle,setSidebar:w,showSideBar:O}),l.a.createElement("div",{className:"grow d-flex center"},l.a.createElement("div",{className:"w-100"},l.a.createElement(p,{currentVideo:f})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[41,1,2]]]);
//# sourceMappingURL=main.56f7ebd9.chunk.js.map