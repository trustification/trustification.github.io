---
title: "Sigstore bundle format"
authors: danbev
tags: [sigstore]
---

This post takes a look at Sigstore's bundle format which is the format of
Sigstore's offline verification data.

Offline verification is described like this in
[busting-5-sigstore-myths](https://www.chainguard.dev/unchained/busting-5-sigstore-myths):

<!--truncate-->

```
Another common use case is that organizations need to run systems in air-gapped
environments with no outside network access. That means it’s not possible to
look up a signature in the transparency log, Rekor, right? Wrong! We use what’s
called "stapled inclusion proofs" by default, meaning you can verify an object
is present in the transparency log without needing to contact the transparency
log! The signer is responsible for gathering this evidence from the log and
presenting it alongside the artifact and signature. We store this in an OCI
image automatically, but you can treat it like a normal file and copy it around
for verification as well.
```

So, lets create a bundle and inspect the contents. First, we need to sign an
artifact and in this case we are going to use a simple text file:

```console
$ echo "some data" > artifact.txt
```

As mentioned, Sigstore can create a `bundle`, which contains all the information
required for "stapled inclusion proofs". A bundle can be generated using the
following command:

```console
$ COSIGN_EXPERIMENTAL=1 cosign sign-blob --bundle=artifact.bundle artifact.txt
Using payload from: artifact.txt
Generating ephemeral keys...
Retrieving signed certificate...

        Note that there may be personally identifiable information associated with this signed artifact.
        This may include the email address associated with the account with which you authenticate.
        This information will be used for signing this artifact and will be stored in public transparency logs and cannot be removed later.
        By typing 'y', you attest that you grant (or have permission to grant) and agree to have this information stored permanently in transparency logs.

Are you sure you want to continue? (y/[N]): y
Your browser will now be opened to:
https://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=gGdRPWHb4ZNnBjRIEs9wbBhI3bqVriOCyq2W98YuqQ0&code_challenge_method=S256&nonce=2KGHDNf4CZ4gXINF9A12quVVxHl&redirect_uri=http%3A%2F%2Flocalhost%3A41711%2Fauth%2Fcallback&response_type=code&scope=openid+email&state=2KGHDOhtlyDhCegsNy1qPuKAWbd
Successfully verified SCT...
using ephemeral certificate:
-----BEGIN CERTIFICATE-----
MIICpzCCAi6gAwIBAgIUb6LDCNlvHnUGD55dbYuRq9BEB7gwCgYIKoZIzj0EAwMw
NzEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MR4wHAYDVQQDExVzaWdzdG9yZS1pbnRl
cm1lZGlhdGUwHhcNMjMwMTEzMDcxMTIyWhcNMjMwMTEzMDcyMTIyWjAAMFkwEwYH
KoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZk/BAIoz2
GL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyKOCAU0wggFJMA4G
A1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUdZPv
Pd5abMkW8mcBgb3umAmHTcUwHwYDVR0jBBgwFoAU39Ppz1YkEZb5qNjpKFWixi4Y
ZD8wJwYDVR0RAQH/BB0wG4EZZGFuaWVsLmJldmVuaXVzQGdtYWlsLmNvbTAsBgor
BgEEAYO/MAEBBB5odHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgwgYoGCisG
AQQB1nkCBAIEfAR6AHgAdgDdPTBqxscRMmMZHhyZZzcCokpeuN48rf+HinKALynu
jgAAAYWp+AiYAAAEAwBHMEUCIAlfL870WJta7pD97Yiw0JbvY7YGg604cGxXEXtQ
tzoaAiEA+VWQiz+JPEsLBLbtclfhXFhn/C4kTyaS2Fj12+voTt4wCgYIKoZIzj0E
AwMDZwAwZAIwUtBB+1H6177KW3nfTpK9unSGgwIPEuNqQviJyeZRjkK85pnfk0p5
lwQVbfekXYq+AjBgJA/xjX5+UqRh+O1LqxBIun1gYhIwK+UUZq49SH0uP2sQL5un
ILHOPrBw0f00Q68=
-----END CERTIFICATE-----

tlog entry created with index: 11074687
Bundle wrote in the file artifact.bundle
MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=
```

After this there will be an file named `artifact.bundle` in the directory where
the above command was executed.

So lets take a look at the bundle:

```console
$ cat artifact.bundle | jq
{
  "base64Signature": "MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=",
  "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNwekNDQWk2Z0F3SUJBZ0lVYjZMRENObHZIblVHRDU1ZGJZdVJxOUJFQjdnd0NnWUlLb1pJemowRUF3TXcKTnpFVk1CTUdBMVVFQ2hNTWMybG5jM1J2Y21VdVpHVjJNUjR3SEFZRFZRUURFeFZ6YVdkemRHOXlaUzFwYm5SbApjbTFsWkdsaGRHVXdIaGNOTWpNd01URXpNRGN4TVRJeVdoY05Nak13TVRFek1EY3lNVEl5V2pBQU1Ga3dFd1lICktvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVEVHZMMFBSc3hveE1YZlNhWHUrN3cwb3ZWTnpaay9CQUlvejIKR0wyY1BZM3FaRU5VLytZclI5MkF1WkZYbjBqU21tdk9rdHBBekdobkRodGlkb25reUtPQ0FVMHdnZ0ZKTUE0RwpBMVVkRHdFQi93UUVBd0lIZ0RBVEJnTlZIU1VFRERBS0JnZ3JCZ0VGQlFjREF6QWRCZ05WSFE0RUZnUVVkWlB2ClBkNWFiTWtXOG1jQmdiM3VtQW1IVGNVd0h3WURWUjBqQkJnd0ZvQVUzOVBwejFZa0VaYjVxTmpwS0ZXaXhpNFkKWkQ4d0p3WURWUjBSQVFIL0JCMHdHNEVaWkdGdWFXVnNMbUpsZG1WdWFYVnpRR2R0WVdsc0xtTnZiVEFzQmdvcgpCZ0VFQVlPL01BRUJCQjVvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2Ykc5bmFXNHZiMkYxZEdnd2dZb0dDaXNHCkFRUUIxbmtDQkFJRWZBUjZBSGdBZGdEZFBUQnF4c2NSTW1NWkhoeVpaemNDb2twZXVONDhyZitIaW5LQUx5bnUKamdBQUFZV3ArQWlZQUFBRUF3QkhNRVVDSUFsZkw4NzBXSnRhN3BEOTdZaXcwSmJ2WTdZR2c2MDRjR3hYRVh0UQp0em9hQWlFQStWV1FpeitKUEVzTEJMYnRjbGZoWEZobi9DNGtUeWFTMkZqMTIrdm9UdDR3Q2dZSUtvWkl6ajBFCkF3TURad0F3WkFJd1V0QkIrMUg2MTc3S1czbmZUcEs5dW5TR2d3SVBFdU5xUXZpSnllWlJqa0s4NXBuZmswcDUKbHdRVmJmZWtYWXErQWpCZ0pBL3hqWDUrVXFSaCtPMUxxeEJJdW4xZ1loSXdLK1VVWnE0OVNIMHVQMnNRTDV1bgpJTEhPUHJCdzBmMDBRNjg9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K",
  "rekorBundle": {
    "SignedEntryTimestamp": "MEUCIQDYiu9WHR4eCJ2JGPCfwWYg/lILIM+9IvDEb3Nq2MYIUAIgK2tRLSYDLuU0uaywKy8C+3ETUBKfw1lds4Q4Bw4l8jQ=",
    "Payload": {
      "body": "eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiI1YWEwM2Y5NmM3NzUzNjU3OTE2NmZiYTE0NzkyOTYyNmNjM2E5Nzk2MGU5OTQwNTdhOWQ4MDI3MWE3MzZkMTBmIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FVUNJQmJmVnIwclJFZ2syeVhmRU5NelRkdVhuU1JjMkdrSkVVT2I1dEJuY0ZnU0FpRUF0QzRmMUNBNFlpbzlOM3dqZE1BYlk2aENlckNLd3lNK2huOEwxa24zM0dFPSIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVTndla05EUVdrMlowRjNTVUpCWjBsVllqWk1SRU5PYkhaSWJsVkhSRFUxWkdKWmRWSnhPVUpGUWpkbmQwTm5XVWxMYjFwSmVtb3dSVUYzVFhjS1RucEZWazFDVFVkQk1WVkZRMmhOVFdNeWJHNWpNMUoyWTIxVmRWcEhWakpOVWpSM1NFRlpSRlpSVVVSRmVGWjZZVmRrZW1SSE9YbGFVekZ3WW01U2JBcGpiVEZzV2tkc2FHUkhWWGRJYUdOT1RXcE5kMDFVUlhwTlJHTjRUVlJKZVZkb1kwNU5hazEzVFZSRmVrMUVZM2xOVkVsNVYycEJRVTFHYTNkRmQxbElDa3R2V2tsNmFqQkRRVkZaU1V0dldrbDZhakJFUVZGalJGRm5RVVZFVkhaTU1GQlNjM2h2ZUUxWVpsTmhXSFVyTjNjd2IzWldUbnBhYXk5Q1FVbHZlaklLUjB3eVkxQlpNM0ZhUlU1Vkx5dFpjbEk1TWtGMVdrWlliakJxVTIxdGRrOXJkSEJCZWtkb2JrUm9kR2xrYjI1cmVVdFBRMEZWTUhkblowWktUVUUwUndwQk1WVmtSSGRGUWk5M1VVVkJkMGxJWjBSQlZFSm5UbFpJVTFWRlJFUkJTMEpuWjNKQ1owVkdRbEZqUkVGNlFXUkNaMDVXU0ZFMFJVWm5VVlZrV2xCMkNsQmtOV0ZpVFd0WE9HMWpRbWRpTTNWdFFXMUlWR05WZDBoM1dVUldVakJxUWtKbmQwWnZRVlV6T1ZCd2VqRlphMFZhWWpWeFRtcHdTMFpYYVhocE5Ga0tXa1E0ZDBwM1dVUldVakJTUVZGSUwwSkNNSGRITkVWYVdrZEdkV0ZYVm5OTWJVcHNaRzFXZFdGWVZucFJSMlIwV1Zkc2MweHRUblppVkVGelFtZHZjZ3BDWjBWRlFWbFBMMDFCUlVKQ1FqVnZaRWhTZDJONmIzWk1NbVJ3WkVkb01WbHBOV3BpTWpCMllrYzVibUZYTkhaaU1rWXhaRWRuZDJkWmIwZERhWE5IQ2tGUlVVSXhibXREUWtGSlJXWkJValpCU0dkQlpHZEVaRkJVUW5GNGMyTlNUVzFOV2tob2VWcGFlbU5EYjJ0d1pYVk9ORGh5Wml0SWFXNUxRVXg1Ym5VS2FtZEJRVUZaVjNBclFXbFpRVUZCUlVGM1FraE5SVlZEU1VGc1prdzROekJYU25SaE4zQkVPVGRaYVhjd1NtSjJXVGRaUjJjMk1EUmpSM2hZUlZoMFVRcDBlbTloUVdsRlFTdFdWMUZwZWl0S1VFVnpURUpNWW5SamJHWm9XRVpvYmk5RE5HdFVlV0ZUTWtacU1USXJkbTlVZERSM1EyZFpTVXR2V2tsNmFqQkZDa0YzVFVSYWQwRjNXa0ZKZDFWMFFrSXJNVWcyTVRjM1MxY3pibVpVY0VzNWRXNVRSMmQzU1ZCRmRVNXhVWFpwU25sbFdsSnFhMHM0TlhCdVptc3djRFVLYkhkUlZtSm1aV3RZV1hFclFXcENaMHBCTDNocVdEVXJWWEZTYUN0UE1VeHhlRUpKZFc0eFoxbG9TWGRMSzFWVlduRTBPVk5JTUhWUU1uTlJURFYxYmdwSlRFaFBVSEpDZHpCbU1EQlJOamc5Q2kwdExTMHRSVTVFSUVORlVsUkpSa2xEUVZSRkxTMHRMUzBLIn19fX0=",
      "integratedTime": 1673593883,
      "logIndex": 11074687,
      "logID": "c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d"
    }
  }
}
```

So we have a json object with three fields, a `base64Signature`, a `cert`, and
a `rekorBundle` field.

Lets start with `base64Signature` field:

```console
$ cat artifact.bundle | jq '.base64Signature'
"MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE="
```

As the name of this field implies it contains a base64 encoded signature.

Lets be decode the signature and store it in a file:

```
$ cat artifact.bundle | jq -r '.base64Signature' | base64 -d - > signature
```

We will use this file shortly.

The `cert` field contains a base64 encoded certificate in pem format:

```
$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.publicKey.content' | base64 -d -
-----BEGIN CERTIFICATE-----
MIICpzCCAi6gAwIBAgIUb6LDCNlvHnUGD55dbYuRq9BEB7gwCgYIKoZIzj0EAwMw
NzEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MR4wHAYDVQQDExVzaWdzdG9yZS1pbnRl
cm1lZGlhdGUwHhcNMjMwMTEzMDcxMTIyWhcNMjMwMTEzMDcyMTIyWjAAMFkwEwYH
KoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZk/BAIoz2
GL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyKOCAU0wggFJMA4G
A1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUdZPv
Pd5abMkW8mcBgb3umAmHTcUwHwYDVR0jBBgwFoAU39Ppz1YkEZb5qNjpKFWixi4Y
ZD8wJwYDVR0RAQH/BB0wG4EZZGFuaWVsLmJldmVuaXVzQGdtYWlsLmNvbTAsBgor
BgEEAYO/MAEBBB5odHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgwgYoGCisG
AQQB1nkCBAIEfAR6AHgAdgDdPTBqxscRMmMZHhyZZzcCokpeuN48rf+HinKALynu
jgAAAYWp+AiYAAAEAwBHMEUCIAlfL870WJta7pD97Yiw0JbvY7YGg604cGxXEXtQ
tzoaAiEA+VWQiz+JPEsLBLbtclfhXFhn/C4kTyaS2Fj12+voTt4wCgYIKoZIzj0E
AwMDZwAwZAIwUtBB+1H6177KW3nfTpK9unSGgwIPEuNqQviJyeZRjkK85pnfk0p5
lwQVbfekXYq+AjBgJA/xjX5+UqRh+O1LqxBIun1gYhIwK+UUZq49SH0uP2sQL5un
ILHOPrBw0f00Q68=
-----END CERTIFICATE-----
```

We can inspect this certificate using openssl:

```
$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.publicKey.content' | base64 -d - | openssl x509 -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            6f:a2:c3:08:d9:6f:1e:75:06:0f:9e:5d:6d:8b:91:ab:d0:44:07:b8
        Signature Algorithm: ecdsa-with-SHA384
        Issuer: O = sigstore.dev, CN = sigstore-intermediate
        Validity
            Not Before: Jan 13 07:11:22 2023 GMT
            Not After : Jan 13 07:21:22 2023 GMT
        Subject:
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:0d:3b:cb:d0:f4:6c:c6:8c:4c:5d:f4:9a:5e:ef:
                    bb:c3:4a:2f:54:dc:d9:93:f0:40:22:8c:f6:18:bd:
                    9c:3d:8d:ea:64:43:54:ff:e6:2b:47:dd:80:b9:91:
                    57:9f:48:d2:9a:6b:ce:92:da:40:cc:68:67:0e:1b:
                    62:76:89:e4:c8
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature
            X509v3 Extended Key Usage:
                Code Signing
            X509v3 Subject Key Identifier:
                75:93:EF:3D:DE:5A:6C:C9:16:F2:67:01:81:BD:EE:98:09:87:4D:C5
            X509v3 Authority Key Identifier:
                keyid:DF:D3:E9:CF:56:24:11:96:F9:A8:D8:E9:28:55:A2:C6:2E:18:64:3F

            X509v3 Subject Alternative Name: critical
                email:daniel.bevenius@gmail.com
            1.3.6.1.4.1.57264.1.1:
                https://github.com/login/oauth
            CT Precertificate SCTs:
                Signed Certificate Timestamp:
                    Version   : v1 (0x0)
                    Log ID    : DD:3D:30:6A:C6:C7:11:32:63:19:1E:1C:99:67:37:02:
                                A2:4A:5E:B8:DE:3C:AD:FF:87:8A:72:80:2F:29:EE:8E
                    Timestamp : Jan 13 07:11:22.776 2023 GMT
                    Extensions: none
                    Signature : ecdsa-with-SHA256
                                30:45:02:20:09:5F:2F:CE:F4:58:9B:5A:EE:90:FD:ED:
                                88:B0:D0:96:EF:63:B6:06:83:AD:38:70:6C:57:11:7B:
                                50:B7:3A:1A:02:21:00:F9:55:90:8B:3F:89:3C:4B:0B:
                                04:B6:ED:72:57:E1:5C:58:67:FC:2E:24:4F:26:92:D8:
                                58:F5:DB:EB:E8:4E:DE
    Signature Algorithm: ecdsa-with-SHA384
         30:64:02:30:52:d0:41:fb:51:fa:d7:be:ca:5b:79:df:4e:92:
         bd:ba:74:86:83:02:0f:12:e3:6a:42:f8:89:c9:e6:51:8e:42:
         bc:e6:99:df:93:4a:79:97:04:15:6d:f7:a4:5d:8a:be:02:30:
         60:24:0f:f1:8d:7e:7e:52:a4:61:f8:ed:4b:ab:10:48:ba:7d:
         60:62:12:30:2b:e5:14:66:ae:3d:48:7d:2e:3f:6b:10:2f:9b:
         a7:20:b1:ce:3e:b0:70:d1:fd:34:43:af
-----BEGIN CERTIFICATE-----
MIICpzCCAi6gAwIBAgIUb6LDCNlvHnUGD55dbYuRq9BEB7gwCgYIKoZIzj0EAwMw
NzEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MR4wHAYDVQQDExVzaWdzdG9yZS1pbnRl
cm1lZGlhdGUwHhcNMjMwMTEzMDcxMTIyWhcNMjMwMTEzMDcyMTIyWjAAMFkwEwYH
KoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZk/BAIoz2
GL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyKOCAU0wggFJMA4G
A1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUdZPv
Pd5abMkW8mcBgb3umAmHTcUwHwYDVR0jBBgwFoAU39Ppz1YkEZb5qNjpKFWixi4Y
ZD8wJwYDVR0RAQH/BB0wG4EZZGFuaWVsLmJldmVuaXVzQGdtYWlsLmNvbTAsBgor
BgEEAYO/MAEBBB5odHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgwgYoGCisG
AQQB1nkCBAIEfAR6AHgAdgDdPTBqxscRMmMZHhyZZzcCokpeuN48rf+HinKALynu
jgAAAYWp+AiYAAAEAwBHMEUCIAlfL870WJta7pD97Yiw0JbvY7YGg604cGxXEXtQ
tzoaAiEA+VWQiz+JPEsLBLbtclfhXFhn/C4kTyaS2Fj12+voTt4wCgYIKoZIzj0E
AwMDZwAwZAIwUtBB+1H6177KW3nfTpK9unSGgwIPEuNqQviJyeZRjkK85pnfk0p5
lwQVbfekXYq+AjBgJA/xjX5+UqRh+O1LqxBIun1gYhIwK+UUZq49SH0uP2sQL5un
ILHOPrBw0f00Q68=
-----END CERTIFICATE-----
```

Lets store the certificate in a file, and extract the public key:

```console
$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.publicKey.content' | base64 -d -  > cert.pem
$ openssl x509 -pubkey -noout -in cert.pem  > pub.pem
```

With those files, the `signature`, the `public key`, and the `blob` we should be
able to verify the signature from the `base64Signature` field using the
following command:

```console
$ openssl dgst -verify pub.pem -keyform PEM -sha256 -signature signature -binary artifact.txt
Verified OK
```

The motivation of doing that was to show that the `base64Signature` is just the
signature of the blob.

Next, lets take a look at the `rekorBundle` field:

```console
$ cat artifact.bundle | jq -r '.rekorBundle' |  jq '.'
{
  "SignedEntryTimestamp": "MEUCIQDYiu9WHR4eCJ2JGPCfwWYg/lILIM+9IvDEb3Nq2MYIUAIgK2tRLSYDLuU0uaywKy8C+3ETUBKfw1lds4Q4Bw4l8jQ=",
  "Payload": {
    "body": "eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiI1YWEwM2Y5NmM3NzUzNjU3OTE2NmZiYTE0NzkyOTYyNmNjM2E5Nzk2MGU5OTQwNTdhOWQ4MDI3MWE3MzZkMTBmIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FVUNJQmJmVnIwclJFZ2syeVhmRU5NelRkdVhuU1JjMkdrSkVVT2I1dEJuY0ZnU0FpRUF0QzRmMUNBNFlpbzlOM3dqZE1BYlk2aENlckNLd3lNK2huOEwxa24zM0dFPSIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVTndla05EUVdrMlowRjNTVUpCWjBsVllqWk1SRU5PYkhaSWJsVkhSRFUxWkdKWmRWSnhPVUpGUWpkbmQwTm5XVWxMYjFwSmVtb3dSVUYzVFhjS1RucEZWazFDVFVkQk1WVkZRMmhOVFdNeWJHNWpNMUoyWTIxVmRWcEhWakpOVWpSM1NFRlpSRlpSVVVSRmVGWjZZVmRrZW1SSE9YbGFVekZ3WW01U2JBcGpiVEZzV2tkc2FHUkhWWGRJYUdOT1RXcE5kMDFVUlhwTlJHTjRUVlJKZVZkb1kwNU5hazEzVFZSRmVrMUVZM2xOVkVsNVYycEJRVTFHYTNkRmQxbElDa3R2V2tsNmFqQkRRVkZaU1V0dldrbDZhakJFUVZGalJGRm5RVVZFVkhaTU1GQlNjM2h2ZUUxWVpsTmhXSFVyTjNjd2IzWldUbnBhYXk5Q1FVbHZlaklLUjB3eVkxQlpNM0ZhUlU1Vkx5dFpjbEk1TWtGMVdrWlliakJxVTIxdGRrOXJkSEJCZWtkb2JrUm9kR2xrYjI1cmVVdFBRMEZWTUhkblowWktUVUUwUndwQk1WVmtSSGRGUWk5M1VVVkJkMGxJWjBSQlZFSm5UbFpJVTFWRlJFUkJTMEpuWjNKQ1owVkdRbEZqUkVGNlFXUkNaMDVXU0ZFMFJVWm5VVlZrV2xCMkNsQmtOV0ZpVFd0WE9HMWpRbWRpTTNWdFFXMUlWR05WZDBoM1dVUldVakJxUWtKbmQwWnZRVlV6T1ZCd2VqRlphMFZhWWpWeFRtcHdTMFpYYVhocE5Ga0tXa1E0ZDBwM1dVUldVakJTUVZGSUwwSkNNSGRITkVWYVdrZEdkV0ZYVm5OTWJVcHNaRzFXZFdGWVZucFJSMlIwV1Zkc2MweHRUblppVkVGelFtZHZjZ3BDWjBWRlFWbFBMMDFCUlVKQ1FqVnZaRWhTZDJONmIzWk1NbVJ3WkVkb01WbHBOV3BpTWpCMllrYzVibUZYTkhaaU1rWXhaRWRuZDJkWmIwZERhWE5IQ2tGUlVVSXhibXREUWtGSlJXWkJValpCU0dkQlpHZEVaRkJVUW5GNGMyTlNUVzFOV2tob2VWcGFlbU5EYjJ0d1pYVk9ORGh5Wml0SWFXNUxRVXg1Ym5VS2FtZEJRVUZaVjNBclFXbFpRVUZCUlVGM1FraE5SVlZEU1VGc1prdzROekJYU25SaE4zQkVPVGRaYVhjd1NtSjJXVGRaUjJjMk1EUmpSM2hZUlZoMFVRcDBlbTloUVdsRlFTdFdWMUZwZWl0S1VFVnpURUpNWW5SamJHWm9XRVpvYmk5RE5HdFVlV0ZUTWtacU1USXJkbTlVZERSM1EyZFpTVXR2V2tsNmFqQkZDa0YzVFVSYWQwRjNXa0ZKZDFWMFFrSXJNVWcyTVRjM1MxY3pibVpVY0VzNWRXNVRSMmQzU1ZCRmRVNXhVWFpwU25sbFdsSnFhMHM0TlhCdVptc3djRFVLYkhkUlZtSm1aV3RZV1hFclFXcENaMHBCTDNocVdEVXJWWEZTYUN0UE1VeHhlRUpKZFc0eFoxbG9TWGRMSzFWVlduRTBPVk5JTUhWUU1uTlJURFYxYmdwSlRFaFBVSEpDZHpCbU1EQlJOamc5Q2kwdExTMHRSVTVFSUVORlVsUkpSa2xEUVZSRkxTMHRMUzBLIn19fX0=",
    "integratedTime": 1673593883,
    "logIndex": 11074687,
    "logID": "c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d"
  }
}
```

`SignedEntryTimestamp` is a signature of the `logIndex`, the `body`, and the
`integratedTime` time fields created by Rekor. We can inspect the Rekor log
entry to verify:

```console
$ curl --silent https://rekor.sigstore.dev/api/v1/log/entries?logIndex=11074687 | jq -r '.[]'
{
  "body": "eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiI1YWEwM2Y5NmM3NzUzNjU3OTE2NmZiYTE0NzkyOTYyNmNjM2E5Nzk2MGU5OTQwNTdhOWQ4MDI3MWE3MzZkMTBmIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FVUNJQmJmVnIwclJFZ2syeVhmRU5NelRkdVhuU1JjMkdrSkVVT2I1dEJuY0ZnU0FpRUF0QzRmMUNBNFlpbzlOM3dqZE1BYlk2aENlckNLd3lNK2huOEwxa24zM0dFPSIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVTndla05EUVdrMlowRjNTVUpCWjBsVllqWk1SRU5PYkhaSWJsVkhSRFUxWkdKWmRWSnhPVUpGUWpkbmQwTm5XVWxMYjFwSmVtb3dSVUYzVFhjS1RucEZWazFDVFVkQk1WVkZRMmhOVFdNeWJHNWpNMUoyWTIxVmRWcEhWakpOVWpSM1NFRlpSRlpSVVVSRmVGWjZZVmRrZW1SSE9YbGFVekZ3WW01U2JBcGpiVEZzV2tkc2FHUkhWWGRJYUdOT1RXcE5kMDFVUlhwTlJHTjRUVlJKZVZkb1kwNU5hazEzVFZSRmVrMUVZM2xOVkVsNVYycEJRVTFHYTNkRmQxbElDa3R2V2tsNmFqQkRRVkZaU1V0dldrbDZhakJFUVZGalJGRm5RVVZFVkhaTU1GQlNjM2h2ZUUxWVpsTmhXSFVyTjNjd2IzWldUbnBhYXk5Q1FVbHZlaklLUjB3eVkxQlpNM0ZhUlU1Vkx5dFpjbEk1TWtGMVdrWlliakJxVTIxdGRrOXJkSEJCZWtkb2JrUm9kR2xrYjI1cmVVdFBRMEZWTUhkblowWktUVUUwUndwQk1WVmtSSGRGUWk5M1VVVkJkMGxJWjBSQlZFSm5UbFpJVTFWRlJFUkJTMEpuWjNKQ1owVkdRbEZqUkVGNlFXUkNaMDVXU0ZFMFJVWm5VVlZrV2xCMkNsQmtOV0ZpVFd0WE9HMWpRbWRpTTNWdFFXMUlWR05WZDBoM1dVUldVakJxUWtKbmQwWnZRVlV6T1ZCd2VqRlphMFZhWWpWeFRtcHdTMFpYYVhocE5Ga0tXa1E0ZDBwM1dVUldVakJTUVZGSUwwSkNNSGRITkVWYVdrZEdkV0ZYVm5OTWJVcHNaRzFXZFdGWVZucFJSMlIwV1Zkc2MweHRUblppVkVGelFtZHZjZ3BDWjBWRlFWbFBMMDFCUlVKQ1FqVnZaRWhTZDJONmIzWk1NbVJ3WkVkb01WbHBOV3BpTWpCMllrYzVibUZYTkhaaU1rWXhaRWRuZDJkWmIwZERhWE5IQ2tGUlVVSXhibXREUWtGSlJXWkJValpCU0dkQlpHZEVaRkJVUW5GNGMyTlNUVzFOV2tob2VWcGFlbU5EYjJ0d1pYVk9ORGh5Wml0SWFXNUxRVXg1Ym5VS2FtZEJRVUZaVjNBclFXbFpRVUZCUlVGM1FraE5SVlZEU1VGc1prdzROekJYU25SaE4zQkVPVGRaYVhjd1NtSjJXVGRaUjJjMk1EUmpSM2hZUlZoMFVRcDBlbTloUVdsRlFTdFdWMUZwZWl0S1VFVnpURUpNWW5SamJHWm9XRVpvYmk5RE5HdFVlV0ZUTWtacU1USXJkbTlVZERSM1EyZFpTVXR2V2tsNmFqQkZDa0YzVFVSYWQwRjNXa0ZKZDFWMFFrSXJNVWcyTVRjM1MxY3pibVpVY0VzNWRXNVRSMmQzU1ZCRmRVNXhVWFpwU25sbFdsSnFhMHM0TlhCdVptc3djRFVLYkhkUlZtSm1aV3RZV1hFclFXcENaMHBCTDNocVdEVXJWWEZTYUN0UE1VeHhlRUpKZFc0eFoxbG9TWGRMSzFWVlduRTBPVk5JTUhWUU1uTlJURFYxYmdwSlRFaFBVSEpDZHpCbU1EQlJOamc5Q2kwdExTMHRSVTVFSUVORlVsUkpSa2xEUVZSRkxTMHRMUzBLIn19fX0=",
  "integratedTime": 1673593883,
  "logID": "c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d",
  "logIndex": 11074687,
  "verification": {
    "inclusionProof": {
      "checkpoint": "rekor.sigstore.dev - 2605736670972794746\n6915767\nIDKYzW3/yaZoFrPpz2HKEReyArFz47FmWC3Z9REfsCY=\nTimestamp: 1673599771028600100\n\n— rekor.sigstore.dev wNI9ajBFAiBcmpywRj3UZCOMIzwlHzd5eNYEG1rQgX5VKhHAqM49iQIhAPxul/hYfn7wHRCh8/LTXFpLbB3vieU4mqLEPZSUdX4L\n",
      "hashes": [
        "e5871beb5d6ffc577b31f4b0f14763adb1a231d52f2f15dd8c44f4925e402d1d",
        "1d2962738aaebe76a8497de8615fadb0b8a52db957ccfb37b87719131abb53bd",
        "62c6f1d6610f123395faffd632dc853f682a7f1bd93e36c08e53f8591b2b50d7",
        "c1bb29369643451e47467ce1293a981ee4bd00a019a0a5bf77dacfd0aa15eff7",
        "fec4c3b5bfb7783f8eee0e83af6e781f49825efb515bd70b2745b4d15b0b56f5",
        "aaee4f535cb2dca6853ab13d2f2eda182dd72aa708824d6281182009763e753e",
        "22430b589e10029a924c4ec50a96b51fa0aff8b461b205dc9e02d3eb588bcd98",
        "067da42bda7c3c476cbd160a7df567266e3c4788d38d214b44774907a1e1bd27",
        "2269e80ae081e893a5e7a6350826b29bdf890afa397110c632910acf895e7a26",
        "7c4a791951a23906049a3060ac3f29e571df225f0d7eadeb5417dff7631c8cec",
        "3648d28ef4842a998b3f22755750e99a81a74d6567166831e325f044cde6162b",
        "0cd1da2cb04f7956568f32c500bad03be8a022faa50f393c185ac5ac201f3339",
        "a14a3e23a363f496dc96a3061d454e1f0629ea94c0664991d4e5eab4d29306cb",
        "4c00279b889607cf1f98294f05dc3f10ffecd2a87df4af3e4360a039ff3421c9",
        "35da85b3d8a823b9040af497f298dc7c517236e78a98b1b426251b9ecde33628",
        "9d57b977c2a8ebeb68d127df7be605c849c732275a0b05db00264a59f4ca0834",
        "9eb0417210c64dcc971f58268b5aaa968ce2c2d200c41b346f50a100728ebc72",
        "e7d67f5102ddeda58eda651dcba76876d01955a4eca9fce4caaf9e0ba7521cdd",
        "616429db6c7d20c5b0eff1a6e512ea57a0734b94ae0bc7c914679463e01a7fba",
        "5a4ad1534b1e770f02bfde0de15008a6971cf1ffbfa963fc9c2a644973a8d2d1"
      ],
      "logIndex": 6911256,
      "rootHash": "203298cd6dffc9a66816b3e9cf61ca1117b202b173e3b166582dd9f5111fb026",
      "treeSize": 6915767
    },
    "signedEntryTimestamp": "MEUCIGicHWGa0XI3perd9LM64+tdneXvvVsOrWxn7pCoUbuNAiEAjmgWIxOH8itbqYjAgkiilYmNVR/hewmfatviQZf3Wr8="
  }
}
```

The Rekor log can also be accessed using https:
https://rekor.tlog.dev/?logIndex=11074687

Now, lets inspect the `body` field of the bundle:

```console
$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq
{
  "apiVersion": "0.0.1",
  "kind": "hashedrekord",
  "spec": {
    "data": {
      "hash": {
        "algorithm": "sha256",
        "value": "5aa03f96c77536579166fba147929626cc3a97960e994057a9d80271a736d10f"
      }
    },
    "signature": {
      "content": "MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=",
      "publicKey": {
        "content": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNwekNDQWk2Z0F3SUJBZ0lVYjZMRENObHZIblVHRDU1ZGJZdVJxOUJFQjdnd0NnWUlLb1pJemowRUF3TXcKTnpFVk1CTUdBMVVFQ2hNTWMybG5jM1J2Y21VdVpHVjJNUjR3SEFZRFZRUURFeFZ6YVdkemRHOXlaUzFwYm5SbApjbTFsWkdsaGRHVXdIaGNOTWpNd01URXpNRGN4TVRJeVdoY05Nak13TVRFek1EY3lNVEl5V2pBQU1Ga3dFd1lICktvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVEVHZMMFBSc3hveE1YZlNhWHUrN3cwb3ZWTnpaay9CQUlvejIKR0wyY1BZM3FaRU5VLytZclI5MkF1WkZYbjBqU21tdk9rdHBBekdobkRodGlkb25reUtPQ0FVMHdnZ0ZKTUE0RwpBMVVkRHdFQi93UUVBd0lIZ0RBVEJnTlZIU1VFRERBS0JnZ3JCZ0VGQlFjREF6QWRCZ05WSFE0RUZnUVVkWlB2ClBkNWFiTWtXOG1jQmdiM3VtQW1IVGNVd0h3WURWUjBqQkJnd0ZvQVUzOVBwejFZa0VaYjVxTmpwS0ZXaXhpNFkKWkQ4d0p3WURWUjBSQVFIL0JCMHdHNEVaWkdGdWFXVnNMbUpsZG1WdWFYVnpRR2R0WVdsc0xtTnZiVEFzQmdvcgpCZ0VFQVlPL01BRUJCQjVvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2Ykc5bmFXNHZiMkYxZEdnd2dZb0dDaXNHCkFRUUIxbmtDQkFJRWZBUjZBSGdBZGdEZFBUQnF4c2NSTW1NWkhoeVpaemNDb2twZXVONDhyZitIaW5LQUx5bnUKamdBQUFZV3ArQWlZQUFBRUF3QkhNRVVDSUFsZkw4NzBXSnRhN3BEOTdZaXcwSmJ2WTdZR2c2MDRjR3hYRVh0UQp0em9hQWlFQStWV1FpeitKUEVzTEJMYnRjbGZoWEZobi9DNGtUeWFTMkZqMTIrdm9UdDR3Q2dZSUtvWkl6ajBFCkF3TURad0F3WkFJd1V0QkIrMUg2MTc3S1czbmZUcEs5dW5TR2d3SVBFdU5xUXZpSnllWlJqa0s4NXBuZmswcDUKbHdRVmJmZWtYWXErQWpCZ0pBL3hqWDUrVXFSaCtPMUxxeEJJdW4xZ1loSXdLK1VVWnE0OVNIMHVQMnNRTDV1bgpJTEhPUHJCdzBmMDBRNjg9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"
      }
    }
  }
}
```

Now, when an online verification is done, that is when the bundle is not
specified on the command line, the Rekor bundle is looked up in the transparency
log. Notice for example that the same information is also available in the
Rekor log:

```console
$ curl --silent https://rekor.sigstore.dev/api/v1/log/entries?logIndex=11074687 | jq -r '.[].body' | base64 -d | jq
{
  "apiVersion": "0.0.1",
  "kind": "hashedrekord",
  "spec": {
    "data": {
      "hash": {
        "algorithm": "sha256",
        "value": "5aa03f96c77536579166fba147929626cc3a97960e994057a9d80271a736d10f"
      }
    },
    "signature": {
      "content": "MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=",
      "publicKey": {
        "content": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNwekNDQWk2Z0F3SUJBZ0lVYjZMRENObHZIblVHRDU1ZGJZdVJxOUJFQjdnd0NnWUlLb1pJemowRUF3TXcKTnpFVk1CTUdBMVVFQ2hNTWMybG5jM1J2Y21VdVpHVjJNUjR3SEFZRFZRUURFeFZ6YVdkemRHOXlaUzFwYm5SbApjbTFsWkdsaGRHVXdIaGNOTWpNd01URXpNRGN4TVRJeVdoY05Nak13TVRFek1EY3lNVEl5V2pBQU1Ga3dFd1lICktvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVEVHZMMFBSc3hveE1YZlNhWHUrN3cwb3ZWTnpaay9CQUlvejIKR0wyY1BZM3FaRU5VLytZclI5MkF1WkZYbjBqU21tdk9rdHBBekdobkRodGlkb25reUtPQ0FVMHdnZ0ZKTUE0RwpBMVVkRHdFQi93UUVBd0lIZ0RBVEJnTlZIU1VFRERBS0JnZ3JCZ0VGQlFjREF6QWRCZ05WSFE0RUZnUVVkWlB2ClBkNWFiTWtXOG1jQmdiM3VtQW1IVGNVd0h3WURWUjBqQkJnd0ZvQVUzOVBwejFZa0VaYjVxTmpwS0ZXaXhpNFkKWkQ4d0p3WURWUjBSQVFIL0JCMHdHNEVaWkdGdWFXVnNMbUpsZG1WdWFYVnpRR2R0WVdsc0xtTnZiVEFzQmdvcgpCZ0VFQVlPL01BRUJCQjVvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2Ykc5bmFXNHZiMkYxZEdnd2dZb0dDaXNHCkFRUUIxbmtDQkFJRWZBUjZBSGdBZGdEZFBUQnF4c2NSTW1NWkhoeVpaemNDb2twZXVONDhyZitIaW5LQUx5bnUKamdBQUFZV3ArQWlZQUFBRUF3QkhNRVVDSUFsZkw4NzBXSnRhN3BEOTdZaXcwSmJ2WTdZR2c2MDRjR3hYRVh0UQp0em9hQWlFQStWV1FpeitKUEVzTEJMYnRjbGZoWEZobi9DNGtUeWFTMkZqMTIrdm9UdDR3Q2dZSUtvWkl6ajBFCkF3TURad0F3WkFJd1V0QkIrMUg2MTc3S1czbmZUcEs5dW5TR2d3SVBFdU5xUXZpSnllWlJqa0s4NXBuZmswcDUKbHdRVmJmZWtYWXErQWpCZ0pBL3hqWDUrVXFSaCtPMUxxeEJJdW4xZ1loSXdLK1VVWnE0OVNIMHVQMnNRTDV1bgpJTEhPUHJCdzBmMDBRNjg9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"
      }
    }
  }
}
```

Now, let first look at the `spec.data.hash` field which contains a hash
algorithm that was used, and a value. The value is the hash of our blob, the
`artifact.txt`file:

```console
$ sha256sum artifact.txt
5aa03f96c77536579166fba147929626cc3a97960e994057a9d80271a736d10f  artifact.txt
```

And we can compare this with the value in the `spec.data.hash.value` field and
check that they indeed are the same:

```console
$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.data.hash.value'
5aa03f96c77536579166fba147929626cc3a97960e994057a9d80271a736d10f
```

Next we have signature field:

```console
$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.content'
MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=
```

Notice that this is the same value as the toplevel `base64Signature` field:

```console
$ cat artifact.bundle | jq -r '.base64Signature'
MEUCIBbfVr0rREgk2yXfENMzTduXnSRc2GkJEUOb5tBncFgSAiEAtC4f1CA4Yio9N3wjdMAbY6hCerCKwyM+hn8L1kn33GE=
```

And there is also a `publicKey` field in the body which contains:

```console
$ cat artifact.bundle | jq -r '.rekorBundle.Payload.body' | base64 -d - | jq -r '.spec.signature.publicKey.content' | base64 -d
-----BEGIN CERTIFICATE-----
MIICpzCCAi6gAwIBAgIUb6LDCNlvHnUGD55dbYuRq9BEB7gwCgYIKoZIzj0EAwMw
NzEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MR4wHAYDVQQDExVzaWdzdG9yZS1pbnRl
cm1lZGlhdGUwHhcNMjMwMTEzMDcxMTIyWhcNMjMwMTEzMDcyMTIyWjAAMFkwEwYH
KoZIzj0CAQYIKoZIzj0DAQcDQgAEDTvL0PRsxoxMXfSaXu+7w0ovVNzZk/BAIoz2
GL2cPY3qZENU/+YrR92AuZFXn0jSmmvOktpAzGhnDhtidonkyKOCAU0wggFJMA4G
A1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUdZPv
Pd5abMkW8mcBgb3umAmHTcUwHwYDVR0jBBgwFoAU39Ppz1YkEZb5qNjpKFWixi4Y
ZD8wJwYDVR0RAQH/BB0wG4EZZGFuaWVsLmJldmVuaXVzQGdtYWlsLmNvbTAsBgor
BgEEAYO/MAEBBB5odHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgwgYoGCisG
AQQB1nkCBAIEfAR6AHgAdgDdPTBqxscRMmMZHhyZZzcCokpeuN48rf+HinKALynu
jgAAAYWp+AiYAAAEAwBHMEUCIAlfL870WJta7pD97Yiw0JbvY7YGg604cGxXEXtQ
tzoaAiEA+VWQiz+JPEsLBLbtclfhXFhn/C4kTyaS2Fj12+voTt4wCgYIKoZIzj0E
AwMDZwAwZAIwUtBB+1H6177KW3nfTpK9unSGgwIPEuNqQviJyeZRjkK85pnfk0p5
lwQVbfekXYq+AjBgJA/xjX5+UqRh+O1LqxBIun1gYhIwK+UUZq49SH0uP2sQL5un
ILHOPrBw0f00Q68=
-----END CERTIFICATE-----
```

Notice that this is the same certificate as the toplevel `cert` field. Using
the `base64Signature` field, and the `cert` field we are able to verify a blob
which we saw an example of previously.

Hopefully this has given some insight into the bundle format and given some
example of how one can inspect the fields.
