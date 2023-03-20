---
title: "The CycloneDX Maven Aggregate SBOM and why you shouldn't trust it (yet)"
date: 2023-03-20
author: Kevin Conner
---

Over the last few months I've spent a lot of time with the [CycloneDX Maven Plugin](https://github.com/CycloneDX/cyclonedx-maven-plugin "The CycloneDX Maven Plugin GitHub repository"), trying to prove it is suitable for us to use as part of securing the Software Supply Chain.  I've discovered and fixed a number of issues, related to the generation of an SBOM for each project using the `makeBom` goal, and have now turned my focus to aggregates and the `makeAggregateBom` goal.

I'll start this post with a description of what I believe an aggregate SBOM should contain.  This may be different to what you are looking for, if so I would like to hear about your expectations and tailor my fix to address your needs.  In any case I believe the issues I am about to describe will likely impact yourselves and create enough doubt in the accuracy of the aggregate SBOM for you to decide not to trust it.

# What do I expect from an Aggregate SBOM?

Generating an SBOM for an individual project is fairly straight forward, you run the `makeBom` goal and create an SBOM representing the `build time` dependency graph for your component.  You can choose to filter certain artifacts and/or scopes from the SBOM, however the dependency resolution will still be impacted by all the dependencies within the project.

When generating SBOMs for a multi-module project you have two choices
- generate an SBOM for each individual project
- generate an aggregate SBOM which represents all projects within your multi-module project

My expectation is the aggregate SBOM would be an aggregate of all the individual SBOMs, in other words each component present in the individual SBOMs should be present in the aggregate SBOM and each dependency tree represented in the individual SBOMs should also be present in the aggregate SBOM.

# What do we get from the current aggregate SBOM?

Before we describe what happens it is important to understand the CyloneDX specification requires a component to specify a `bom-ref` attribute if the component is to be referenced elsewhere in the SBOM, with the `bom-ref` being unique across the set of components.  The CycloneDX maven plugin will always generate a `bom-ref` for each component, currently the same as the component purl, and will use this reference when creating the dependency hierarchy.

Now to the details.

When generating an aggregate SBOM the plugin will iterate over all the projects within the multi-module build (the reactor), generate an SBOM for each project and combining this with the previous SBOMs.  It will continue until each project within the reactor has been processed, resulting in an aggregate SBOM.  On the surface this appears to be the right thing to do, all components and all dependencies should be included in the SBOM and this is what we want ..... only the details are more subtle.

What actually happens when we combine the components and dependencies from a project is the plugin will iterate over each component, adding it to the set of known components if it has not previously encountered its `bom-ref`, and in the case of dependencies it will add all project dependencies to the set of known dependencies within the aggregate.  Now I know what you are thinking!  This still appears to be correct, so where is it going wrong?  To understand that we need to look at the `Dependency` class.

The `Dependency` class defines equality only on the content of its ref attribute, so when adding dependencies to a `Set` the following are considered to be the same.

```
<dependency ref="pkg:maven/com.example.dependency_trees/dependency_B@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.dependency_trees/dependency_C@1.0.0?type=jar"/>
</dependency>
```

and

```
<dependency ref="pkg:maven/com.example.dependency_trees/dependency_B@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.dependency_trees/dependency_C@2.0.0?type=jar"/>
</dependency>
```

What this means is the first dependency added to the set of all dependencies will be the winner, will be part of the generated SBOM, and all subsequent dependency hierarchies will be lost.  But wait, shouldn't a component always have the same dependencies on other components?  This is certainly the assumption made in the plugin, unfortunately it is not a valid assumption for many reasons and for this we need to look more at how maven handles dependency resolution.  Scenarios where this assumption is invalid include

- the component is included in a project with a different set of dependencies
- the component is included in a project which specifies dependencies in a different order
- the component includes dependencies on artifacts with `test` or `provided` scope, or includes dependencies on artifacts marked as `optional`
- there is a dependency management section overriding the version of an artifact
- there is a dependency management section excluding dependencies from an artifact

