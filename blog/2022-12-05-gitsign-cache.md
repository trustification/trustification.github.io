---
title: How to Configure a Gitsign Cache
authors: danbev
tags: [sigstore]
---

This post contains the steps for setting up
[gitsign-credential-cache](https://github.com/sigstore/gitsign/tree/main/cmd/gitsign-credential-cache).
which is useful if one has to perform multiple commits in short succession, or
when doing a rebase.

<!--truncate-->

It can be somewhat frustrating to have the browser open for every single
commit. For these situations a cache can be enabled using the instructions in
this post.

First install `gitsign-credential-cache` if it is not already installed:

```console
$ go install github.com/sigstore/gitsign/cmd/gitsign-credential-cache@latest
```

Create a file named `~/.config/systemd/user/gitsign.service`:

```console
[Unit]
Description=Gitsign Credentials Cache
Documentation=https://github.com/sigstore/gitsign

[Service]
Type=simple
ExecStart=%h/go/bin/gitsign-credential-cache

Restart=on-failure

[Install]
WantedBy=default.target
```

This service can then be enabled using:

```console
$ systemctl --user daemon-reload
$ systemctl --user enable gitsign.service
Created symlink /home/danielbevenius/.config/systemd/user/default.target.wants/gitsign.service → /home/danielbevenius/.config/systemd/user/gitsign.service.
```

And we can start it manually using:

```console
$ systemctl --user start gitsign.service
```

Check that it has started successfully:

```console
$ systemctl --user status gitsign.service
● gitsign.service - Gitsign Credentials Cache
     Loaded: loaded (/home/danielbevenius/.config/systemd/user/gitsign.service; enabled; vendor preset: disabled)
     Active: active (running) since Mon 2022-11-28 11:27:47 CET; 2min 35s ago
       Docs: https://github.com/sigstore/gitsign
   Main PID: 177444 (gitsign-credent)
     CGroup: /user.slice/user-1000.slice/user@1000.service/app.slice/gitsign.service
             └─ 177444 /home/danielbevenius/go/bin/gitsign-credential-cache

Nov 28 11:27:47 localhost.localdomain systemd[1295]: Started Gitsign Credentials Cache.
Nov 28 11:27:47 localhost.localdomain gitsign-credential-cache[177444]: /home/danielbevenius/.cache/.sigstore/gitsig>
```

And we then need to add the following environment variable:

```console
$ export GITSIGN_CREDENTIAL_CACHE=~/.cache/.sigstore/gitsign/cache.sock
```

After this we should be able to commit a first time and have our credentials
stored. Subsequent commits will then be made without a browser "popup".
