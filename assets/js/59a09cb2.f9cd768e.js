"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[1852],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=s(n),m=o,f=p["".concat(l,".").concat(m)]||p[m]||g[m]||a;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[p]="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6943:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const a={title:"The CycloneDX Maven Aggregate SBOM and why you shouldn't trust it (yet)",authors:"kevinconner",tags:["cyclonedx"]},i=void 0,c={permalink:"/blog/2023/03/20/cyclonedx-maven-aggregate-bom-why-not-to-trust",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2023-03-20-cyclonedx-maven-aggregate-bom-why-not-to-trust.md",source:"@site/blog/2023-03-20-cyclonedx-maven-aggregate-bom-why-not-to-trust.md",title:"The CycloneDX Maven Aggregate SBOM and why you shouldn't trust it (yet)",description:"Over the last few months I've spent a lot of time with the CycloneDX Maven Plugin, trying to prove it is suitable for us to use as part of securing the Software Supply Chain. I've discovered and fixed a number of issues, related to the generation of an SBOM for each project using the makeBom goal, and have now turned my focus to aggregates and the makeAggregateBom goal.",date:"2023-03-20T00:00:00.000Z",formattedDate:"March 20, 2023",tags:[{label:"cyclonedx",permalink:"/blog/tags/cyclonedx"}],readingTime:12.945,hasTruncateMarker:!0,authors:[{name:"Kevin Conner",title:"Maintainer",url:"https://github.com/kevinconner",imageURL:"https://github.com/kevinconner.png",key:"kevinconner"}],frontMatter:{title:"The CycloneDX Maven Aggregate SBOM and why you shouldn't trust it (yet)",authors:"kevinconner",tags:["cyclonedx"]},nextItem:{title:"in-toto attestations",permalink:"/blog/2023/03/13/in-toto-attestations"}},l={authorsImageUrls:[void 0]},s=[],u={toc:s},p="wrapper";function g(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Over the last few months I've spent a lot of time with the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/CycloneDX/cyclonedx-maven-plugin",title:"The CycloneDX Maven Plugin GitHub repository"},"CycloneDX Maven Plugin"),", trying to prove it is suitable for us to use as part of securing the Software Supply Chain. I've discovered and fixed a number of issues, related to the generation of an SBOM for each project using the ",(0,o.kt)("inlineCode",{parentName:"p"},"makeBom")," goal, and have now turned my focus to aggregates and the ",(0,o.kt)("inlineCode",{parentName:"p"},"makeAggregateBom")," goal."))}g.isMDXComponent=!0}}]);