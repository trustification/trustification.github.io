"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[6679],{3148:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>h,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var s=t(4848),i=t(8453);const o={title:"Is this a cryptographic key which I see before me?",authors:"danbev",tags:[]},r=void 0,a={permalink:"/blog/2023/01/25/keys",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2023-01-25-keys.md",source:"@site/blog/2023-01-25-keys.md",title:"Is this a cryptographic key which I see before me?",description:"Yes, it is. Really? Then what format is it in and how can I tell?",date:"2023-01-25T00:00:00.000Z",tags:[],readingTime:3.565,hasTruncateMarker:!0,authors:[{name:"Daniel Bevenius",title:"Maintainer",url:"https://github.com/danbev",imageURL:"https://github.com/danbev.png",key:"danbev"}],frontMatter:{title:"Is this a cryptographic key which I see before me?",authors:"danbev",tags:[]},unlisted:!1,prevItem:{title:"The Update Framework (TUF)",permalink:"/blog/2023/01/31/tuf"},nextItem:{title:"Sigstore bundle format",permalink:"/blog/2023/01/13/sigstore-bundle-format"}},h={authorsImageUrls:[void 0]},l=[{value:"PEM formatted keys",id:"pem-formatted-keys",level:2},{value:"DER formatted keys",id:"der-formatted-keys",level:2},{value:"When the guidelines fail",id:"when-the-guidelines-fail",level:2}];function c(e){const n={a:"a",br:"br",code:"code",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"Yes, it is. Really? Then what format is it in and how can I tell?"}),"\n",(0,s.jsx)(n.p,{children:"I've found myself in this situation a number of times and this post tries to\nprovide some guidelines for figuring out the type and format of keys without\nhaving to go off and read some project's documentation."}),"\n",(0,s.jsx)(n.p,{children:"To start off we can try to determine if the key is in a PEM format, or in\nDER format."}),"\n",(0,s.jsxs)(n.p,{children:["Keys in PEM format are in ascii and can be inspected from the\ncommand line using ",(0,s.jsx)(n.code,{children:"cat"}),", or opened in any text editor. For example:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"$ cat pubkey.pem\n-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZ\nk/BAIoz2GL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyA==\n-----END PUBLIC KEY-----\n"})}),"\n",(0,s.jsx)(n.p,{children:"If we try the same with DER format then we will get a bunch of strange\ncharacters printed. For example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'$ cat pubkey.der\n;\ufffd\ufffd\ufffdl\u018cL]\ufffd\ufffd^\ufffd\ufffdJ/T\ufffd\u0653\ufffd@"\ufffd\ufffd\ufffd\ufffd=\ufffd\ufffddCT\ufffd\ufffd+G\u0740\ufffd\ufffdW\ufffdH\u049ak\u0392\ufffd@\ufffdhgv\ufffd\ufffd\ufffd$\n'})}),"\n",(0,s.jsx)(n.h2,{id:"pem-formatted-keys",children:"PEM formatted keys"}),"\n",(0,s.jsx)(n.p,{children:"So we have determined that the key we have in front of us is in PEM format.\nNow, if we take a look at the PEM output above again:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZ\nk/BAIoz2GL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyA==\n-----END PUBLIC KEY-----\n"})}),"\n",(0,s.jsxs)(n.p,{children:["We can see that it has a header and the footer. Notice that there is no\ninformation about the type of public key that this file contains. This means\nthat the information about the type of key in baked in there somewhere. So how\ncan we find out what the type of the key?",(0,s.jsx)(n.br,{}),"\n","One option is to use the ",(0,s.jsx)(n.code,{children:"openssl asn1parse"})," command:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ openssl asn1parse -i  -in pubkey.pem\n    0:d=0  hl=2 l=  89 cons: SEQUENCE\n    2:d=1  hl=2 l=  19 cons:  SEQUENCE\n    4:d=2  hl=2 l=   7 prim:   OBJECT            :id-ecPublicKey\n   13:d=2  hl=2 l=   8 prim:   OBJECT            :prime256v1\n   23:d=1  hl=2 l=  66 prim:  BIT STRING\n"})}),"\n",(0,s.jsxs)(n.p,{children:["And we can see, that there is an id here which is ",(0,s.jsx)(n.code,{children:"ecPublicKey"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"As a rule of thumb, if there is no key type in the PEM header, then\nthe format of the key is most probably in Subject Public Key Info (SPKI) if it\nis a public key, and in Public-Key Cryptography Standard 8 (pkcs8) format if it\nis a private key."}),"\n",(0,s.jsx)(n.p,{children:"With the knowledge that the key is an Elliptic Curve (EC) public key we can use\nthe following openssl command to inspect it:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"$ openssl ec -pubin -in pubkey.pem --text --noout\nread EC key\nPublic-Key: (256 bit)\npub:\n    04:0d:3b:cb:d0:f4:6c:c6:8c:4c:5d:f4:9a:5e:ef:\n    bb:c3:4a:2f:54:dc:d9:93:f0:40:22:8c:f6:18:bd:\n    9c:3d:8d:ea:64:43:54:ff:e6:2b:47:dd:80:b9:91:\n    57:9f:48:d2:9a:6b:ce:92:da:40:cc:68:67:0e:1b:\n    62:76:89:e4:c8\nASN1 OID: prime256v1\nNIST CURVE: P-256\n"})}),"\n",(0,s.jsx)(n.p,{children:"Some PEM keys can also be in a specific key format, in which case the type is\nin the header of the pem, for example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"-----BEGIN RSA PUBLIC KEY-----\n...\n-----END RSA PUBLIC KEY-----\n"})}),"\n",(0,s.jsxs)(n.p,{children:["And if needed we can use the ",(0,s.jsx)(n.code,{children:"openssl rsa"})," command to inspect them further."]}),"\n",(0,s.jsxs)(n.p,{children:["The same reasoning can be applied to private keys as well with regards to the\nPEM header/footer information, and in the case of private keys the ",(0,s.jsx)(n.code,{children:"-pubin"}),"\nargument to the openssl commands should left out."]}),"\n",(0,s.jsx)(n.h2,{id:"der-formatted-keys",children:"DER formatted keys"}),"\n",(0,s.jsxs)(n.p,{children:["As mentioned before we can't just print DER files as they are in binary format,\nbut we can still use ",(0,s.jsx)(n.code,{children:"openssl asn1parse"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"$ openssl asn1parse -i -inform der  -in pubkey.der\n    0:d=0  hl=2 l=  89 cons: SEQUENCE\n    2:d=1  hl=2 l=  19 cons:  SEQUENCE\n    4:d=2  hl=2 l=   7 prim:   OBJECT            :id-ecPublicKey\n   13:d=2  hl=2 l=   8 prim:   OBJECT            :prime256v1\n   23:d=1  hl=2 l=  66 prim:  BIT STRING\n"})}),"\n",(0,s.jsx)(n.p,{children:"And just like with the PEM example we can use other openssl tools to inspect the\nkey."}),"\n",(0,s.jsx)(n.h2,{id:"when-the-guidelines-fail",children:"When the guidelines fail"}),"\n",(0,s.jsx)(n.p,{children:"The above seems to work for most situations, but it can fail."}),"\n",(0,s.jsxs)(n.p,{children:["One example of this is when openssl cannot parse the key at all. I ran into this\nrecently with ",(0,s.jsx)(n.a,{href:"https://github.com/in-toto/in-toto-rs",children:"in-toto-rs"}),", which uses\nthe Rust ",(0,s.jsx)(n.a,{href:"https://crates.io/crates/ring",children:"ring"})," crate to handle Ed25519 keys."]}),"\n",(0,s.jsxs)(n.p,{children:["The issue here is that ",(0,s.jsx)(n.code,{children:"ring"})," supports pkcs8 version 2\n(",(0,s.jsx)(n.a,{href:"https://www.rfc-editor.org/rfc/rfc5958",children:"RFC-5958"}),"), and OpenSSL currently only\nsupports pkcs8 version 1 (",(0,s.jsx)(n.a,{href:"https://www.rfc-editor.org/rfc/rfc5208",children:"RFC-5208"}),"),\nso the openssl tools will not be able to parse keys in the version 2 format."]}),"\n",(0,s.jsx)(n.p,{children:"Below is an example of trying to use a version 2 formatted Ed25519 key with\nopenssl:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"$ openssl pkey -inform der -in ed25519-1 -pubout\nCould not read key from ed25519-1\n"})}),"\n",(0,s.jsxs)(n.p,{children:["There is an open ",(0,s.jsx)(n.a,{href:"https://github.com/openssl/openssl/issues/10468",children:"openssl issue"}),"\nfor this."]}),"\n",(0,s.jsx)(n.p,{children:"Hopefully there will not be many cases like this, and we hope that the\nguidelines provided in this post are helpful."})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var s=t(6540);const i={},o=s.createContext(i);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);