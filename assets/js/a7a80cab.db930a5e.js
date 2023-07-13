"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[7520],{3905:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>b});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var c=r.createContext({}),l=function(t){var e=r.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=l(t.components);return r.createElement(c.Provider,{value:e},t.children)},p="mdxType",f={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},g=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,c=t.parentName,u=s(t,["components","mdxType","originalType","parentName"]),p=l(n),g=a,b=p["".concat(c,".").concat(g)]||p[g]||f[g]||o;return n?r.createElement(b,i(i({ref:e},u),{},{components:n})):r.createElement(b,i({ref:e},u))}));function b(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=g;var s={};for(var c in e)hasOwnProperty.call(e,c)&&(s[c]=e[c]);s.originalType=t,s[p]="string"==typeof t?t:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},3304:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>f,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const o={title:"in-toto attestations",authors:"danbev",tags:[]},i=void 0,s={permalink:"/blog/2023/03/13/in-toto-attestations",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2023-03-13-in-toto-attestations.md",source:"@site/blog/2023-03-13-in-toto-attestations.md",title:"in-toto attestations",description:"When we sign an artifact, like a blob, the signature proves that we were in",date:"2023-03-13T00:00:00.000Z",formattedDate:"March 13, 2023",tags:[],readingTime:7.425,hasTruncateMarker:!0,authors:[{name:"Daniel Bevenius",title:"Maintainer",url:"https://github.com/danbev",imageURL:"https://github.com/danbev.png",key:"danbev"}],frontMatter:{title:"in-toto attestations",authors:"danbev",tags:[]},prevItem:{title:"The CycloneDX Maven Aggregate SBOM and why you shouldn't trust it (yet)",permalink:"/blog/2023/03/20/cyclonedx-maven-aggregate-bom-why-not-to-trust"},nextItem:{title:"Signing elf binaries, or not?! Lessons learned.",permalink:"/blog/2023/02/13/elfsign"}},c={authorsImageUrls:[void 0]},l=[],u={toc:l},p="wrapper";function f(t){let{components:e,...n}=t;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"When we sign an artifact, like a blob, the signature proves that we were in\npossesion of the private key. When we verify, we use the signature, the public\nkey, and the blob, and we are verifying that this was in fact the case. But it\ndoes not say anything else about the artifact, we don't know ",(0,a.kt)("inlineCode",{parentName:"p"},"what")," was actually\nsigned."))}f.isMDXComponent=!0}}]);