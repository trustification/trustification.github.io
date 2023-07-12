"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[8676],{3905:(e,t,n)=>{n.d(t,{Zo:()=>h,kt:()=>g});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},h=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),u=d(n),p=i,g=u["".concat(l,".").concat(p)]||u[p]||c[p]||o;return n?a.createElement(g,r(r({ref:t},h),{},{components:n})):a.createElement(g,r({ref:t},h))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:i,r[1]=s;for(var d=2;d<o;d++)r[d]=n[d];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6658:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const o={title:"Signing elf binaries, or not?! Lessons learned.",authors:"ctron",tags:[]},r=void 0,s={permalink:"/blog/2023/02/13/elfsign",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2023-02-13-elfsign.md",source:"@site/blog/2023-02-13-elfsign.md",title:"Signing elf binaries, or not?! Lessons learned.",description:"Trying to figure out what went into a binary can be a tricky thing. And once you figured it out, how do you",date:"2023-02-13T00:00:00.000Z",formattedDate:"February 13, 2023",tags:[],readingTime:8.66,hasTruncateMarker:!0,authors:[{name:"Jens Reimann",title:"Maintainer",url:"https://github.com/ctron",imageURL:"https://github.com/ctron.png",key:"ctron"}],frontMatter:{title:"Signing elf binaries, or not?! Lessons learned.",authors:"ctron",tags:[]},prevItem:{title:"in-toto attestations",permalink:"/blog/2023/03/13/in-toto-attestations"},nextItem:{title:"Continuing the Adventure with the CycloneDX Maven Plugin",permalink:"/blog/2023/02/10/cyclonedx-maven-plugin-adventure-continues"}},l={authorsImageUrls:[void 0]},d=[{value:"SBOMs",id:"sboms",level:2},{value:"What really goes in",id:"what-really-goes-in",level:2},{value:"Null and void",id:"null-and-void",level:2},{value:"Usability",id:"usability",level:2},{value:"Back to binaries",id:"back-to-binaries",level:2},{value:"Solvable downsides",id:"solvable-downsides",level:2},{value:"Too good to be true?",id:"too-good-to-be-true",level:2},{value:"Happy end?",id:"happy-end",level:2},{value:"So what?",id:"so-what",level:2}],h={toc:d},u="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Trying to figure out what went into a binary can be a tricky thing. And once you figured it out, how do you\ntransport this information? True, it all starts simple: Java, NodeJS, Go, or Rust, all languages",(0,i.kt)("sup",{parentName:"p",id:"fnref-1-84d680"},(0,i.kt)("a",{parentName:"sup",href:"#fn-1-84d680",className:"footnote-ref"},"1"))," bring their\ndependency management, which defines what the final command line tool you create is made of. Or, does it?"),(0,i.kt)("p",null,"But let's take a step back: A typical use-case today is to download a command line application from the internet.\nTake ",(0,i.kt)("inlineCode",{parentName:"p"},"helm")," for example. You navigate to their GitHub releases page, download the binary, unzip it into a local\nfolder and run it. But, what exactly is inside the binary?"),(0,i.kt)("h2",{id:"sboms"},"SBOMs"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Software Bills of Material")," (SBOMs) are a thing which already exist. Yet, someone needs to create them,\nand creating an accurate SBOM can be tricky."),(0,i.kt)("p",null,"There are tools to create SBOMs from the source code of a project, but that doesn't tell the whole story in\nmost cases. Those tools simply analyze the dependency information declared in e.g. a ",(0,i.kt)("inlineCode",{parentName:"p"},"package.lock")," file, or a Maven ",(0,i.kt)("inlineCode",{parentName:"p"},"pom.xml"),'. Should be enough, right? Well, no. Maven projects for example have "profiles", and you\nneed to exactly generate the SBOM for the profile that gets enabled when creating the final artifact. Also,\nwith Maven mirrors and proxies, it\'s not always 100% clear what gets into a "binary" and where it comes from.'),(0,i.kt)("h2",{id:"what-really-goes-in"},"What really goes in"),(0,i.kt)("p",null,"Then again, JAR files aren't real binaries are they. They are ZIP files, which contain compiled ",(0,i.kt)("inlineCode",{parentName:"p"},".class"),' files. So\nit actually is pretty simple to understand what is in there. Assuming you trust your build process\n(which is a topic of its own). Even if you create a "fat", or "shaded" JAR, it is possible to understand what\nreally ended up in your "binary".'),(0,i.kt)("p",null,"And, others can do the same. Rust for example allows one use ",(0,i.kt)("inlineCode",{parentName:"p"},"cargo auditable"),", to tap into the compilation process,\nand record the actual dependencies which go into a binary. On Linux, the binary will be an ELF file, which then\ncontains the dependency information from the compilation process. And Go can do the same."),(0,i.kt)("h2",{id:"null-and-void"},"Null and void"),(0,i.kt)("p",null,"But, if someone can write dependency information into a binary, then someone else can also overwrite it. So\nunless you protect the binary against modifications, this information isn't really trustworthy. Taking a look at\nthe Helm release page, you will find SHA based checksums. Isn't that enough?"),(0,i.kt)("p",null,"No, not really. Because if someone can alter the binary on the download page, the attacker can also swap out the\nSHA checksum file. The checksum, or digest, really isn't more than a checksum. By its own, it doesn't protect much."),(0,i.kt)("p",null,'If however, you encrypt the digest with a private key that only the author knows, and you publish the public key\npart, then this becomes a "signature". And this is good enough to prove, that only the person how knew the private\nkey, could have signed the binary. And if we can trust this person to create the correct SBOM and binary, and keep\nthe private key secure, we are good.'),(0,i.kt)("h2",{id:"usability"},"Usability"),(0,i.kt)("p",null,"Or, not! In the Maven world JARs have been signed for quite a while. Everyone uploading JARs to Maven Central needs\nto sign their JAR with GPG. And I guess most people never validated a JAR during a build."),(0,i.kt)("p",null,"On the other side, the Eclipse IDE (as well as some other Java applications), did JAR file validation for quite a\nwhile. Whenever you install a plugin, it cryptographically validates the JAR. And it's easy, as the JAR file itself\nis signed, and the signature is part of the JAR file. As part of the build process in the Eclipse Foundation\nbuild system, JARs which got created by the build, can automatically get signed. No additional files needed,\nand only the actual build output is considered, no guessing of dependencies."),(0,i.kt)("p",null,"From a user perspective, the IDE automatically checks signatures, and only bothers the user if an issue was found.\nThe user can override, because the idea is to give the final authority to the user."),(0,i.kt)("h2",{id:"back-to-binaries"},"Back to binaries"),(0,i.kt)("p",null,"Now, just assume we could do the same with (ELF) binaries. In fact this was possible a while back, Solaris had some\ntools to sign ELF binaries. That doesn't help on modern Linux systems. But with a bit of Rust code, it was possible\nto create ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ctron/elfsign"},"elfsign"),". The idea is simple:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Create a digest of all relevant ELF sections and headers"),(0,i.kt)("li",{parentName:"ul"},"Sign this digest"),(0,i.kt)("li",{parentName:"ul"},"Add the signature to the ELF binary as a new section")),(0,i.kt)("h2",{id:"solvable-downsides"},"Solvable downsides"),(0,i.kt)("p",null,"The first downside might be that people are afraid of signed binaries. Windows and macOS have been doing this for a\nwhile, and it happens that signatures get in the way of the user running a binary. Well, actually it is the operating\nsystem which gets into the user's way. To protect the user, that's the argument. And that might be true, but it also\nis true that some users indeed know better than the operating system and want to have the final word in what they\ncan run."),(0,i.kt)("p",null,"This problem can easily be addressed. Checking a signature, and making a decision if a binary can be run or not,\nactually are two different things. Even if a system brings a default rule/policy set which would reject invalid\nsignatures, it could still be possible to let the user customize the behavior and override, just like the\nEclipse IDE does."),(0,i.kt)("p",null,"Another issue the handling of keys and certificates. Prices for code signing certificates can be quite high.\nEspecially when we are talking about open source projects, this can become a truly limiting factor. It also takes a\nbit of care, handling a private key properly."),(0,i.kt)("p",null,"Luckily, we now have ",(0,i.kt)("a",{parentName:"p",href:"https://www.sigstore.dev/"},"sigstore"),". Sigstore can help us with two things, creating\nshort-lived private keys (Fulcio), and a tamper-resistant log (Rekor). We already talked a bit about both in\nthe context of ","[gitsign]","({% post_url 2022-12-02-sign-commits-with-sigstore %})."),(0,i.kt)("p",null,"Adding Fulcio and Rekor to ",(0,i.kt)("inlineCode",{parentName:"p"},"elfsign"),", we gain a bunch of cool things:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Short-lived, disposable private keys: You don't need to store them, they are only valid for a few minutes."),(0,i.kt)("li",{parentName:"ul"},"X.509 certificates: Alongside the key, we get an X.509 certificates, with our identity, which we can use for signing."),(0,i.kt)("li",{parentName:"ul"},"An attestation that we provided the valid certificate and signature to Rekor, at a time the key was valid")),(0,i.kt)("p",null,"And with that, we can easily implement ",(0,i.kt)("inlineCode",{parentName:"p"},"elfsign sign")," to sign a binary, and ",(0,i.kt)("inlineCode",{parentName:"p"},"elfsign verify")," to validate one. We\ncould also create something like ",(0,i.kt)("inlineCode",{parentName:"p"},"elfsign execute")," to verify and execute, but that's just a variant of ",(0,i.kt)("inlineCode",{parentName:"p"},"verify"),"."),(0,i.kt)("p",null,"As we can prove, using Rekor, that we did own the private key during the time the certificate was valid, and we\nprovided the signature/digest at the same time, we now only need to decide if we want to trust the issuer and the\nsubject the certificate was issued for. And by storing ","[the Rekor bundle]","({% post_url 2023-01-13-sigstore-bundle-format %}), we can do this offline too."),(0,i.kt)("h2",{id:"too-good-to-be-true"},"Too good to be true?"),(0,i.kt)("p",null,"So where's the catch?"),(0,i.kt)("p",null,"Signing elf binaries adds a bit of extra complexity. Creating a digest of an ELF binary isn't as trivial as\njust running ",(0,i.kt)("inlineCode",{parentName:"p"},"sha256sum"),' on a file. Storing an additional "signature section" in the ELF binary, will actually\nalter it. So it is necessary have a normalized view on the ELF binary, which creates a reproducible digest, one that\ndoes include all important information, but excludes the signature information itself, and still is a valid ELF\nbinary format.'),(0,i.kt)("p",null,"It works, but is a bit complex. And more complexity might lead to more bugs, which isn't a good thing when\nit comes to cryptography. But if this allows one to drop handling additional files (like SBOMs or checksum files),\nand increase the usability, it may actually be worth it."),(0,i.kt)("p",null,"The problem is, that the tooling which creates the dependency information for the ELF binaries, isn't\naccurate enough."),(0,i.kt)("p",null,'In many cases it works, but as soon as you include a C library, add some JavaScript for an embedded frontend, or\ndeviate from "standard artifact repositories", many of those tools just fall short. And I am not even talking\nabout all those little hacks in build systems, or the mess called "vendor" folder in Go.'),(0,i.kt)("p",null,"SBOM formats like ",(0,i.kt)("a",{parentName:"p",href:"https://cyclonedx.org/"},"CycloneDX")," allow you to compensate and fix up generated SBOMs.\nBut, that's another step in the build process, and the output doesn't go into the ELF binary. As Go only cares\nabout Go dependencies, and Cargo only about Cargo."),(0,i.kt)("p",null,"So adding all the complexity isn't good enough in the end. You still need to handle an extra file, and validate it."),(0,i.kt)("h2",{id:"happy-end"},"Happy end?"),(0,i.kt)("p",null,"The truth is, ",(0,i.kt)("inlineCode",{parentName:"p"},"cosign"),", which is intended to sign containers, can actually sign any BLOB. Just the same way,\nusing Fulcio to get a short-lived private key and certificate, and storing the signature in Rekor. So if we can make\nour peace with handling an extra file, we can just use ",(0,i.kt)("inlineCode",{parentName:"p"},"cosign sign-blob")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"cosign verify-blob")," to sign\nanything we want. Using ",(0,i.kt)("inlineCode",{parentName:"p"},"cosign attest-blob"),', we can even "attach" an SBOM to the Rekor log entry.'),(0,i.kt)("p",null,'Yes, we need to handle the extra "bundle" and "signature" files. Or we can accept the fact that we need rely on the\nuptime of the Rekor instance (or our ISP). But it definitely improves the situation over the status quo.'),(0,i.kt)("h2",{id:"so-what"},"So what?"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"elfsign"),' was a nice experiment. And while it didn\'t work out, I still learned a lot. I also still believe that\nthe idea works out in general. It just needs more work for a more specialized solution. So the approach of\n"cosign blob" is a more generic one. However, through that, also less user-friendly one.'),(0,i.kt)("p",null,'But this situation could also be improved. Just assume someone would create a more convenient version of\ncosign, which "downloads and verifies" or "verifies and executes". That would definitely lead to a similar\nuser experience, and help with adoption.'),(0,i.kt)("p",null,"And, having a policy engine like Seedwing, you could actually define checks like: Only run this binary if it is signed, and does not contain a dependency which has an active CVE."),(0,i.kt)("p",null,"If you are interested in things like this, maybe this blog post gave you a few insights and ideas."),(0,i.kt)("div",{className:"footnotes"},(0,i.kt)("hr",{parentName:"div"}),(0,i.kt)("ol",{parentName:"div"},(0,i.kt)("li",{parentName:"ol",id:"fn-1-84d680"},"Yes, C/C++ is missing here. Let's not talk about build systems and dependency management for C/C++ \ud83d\ude09",(0,i.kt)("a",{parentName:"li",href:"#fnref-1-84d680",className:"footnote-backref"},"\u21a9")))))}c.isMDXComponent=!0}}]);