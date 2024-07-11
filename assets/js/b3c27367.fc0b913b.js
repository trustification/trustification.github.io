"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[6006],{3594:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>r,toc:()=>h});var a=n(4848),s=n(8453);const i={title:"Trustify: Release 0.1.0-alpha.10",authors:"ctron",tags:["trustify","release"]},o=void 0,r={permalink:"/blog/2024/07/04/release-0-1-0-alpha-10",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2024-07-04-release-0-1-0-alpha-10.md",source:"@site/blog/2024-07-04-release-0-1-0-alpha-10.md",title:"Trustify: Release 0.1.0-alpha.10",description:"Today we released Trustify 0.1.0-alpha.10. It's another alpha release as part of our weekly release cadence.",date:"2024-07-04T00:00:00.000Z",tags:[{inline:!0,label:"trustify",permalink:"/blog/tags/trustify"},{inline:!0,label:"release",permalink:"/blog/tags/release"}],readingTime:1.525,hasTruncateMarker:!0,authors:[{name:"Jens Reimann",title:"Maintainer",url:"https://github.com/ctron",imageURL:"https://github.com/ctron.png",key:"ctron"}],frontMatter:{title:"Trustify: Release 0.1.0-alpha.10",authors:"ctron",tags:["trustify","release"]},unlisted:!1,nextItem:{title:"Trying out Trustify, on a local machine",permalink:"/blog/2024/06/27/trying-out-trustify"}},l={authorsImageUrls:[void 0]},h=[{value:"New and noteworthy",id:"new-and-noteworthy",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}];function c(e){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["Today we released Trustify ",(0,a.jsx)(t.code,{children:"0.1.0-alpha.10"}),". It's another alpha release as part of our weekly release cadence.\nRead on to learn what's new."]}),"\n",(0,a.jsx)(t.h2,{id:"new-and-noteworthy",children:"New and noteworthy"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"There are more labels that get applied during the upload process. It also is possible to automatically add labels\nusing the importer configuration."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"The system will now also record the SHA384 and SHA512 digests of uploaded documents."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:'The package API endpoint and corresponding UI have been renamed to "PURL".'}),"\n",(0,a.jsx)(t.p,{children:'The reason for that is pretty simple, the discussion was not. Right now, these "packages" actually had been "PURLs",\nand not much more. That led to confusion about what arguments to pass in, and what information to expect back.'}),"\n",(0,a.jsx)(t.p,{children:"For the future, we still want to collect information about packages, outside the context of an SBOM. However today,\nthat model didn't work well."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"In addition to titles, also descriptions will be returned now for advisories. As many advisories don't have a title,\nthis allows the UI to render a title, based on those descriptions instead."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"Allow setting labels during the upload of a document."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"There are some incompatible changes to the database migration. While our goal is to provide migrations as good as\npossible, this change was simply too big. So, as we are still in an alpha cycle, the decision was made to simply\nupdate the schema in a breaking way."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:"The UI can show the relationship between package and vulnerabilities for each entity"}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,a.jsxs)(t.p,{children:['Of course, we would recommend you try out the new version! In "',(0,a.jsx)(t.a,{href:"/blog/2024/06/27/trying-out-trustify",children:"Trying out Trustify, on a local machine"}),'", we introduced a quick and easy way to get there within minutes.']}),"\n",(0,a.jsx)(t.p,{children:"And of course:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Check out the ",(0,a.jsx)(t.a,{href:"https://github.com/trustification/trustify/releases/tag/v0.1.0-alpha.10",children:"release 0.1.0-alpha.10"}),"."]}),"\n",(0,a.jsxs)(t.li,{children:["Reach out to ",(0,a.jsx)(t.a,{href:"https://matrix.to/#/#trustification:matrix.org",children:"us on Matrix"}),", and let us know what you think."]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>r});var a=n(6540);const s={},i=a.createContext(s);function o(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);