There are likely more scenarios, however the above are reasonably common and sufficient to demonstrate the problem.  In the next sections we will go through examples for each of the top three, ignoring version management, so we can demonstrate how easy it is to fall into this trap and explore the impact on the generated aggregate SBOM.

# Differing Sets of Dependencies

In this scenario we will take a look at a multi-module project where an external project is consumed within the context of differing sets of dependencies.  Project `dependency_A` will consume the artifact we are interested in, `dependency_C`, alongside a second dependency, `dependency_E`, which will cause a version conflict which needs to be resolved by the maven conflict resolution mechanism.  Project `dependency_B` will simply consume `dependency_C` as is, without there being any conflict needing to be resolved.

Let us now take a look at the dependency hierarchy for both projects, as visualized through the dependency:tree plugin.  For `dependency_A` we see
```
com.example.example1:dependency_A:jar:1.0.0
+- com.example.external:dependency_C:jar:1.0.0:compile
|  \- com.example.external:dependency_D:jar:1.0.0:compile
|     \- (com.example.external:dependency_E:jar:1.0.0:compile - omitted for conflict with 2.0.0)
\- com.example.external:dependency_E:jar:2.0.0:compile (scope not updated to compile)
   \- com.example.external:dependency_F:jar:2.0.0:compile
```
and for `dependency_B` we see
```
com.example.example1:dependency_B:jar:1.0.0
\- com.example.external:dependency_C:jar:1.0.0:compile
   \- com.example.external:dependency_D:jar:1.0.0:compile
      \- com.example.external:dependency_E:jar:1.0.0:compile
         \- com.example.external:dependency_F:jar:1.0.0:compile
```

In the first project we see the maven dependency resolution mechanism has aligned the version of `dependency_E` referenced in the tree to version `2.0.0`, this was chosen because this dependency is closer to the root of the tree.

Let's now take a look at what we see in the aggregate SBOM.

```
<dependency ref="pkg:maven/com.example.example1/dependency_A@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_C@1.0.0?type=jar"/>
  <dependency ref="pkg:maven/com.example.external/dependency_E@2.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_C@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_D@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_D@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_E@2.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_E@2.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_F@2.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_F@2.0.0?type=jar"/>
<dependency ref="pkg:maven/com.example.example1/dependency_B@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_C@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_E@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_F@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_F@1.0.0?type=jar"/>
```

From the above we see there is a flow matching `A1->C1->D1->E2->F2` and `A1->E2->F2`, so the aggregated SBOM correctly represents the dependency hierarchy for `dependency_A`.

If we now look at how the dependency tree for `dependency_B` is represented we see a problem.  The representation for `dependency_B` is a flow from `B1->C1->D1->E2-F2` which does not match the dependency hierarchy for `dependency_B`; it should be `B1->C1->D1->E1->F1`!  Where has the flow `E1->F1` gone?  Unfortunately this flow is now orphaned with `E1` being its own root in the SBOM!

# Differing Order of Dependencies

In this scenario we will take a look at a multi-module project where we have two projects consuming the same sets of dependencies, but specifying those dependencies in opposite order within their respective `pom.xml` files.  The first will declare a dependency on `dependency_C` followed by `deependency_D` whereas the second will declare a dependency on `dependency_D` followed by `dependency_C`.  Both `dependency_C` and `dependency_D` will consume `dependency_E` but with different versions, causing a conflict which needs to be resolved.

