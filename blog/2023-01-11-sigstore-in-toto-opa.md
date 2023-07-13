---
title: "Sigstore, in-toto, OPA, orientation"
authors: danbev
tags: [sigstore]
---

As someone who was completly new to secure supply chain security (sscs) there
were a lot of new projects that I learned the names of but did not really
understand exactly what they did or how they complement each other. This post
hopes to clarify a few of these projects, and others will be addressed in future
posts.

<!--truncate-->

Lets say we have a software project that we want to distribute. We want to sign
the artifact that we produce, and lets say it's distributed as a tar file. It
is possible to do this signing manually, but it involves some work like managing
keys and using tools to perform the signing tasks. Using
[sigstore](https://www.sigstore.dev/) simplfies this process, similar to how
Let's Encrypt made it simpler to get certificates to be used with web sites.
Sigstore also provides tools to verify signatures and a transparency log to
store signatures. So that allows us to sign our end product, and publish the
signatures to the transparency log, and consumers/clients can verify our
artifact.

But how can we trust what was built? For example, if I built this tar on my
local laptop I could replace a source code file with a backdoor and still be
able to produce a valid signature, and it could still be verified. This is also
the case if a build server is used and it gets compromised, so we need something
more.

This is where another project named [in-toto](https://in-toto.io/) comes into
play. It contains tools to define the steps of a build process, and assign
someone that is responsible for each step. This person also signs the artifact
produced by that step. So each step is signed by the person responsible for that
step, called the funtionary, and then all the steps are signed by a product
owner. This will produce a document which lists the steps that were followed to
produce the software, with signatures for each step.

For example, one step might have been checking out a specific version from git,
and this could be verified that it was indeed that version that was used, and
the source files that were used. This gives the end user insight into the
product that they are about to install and the ability to verify it.

So we now have our built artifact, signed it, and we have attestations, in
this case json files that contain metadata about how it was built. And we can
use in-toto-verify to verify that all that information is correct.

Now, lets say that another company, or another project, wants to include our
software in their project, as a thirdparty dependency. Ours might be one of many
dependencies that they include in their product and they might have
requirements/restrictions on what they are allowed to use. For example, they
might require that only certain licences are used. The license information is
hopefully available in the project, like a license file or field in Cargo.toml,
but there is nothing available to say that only certain licenses are allowed.
This is where a policy engine like
[Open Policy Agent (OPA)](https://www.openpolicyagent.org/) comes into play. OPA
gives us the ability to write policy rules that take in-toto json files as
input, and verify that there are licences for all thirdparty dependencies and
that they are of the type(s) that are allowed. Rules can be written to handle
other types of restrictions/requirements as well, which are the policies that
the company has.

So they could include a step in their build process that execute enforces the
policy rules they have defined. Policy rules can also be useful when deploying
applications in container images where one might want to make sure that only
supported base images are used etc.

Hopefully this post gives some insight into how Sigstore, in-toto, and OPA may
be used, and how they complement each other.
