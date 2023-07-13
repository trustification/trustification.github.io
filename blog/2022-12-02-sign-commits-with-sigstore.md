---
title: "Keyless Git Signing with Sigstore"
authors: danbev
tags: [sigstore]
---

This post contains the steps for setting up
[gitsign](https://github.com/sigstore/gitsign) to sign your git
commits using [sigstore](https://www.sigstore.dev/).

<!--truncate-->

### Install gitsign

```console
$ go install github.com/sigstore/gitsign@latest
```

Or using brew:

```console
$ brew install sigstore/tap/gitsign
```

### Configure git

The collowing will configure signing for the current project:

```console
#!/bin/bash

# Sign all commits
git config --local commit.gpgsign true

# Sign all tags
git config --local tag.gpgsign true

# Use gitsign for signing
git config --local gpg.x509.program gitsign

# gitsign expects x509 args
git config --local gpg.format x509
```

To configure for all projects, use:

```console
#!/bin/bash

# Sign all commits
git config --global commit.gpgsign true

# Sign all tags
git config --global tag.gpgsign true

# Use gitsign for signing
git config --global gpg.x509.program gitsign

# gitsign expects x509 args
git config --global gpg.format x509
```

### Commit

Now when you commit, `gitsign` will be used to start an Open ID
Connect (OIDC) flow. This will allow you to choose an OIDC provider:

```console
$ git commit -v
Your browser will now be opened to:
https://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=eQvdw56pTgXnkj76Cab-4ZWaKk8XFM6UFFBdayKQX1Y&code_challenge_method=S256&nonce=2GmBDq86TMNuz8VhMUixMxiPSe2&redirect_uri=http%3A%2F%2Flocalhost%3A39617%2Fauth%2Fcallback&response_type=code&scope=openid+email&state=2GmBDlYDps5Ywd8dX4Ebwo4VnQL
[master 4292869] Add initial Oniro notes
 1 file changed, 10 insertions(+)
 create mode 100644 notes/oniro.md
```

Note that on github this commit will be marked as `Unverified` because
the sigstore Certificate Authority root is not part of Github's trust
root. Further, validation needs to be done using Rekor to verify that
the certificate was valid at the time this commit was signed.

To avoid having to choose an auth provider each time, set the following environment variable. For example:

```console
$ export GITSIGN_CONNECTOR_ID=https://github.com/login/oauth
```

### Verifying a commit

```console
$ git verify-commit HEAD
```

If verified, you'll see output similar to this:

```console
tlog index: 6058402
gitsign: Signature made using certificate ID 0xb073e00bfabd4fb9988b9e1e0896dcfc1527fcdb | CN=sigstore-intermediate,O=sigstore.dev
gitsign: Good signature from [daniel.bevenius@gmail.com]
Validated Git signature: true
Validated Rekor entry: true
```

### Inspect commit signature

```console
$ git cat-file commit HEAD \
  | sed -n '/BEGIN/, /END/p' \
  | sed 's/^ //g' \
  | sed 's/gpgsig //g' \
  | sed 's/SIGNED MESSAGE/PKCS7/g' \
  | openssl pkcs7 -print -print_certs -text
```