Let us now take a look at the dependency hierarchy for both projects, as visualized through the dependency:tree plugin.  For `dependency_A` we see
```
com.example.example2:dependency_A:jar:1.0.0
+- com.example.external:dependency_C:jar:1.0.0:compile
|  \- com.example.external:dependency_E:jar:1.0.0:compile
|     \- com.example.external:dependency_F:jar:1.0.0:compile
\- com.example.external:dependency_D:jar:1.0.0:compile
   \- (com.example.external:dependency_E:jar:2.0.0:compile - omitted for conflict with 1.0.0)
```
and for `dependency_B` we see
```
com.example.example2:dependency_B:jar:1.0.0
+- com.example.external:dependency_D:jar:1.0.0:compile
|  \- com.example.external:dependency_E:jar:2.0.0:compile
|     \- com.example.external:dependency_F:jar:2.0.0:compile
\- com.example.external:dependency_C:jar:1.0.0:compile
   \- (com.example.external:dependency_E:jar:1.0.0:compile - omitted for conflict with 2.0.0)
```

In the first project we see the maven dependency resolution mechanism has aligned `dependency_E` with version `1.0.0` while in the second project the resolution mechanism has aligned `dependency_E` with version `2.0.0`.  Since both versions of `dependency_E` appear at the same depth it is the one which is first included in the dependency tree which will win.

Let's now take a look at what we see in the aggregate SBOM.

```
<dependency ref="pkg:maven/com.example.example2/dependency_A@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_C@1.0.0?type=jar"/>
  <dependency ref="pkg:maven/com.example.external/dependency_D@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_C@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_E@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_E@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_F@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_F@1.0.0?type=jar"/>
<dependency ref="pkg:maven/com.example.external/dependency_D@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_E@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.example2/dependency_B@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_D@1.0.0?type=jar"/>
  <dependency ref="pkg:maven/com.example.external/dependency_C@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_E@2.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_F@2.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_F@2.0.0?type=jar"/>
```

From the above we see there is a flow matching `A1->C1->E1->F1` and `A1->D1->E1->F1`, so the aggregated SBOM correctly represents the dependency hierarchy for `dependency_A`.

If we now look at how the dependency tree for `dependency_B` is represented we can again see a problem.  The representation for `dependency_B` has flows from `B1->D1->E1-F1` and `B1->C1->E1->F1` which do not match the dependency hierarchy for `dependency_B` since it does not include `E1->F1` in its hierarchy!  Where has the flow `E2->F2` gone?  Unfortunately this flow is now orphaned with `E2` being its own root in the SBOM!

# Non Transitive Dependencies

In this scenario we will take a look at how non-Transitive dependencies can impact the normal resolution process, and therefore the derived dependency trees.  The non-Transitive dependencies could be those dependencies with scopes of either `provided` or `test`, or could be dependencies which are marked as being `optional`.

Project `dependency_A` will declare a dependency on `dependency_C` alongside an optional dependency on `dependency_E`, which causes a conflict which needs to be resolved.  Project `dependency_B` will have a single dependency on `dependency_A`, consuming it as is.

Let us now take a look at the dependency hierarchy for both projects, as visualized through the dependency:tree plugin.  For `dependency_A` we see
```
com.example.example3:dependency_A:jar:1.0.0
+- com.example.external:dependency_C:jar:1.0.0:compile
|  \- com.example.external:dependency_D:jar:1.0.0:compile
|     \- (com.example.external:dependency_E:jar:1.0.0:compile - omitted for conflict with 2.0.0)
\- com.example.external:dependency_E:jar:2.0.0:compile (scope not updated to compile)
   \- com.example.external:dependency_F:jar:2.0.0:compile
```
and for `dependency_B` we see
```
com.example.example3:dependency_B:jar:1.0.0
\- com.example.example3:dependency_A:jar:1.0.0:compile
   \- com.example.external:dependency_C:jar:1.0.0:compile
      \- com.example.external:dependency_D:jar:1.0.0:compile
         \- com.example.external:dependency_E:jar:1.0.0:compile
            \- com.example.external:dependency_F:jar:1.0.0:compile
```

