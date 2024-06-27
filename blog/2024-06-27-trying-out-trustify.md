---
title: "Trying out Trustify, on a local machine"
authors: ctron
tags: [ trustify ]
---

[Trustify](https://github.com/trustification/trustify) is a project for working with software supply chain information,
like SBOMs and advisories. Connect a few data sources with the system, and gather some insight in what you have.

Although Trustify is in its pretty early stages, it might be interesting to try it out and play a bit with it, do see
where this is heading. Read on to see how you can easily do that.

<!--truncate-->

## What to expect?

First of all, we really want to emphasize that the project is pretty young. There are a lot of areas where work is
underway. However, in the sprit of "release early, release often", we try to release a version every week. In a
form that you can simply download and run it right away.

That, of course, is not the ideal deployment scenario. But it should enable you to get started within minutes and
see what's in the box.

## What do you need?

A computer (doesn't work on phones, sorry), internet access (we don't ship on floppies), and the ability to run some
code on your machine (yes, corporate IT rules might be an issue).

Linux, macOS, Windows. AMD or ARM. Doesn't make a difference.

## Everything, Everywhere, All at once

Head over to the [release page](https://github.com/trustification/trustify/releases), and pick a binary for your OS and
architecture with the name starting with `trustd-pm`. That's a binary which includes just everything: the application
itself, the UI, the database, and an embedded OIDC server.

Download that archive, extract it, and run the binary inside it. That's it!

## Now what?

Take your favorite web browser and navigate to: <http://localhost:8080>. That will automatically log you in with a
demo user, and show you the user interface.

You might notice that the system looks quite empty. That is because we did not connect any datasource yet. Navigate
to the "Importer" section and enable the following pre-configured importers:

* `cve-from-2024`
* `redhat-csaf-vex-2024`
* `redhat-sbom`

After that, you might want to take a break. Ingesting those sources for the first time might take a bit. Future runs,
however, will be much faster, as only the diff will be processed.

Maybe click a bit around in the UI to get an idea. Again, don't expect too much yet. It's'a work in progress.

## So?

Being a work in progress also has its advantages. If you managed to get the system up and running in a few minutes,
you might want to reach out and check what we're up to. Or you might have some ideas yourself, or questions. Or, in
case you had not been able to start up the demo, we would kindly as to reach out to use and let us know.

Everything is on GitHub: <https://github.com/trustification/trustify>. If you have some feedback or run into problems,
just raise an issue. If you have some ideas, please let us know as well. And of course, PRs are also always welcome.

If you're looking for a direct chat, you're also welcome to join our Matrix channel: [#trustification:matrix.org](https://matrix.to/#/#trustification:matrix.org). 

## What's next?

Our goal is to push out a new pre-release every week around Thursday. So maybe come back in a bit and check out the 
improvements.
