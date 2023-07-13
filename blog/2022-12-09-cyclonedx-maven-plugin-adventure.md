---
title: "An Adventure with the CycloneDX Maven Plugin"
authors: kevinconner
tags: [cyclonedx]
---

The CycloneDX Maven Plugin can be used to generate CycloneDX Software Bill of Materials (SBOM) for your maven projects as part of your build process. The plugin is easy to integrate, however does have some issues due mostly to idiosyncrasies and shortcomings with the maven resolution mechanism. In this post I attempt to provide some background, examples and explanations for the issues I've discovered as well as context for the solutions I'm proposing.

<!--truncate-->

# Part One - In the Beginning

Three weeks ago I started an adventure with the [CycloneDX Maven Plugin](https://github.com/CycloneDX/cyclonedx-maven-plugin "The CycloneDX Maven Plugin GitHub repository"), investigating how we could make use of this plugin to generate Software Bill of Materials (SBOMs) for the [Quarkus](https://github.com/quarkusio/quarkus "The Quarkus GitHub repository") project. At first this goal appeared easy to achieve, simply enable the plugin for all projects within the **Quarkus** build (hello parent pom.xml) and verify the generated _bom_ contents were accurate.

As I had expected, enabling the plugin was very straight forward. I created a profile in the top level _pom.xml_ to capture the information required at compile time, incorporating all artifacts using _compile_, _provided_ and _system_ maven scopes. I chose not to include any _test_ or _runtime_ artifacts.

Once the BOM files were created I looked for a way to verify the output was reasonable. I turned to the [maven dependency plugin](https://github.com/apache/maven-dependency-plugin "The Maven Dependency Plugin GitHub repository") and its _tree_ goal, along with a fairly straight forward script to compare the information in the generated dependency tree with that in the _bom_ file and highlight any discrepancies. This is where the fun began 😁

The remainder of those three weeks involved many hours with a debugger, walking through the internals of maven as well as the CycloneDX plugin, identifying the causes of these discrepancies and working through fixes to generate the output I believed should have been included in the _bom_ files.

---

**Note:** At this time these changes have neither been discussed nor reviewed by the CycloneDX community, I've reached out to them via slack and am hoping we can find time to go through this in detail over the next few weeks or so. In the meantime treat this article as my opinions of what I believe should be done.

---

# Part Two - The Case of the Missing Dependency

Before we talk about missing dependencies we first need to take a quick refresher for how maven resolves artifacts within a project.

One of the benefits of maven is its ability to automatically derive the dependency tree for your project using the information in your _pom.xml_ combined with the information in the _pom.xml_ for each of your transitive dependencies. Maven will take this information and create a dependency tree where each artifact exists once (not always the case, but we will come on to that), will favour artifacts which are closer to the root of the tree than those farther away, reconcile their versions based on the defined constraints and derive an appropriate scope.

The example used in the maven documentation is as follows

```
A
  ├── B
  │   └── C
  │       └── D 2.0
  └── E
      └── D 1.0
```

As the shortest path to **D** is via E, the generated dependency tree will look like

```
A
  ├── B
  │   └── C
  └── E
      └── D 1.0
```

With the above refresher out of the way let's move on to the issue of missing dependencies and consider the following example

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- com.example:dependency2:jar:1.0.0:compile
|     \- com.example:shared_dependency1:jar:1.0.0:compile
|       \- com.example:shared_dependency2:jar:1.0.0:compile
\- com.example:test_dependency:jar:1.0.0:test
   \- com.example:shared_dependency1:jar:1.0.0:compile
      \- com.example:shared_dependency2:jar:1.0.0:compile
```

In this graph we can see that **com.example:dependency2** and **com.example:test_dependency** both depend on **com.example:shared_dependency1**, with **dependency2** having a scope of _compile_ and **test_dependency** having a scope of _test_. When this graph is processed by maven we end up with a dependency tree which is close to the example given in the maven documentation.

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- com.example:dependency2:jar:1.0.0:compile
\- com.example:test_dependency:jar:1.0.0:test
   \- com.example:shared_dependency1:jar:1.0.0:compile
      \- com.example:shared_dependency2:jar:1.0.0:compile
```

Each artifact exists once and the **shared_dependency1** artifact is now seen only under the **test_dependency** artifact.

Only this isn't the full picture.

What is actually taking place under the covers is that each set of conflicts within the graph is being evaluated in order to decide which one is chosen (the winning artifact), with all losing artifacts then being updated and turned into a marker artifact without child dependencies. We can see a visualisation of this by enabling the _verbose_ flag on the _dependency:tree_ goal (use version 3.4.0), which displays the underlying dependency tree and not the clean version.

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- com.example:dependency2:jar:1.0.0:compile
|     \- (com.example:shared_dependency1:jar:1.0.0:compile - omitted for duplicate)
\- com.example:test_dependency:jar:1.0.0:test
   \- com.example:shared_dependency1:jar:1.0.0:compile (scope not updated to compile)
      \- com.example:shared_dependency2:jar:1.0.0:compile
```

We can now see that the **shared_dependency1** artifact exists multiple times and that the dependency under **dependency2** lost the conflict resolution to the dependency under **test_dependency**.

How do we end up with missing dependencies? This happens when we filter the graph using scopes, which in my case includes _compile_, _provided_ and _system_. Let's take a look at what happens under those circumstances.

Maven's DependencyCollectorBuilder works by first generating the dependency tree, with conflicts resolved as above, then pruning the result to remove subtrees which are not accepted by the filter. In my case this means any artifacts which do not have the right scope, along with their dependent children, will be removed. The tree returned to the CycloneDX plugin will be as follows

```
com.example:trustification:jar:1.0.0
\- com.example:dependency1:jar:1.0.0:compile
   \- com.example:dependency2:jar:1.0.0:compile
      \- (com.example:shared_dependency1:jar:1.0.0:compile - omitted for duplicate)
```

The CycloneDX plugin will process this tree and create the following dependency graph within the _bom_ file

```
<dependencies>
  <dependency ref="pkg:maven/com.example/trustification@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/shared_dependency1@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/shared_dependency1@1.0.0?type=jar"/>
</dependencies>
```

This is notable for two reasons

1. The bom contains the _shared_dependency1_ artifact even though this entry came from the marker entry (we can make use of this)
2. We have lost the _shared_dependency2_ artifact since it is only present under the pruned _test_ scoped subtree.

In order to see a representation of the graph I would like in the _bom_ we simply need to comment out the _test_ dependency in the top level _pom.xml_, which would result in the following dependency tree

```
com.example:trustification:jar:1.0.0
\- com.example:dependency1:jar:1.0.0:compile
   \- com.example:dependency2:jar:1.0.0:compile
      \- com.example:shared_dependency1:jar:1.0.0:compile
         \- com.example:shared_dependency2:jar:1.0.0:compile
```

and the following dependency graph in the _bom_

```
<dependencies>
  <dependency ref="pkg:maven/com.example/trustification@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/shared_dependency1@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/shared_dependency1@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/shared_dependency2@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/shared_dependency2@1.0.0?type=jar"/>
</dependencies>
```

How can we fix this while including the test artifact as a dependency? We can rely on the following information

- the marker artifact has been included in the filtered result tree, however it is without children
- the full dependency tree contains a _winner_ artifact which contains any dependent children

We can then follow this process

- retrieve the full dependency tree
- collect all children from top level _test_ scoped dependencies
- search the original tree looking for potential marker artifacts, i.e. those without children, then
  - check the set of hidden artifacts to see if the potential marker artifact is also hidden
  - if the hidden artifact does exist then transplant its dependencies to the marker artifact

The above will allow us to reconstruct the missing parts of the SBOM dependency graph and create my desired _bom_ content.

---

**Note:** The same issue will occur with _runtime_ scoped artifacts within the graph, these can also conceal _compile_ scoped artifacts if closer to the root. The difference between _test_ scoped artifacts and those with _runtime_ scope is that the _runtime_ scoped artifacts can exist anywhere in the dependency tree whereas the _test_ artifacts will only be found at the top level. The _runtime_ artifacts can be handled by following a similar process to the one above, extended to the full dependency tree.

---

# Part Three - Should Consistency Matter?

In going through the _bom_ file we can see that the information is split into two major types, **Components** and **Dependencies**. My expectation was that this information would be consistent, with these elements being related as follows

- each **Dependency** being associated with a **Component**
- each nested **Dependency** referencing an existing top level **Dependency** element
- each **Component** being associated with a top level **Dependency**

One of the verification tests I ran on the _bom_ files was to test these expectations, and while I did not discover any issues with the **Dependencies** I did discover numerous examples of **Components** existing without any associated dependency information.

We can revisit the example from earlier to explain why this happens. The CycloneDX code decides which components to include based on the set of resolved artifacts derived from the full dependency tree, and it does this separately from determining the filtered dependency graph. The only connection between the two is that, when generating the dependency graph, the existing process will check whether the dependency has an associated _Component_ before adding it to the graph. If the _Component_ has not been created then the dependency will be ignored.

As a reminder, here's the example we covered earlier as seen by CycloneDX when processing the dependency graph.

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- com.example:dependency2:jar:1.0.0:compile
|     \- (com.example:shared_dependency1:jar:1.0.0:compile - omitted for duplicate)
\- com.example:test_dependency:jar:1.0.0:test
   \- com.example:shared_dependency1:jar:1.0.0:compile (scope not updated to compile)
      \- com.example:shared_dependency2:jar:1.0.0:compile
```

And the following represents the set of resolved artifacts used to determine which _Components_ and _Dependencies_ are included in the SBOM dependency graph, assuming we are generating the _bom_ based on the _compile_ scope.

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- com.example:dependency2:jar:1.0.0:compile
\- <test artifact ignored>
   \- com.example:shared_dependency1:jar:1.0.0:compile (scope not updated to compile)
      \- com.example:shared_dependency2:jar:1.0.0:compile
```

There are two issues with this that I can see

- this will generate _Components_ for all _compile_ scope artifacts in the tree, including **shared_dependency2** from the test subtree
- this ignores the cumulative scopes used by maven when filtering the artifacts to create the dependency tree, relying instead on an explicit test of equality

All of the instances I have discovered so far have been related to the missing dependency issue from [Part Two](#part-two---the-case-of-the-missing-dependency), and are addressed by ensuring concealed artifacts are included in the SBOM dependency graph, however I am not yet convinced this is the only circumstance under which this would occur with the current codebase.

---

**Note:** The Maven cumulative scopes are as follows

- compile -> system, provided and compile
- runtime -> compile and runtime
- test -> system, provided, compile, runtime and test

---

Another related issue, coupled with the processing of excluded types, is the possibility of creating split dependency graphs within the same SBOM.

Consider the following dependency tree

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- com.example:dependency2:jar:1.0.0:compile
\- com.example:type_dependency:test-jar:tests:1.0.0:compile
   \- com.example:shared_type_dependency1:jar:1.0.0:compile
      \- com.example:shared_type_dependency2:jar:1.0.0:compile
```

If we create the SBOM for the above tree, and choose to exclude artifacts of type _test-jar_ from the graph, the current approach will result in two dependency graphs being generated. The first would be rooted at **com.example:trustification** and the second would be rooted at **com.example:shared_type_dependency1**. This is another consequence of the _Component_ creation process, since only the specific **com.example:type_dependency:test-jar** artifact will be removed from the graph and not its dependencies. This results in the following dependency section within the _bom_.

```
<dependencies>
  <!-- the first dependency graph is rooted here -->
  <dependency ref="pkg:maven/com.example/trustification@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar"/>

  <!-- the second dependency graph is rooted here -->
  <dependency ref="pkg:maven/com.example/shared_type_dependency1@1.0.0?type=jar">
    <dependency ref="pkg:maven/com.example/shared_type_dependency2@1.0.0?type=jar"/>
  </dependency>
  <dependency ref="pkg:maven/com.example/shared_type_dependency2@1.0.0?type=jar"/>
</dependencies>
```

If we move the processing of the excluded types to the creation of the SBOM dependency graph we could address this issue and create only a single dependency graph for the root artifact, however without also addressing how we determine which _Components_ are included in the _bom_ we would be creating another source for inconsistencies and those now excluded artifacts would still exist in the _Components_ section.

I believe a better approach would be to start with the assumption that all artifacts are included as _Components_, generate the dependency graph with type exclusion, and then prune all unreferenced components from the generated _bom_. Please remember this for now, it will come up again in the next part.

# Part Four - The Return of the Missing Dependency

In [Part Two](#part-two---the-case-of-the-missing-dependency) we discussed what happened when the dependency resolution led to parts of the dependency tree being concealed by artifacts with _test_ or _runtime_ scopes, however one edge case we did not cover is when the dependency is itself the _test_ scoped artifact. In the current CycloneDX implementation this will cause the _test_ artifact, and its children, to be ignored because of the mechanism used to determine which _Components_ are included in the _bom_. Recall from [Part Three](#part-three---should-consistency-matter) that dependencies will not be included in the dependency graph unless they already have an associated _Component_.

We can show this in action by looking at a modified version of the earlier example, depicted by _dependency:tree_ as follows

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- (com.example:test_dependency:jar:1.0.0:compile - omitted for duplicate)
\- com.example:test_dependency:jar:1.0.0:test (scope not updated to compile)
   \- com.example:shared_dependency1:jar:1.0.0:test
      \- com.example:shared_dependency2:jar:1.0.0:test
```

One fact we should be aware of is that the only real _test_ scoped artifacts in the tree will be at the top level, Maven will ignore lower level _test_ scoped artifacts when determining the transitive graph. In this case **test_dependency** is the only true _test_ scoped artifact, and as neither **shared_dependency1** not **shared_dependency2** are referenced from a _compile_ scope they only have a scope of _test_ by inheriting it from the parent. Compare this with the example we used previously, when **shared_dependency1** was referenced from a _compile_ scope.

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- com.example:dependency2:jar:1.0.0:compile
|     \- (com.example:shared_dependency1:jar:1.0.0:compile - omitted for duplicate)
\- com.example:test_dependency:jar:1.0.0:test
   \- com.example:shared_dependency1:jar:1.0.0:compile (scope not updated to compile)
      \- com.example:shared_dependency2:jar:1.0.0:compile
```

What I would like to see is the SBOM dependency graph represented as follows

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0
   \- com.example:test_dependency:jar:1.0.0
      \- com.example:shared_dependency1:jar:1.0.0
         \- com.example:shared_dependency2:jar:1.0.0
```

This can be fixed by following a similar process to that discussed in [Part Two](#part-two---the-case-of-the-missing-dependency), however it will also require us to move away from the current mechanism of identifying _Components_ and relying on those references to restrict which _Artifacts_ can be included in the dependency graph. Instead of the existing mechanism we would start from the assumption that all Artifacts will be included, determine the actual dependency graph, and then use this to prune the set of _Components_ down to the required set.

Once this switch is made we can finally include those remaining missing dependencies in the graph and address the issues from [Part Three](#part-three---should-consistency-matter), we certainly have a number of reasons for doing so.

There are a few implementation details we do need to be aware of when switching approaches

- we need to consider excluded types, as moving their processing to the creation of the dependency graph will allow us to correctly handle their subtrees, however they can now also conceal parts of the dependency graph
- we need to ensure we do not inadvertently pull in _runtime_ scoped artifacts when reconstructing the graph from concealed dependencies

# Conclusions

This has been an interesting journey, and through it I've learned a lot about CycloneDX and more than I had likely wanted to know about the implementation of Maven. I have addressed all of the issues I believe to be present with the current approach, with the exception of one. While it is true that we can reconstruct the dependency tree to include concealed artifacts, the information provided directly by maven is insufficient to resolve all cases. The edge case identified in [Part Four](#part-four---the-return-of-the-missing-dependency) covers the inclusion of _compile_ scoped artifacts which are referenced through a top level _test_ artifact, however there is also the case of _runtime_ artifacts being included which, unfortunately, also have their scopes modified to a _test_ scope.

By way of example, if we were to change the scope of the **shared_dependency1** dependency within the **test_dependency** pom.xml to a scope of **runtime** we would still see the following returned by maven

```
com.example:trustification:jar:1.0.0
+- com.example:dependency1:jar:1.0.0:compile
|  \- (com.example:test_dependency:jar:1.0.0:compile - omitted for duplicate)
\- com.example:test_dependency:jar:1.0.0:test (scope not updated to compile)
   \- com.example:shared_dependency1:jar:1.0.0:test
      \- com.example:shared_dependency2:jar:1.0.0:test
```

As things currently stand we now have a _bom_ file which is no longer missing dependencies, although it may include the occasional _runtime_ scoped artifact when it really shouldn't. In order to fix this edge case we will need to go deeper into the maven level and look at the underlying graph generated by [Eclipse Aether](https://wiki.eclipse.org/Aether "Eclipse Aether website") as this contains more useful information.

```
Node: com.example:trustification:1.0.0    {}
  Node: com.example:dependency1:1.0.0    {conflict.originalScope=compile, conflict.originalOptionality=false}
    Node: com.example:test_dependency:1.0.0    {conflict.winner=com.example:test_dependency:jar:1.0.0 (test), conflict.originalScope=compile, conflict.originalOptionality=false}
  Node: com.example:test_dependency:1.0.0    {REDUCED_SCOPE=compile, conflict.originalScope=test, conflict.originalOptionality=false}
    Node: com.example:shared_dependency1:1.0.0    {conflict.originalScope=runtime, conflict.originalOptionality=false}
      Node: com.example:shared_dependency2:1.0.0    {conflict.originalScope=compile, conflict.originalOptionality=false}
```

The above information contains the original scope of the dependencies, the optionality and also a reference to the winning dependency in the case of conflict.

Switching over to using this tree would likely be intrusive, and not something I would like to do without building up the existing test cases within the project. This is definitely a task for another day 😁
