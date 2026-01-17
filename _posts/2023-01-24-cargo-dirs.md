---
title: ".cargo directories explained"
date: 2023-01-24
author: Daniel Bevenius
---

This post takes a closer look at the `.cargo` directory with a focus on the
`git`, and `registry` directories. 

## .cargo/git directory
If we do a listing of this directory we will find two subdirectories, namely
`db`, and `checkouts`.

If we list the contents of one of those directories we will see that there is a
hash appended to every crate. For example:
```
~/.cargo/git/db/sigstore-rs-874f7064c0c10336/
```
This is a hash of the url of the git repository. To verify this there is a
[command line tool](https://github.com/trustification/source-distributed#print-git-project-hash)
that can be used:
```console
$ cargo r --quiet --bin project-hash -- -u https://github.com/sigstore/sigstore-rs.git
https://github.com/sigstore/sigstore-rs.git: 874f7064c0c10336
```
And we can check this hash against the hash above.

The directories in `.cargo/git/db` are the bare git repositories, and the
directories in `.cargo/git/checkouts` are the checked-out revisions and they
have a directory for each revision (short hash) used by Cargo.

## .cargo/registry directory
The local dependencies from crates.io are located in `/.cargo/registry`:
```console
$ ls ~/.cargo/registry/
cache  CACHEDIR.TAG  index  src
```
There can be multiple registries which are located in the index directory:
```
$ ls ~/.cargo/registry/index/
github.com-1ecc6299db9ec823
```
Now this was a little confusing to me as I did not expect a github.com directory
here. It turns out that Cargo communicates with registries through a github
repository which is called the `Index`. One such github repository is
https://github.com/rust-lang/crates.io-index.

Lets clone this index and take a look at it:
```console
$ git clone https://github.com/rust-lang/crates.io-index.git
$ cd crates.io-index/
```
If we list the contents of this directory we will see a number of subdirectories
starting with one, or two characters/symbols/numbers. Additionally there is also
a `config.json` file.

Now, notice that this index does not contain any crates:
```console
$ find . -name '*.crate' | wc -l
0
```
Instead what the index stores is a list of versions for all known packages. Each
crate will have a single file and there will be an entry in this file for each
version.

Lets take a look at the `drg` crate:
```console
$ cat 3/d/drg 
{"name":"drg","vers":"0.1.0","deps":[],"cksum":"c6bfa8b0b1bcd485d5f783e77faf13ba9453e7ab78991936e50d6cfdca23d647","features":{},"yanked":true}
{"name":"drg","vers":"0.2.1","deps":[{"name":"anyhow","req":"^1.0","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"chrono","req":"^0.4","features":["serde"],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"clap","req":"^2.33.3","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"oauth2","req":"^3.0","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"qstring","req":"^0.7.2","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"reqwest","req":"^0.11","features":["blocking","json"],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"serde","req":"^1.0","features":["derive"],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"serde_json","req":"^1.0","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"strum","req":"^0.20","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"strum_macros","req":"^0.20","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"tempfile","req":"^3.2.0","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"tiny_http","req":"^0.8.0","features":[],"optional":false,"default_features":true,"target":null,"kind":"normal"},{"name":"url","req":"^2.2.1","features":["serde"],"optional":false,"default_features":true,"target":null,"kind":"normal"}],"cksum":"cfb067bfabd64c3b4732a3afd2b9a757a88120f6dac6400eae5b865732be0404","features":{},"yanked":false}
...
```
Notice that there are three directories named `1`, `2`, and `3` which are for
crates that have one, two, or three letters/characters in their name. This is
the case with `drg` above.  

For other crates with longer names, the first directory matches the first two
characters of the crate, and the subdirectory under that will have another
directory matching the following two characters of the crate name. 
For example, if we want to find the `drogue-device` crate, we would search for
`dr` as the first directory, and then `og` as the subdirectory:
```console
$ cat ./dr/og/drogue-device | jq
{
  "name": "drogue-device",
  "vers": "0.0.0",
  "deps": [],
  "cksum": "2acc1a9827b5cd933ebef9824415789012f5202b6bcacddaae2c214486ac996a",
  "features": {},
  "yanked": false
}
```
When new versions of this crate are released a new entry/line in this file will
be created. 

Updates to the index are fairly cheap, just like a normal git fetch and a
git fast forward. 

Alright, so we now have an effecient way to look up a crate version and its
dependencies but we haven't seen any crates yet. This is where the file
`config.json` comes in to play:
```console
$ cat config.json 
{
  "dl": "https://crates.io/api/v1/crates",
  "api": "https://crates.io"
}
```
`dl` stands for `download` and is the url that can be used to download a
specific crate to the `.cargo/registry/cache` directory.

We can do this manually using the value of `dl`:
```console
$ curl -v -L https://crates.io/api/v1/crates/drg/0.1.0/download --output drg-0.0.1.crate
```
And we should then be able to list the content of this crate:
```console
$ tar tvf drg-0.0.1.crate 
-rw-r--r-- 0/0              74 2021-03-18 15:57 drg-0.1.0/.cargo_vcs_info.json
-rw-r--r-- 110147/110147     8 2021-03-18 15:55 drg-0.1.0/.gitignore
-rw-r--r-- 0/0             134 2021-03-18 15:57 drg-0.1.0/Cargo.lock
-rw-r--r-- 0/0             754 2021-03-18 15:57 drg-0.1.0/Cargo.toml
-rw-r--r-- 110147/110147   327 2021-03-18 15:56 drg-0.1.0/Cargo.toml.orig
-rw-r--r-- 110147/110147    45 2021-03-18 15:55 drg-0.1.0/src/main.rs
```
Cargo will download crates to the `.cargo/registry/cache` directory which
will only contain the downloaded crates, the `.crate` compressed tar files.
These never change for a version so they don't have to be downloaded again.

The `src` directory is where the downloaded crates in the cache directory are
unpacked:
```console
$ ls ~/.cargo/registry/src/
github.com-1ecc6299db9ec823
```

The hash appended is a hash of the the identifier of the crates repository,
in this case `crates.io` To verify this there is a
[command line tool](https://github.com/trustification/source-distributed#print-cargo-index-hash)
that can be used:
```console
$ cargo r --quiet --bin index-dir-hash
crates-io: 1ecc6299db9ec823
```
And we can check this hash against the hash above.

Hopefully this post clarifies what some of the directories under the .cargo
directory are used for.