In the first project we see the maven dependency resolution mechanism has aligned `dependency_E` with version `2.0.0` through the transitive dependency inherited via the `optional` dependency.  In the second project the maven dependency resolution mechanism has ignored the optional dependency leaving the original dependency on `dependency_E:1.0.0`.

---

**Note:** While this example is making use of an optional dependency, the same tree would be generated if this dependency was of scope `test` or `provided`.

---

Let's now take a look at what we see in the aggregate SBOM.

```
<dependency ref="pkg:maven/com.example.example3/dependency_A@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_C@1.0.0?type=jar"/>
  <dependency ref="pkg:maven/com.example.external/dependency_E@2.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_C@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_D@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_D@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_E@2.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_E@2.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_F@2.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_F@2.0.0?type=jar"/>
<dependency ref="pkg:maven/com.example.example3/dependency_B@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.example3/dependency_A@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_E@1.0.0?type=jar">
  <dependency ref="pkg:maven/com.example.external/dependency_F@1.0.0?type=jar"/>
</dependency>
<dependency ref="pkg:maven/com.example.external/dependency_F@1.0.0?type=jar"/>
```

From the above we see there is a flow matching `A1->C1->D1->E2->F2` and `A1->E2->F2`, so the aggregated SBOM correctly represents the dependency hierarchy for `dependency_A`.

If we now look at how the dependency tree for `dependency_B` is represented we see a problem.  The representation for `dependency_B` includes flows from `B1->A1->C1->D1->E2->F2` and `B1->A1->E2->F2`, neither of which match the dependency hierarchy for B; the hierarchy for `dependency_B` should be a flow of `B1->A1->C1->D1->E1->F1`!  Not only has the flow `E1->F1` been orphaned from the `dependency_B` dependency tree, and now its own root, but the SBOM claims `dependency_B` has multiple dependency flows when it should only be a single flow.

## Summarising the issue

We see from the above scenarios it is reasonably easy to end up with a multi-module project which results in an invalid expression of the project dependency trees within the aggregated SBOM, and we have still to look at exclusions and version management through the maven `dependencyManagement` declarations.  To make matters worse we have no easy way of identifying whether the aggregated SBOM contains an invalid dependency graph.  While it is possible the aggregated SBOM could contain orphaned dependency trees it is also possible those dependency trees would be consumed by other components within the SBOM.

Given the aggregate SBOM is no longer reliable the only safe approach is to rely on the individual SBOMs for each project, at least for now.

## How can we solve this?

There is a solution for this, however the solution comes with implications which *may* break some tools which work with SBOMs.  These tools will already be making invalid assumptions, and we will have to work with their authors to identify and fix any occurrences we find.

What is really lacking in the CycloneDX specification is a way in which we can easily describe alternative dependency hierarchies for a component, since as we have shown this is something which happens within the java space and likely other areas.

The CyloneDX specification defines the component dependency hierarchies by referring to the `components` themselves, through their references, however this reference also defines the unique hierarchy within the `dependencies` section.  For example

```
<dependency ref="pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?type=jar">
  <dependency ref="pkg:maven/org.owasp.encoder/encoder@1.2?type=jar"/>
  <dependency ref="pkg:maven/com.thoughtworks.xstream/xstream@1.4.7?type=jar"/>
  <dependency ref="pkg:maven/org.apache.commons/commons-exec@1.3?type=jar"/>
</dependency>
```

The `ref` attribute `pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?type=jar` represents not only the specific component, tied through the component `bom-ref` attribute, but also a unique dependency hierarchy within the `dependencies` section.  Given this how can we also represent the following hierarchy within the same aggregate SBOM?

```
<dependency ref="pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?type=jar">
  <dependency ref="pkg:maven/org.owasp.webgoat/webgoat-container@v8.0.0.M15?type=jar"/>
  <dependency ref="pkg:maven/org.owasp.encoder/encoder@1.2?type=jar"/>
  <dependency ref="pkg:maven/com.thoughtworks.xstream/xstream@1.4.7?type=jar"/>
  <dependency ref="pkg:maven/org.projectlombok/lombok@1.16.20?type=jar"/>
  <dependency ref="pkg:maven/org.apache.commons/commons-exec@1.3?type=jar"/>
</dependency>
```

