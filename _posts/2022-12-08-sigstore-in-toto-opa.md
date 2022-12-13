---
title: "Sigstore, in-toto, OPA, orientaion"
date: 2022-12-07
author: Daniel Bevenius
---

This post tries to explain what these project are and how they complement each
other.

As someone how was completly new to secure supply-chain security there were a
lot of new projects that I learned the names of but did not really understand
how they all fit together. This post hopes to clarify a few of these projects
and others will be addressed in future posts.

Lets say we have a software project that we want to distribute. We want to sign
the artifact that we produce, and lets say it's distributed as a tar file. This
is possible to do this signing manually, but it involves some work like managing
keys and using tools to perform the signing tasks. Using
[sigstore](https://www.sigstore.dev/) simplfies this process, similar to how
Let's Encrypt made it simpler to get certificate to be used with web sites.
Sigstore also provides tools to verify signatures and a transparency log to
store signatures. So that allows us to sign our end product and publish the
signatures to the transparancy log and verify our artifact.

But how can we trust what was built, for example if I built this on my local
laptop I could replace a source code file with a backdoor and still be able to
produce a valid signature and end product/artifact. This is also the case if a 
build server is used, and we need something more.

This is where another project named [in-toto](https://in-toto.io/) comes into
play. It contains tools to define steps of a build process, assign someone that
is responsible for each step, and who also signs the artifact produced by that
step. Each step is signed by the person responsible for that step, called the
funtionary, and then all the steps are signed by a product owner. This will
produce a document which lists the steps that were followed to produce the
software, with signatures for each step. For example, one step might have been
checking out a specific version from git, and this could be verified that it was
indeed that version that was used, and the source files that were uses, the
compiled object would also be signed and be verifiable, the packaged tar also
etc. This gives the end user insight into the product that they are about to
install and the ability to verify it.

Now, if the end user is using the above artifact in a project they might add
the verification step to their build process, like if they are using our
software to build their own product.

So we now have our built an artifact,  signed it, and we have attestations, in
this case json files that contain metadata about how it was built. And we can
use `in-toto-verify` to verify that all that information is correct.

Now, lets say that another company, or another project, wants to include our
software in their project, as a thirdparty dependency. Ours might be one of many
dependencies that they include in their product and they might have
requirements/restrictions on what they are allowed to use. For example, they
might require that only certain licences are used. The license information is
hopefully available if the projects have used in-toto, but there is nothing
available to say that only certain licenses are allowed. This is where a policy
engine like [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) comes
into play. OPA gives us the ability to write policy rules that take in-toto json
files as input, and verify that there are licences for all thirdparty
dependencies and that they are of the type/types that are allowed. Rules can be
written to handle other types of restrictions/requirements as well, which are
the policies that the company has.

So they could include a step in their build process that execute enforces the
policy rules the have defined.

Policy rules can also be useful when deploying applications in container images
where one might want to make sure that only supported base images are used etc.

Hopefully this clarifies how this project might be used and their purposes.

