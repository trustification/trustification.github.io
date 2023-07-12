"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[5389],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(r),m=i,f=u["".concat(c,".").concat(m)]||u[m]||g[m]||o;return r?n.createElement(f,a(a({ref:t},p),{},{components:r})):n.createElement(f,a({ref:t},p))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},4748:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>g,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(7462),i=(r(7294),r(3905));const o={title:"Keyless Git Signing with Sigstore",authors:"danbev",tags:[]},a=void 0,s={permalink:"/blog/2022/12/02/sign-commits-with-sigstore",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2022-12-02-sign-commits-with-sigstore.md",source:"@site/blog/2022-12-02-sign-commits-with-sigstore.md",title:"Keyless Git Signing with Sigstore",description:"This post contains the steps for setting up",date:"2022-12-02T00:00:00.000Z",formattedDate:"December 2, 2022",tags:[],readingTime:1.715,hasTruncateMarker:!0,authors:[{name:"Daniel Bevenius",title:"Maintainer",url:"https://github.com/danbev",imageURL:"https://github.com/danbev.png",key:"danbev"}],frontMatter:{title:"Keyless Git Signing with Sigstore",authors:"danbev",tags:[]},prevItem:{title:"How to Configure a Gitsign Cache",permalink:"/blog/2022/12/05/gitsign-cache"},nextItem:{title:"Welcome",permalink:"/blog/welcome"}},c={authorsImageUrls:[void 0]},l=[],p={toc:l},u="wrapper";function g(e){let{components:t,...r}=e;return(0,i.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This post contains the steps for setting up\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/sigstore/gitsign"},"gitsign")," to sign your git\ncommits using ",(0,i.kt)("a",{parentName:"p",href:"https://www.sigstore.dev/"},"sigstore"),"."))}g.isMDXComponent=!0}}]);