In order to achieve this we need to have some way of enriching the `ref` attribute value so it represents not only the specific component but also the direct dependencies in its particular location within the dependency graph, for example including a hash which would be derived from each set of dependencies.  This hash would need to be calculated from the leaves back to the root, with every deviation in the dependency tree propagating its way up to the root.

We could then have a representation similar to the following
```
<dependency
    ref="pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?hash=<hash1>&amp;type=jar">
  <dependency ref="pkg:maven/org.owasp.encoder/encoder@1.2?type=jar"/>
  <dependency ref="pkg:maven/com.thoughtworks.xstream/xstream@1.4.7?type=jar"/>
  <dependency ref="pkg:maven/org.apache.commons/commons-exec@1.3?type=jar"/>
</dependency>

<dependency
    ref="pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?hash=<hash2>&amp;type=jar">
  <dependency ref="pkg:maven/org.owasp.webgoat/webgoat-container@v8.0.0.M15?type=jar"/>
  <dependency ref="pkg:maven/org.owasp.encoder/encoder@1.2?type=jar"/>
  <dependency ref="pkg:maven/com.thoughtworks.xstream/xstream@1.4.7?type=jar"/>
  <dependency ref="pkg:maven/org.projectlombok/lombok@1.16.20?type=jar"/>
  <dependency ref="pkg:maven/org.apache.commons/commons-exec@1.3?type=jar"/>
</dependency>
```

---

**Note:** The child dependencies in the example above should also have a hash, however these have been omitted for brevity.

---

The above would allow us to represent different hierarchies, but now we have another problem.  Each reference used in the `dependencies` section *must* refer to an existing `component` within the `components` section and, therefore, we now need the `component` to be defined for each reference in use, e.g.

```
<component type="library"
    bom-ref="pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?hash=<hash1>&amp;type=jar">
  <publisher>OWASP</publisher>
  <group>org.owasp.webgoat.lesson</group>
  <name>auth-bypass</name>
  <version>v8.0.0.M15</version>
  <description>Parent Pom for the WebGoat Project. A deliberately insecure Web Application</description>
  <purl>pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?type=jar</purl>
  ...
</component>

<component type="library"
    bom-ref="pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?hash=<hash2>&amp;type=jar">
  <publisher>OWASP</publisher>
  <group>org.owasp.webgoat.lesson</group>
  <name>auth-bypass</name>
  <version>v8.0.0.M15</version>
  <description>Parent Pom for the WebGoat Project. A deliberately insecure Web Application</description>
  <purl>pkg:maven/org.owasp.webgoat.lesson/auth-bypass@v8.0.0.M15?type=jar</purl>
  ...
</component>
```

It is this change which, while not invalid according to the specification schema, will likely cause problems for tools which have made the assumption the component can only exist once.

# Conclusions

There is a [CycloneDX maven plugin PR](https://github.com/CycloneDX/cyclonedx-maven-plugin/pull/306) open to modify the plugin's behaviour and generate an aggregate SBOM using the above hashing scheme, representing all the dependency hierarchies within a multi-module project.  There is also an associated [CycloneDX maven plugin issue](https://github.com/CycloneDX/cyclonedx-maven-plugin/issues/310) where the reasons for this change are still being discussed, as well as a number of discussions on how the specification can evolve to address this issue in a cleaner way.

I am hopeful we can come up with a suitable resolution to these discussions and deliver a solution to the issue, however until this is achieved the `dependencies` section of the aggregate SBOMs generated by the CycloneDX maven plugin is unreliable and should not be trusted.  The only reliable source of dependency hierarchy information is to be found within the individual SBOMs of each project.