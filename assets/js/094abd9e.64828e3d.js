"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[7823],{1788:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>V,contentTitle:()=>i,default:()=>r,frontMatter:()=>l,metadata:()=>c,toc:()=>s});var d=a(4848),t=a(8453);const l={title:"Sigstore bundle format",authors:"danbev",tags:["sigstore"]},i=void 0,c={permalink:"/blog/2023/01/13/sigstore-bundle-format",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2023-01-13-sigstore-bundle-format.md",source:"@site/blog/2023-01-13-sigstore-bundle-format.md",title:"Sigstore bundle format",description:"This post takes a look at Sigstore's bundle format which is the format of",date:"2023-01-13T00:00:00.000Z",tags:[{inline:!0,label:"sigstore",permalink:"/blog/tags/sigstore"}],readingTime:6.58,hasTruncateMarker:!0,authors:[{name:"Daniel Bevenius",title:"Maintainer",url:"https://github.com/danbev",imageURL:"https://github.com/danbev.png",key:"danbev"}],frontMatter:{title:"Sigstore bundle format",authors:"danbev",tags:["sigstore"]},unlisted:!1,prevItem:{title:"Is this a cryptographic key which I see before me?",permalink:"/blog/2023/01/25/keys"},nextItem:{title:"Sigstore, in-toto, OPA, orientation",permalink:"/blog/2023/01/11/sigstore-in-toto-opa"}},V={authorsImageUrls:[void 0]},s=[];function o(e){const n={a:"a",code:"code",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.p,{children:"This post takes a look at Sigstore's bundle format which is the format of\nSigstore's offline verification data."}),"\n",(0,d.jsxs)(n.p,{children:["Offline verification is described like this in\n",(0,d.jsx)(n.a,{href:"https://www.chainguard.dev/unchained/busting-5-sigstore-myths",children:"busting-5-sigstore-myths"}),":"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:'Another common use case is that organizations need to run systems in air-gapped\nenvironments with no outside network access. That means it\u2019s not possible to\nlook up a signature in the transparency log, Rekor, right? Wrong! We use what\u2019s\ncalled "stapled inclusion proofs" by default, meaning you can verify an object\nis present in the transparency log without needing to contact the transparency\nlog! The signer is responsible for gathering this evidence from the log and\npresenting it alongside the artifact and signature. We store this in an OCI\nimage automatically, but you can treat it like a normal file and copy it around\nfor verification as well.\n'})}),"\n",(0,d.jsx)(n.p,{children:"So, lets create a bundle and inspect the contents. First, we need to sign an\nartifact and in this case we are going to use a simple text file:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:'$ echo "some data" > artifact.txt\n'})}),"\n",(0,d.jsxs)(n.p,{children:["As mentioned, Sigstore can create a ",(0,d.jsx)(n.code,{children:"bundle"}),', which contains all the information\nrequired for "stapled inclusion proofs". A bundle can be generated using the\nfollowing command:']}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ COSIGN_EXPERIMENTAL=1 cosign sign-blob --bundle=artifact.bundle artifact.txt\nUsing payload from: artifact.txt\nGenerating ephemeral keys...\nRetrieving signed certificate...\n\n        Note that there may be personally identifiable information associated with this signed artifact.\n        This may include the email address associated with the account with which you authenticate.\n        This information will be used for signing this artifact and will be stored in public transparency logs and cannot be removed later.\n        By typing 'y', you attest that you grant (or have permission to grant) and agree to have this information stored permanently in transparency logs.\n\nAre you sure you want to continue? (y/[N]): y\nYour browser will now be opened to:\nhttps://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=gGdRPWHb4ZNnBjRIEs9wbBhI3bqVriOCyq2W98YuqQ0&code_challenge_method=S256&nonce=2KGHDNf4CZ4gXINF9A12quVVxHl&redirect_uri=http%3A%2F%2Flocalhost%3A41711%2Fauth%2Fcallback&response_type=code&scope=openid+email&state=2KGHDOhtlyDhCegsNy1qPuKAWbd\nSuccessfully verified SCT...\nusing ephemeral certificate:\n-----BEGIN CERTIFICATE-----\nMIICpzCCAi6gAwIBAgIUb6LDCNlvHnUGD55dbYuRq9BEB7gwCgYIKoZIzj0EAwMw\nNzEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MR4wHAYDVQQDExVzaWdzdG9yZS1pbnRl\ncm1lZGlhdGUwHhcNMjMwMTEzMDcxMTIyWhcNMjMwMTEzMDcyMTIyWjAAMFkwEwYH\nKoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZk/BAIoz2\nGL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyKOCAU0wggFJMA4G\nA1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUdZPv\nPd5abMkW8mcBgb3umAmHTcUwHwYDVR0jBBgwFoAU39Ppz1YkEZb5qNjpKFWixi4Y\nZD8wJwYDVR0RAQH/BB0wG4EZZGFuaWVsLmJldmVuaXVzQGdtYWlsLmNvbTAsBgor\nBgEEAYO/MAEBBB5odHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgwgYoGCisG\nAQQB1nkCBAIEfAR6AHgAdgDdPTBqxscRMmMZHhyZZzcCokpeuN48rf+HinKALynu\njgAAAYWp+AiYAAAEAwBHMEUCIAlfL870WJta7pD97Yiw0JbvY7YGg604cGxXEXtQ\ntzoaAiEA+VWQiz+JPEsLBLbtclfhXFhn/C4kTyaS2Fj12+voTt4wCgYIKoZIzj0E\nAwMDZwAwZAIwUtBB+1H6177KW3nfTpK9unSGgwIPEuNqQviJyeZRjkK85pnfk0p5\nlwQVbfekXYq+AjBgJA/xjX5+UqRh+O1LqxBIun1gYhIwK+UUZq49SH0uP2sQL5un\nILHOPrBw0f00Q68=\n-----END CERTIFICATE-----\n\ntlog entry created with index: 11074687\nBundle wrote in the file artifact.bundle\nMEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=\n"})}),"\n",(0,d.jsxs)(n.p,{children:["After this there will be an file named ",(0,d.jsx)(n.code,{children:"artifact.bundle"})," in the directory where\nthe above command was executed."]}),"\n",(0,d.jsx)(n.p,{children:"So lets take a look at the bundle:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:'$ cat artifact.bundle | jq\n{\n  "base64Signature": "MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=",\n  "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNwekNDQWk2Z0F3SUJBZ0lVYjZMRENObHZIblVHRDU1ZGJZdVJxOUJFQjdnd0NnWUlLb1pJemowRUF3TXcKTnpFVk1CTUdBMVVFQ2hNTWMybG5jM1J2Y21VdVpHVjJNUjR3SEFZRFZRUURFeFZ6YVdkemRHOXlaUzFwYm5SbApjbTFsWkdsaGRHVXdIaGNOTWpNd01URXpNRGN4TVRJeVdoY05Nak13TVRFek1EY3lNVEl5V2pBQU1Ga3dFd1lICktvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVEVHZMMFBSc3hveE1YZlNhWHUrN3cwb3ZWTnpaay9CQUlvejIKR0wyY1BZM3FaRU5VLytZclI5MkF1WkZYbjBqU21tdk9rdHBBekdobkRodGlkb25reUtPQ0FVMHdnZ0ZKTUE0RwpBMVVkRHdFQi93UUVBd0lIZ0RBVEJnTlZIU1VFRERBS0JnZ3JCZ0VGQlFjREF6QWRCZ05WSFE0RUZnUVVkWlB2ClBkNWFiTWtXOG1jQmdiM3VtQW1IVGNVd0h3WURWUjBqQkJnd0ZvQVUzOVBwejFZa0VaYjVxTmpwS0ZXaXhpNFkKWkQ4d0p3WURWUjBSQVFIL0JCMHdHNEVaWkdGdWFXVnNMbUpsZG1WdWFYVnpRR2R0WVdsc0xtTnZiVEFzQmdvcgpCZ0VFQVlPL01BRUJCQjVvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2Ykc5bmFXNHZiMkYxZEdnd2dZb0dDaXNHCkFRUUIxbmtDQkFJRWZBUjZBSGdBZGdEZFBUQnF4c2NSTW1NWkhoeVpaemNDb2twZXVONDhyZitIaW5LQUx5bnUKamdBQUFZV3ArQWlZQUFBRUF3QkhNRVVDSUFsZkw4NzBXSnRhN3BEOTdZaXcwSmJ2WTdZR2c2MDRjR3hYRVh0UQp0em9hQWlFQStWV1FpeitKUEVzTEJMYnRjbGZoWEZobi9DNGtUeWFTMkZqMTIrdm9UdDR3Q2dZSUtvWkl6ajBFCkF3TURad0F3WkFJd1V0QkIrMUg2MTc3S1czbmZUcEs5dW5TR2d3SVBFdU5xUXZpSnllWlJqa0s4NXBuZmswcDUKbHdRVmJmZWtYWXErQWpCZ0pBL3hqWDUrVXFSaCtPMUxxeEJJdW4xZ1loSXdLK1VVWnE0OVNIMHVQMnNRTDV1bgpJTEhPUHJCdzBmMDBRNjg9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K",\n  "rekorBundle": {\n    "SignedEntryTimestamp": "MEUCIQDYiu9WHR4eCJ2JGPCfwWYg/lILIM+9IvDEb3Nq2MYIUAIgK2tRLSYDLuU0uaywKy8C+3ETUBKfw1lds4Q4Bw4l8jQ=",\n    "Payload": {\n      "body": "eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiI1YWEwM2Y5NmM3NzUzNjU3OTE2NmZiYTE0NzkyOTYyNmNjM2E5Nzk2MGU5OTQwNTdhOWQ4MDI3MWE3MzZkMTBmIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FVUNJQmJmVnIwclJFZ2syeVhmRU5NelRkdVhuU1JjMkdrSkVVT2I1dEJuY0ZnU0FpRUF0QzRmMUNBNFlpbzlOM3dqZE1BYlk2aENlckNLd3lNK2huOEwxa24zM0dFPSIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVTndla05EUVdrMlowRjNTVUpCWjBsVllqWk1SRU5PYkhaSWJsVkhSRFUxWkdKWmRWSnhPVUpGUWpkbmQwTm5XVWxMYjFwSmVtb3dSVUYzVFhjS1RucEZWazFDVFVkQk1WVkZRMmhOVFdNeWJHNWpNMUoyWTIxVmRWcEhWakpOVWpSM1NFRlpSRlpSVVVSRmVGWjZZVmRrZW1SSE9YbGFVekZ3WW01U2JBcGpiVEZzV2tkc2FHUkhWWGRJYUdOT1RXcE5kMDFVUlhwTlJHTjRUVlJKZVZkb1kwNU5hazEzVFZSRmVrMUVZM2xOVkVsNVYycEJRVTFHYTNkRmQxbElDa3R2V2tsNmFqQkRRVkZaU1V0dldrbDZhakJFUVZGalJGRm5RVVZFVkhaTU1GQlNjM2h2ZUUxWVpsTmhXSFVyTjNjd2IzWldUbnBhYXk5Q1FVbHZlaklLUjB3eVkxQlpNM0ZhUlU1Vkx5dFpjbEk1TWtGMVdrWlliakJxVTIxdGRrOXJkSEJCZWtkb2JrUm9kR2xrYjI1cmVVdFBRMEZWTUhkblowWktUVUUwUndwQk1WVmtSSGRGUWk5M1VVVkJkMGxJWjBSQlZFSm5UbFpJVTFWRlJFUkJTMEpuWjNKQ1owVkdRbEZqUkVGNlFXUkNaMDVXU0ZFMFJVWm5VVlZrV2xCMkNsQmtOV0ZpVFd0WE9HMWpRbWRpTTNWdFFXMUlWR05WZDBoM1dVUldVakJxUWtKbmQwWnZRVlV6T1ZCd2VqRlphMFZhWWpWeFRtcHdTMFpYYVhocE5Ga0tXa1E0ZDBwM1dVUldVakJTUVZGSUwwSkNNSGRITkVWYVdrZEdkV0ZYVm5OTWJVcHNaRzFXZFdGWVZucFJSMlIwV1Zkc2MweHRUblppVkVGelFtZHZjZ3BDWjBWRlFWbFBMMDFCUlVKQ1FqVnZaRWhTZDJONmIzWk1NbVJ3WkVkb01WbHBOV3BpTWpCMllrYzVibUZYTkhaaU1rWXhaRWRuZDJkWmIwZERhWE5IQ2tGUlVVSXhibXREUWtGSlJXWkJValpCU0dkQlpHZEVaRkJVUW5GNGMyTlNUVzFOV2tob2VWcGFlbU5EYjJ0d1pYVk9ORGh5Wml0SWFXNUxRVXg1Ym5VS2FtZEJRVUZaVjNBclFXbFpRVUZCUlVGM1FraE5SVlZEU1VGc1prdzROekJYU25SaE4zQkVPVGRaYVhjd1NtSjJXVGRaUjJjMk1EUmpSM2hZUlZoMFVRcDBlbTloUVdsRlFTdFdWMUZwZWl0S1VFVnpURUpNWW5SamJHWm9XRVpvYmk5RE5HdFVlV0ZUTWtacU1USXJkbTlVZERSM1EyZFpTVXR2V2tsNmFqQkZDa0YzVFVSYWQwRjNXa0ZKZDFWMFFrSXJNVWcyTVRjM1MxY3pibVpVY0VzNWRXNVRSMmQzU1ZCRmRVNXhVWFpwU25sbFdsSnFhMHM0TlhCdVptc3djRFVLYkhkUlZtSm1aV3RZV1hFclFXcENaMHBCTDNocVdEVXJWWEZTYUN0UE1VeHhlRUpKZFc0eFoxbG9TWGRMSzFWVlduRTBPVk5JTUhWUU1uTlJURFYxYmdwSlRFaFBVSEpDZHpCbU1EQlJOamc5Q2kwdExTMHRSVTVFSUVORlVsUkpSa2xEUVZSRkxTMHRMUzBLIn19fX0=",\n      "integratedTime": 1673593883,\n      "logIndex": 11074687,\n      "logID": "c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d"\n    }\n  }\n}\n'})}),"\n",(0,d.jsxs)(n.p,{children:["So we have a json object with three fields, a ",(0,d.jsx)(n.code,{children:"base64Signature"}),", a ",(0,d.jsx)(n.code,{children:"cert"}),", and\na ",(0,d.jsx)(n.code,{children:"rekorBundle"})," field."]}),"\n",(0,d.jsxs)(n.p,{children:["Lets start with ",(0,d.jsx)(n.code,{children:"base64Signature"})," field:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ cat artifact.bundle | jq '.base64Signature'\n\"MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=\"\n"})}),"\n",(0,d.jsx)(n.p,{children:"As the name of this field implies it contains a base64 encoded signature."}),"\n",(0,d.jsx)(n.p,{children:"Lets be decode the signature and store it in a file:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ cat artifact.bundle | jq -r '.base64Signature' | base64 -d - > signature\n"})}),"\n",(0,d.jsx)(n.p,{children:"We will use this file shortly."}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"cert"})," field contains a base64 encoded certificate in pem format:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.publicKey.content' | base64 -d -\n-----BEGIN CERTIFICATE-----\nMIICpzCCAi6gAwIBAgIUb6LDCNlvHnUGD55dbYuRq9BEB7gwCgYIKoZIzj0EAwMw\nNzEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MR4wHAYDVQQDExVzaWdzdG9yZS1pbnRl\ncm1lZGlhdGUwHhcNMjMwMTEzMDcxMTIyWhcNMjMwMTEzMDcyMTIyWjAAMFkwEwYH\nKoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZk/BAIoz2\nGL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyKOCAU0wggFJMA4G\nA1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUdZPv\nPd5abMkW8mcBgb3umAmHTcUwHwYDVR0jBBgwFoAU39Ppz1YkEZb5qNjpKFWixi4Y\nZD8wJwYDVR0RAQH/BB0wG4EZZGFuaWVsLmJldmVuaXVzQGdtYWlsLmNvbTAsBgor\nBgEEAYO/MAEBBB5odHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgwgYoGCisG\nAQQB1nkCBAIEfAR6AHgAdgDdPTBqxscRMmMZHhyZZzcCokpeuN48rf+HinKALynu\njgAAAYWp+AiYAAAEAwBHMEUCIAlfL870WJta7pD97Yiw0JbvY7YGg604cGxXEXtQ\ntzoaAiEA+VWQiz+JPEsLBLbtclfhXFhn/C4kTyaS2Fj12+voTt4wCgYIKoZIzj0E\nAwMDZwAwZAIwUtBB+1H6177KW3nfTpK9unSGgwIPEuNqQviJyeZRjkK85pnfk0p5\nlwQVbfekXYq+AjBgJA/xjX5+UqRh+O1LqxBIun1gYhIwK+UUZq49SH0uP2sQL5un\nILHOPrBw0f00Q68=\n-----END CERTIFICATE-----\n"})}),"\n",(0,d.jsx)(n.p,{children:"We can inspect this certificate using openssl:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.publicKey.content' | base64 -d - | openssl x509 -text\nCertificate:\n    Data:\n        Version: 3 (0x2)\n        Serial Number:\n            6f:a2:c3:08:d9:6f:1e:75:06:0f:9e:5d:6d:8b:91:ab:d0:44:07:b8\n        Signature Algorithm: ecdsa-with-SHA384\n        Issuer: O = sigstore.dev, CN = sigstore-intermediate\n        Validity\n            Not Before: Jan 13 07:11:22 2023 GMT\n            Not After : Jan 13 07:21:22 2023 GMT\n        Subject:\n        Subject Public Key Info:\n            Public Key Algorithm: id-ecPublicKey\n                Public-Key: (256 bit)\n                pub:\n                    04:0d:3b:cb:d0:f4:6c:c6:8c:4c:5d:f4:9a:5e:ef:\n                    bb:c3:4a:2f:54:dc:d9:93:f0:40:22:8c:f6:18:bd:\n                    9c:3d:8d:ea:64:43:54:ff:e6:2b:47:dd:80:b9:91:\n                    57:9f:48:d2:9a:6b:ce:92:da:40:cc:68:67:0e:1b:\n                    62:76:89:e4:c8\n                ASN1 OID: prime256v1\n                NIST CURVE: P-256\n        X509v3 extensions:\n            X509v3 Key Usage: critical\n                Digital Signature\n            X509v3 Extended Key Usage:\n                Code Signing\n            X509v3 Subject Key Identifier:\n                75:93:EF:3D:DE:5A:6C:C9:16:F2:67:01:81:BD:EE:98:09:87:4D:C5\n            X509v3 Authority Key Identifier:\n                keyid:DF:D3:E9:CF:56:24:11:96:F9:A8:D8:E9:28:55:A2:C6:2E:18:64:3F\n\n            X509v3 Subject Alternative Name: critical\n                email:daniel.bevenius@gmail.com\n            1.3.6.1.4.1.57264.1.1:\n                https://github.com/login/oauth\n            CT Precertificate SCTs:\n                Signed Certificate Timestamp:\n                    Version   : v1 (0x0)\n                    Log ID    : DD:3D:30:6A:C6:C7:11:32:63:19:1E:1C:99:67:37:02:\n                                A2:4A:5E:B8:DE:3C:AD:FF:87:8A:72:80:2F:29:EE:8E\n                    Timestamp : Jan 13 07:11:22.776 2023 GMT\n                    Extensions: none\n                    Signature : ecdsa-with-SHA256\n                                30:45:02:20:09:5F:2F:CE:F4:58:9B:5A:EE:90:FD:ED:\n                                88:B0:D0:96:EF:63:B6:06:83:AD:38:70:6C:57:11:7B:\n                                50:B7:3A:1A:02:21:00:F9:55:90:8B:3F:89:3C:4B:0B:\n                                04:B6:ED:72:57:E1:5C:58:67:FC:2E:24:4F:26:92:D8:\n                                58:F5:DB:EB:E8:4E:DE\n    Signature Algorithm: ecdsa-with-SHA384\n         30:64:02:30:52:d0:41:fb:51:fa:d7:be:ca:5b:79:df:4e:92:\n         bd:ba:74:86:83:02:0f:12:e3:6a:42:f8:89:c9:e6:51:8e:42:\n         bc:e6:99:df:93:4a:79:97:04:15:6d:f7:a4:5d:8a:be:02:30:\n         60:24:0f:f1:8d:7e:7e:52:a4:61:f8:ed:4b:ab:10:48:ba:7d:\n         60:62:12:30:2b:e5:14:66:ae:3d:48:7d:2e:3f:6b:10:2f:9b:\n         a7:20:b1:ce:3e:b0:70:d1:fd:34:43:af\n-----BEGIN CERTIFICATE-----\nMIICpzCCAi6gAwIBAgIUb6LDCNlvHnUGD55dbYuRq9BEB7gwCgYIKoZIzj0EAwMw\nNzEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MR4wHAYDVQQDExVzaWdzdG9yZS1pbnRl\ncm1lZGlhdGUwHhcNMjMwMTEzMDcxMTIyWhcNMjMwMTEzMDcyMTIyWjAAMFkwEwYH\nKoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZk/BAIoz2\nGL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyKOCAU0wggFJMA4G\nA1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUdZPv\nPd5abMkW8mcBgb3umAmHTcUwHwYDVR0jBBgwFoAU39Ppz1YkEZb5qNjpKFWixi4Y\nZD8wJwYDVR0RAQH/BB0wG4EZZGFuaWVsLmJldmVuaXVzQGdtYWlsLmNvbTAsBgor\nBgEEAYO/MAEBBB5odHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgwgYoGCisG\nAQQB1nkCBAIEfAR6AHgAdgDdPTBqxscRMmMZHhyZZzcCokpeuN48rf+HinKALynu\njgAAAYWp+AiYAAAEAwBHMEUCIAlfL870WJta7pD97Yiw0JbvY7YGg604cGxXEXtQ\ntzoaAiEA+VWQiz+JPEsLBLbtclfhXFhn/C4kTyaS2Fj12+voTt4wCgYIKoZIzj0E\nAwMDZwAwZAIwUtBB+1H6177KW3nfTpK9unSGgwIPEuNqQviJyeZRjkK85pnfk0p5\nlwQVbfekXYq+AjBgJA/xjX5+UqRh+O1LqxBIun1gYhIwK+UUZq49SH0uP2sQL5un\nILHOPrBw0f00Q68=\n-----END CERTIFICATE-----\n"})}),"\n",(0,d.jsx)(n.p,{children:"Lets store the certificate in a file, and extract the public key:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.publicKey.content' | base64 -d -  > cert.pem\n$ openssl x509 -pubkey -noout -in cert.pem  > pub.pem\n"})}),"\n",(0,d.jsxs)(n.p,{children:["With those files, the ",(0,d.jsx)(n.code,{children:"signature"}),", the ",(0,d.jsx)(n.code,{children:"public key"}),", and the ",(0,d.jsx)(n.code,{children:"blob"})," we should be\nable to verify the signature from the ",(0,d.jsx)(n.code,{children:"base64Signature"})," field using the\nfollowing command:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ openssl dgst -verify pub.pem -keyform PEM -sha256 -signature signature -binary artifact.txt\nVerified OK\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The motivation of doing that was to show that the ",(0,d.jsx)(n.code,{children:"base64Signature"})," is just the\nsignature of the blob."]}),"\n",(0,d.jsxs)(n.p,{children:["Next, lets take a look at the ",(0,d.jsx)(n.code,{children:"rekorBundle"})," field:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:'$ cat artifact.bundle | jq -r \'.rekorBundle\' |  jq \'.\'\n{\n  "SignedEntryTimestamp": "MEUCIQDYiu9WHR4eCJ2JGPCfwWYg/lILIM+9IvDEb3Nq2MYIUAIgK2tRLSYDLuU0uaywKy8C+3ETUBKfw1lds4Q4Bw4l8jQ=",\n  "Payload": {\n    "body": "eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiI1YWEwM2Y5NmM3NzUzNjU3OTE2NmZiYTE0NzkyOTYyNmNjM2E5Nzk2MGU5OTQwNTdhOWQ4MDI3MWE3MzZkMTBmIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FVUNJQmJmVnIwclJFZ2syeVhmRU5NelRkdVhuU1JjMkdrSkVVT2I1dEJuY0ZnU0FpRUF0QzRmMUNBNFlpbzlOM3dqZE1BYlk2aENlckNLd3lNK2huOEwxa24zM0dFPSIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVTndla05EUVdrMlowRjNTVUpCWjBsVllqWk1SRU5PYkhaSWJsVkhSRFUxWkdKWmRWSnhPVUpGUWpkbmQwTm5XVWxMYjFwSmVtb3dSVUYzVFhjS1RucEZWazFDVFVkQk1WVkZRMmhOVFdNeWJHNWpNMUoyWTIxVmRWcEhWakpOVWpSM1NFRlpSRlpSVVVSRmVGWjZZVmRrZW1SSE9YbGFVekZ3WW01U2JBcGpiVEZzV2tkc2FHUkhWWGRJYUdOT1RXcE5kMDFVUlhwTlJHTjRUVlJKZVZkb1kwNU5hazEzVFZSRmVrMUVZM2xOVkVsNVYycEJRVTFHYTNkRmQxbElDa3R2V2tsNmFqQkRRVkZaU1V0dldrbDZhakJFUVZGalJGRm5RVVZFVkhaTU1GQlNjM2h2ZUUxWVpsTmhXSFVyTjNjd2IzWldUbnBhYXk5Q1FVbHZlaklLUjB3eVkxQlpNM0ZhUlU1Vkx5dFpjbEk1TWtGMVdrWlliakJxVTIxdGRrOXJkSEJCZWtkb2JrUm9kR2xrYjI1cmVVdFBRMEZWTUhkblowWktUVUUwUndwQk1WVmtSSGRGUWk5M1VVVkJkMGxJWjBSQlZFSm5UbFpJVTFWRlJFUkJTMEpuWjNKQ1owVkdRbEZqUkVGNlFXUkNaMDVXU0ZFMFJVWm5VVlZrV2xCMkNsQmtOV0ZpVFd0WE9HMWpRbWRpTTNWdFFXMUlWR05WZDBoM1dVUldVakJxUWtKbmQwWnZRVlV6T1ZCd2VqRlphMFZhWWpWeFRtcHdTMFpYYVhocE5Ga0tXa1E0ZDBwM1dVUldVakJTUVZGSUwwSkNNSGRITkVWYVdrZEdkV0ZYVm5OTWJVcHNaRzFXZFdGWVZucFJSMlIwV1Zkc2MweHRUblppVkVGelFtZHZjZ3BDWjBWRlFWbFBMMDFCUlVKQ1FqVnZaRWhTZDJONmIzWk1NbVJ3WkVkb01WbHBOV3BpTWpCMllrYzVibUZYTkhaaU1rWXhaRWRuZDJkWmIwZERhWE5IQ2tGUlVVSXhibXREUWtGSlJXWkJValpCU0dkQlpHZEVaRkJVUW5GNGMyTlNUVzFOV2tob2VWcGFlbU5EYjJ0d1pYVk9ORGh5Wml0SWFXNUxRVXg1Ym5VS2FtZEJRVUZaVjNBclFXbFpRVUZCUlVGM1FraE5SVlZEU1VGc1prdzROekJYU25SaE4zQkVPVGRaYVhjd1NtSjJXVGRaUjJjMk1EUmpSM2hZUlZoMFVRcDBlbTloUVdsRlFTdFdWMUZwZWl0S1VFVnpURUpNWW5SamJHWm9XRVpvYmk5RE5HdFVlV0ZUTWtacU1USXJkbTlVZERSM1EyZFpTVXR2V2tsNmFqQkZDa0YzVFVSYWQwRjNXa0ZKZDFWMFFrSXJNVWcyTVRjM1MxY3pibVpVY0VzNWRXNVRSMmQzU1ZCRmRVNXhVWFpwU25sbFdsSnFhMHM0TlhCdVptc3djRFVLYkhkUlZtSm1aV3RZV1hFclFXcENaMHBCTDNocVdEVXJWWEZTYUN0UE1VeHhlRUpKZFc0eFoxbG9TWGRMSzFWVlduRTBPVk5JTUhWUU1uTlJURFYxYmdwSlRFaFBVSEpDZHpCbU1EQlJOamc5Q2kwdExTMHRSVTVFSUVORlVsUkpSa2xEUVZSRkxTMHRMUzBLIn19fX0=",\n    "integratedTime": 1673593883,\n    "logIndex": 11074687,\n    "logID": "c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d"\n  }\n}\n'})}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"SignedEntryTimestamp"})," is a signature of the ",(0,d.jsx)(n.code,{children:"logIndex"}),", the ",(0,d.jsx)(n.code,{children:"body"}),", and the\n",(0,d.jsx)(n.code,{children:"integratedTime"})," time fields created by Rekor. We can inspect the Rekor log\nentry to verify:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:'$ curl --silent https://rekor.sigstore.dev/api/v1/log/entries?logIndex=11074687 | jq -r \'.[]\'\n{\n  "body": "eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiI1YWEwM2Y5NmM3NzUzNjU3OTE2NmZiYTE0NzkyOTYyNmNjM2E5Nzk2MGU5OTQwNTdhOWQ4MDI3MWE3MzZkMTBmIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FVUNJQmJmVnIwclJFZ2syeVhmRU5NelRkdVhuU1JjMkdrSkVVT2I1dEJuY0ZnU0FpRUF0QzRmMUNBNFlpbzlOM3dqZE1BYlk2aENlckNLd3lNK2huOEwxa24zM0dFPSIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVTndla05EUVdrMlowRjNTVUpCWjBsVllqWk1SRU5PYkhaSWJsVkhSRFUxWkdKWmRWSnhPVUpGUWpkbmQwTm5XVWxMYjFwSmVtb3dSVUYzVFhjS1RucEZWazFDVFVkQk1WVkZRMmhOVFdNeWJHNWpNMUoyWTIxVmRWcEhWakpOVWpSM1NFRlpSRlpSVVVSRmVGWjZZVmRrZW1SSE9YbGFVekZ3WW01U2JBcGpiVEZzV2tkc2FHUkhWWGRJYUdOT1RXcE5kMDFVUlhwTlJHTjRUVlJKZVZkb1kwNU5hazEzVFZSRmVrMUVZM2xOVkVsNVYycEJRVTFHYTNkRmQxbElDa3R2V2tsNmFqQkRRVkZaU1V0dldrbDZhakJFUVZGalJGRm5RVVZFVkhaTU1GQlNjM2h2ZUUxWVpsTmhXSFVyTjNjd2IzWldUbnBhYXk5Q1FVbHZlaklLUjB3eVkxQlpNM0ZhUlU1Vkx5dFpjbEk1TWtGMVdrWlliakJxVTIxdGRrOXJkSEJCZWtkb2JrUm9kR2xrYjI1cmVVdFBRMEZWTUhkblowWktUVUUwUndwQk1WVmtSSGRGUWk5M1VVVkJkMGxJWjBSQlZFSm5UbFpJVTFWRlJFUkJTMEpuWjNKQ1owVkdRbEZqUkVGNlFXUkNaMDVXU0ZFMFJVWm5VVlZrV2xCMkNsQmtOV0ZpVFd0WE9HMWpRbWRpTTNWdFFXMUlWR05WZDBoM1dVUldVakJxUWtKbmQwWnZRVlV6T1ZCd2VqRlphMFZhWWpWeFRtcHdTMFpYYVhocE5Ga0tXa1E0ZDBwM1dVUldVakJTUVZGSUwwSkNNSGRITkVWYVdrZEdkV0ZYVm5OTWJVcHNaRzFXZFdGWVZucFJSMlIwV1Zkc2MweHRUblppVkVGelFtZHZjZ3BDWjBWRlFWbFBMMDFCUlVKQ1FqVnZaRWhTZDJONmIzWk1NbVJ3WkVkb01WbHBOV3BpTWpCMllrYzVibUZYTkhaaU1rWXhaRWRuZDJkWmIwZERhWE5IQ2tGUlVVSXhibXREUWtGSlJXWkJValpCU0dkQlpHZEVaRkJVUW5GNGMyTlNUVzFOV2tob2VWcGFlbU5EYjJ0d1pYVk9ORGh5Wml0SWFXNUxRVXg1Ym5VS2FtZEJRVUZaVjNBclFXbFpRVUZCUlVGM1FraE5SVlZEU1VGc1prdzROekJYU25SaE4zQkVPVGRaYVhjd1NtSjJXVGRaUjJjMk1EUmpSM2hZUlZoMFVRcDBlbTloUVdsRlFTdFdWMUZwZWl0S1VFVnpURUpNWW5SamJHWm9XRVpvYmk5RE5HdFVlV0ZUTWtacU1USXJkbTlVZERSM1EyZFpTVXR2V2tsNmFqQkZDa0YzVFVSYWQwRjNXa0ZKZDFWMFFrSXJNVWcyTVRjM1MxY3pibVpVY0VzNWRXNVRSMmQzU1ZCRmRVNXhVWFpwU25sbFdsSnFhMHM0TlhCdVptc3djRFVLYkhkUlZtSm1aV3RZV1hFclFXcENaMHBCTDNocVdEVXJWWEZTYUN0UE1VeHhlRUpKZFc0eFoxbG9TWGRMSzFWVlduRTBPVk5JTUhWUU1uTlJURFYxYmdwSlRFaFBVSEpDZHpCbU1EQlJOamc5Q2kwdExTMHRSVTVFSUVORlVsUkpSa2xEUVZSRkxTMHRMUzBLIn19fX0=",\n  "integratedTime": 1673593883,\n  "logID": "c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d",\n  "logIndex": 11074687,\n  "verification": {\n    "inclusionProof": {\n      "checkpoint": "rekor.sigstore.dev - 2605736670972794746\\n6915767\\nIDKYzW3/yaZoFrPpz2HKEReyArFz47FmWC3Z9REfsCY=\\nTimestamp: 1673599771028600100\\n\\n\u2014 rekor.sigstore.dev wNI9ajBFAiBcmpywRj3UZCOMIzwlHzd5eNYEG1rQgX5VKhHAqM49iQIhAPxul/hYfn7wHRCh8/LTXFpLbB3vieU4mqLEPZSUdX4L\\n",\n      "hashes": [\n        "e5871beb5d6ffc577b31f4b0f14763adb1a231d52f2f15dd8c44f4925e402d1d",\n        "1d2962738aaebe76a8497de8615fadb0b8a52db957ccfb37b87719131abb53bd",\n        "62c6f1d6610f123395faffd632dc853f682a7f1bd93e36c08e53f8591b2b50d7",\n        "c1bb29369643451e47467ce1293a981ee4bd00a019a0a5bf77dacfd0aa15eff7",\n        "fec4c3b5bfb7783f8eee0e83af6e781f49825efb515bd70b2745b4d15b0b56f5",\n        "aaee4f535cb2dca6853ab13d2f2eda182dd72aa708824d6281182009763e753e",\n        "22430b589e10029a924c4ec50a96b51fa0aff8b461b205dc9e02d3eb588bcd98",\n        "067da42bda7c3c476cbd160a7df567266e3c4788d38d214b44774907a1e1bd27",\n        "2269e80ae081e893a5e7a6350826b29bdf890afa397110c632910acf895e7a26",\n        "7c4a791951a23906049a3060ac3f29e571df225f0d7eadeb5417dff7631c8cec",\n        "3648d28ef4842a998b3f22755750e99a81a74d6567166831e325f044cde6162b",\n        "0cd1da2cb04f7956568f32c500bad03be8a022faa50f393c185ac5ac201f3339",\n        "a14a3e23a363f496dc96a3061d454e1f0629ea94c0664991d4e5eab4d29306cb",\n        "4c00279b889607cf1f98294f05dc3f10ffecd2a87df4af3e4360a039ff3421c9",\n        "35da85b3d8a823b9040af497f298dc7c517236e78a98b1b426251b9ecde33628",\n        "9d57b977c2a8ebeb68d127df7be605c849c732275a0b05db00264a59f4ca0834",\n        "9eb0417210c64dcc971f58268b5aaa968ce2c2d200c41b346f50a100728ebc72",\n        "e7d67f5102ddeda58eda651dcba76876d01955a4eca9fce4caaf9e0ba7521cdd",\n        "616429db6c7d20c5b0eff1a6e512ea57a0734b94ae0bc7c914679463e01a7fba",\n        "5a4ad1534b1e770f02bfde0de15008a6971cf1ffbfa963fc9c2a644973a8d2d1"\n      ],\n      "logIndex": 6911256,\n      "rootHash": "203298cd6dffc9a66816b3e9cf61ca1117b202b173e3b166582dd9f5111fb026",\n      "treeSize": 6915767\n    },\n    "signedEntryTimestamp": "MEUCIGicHWGa0XI3perd9LM64+tdneXvvVsOrWxn7pCoUbuNAiEAjmgWIxOH8itbqYjAgkiilYmNVR/hewmfatviQZf3Wr8="\n  }\n}\n'})}),"\n",(0,d.jsxs)(n.p,{children:["The Rekor log can also be accessed using https:\n",(0,d.jsx)(n.a,{href:"https://rekor.tlog.dev/?logIndex=11074687",children:"https://rekor.tlog.dev/?logIndex=11074687"})]}),"\n",(0,d.jsxs)(n.p,{children:["Now, lets inspect the ",(0,d.jsx)(n.code,{children:"body"})," field of the bundle:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:'$ cat artifact.bundle | jq -r \'.rekorBundle.Payload.body\' | base64 -d - | jq\n{\n  "apiVersion": "0.0.1",\n  "kind": "hashedrekord",\n  "spec": {\n    "data": {\n      "hash": {\n        "algorithm": "sha256",\n        "value": "5aa03f96c77536579166fba147929626cc3a97960e994057a9d80271a736d10f"\n      }\n    },\n    "signature": {\n      "content": "MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=",\n      "publicKey": {\n        "content": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNwekNDQWk2Z0F3SUJBZ0lVYjZMRENObHZIblVHRDU1ZGJZdVJxOUJFQjdnd0NnWUlLb1pJemowRUF3TXcKTnpFVk1CTUdBMVVFQ2hNTWMybG5jM1J2Y21VdVpHVjJNUjR3SEFZRFZRUURFeFZ6YVdkemRHOXlaUzFwYm5SbApjbTFsWkdsaGRHVXdIaGNOTWpNd01URXpNRGN4TVRJeVdoY05Nak13TVRFek1EY3lNVEl5V2pBQU1Ga3dFd1lICktvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVEVHZMMFBSc3hveE1YZlNhWHUrN3cwb3ZWTnpaay9CQUlvejIKR0wyY1BZM3FaRU5VLytZclI5MkF1WkZYbjBqU21tdk9rdHBBekdobkRodGlkb25reUtPQ0FVMHdnZ0ZKTUE0RwpBMVVkRHdFQi93UUVBd0lIZ0RBVEJnTlZIU1VFRERBS0JnZ3JCZ0VGQlFjREF6QWRCZ05WSFE0RUZnUVVkWlB2ClBkNWFiTWtXOG1jQmdiM3VtQW1IVGNVd0h3WURWUjBqQkJnd0ZvQVUzOVBwejFZa0VaYjVxTmpwS0ZXaXhpNFkKWkQ4d0p3WURWUjBSQVFIL0JCMHdHNEVaWkdGdWFXVnNMbUpsZG1WdWFYVnpRR2R0WVdsc0xtTnZiVEFzQmdvcgpCZ0VFQVlPL01BRUJCQjVvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2Ykc5bmFXNHZiMkYxZEdnd2dZb0dDaXNHCkFRUUIxbmtDQkFJRWZBUjZBSGdBZGdEZFBUQnF4c2NSTW1NWkhoeVpaemNDb2twZXVONDhyZitIaW5LQUx5bnUKamdBQUFZV3ArQWlZQUFBRUF3QkhNRVVDSUFsZkw4NzBXSnRhN3BEOTdZaXcwSmJ2WTdZR2c2MDRjR3hYRVh0UQp0em9hQWlFQStWV1FpeitKUEVzTEJMYnRjbGZoWEZobi9DNGtUeWFTMkZqMTIrdm9UdDR3Q2dZSUtvWkl6ajBFCkF3TURad0F3WkFJd1V0QkIrMUg2MTc3S1czbmZUcEs5dW5TR2d3SVBFdU5xUXZpSnllWlJqa0s4NXBuZmswcDUKbHdRVmJmZWtYWXErQWpCZ0pBL3hqWDUrVXFSaCtPMUxxeEJJdW4xZ1loSXdLK1VVWnE0OVNIMHVQMnNRTDV1bgpJTEhPUHJCdzBmMDBRNjg9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"\n      }\n    }\n  }\n}\n'})}),"\n",(0,d.jsx)(n.p,{children:"Now, when an online verification is done, that is when the bundle is not\nspecified on the command line, the Rekor bundle is looked up in the transparency\nlog. Notice for example that the same information is also available in the\nRekor log:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:'$ curl --silent https://rekor.sigstore.dev/api/v1/log/entries?logIndex=11074687 | jq -r \'.[].body\' | base64 -d | jq\n{\n  "apiVersion": "0.0.1",\n  "kind": "hashedrekord",\n  "spec": {\n    "data": {\n      "hash": {\n        "algorithm": "sha256",\n        "value": "5aa03f96c77536579166fba147929626cc3a97960e994057a9d80271a736d10f"\n      }\n    },\n    "signature": {\n      "content": "MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=",\n      "publicKey": {\n        "content": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNwekNDQWk2Z0F3SUJBZ0lVYjZMRENObHZIblVHRDU1ZGJZdVJxOUJFQjdnd0NnWUlLb1pJemowRUF3TXcKTnpFVk1CTUdBMVVFQ2hNTWMybG5jM1J2Y21VdVpHVjJNUjR3SEFZRFZRUURFeFZ6YVdkemRHOXlaUzFwYm5SbApjbTFsWkdsaGRHVXdIaGNOTWpNd01URXpNRGN4TVRJeVdoY05Nak13TVRFek1EY3lNVEl5V2pBQU1Ga3dFd1lICktvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVEVHZMMFBSc3hveE1YZlNhWHUrN3cwb3ZWTnpaay9CQUlvejIKR0wyY1BZM3FaRU5VLytZclI5MkF1WkZYbjBqU21tdk9rdHBBekdobkRodGlkb25reUtPQ0FVMHdnZ0ZKTUE0RwpBMVVkRHdFQi93UUVBd0lIZ0RBVEJnTlZIU1VFRERBS0JnZ3JCZ0VGQlFjREF6QWRCZ05WSFE0RUZnUVVkWlB2ClBkNWFiTWtXOG1jQmdiM3VtQW1IVGNVd0h3WURWUjBqQkJnd0ZvQVUzOVBwejFZa0VaYjVxTmpwS0ZXaXhpNFkKWkQ4d0p3WURWUjBSQVFIL0JCMHdHNEVaWkdGdWFXVnNMbUpsZG1WdWFYVnpRR2R0WVdsc0xtTnZiVEFzQmdvcgpCZ0VFQVlPL01BRUJCQjVvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2Ykc5bmFXNHZiMkYxZEdnd2dZb0dDaXNHCkFRUUIxbmtDQkFJRWZBUjZBSGdBZGdEZFBUQnF4c2NSTW1NWkhoeVpaemNDb2twZXVONDhyZitIaW5LQUx5bnUKamdBQUFZV3ArQWlZQUFBRUF3QkhNRVVDSUFsZkw4NzBXSnRhN3BEOTdZaXcwSmJ2WTdZR2c2MDRjR3hYRVh0UQp0em9hQWlFQStWV1FpeitKUEVzTEJMYnRjbGZoWEZobi9DNGtUeWFTMkZqMTIrdm9UdDR3Q2dZSUtvWkl6ajBFCkF3TURad0F3WkFJd1V0QkIrMUg2MTc3S1czbmZUcEs5dW5TR2d3SVBFdU5xUXZpSnllWlJqa0s4NXBuZmswcDUKbHdRVmJmZWtYWXErQWpCZ0pBL3hqWDUrVXFSaCtPMUxxeEJJdW4xZ1loSXdLK1VVWnE0OVNIMHVQMnNRTDV1bgpJTEhPUHJCdzBmMDBRNjg9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"\n      }\n    }\n  }\n}\n'})}),"\n",(0,d.jsxs)(n.p,{children:["Now, let first look at the ",(0,d.jsx)(n.code,{children:"spec.data.hash"})," field which contains a hash\nalgorithm that was used, and a value. The value is the hash of our blob, the\n",(0,d.jsx)(n.code,{children:"artifact.txt"}),"file:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ sha256sum artifact.txt\n5aa03f96c77536579166fba147929626cc3a97960e994057a9d80271a736d10f  artifact.txt\n"})}),"\n",(0,d.jsxs)(n.p,{children:["And we can compare this with the value in the ",(0,d.jsx)(n.code,{children:"spec.data.hash.value"})," field and\ncheck that they indeed are the same:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.data.hash.value'\n5aa03f96c77536579166fba147929626cc3a97960e994057a9d80271a736d10f\n"})}),"\n",(0,d.jsx)(n.p,{children:"Next we have signature field:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.content'\nMEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Notice that this is the same value as the toplevel ",(0,d.jsx)(n.code,{children:"base64Signature"})," field:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ cat artifact.bundle | jq -r '.base64Signature'\nMEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=\n"})}),"\n",(0,d.jsxs)(n.p,{children:["And there is also a ",(0,d.jsx)(n.code,{children:"publicKey"})," field in the body which contains:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-console",children:"$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.publicKey.content' | base64 -d\n-----BEGIN CERTIFICATE-----\nMIICpzCCAi6gAwIBAgIUb6LDCNlvHnUGD55dbYuRq9BEB7gwCgYIKoZIzj0EAwMw\nNzEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MR4wHAYDVQQDExVzaWdzdG9yZS1pbnRl\ncm1lZGlhdGUwHhcNMjMwMTEzMDcxMTIyWhcNMjMwMTEzMDcyMTIyWjAAMFkwEwYH\nKoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZk/BAIoz2\nGL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyKOCAU0wggFJMA4G\nA1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUdZPv\nPd5abMkW8mcBgb3umAmHTcUwHwYDVR0jBBgwFoAU39Ppz1YkEZb5qNjpKFWixi4Y\nZD8wJwYDVR0RAQH/BB0wG4EZZGFuaWVsLmJldmVuaXVzQGdtYWlsLmNvbTAsBgor\nBgEEAYO/MAEBBB5odHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgwgYoGCisG\nAQQB1nkCBAIEfAR6AHgAdgDdPTBqxscRMmMZHhyZZzcCokpeuN48rf+HinKALynu\njgAAAYWp+AiYAAAEAwBHMEUCIAlfL870WJta7pD97Yiw0JbvY7YGg604cGxXEXtQ\ntzoaAiEA+VWQiz+JPEsLBLbtclfhXFhn/C4kTyaS2Fj12+voTt4wCgYIKoZIzj0E\nAwMDZwAwZAIwUtBB+1H6177KW3nfTpK9unSGgwIPEuNqQviJyeZRjkK85pnfk0p5\nlwQVbfekXYq+AjBgJA/xjX5+UqRh+O1LqxBIun1gYhIwK+UUZq49SH0uP2sQL5un\nILHOPrBw0f00Q68=\n-----END CERTIFICATE-----\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Notice that this is the same certificate as the toplevel ",(0,d.jsx)(n.code,{children:"cert"})," field. Using\nthe ",(0,d.jsx)(n.code,{children:"base64Signature"})," field, and the ",(0,d.jsx)(n.code,{children:"cert"})," field we are able to verify a blob\nwhich we saw an example of previously."]}),"\n",(0,d.jsx)(n.p,{children:"Hopefully this has given some insight into the bundle format and given some\nexample of how one can inspect the fields."})]})}function r(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>c});var d=a(6540);const t={},l=d.createContext(t);function i(e){const n=d.useContext(l);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),d.createElement(l.Provider,{value:n},e.children)}}}]);