"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[1931],{6723:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>h});var s=n(4848),i=n(8453);const o={title:"Sigstore, in-toto, OPA, orientation",authors:"danbev",tags:["sigstore"]},a=void 0,r={permalink:"/blog/2023/01/11/sigstore-in-toto-opa",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2023-01-11-sigstore-in-toto-opa.md",source:"@site/blog/2023-01-11-sigstore-in-toto-opa.md",title:"Sigstore, in-toto, OPA, orientation",description:"As someone who was completly new to secure supply chain security (sscs) there",date:"2023-01-11T00:00:00.000Z",tags:[{inline:!0,label:"sigstore",permalink:"/blog/tags/sigstore"}],readingTime:3.21,hasTruncateMarker:!0,authors:[{name:"Daniel Bevenius",title:"Maintainer",url:"https://github.com/danbev",imageURL:"https://github.com/danbev.png",key:"danbev"}],frontMatter:{title:"Sigstore, in-toto, OPA, orientation",authors:"danbev",tags:["sigstore"]},unlisted:!1,prevItem:{title:"Sigstore bundle format",permalink:"/blog/2023/01/13/sigstore-bundle-format"},nextItem:{title:"An Adventure with the CycloneDX Maven Plugin",permalink:"/blog/2022/12/09/cyclonedx-maven-plugin-adventure"}},l={authorsImageUrls:[void 0]},h=[];function c(e){const t={a:"a",p:"p",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"As someone who was completly new to secure supply chain security (sscs) there\nwere a lot of new projects that I learned the names of but did not really\nunderstand exactly what they did or how they complement each other. This post\nhopes to clarify a few of these projects, and others will be addressed in future\nposts."}),"\n",(0,s.jsxs)(t.p,{children:["Lets say we have a software project that we want to distribute. We want to sign\nthe artifact that we produce, and lets say it's distributed as a tar file. It\nis possible to do this signing manually, but it involves some work like managing\nkeys and using tools to perform the signing tasks. Using\n",(0,s.jsx)(t.a,{href:"https://www.sigstore.dev/",children:"sigstore"})," simplfies this process, similar to how\nLet's Encrypt made it simpler to get certificates to be used with web sites.\nSigstore also provides tools to verify signatures and a transparency log to\nstore signatures. So that allows us to sign our end product, and publish the\nsignatures to the transparency log, and consumers/clients can verify our\nartifact."]}),"\n",(0,s.jsx)(t.p,{children:"But how can we trust what was built? For example, if I built this tar on my\nlocal laptop I could replace a source code file with a backdoor and still be\nable to produce a valid signature, and it could still be verified. This is also\nthe case if a build server is used and it gets compromised, so we need something\nmore."}),"\n",(0,s.jsxs)(t.p,{children:["This is where another project named ",(0,s.jsx)(t.a,{href:"https://in-toto.io/",children:"in-toto"})," comes into\nplay. It contains tools to define the steps of a build process, and assign\nsomeone that is responsible for each step. This person also signs the artifact\nproduced by that step. So each step is signed by the person responsible for that\nstep, called the funtionary, and then all the steps are signed by a product\nowner. This will produce a document which lists the steps that were followed to\nproduce the software, with signatures for each step."]}),"\n",(0,s.jsx)(t.p,{children:"For example, one step might have been checking out a specific version from git,\nand this could be verified that it was indeed that version that was used, and\nthe source files that were used. This gives the end user insight into the\nproduct that they are about to install and the ability to verify it."}),"\n",(0,s.jsx)(t.p,{children:"So we now have our built artifact, signed it, and we have attestations, in\nthis case json files that contain metadata about how it was built. And we can\nuse in-toto-verify to verify that all that information is correct."}),"\n",(0,s.jsxs)(t.p,{children:["Now, lets say that another company, or another project, wants to include our\nsoftware in their project, as a thirdparty dependency. Ours might be one of many\ndependencies that they include in their product and they might have\nrequirements/restrictions on what they are allowed to use. For example, they\nmight require that only certain licences are used. The license information is\nhopefully available in the project, like a license file or field in Cargo.toml,\nbut there is nothing available to say that only certain licenses are allowed.\nThis is where a policy engine like\n",(0,s.jsx)(t.a,{href:"https://www.openpolicyagent.org/",children:"Open Policy Agent (OPA)"})," comes into play. OPA\ngives us the ability to write policy rules that take in-toto json files as\ninput, and verify that there are licences for all thirdparty dependencies and\nthat they are of the type(s) that are allowed. Rules can be written to handle\nother types of restrictions/requirements as well, which are the policies that\nthe company has."]}),"\n",(0,s.jsx)(t.p,{children:"So they could include a step in their build process that execute enforces the\npolicy rules they have defined. Policy rules can also be useful when deploying\napplications in container images where one might want to make sure that only\nsupported base images are used etc."}),"\n",(0,s.jsx)(t.p,{children:"Hopefully this post gives some insight into how Sigstore, in-toto, and OPA may\nbe used, and how they complement each other."})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>r});var s=n(6540);const i={},o=s.createContext(i);function a(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);