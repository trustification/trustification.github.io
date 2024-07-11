"use strict";(self.webpackChunktrustification_io=self.webpackChunktrustification_io||[]).push([[2559],{7415:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>a});var i=t(4848),s=t(8453);const r={title:"An Adventure with the CycloneDX Maven Plugin",authors:"kevinconner",tags:["cyclonedx"]},c="Part One - In the Beginning",o={permalink:"/blog/2022/12/09/cyclonedx-maven-plugin-adventure",editUrl:"https://github.com/trustification/trustification.github.io/tree/main/blog/2022-12-09-cyclonedx-maven-plugin-adventure.md",source:"@site/blog/2022-12-09-cyclonedx-maven-plugin-adventure.md",title:"An Adventure with the CycloneDX Maven Plugin",description:"The CycloneDX Maven Plugin can be used to generate CycloneDX Software Bill of Materials (SBOM) for your maven projects as part of your build process. The plugin is easy to integrate, however does have some issues due mostly to idiosyncrasies and shortcomings with the maven resolution mechanism. In this post I attempt to provide some background, examples and explanations for the issues I've discovered as well as context for the solutions I'm proposing.",date:"2022-12-09T00:00:00.000Z",tags:[{inline:!0,label:"cyclonedx",permalink:"/blog/tags/cyclonedx"}],readingTime:14.28,hasTruncateMarker:!0,authors:[{name:"Kevin Conner",title:"Maintainer",url:"https://github.com/knrc",imageURL:"https://github.com/knrc.png",key:"kevinconner"}],frontMatter:{title:"An Adventure with the CycloneDX Maven Plugin",authors:"kevinconner",tags:["cyclonedx"]},unlisted:!1,prevItem:{title:"Sigstore, in-toto, OPA, orientation",permalink:"/blog/2023/01/11/sigstore-in-toto-opa"},nextItem:{title:"How to Configure a Gitsign Cache",permalink:"/blog/2022/12/05/gitsign-cache"}},d={authorsImageUrls:[void 0]},a=[];function l(e){const n={a:"a",code:"code",em:"em",h1:"h1",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"The CycloneDX Maven Plugin can be used to generate CycloneDX Software Bill of Materials (SBOM) for your maven projects as part of your build process. The plugin is easy to integrate, however does have some issues due mostly to idiosyncrasies and shortcomings with the maven resolution mechanism. In this post I attempt to provide some background, examples and explanations for the issues I've discovered as well as context for the solutions I'm proposing."}),"\n",(0,i.jsxs)(n.p,{children:["Three weeks ago I started an adventure with the ",(0,i.jsx)(n.a,{href:"https://github.com/CycloneDX/cyclonedx-maven-plugin",title:"The CycloneDX Maven Plugin GitHub repository",children:"CycloneDX Maven Plugin"}),", investigating how we could make use of this plugin to generate Software Bill of Materials (SBOMs) for the ",(0,i.jsx)(n.a,{href:"https://github.com/quarkusio/quarkus",title:"The Quarkus GitHub repository",children:"Quarkus"})," project. At first this goal appeared easy to achieve, simply enable the plugin for all projects within the ",(0,i.jsx)(n.strong,{children:"Quarkus"})," build (hello parent pom.xml) and verify the generated ",(0,i.jsx)(n.em,{children:"bom"})," contents were accurate."]}),"\n",(0,i.jsxs)(n.p,{children:["As I had expected, enabling the plugin was very straight forward. I created a profile in the top level ",(0,i.jsx)(n.em,{children:"pom.xml"})," to capture the information required at compile time, incorporating all artifacts using ",(0,i.jsx)(n.em,{children:"compile"}),", ",(0,i.jsx)(n.em,{children:"provided"})," and ",(0,i.jsx)(n.em,{children:"system"})," maven scopes. I chose not to include any ",(0,i.jsx)(n.em,{children:"test"})," or ",(0,i.jsx)(n.em,{children:"runtime"})," artifacts."]}),"\n",(0,i.jsxs)(n.p,{children:["Once the BOM files were created I looked for a way to verify the output was reasonable. I turned to the ",(0,i.jsx)(n.a,{href:"https://github.com/apache/maven-dependency-plugin",title:"The Maven Dependency Plugin GitHub repository",children:"maven dependency plugin"})," and its ",(0,i.jsx)(n.em,{children:"tree"})," goal, along with a fairly straight forward script to compare the information in the generated dependency tree with that in the ",(0,i.jsx)(n.em,{children:"bom"})," file and highlight any discrepancies. This is where the fun began \ud83d\ude01"]}),"\n",(0,i.jsxs)(n.p,{children:["The remainder of those three weeks involved many hours with a debugger, walking through the internals of maven as well as the CycloneDX plugin, identifying the causes of these discrepancies and working through fixes to generate the output I believed should have been included in the ",(0,i.jsx)(n.em,{children:"bom"})," files."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," At this time these changes have neither been discussed nor reviewed by the CycloneDX community, I've reached out to them via slack and am hoping we can find time to go through this in detail over the next few weeks or so. In the meantime treat this article as my opinions of what I believe should be done."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h1,{id:"part-two---the-case-of-the-missing-dependency",children:"Part Two - The Case of the Missing Dependency"}),"\n",(0,i.jsx)(n.p,{children:"Before we talk about missing dependencies we first need to take a quick refresher for how maven resolves artifacts within a project."}),"\n",(0,i.jsxs)(n.p,{children:["One of the benefits of maven is its ability to automatically derive the dependency tree for your project using the information in your ",(0,i.jsx)(n.em,{children:"pom.xml"})," combined with the information in the ",(0,i.jsx)(n.em,{children:"pom.xml"})," for each of your transitive dependencies. Maven will take this information and create a dependency tree where each artifact exists once (not always the case, but we will come on to that), will favour artifacts which are closer to the root of the tree than those farther away, reconcile their versions based on the defined constraints and derive an appropriate scope."]}),"\n",(0,i.jsx)(n.p,{children:"The example used in the maven documentation is as follows"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"A\n  \u251c\u2500\u2500 B\n  \u2502   \u2514\u2500\u2500 C\n  \u2502       \u2514\u2500\u2500 D 2.0\n  \u2514\u2500\u2500 E\n      \u2514\u2500\u2500 D 1.0\n"})}),"\n",(0,i.jsxs)(n.p,{children:["As the shortest path to ",(0,i.jsx)(n.strong,{children:"D"})," is via E, the generated dependency tree will look like"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"A\n  \u251c\u2500\u2500 B\n  \u2502   \u2514\u2500\u2500 C\n  \u2514\u2500\u2500 E\n      \u2514\u2500\u2500 D 1.0\n"})}),"\n",(0,i.jsx)(n.p,{children:"With the above refresher out of the way let's move on to the issue of missing dependencies and consider the following example"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- com.example:dependency2:jar:1.0.0:compile\n|     \\- com.example:shared_dependency1:jar:1.0.0:compile\n|       \\- com.example:shared_dependency2:jar:1.0.0:compile\n\\- com.example:test_dependency:jar:1.0.0:test\n   \\- com.example:shared_dependency1:jar:1.0.0:compile\n      \\- com.example:shared_dependency2:jar:1.0.0:compile\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In this graph we can see that ",(0,i.jsxs)(n.strong,{children:["com.example",":dependency2"]})," and ",(0,i.jsxs)(n.strong,{children:["com.example",":test_dependency"]})," both depend on ",(0,i.jsxs)(n.strong,{children:["com.example",":shared_dependency1"]}),", with ",(0,i.jsx)(n.strong,{children:"dependency2"})," having a scope of ",(0,i.jsx)(n.em,{children:"compile"})," and ",(0,i.jsx)(n.strong,{children:"test_dependency"})," having a scope of ",(0,i.jsx)(n.em,{children:"test"}),". When this graph is processed by maven we end up with a dependency tree which is close to the example given in the maven documentation."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- com.example:dependency2:jar:1.0.0:compile\n\\- com.example:test_dependency:jar:1.0.0:test\n   \\- com.example:shared_dependency1:jar:1.0.0:compile\n      \\- com.example:shared_dependency2:jar:1.0.0:compile\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Each artifact exists once and the ",(0,i.jsx)(n.strong,{children:"shared_dependency1"})," artifact is now seen only under the ",(0,i.jsx)(n.strong,{children:"test_dependency"})," artifact."]}),"\n",(0,i.jsx)(n.p,{children:"Only this isn't the full picture."}),"\n",(0,i.jsxs)(n.p,{children:["What is actually taking place under the covers is that each set of conflicts within the graph is being evaluated in order to decide which one is chosen (the winning artifact), with all losing artifacts then being updated and turned into a marker artifact without child dependencies. We can see a visualisation of this by enabling the ",(0,i.jsx)(n.em,{children:"verbose"})," flag on the ",(0,i.jsx)(n.em,{children:"dependency:tree"})," goal (use version 3.4.0), which displays the underlying dependency tree and not the clean version."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- com.example:dependency2:jar:1.0.0:compile\n|     \\- (com.example:shared_dependency1:jar:1.0.0:compile - omitted for duplicate)\n\\- com.example:test_dependency:jar:1.0.0:test\n   \\- com.example:shared_dependency1:jar:1.0.0:compile (scope not updated to compile)\n      \\- com.example:shared_dependency2:jar:1.0.0:compile\n"})}),"\n",(0,i.jsxs)(n.p,{children:["We can now see that the ",(0,i.jsx)(n.strong,{children:"shared_dependency1"})," artifact exists multiple times and that the dependency under ",(0,i.jsx)(n.strong,{children:"dependency2"})," lost the conflict resolution to the dependency under ",(0,i.jsx)(n.strong,{children:"test_dependency"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["How do we end up with missing dependencies? This happens when we filter the graph using scopes, which in my case includes ",(0,i.jsx)(n.em,{children:"compile"}),", ",(0,i.jsx)(n.em,{children:"provided"})," and ",(0,i.jsx)(n.em,{children:"system"}),". Let's take a look at what happens under those circumstances."]}),"\n",(0,i.jsx)(n.p,{children:"Maven's DependencyCollectorBuilder works by first generating the dependency tree, with conflicts resolved as above, then pruning the result to remove subtrees which are not accepted by the filter. In my case this means any artifacts which do not have the right scope, along with their dependent children, will be removed. The tree returned to the CycloneDX plugin will be as follows"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n\\- com.example:dependency1:jar:1.0.0:compile\n   \\- com.example:dependency2:jar:1.0.0:compile\n      \\- (com.example:shared_dependency1:jar:1.0.0:compile - omitted for duplicate)\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The CycloneDX plugin will process this tree and create the following dependency graph within the ",(0,i.jsx)(n.em,{children:"bom"})," file"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'<dependencies>\n  <dependency ref="pkg:maven/com.example/trustification@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/shared_dependency1@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/shared_dependency1@1.0.0?type=jar"/>\n</dependencies>\n'})}),"\n",(0,i.jsx)(n.p,{children:"This is notable for two reasons"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["The bom contains the ",(0,i.jsx)(n.em,{children:"shared_dependency1"})," artifact even though this entry came from the marker entry (we can make use of this)"]}),"\n",(0,i.jsxs)(n.li,{children:["We have lost the ",(0,i.jsx)(n.em,{children:"shared_dependency2"})," artifact since it is only present under the pruned ",(0,i.jsx)(n.em,{children:"test"})," scoped subtree."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["In order to see a representation of the graph I would like in the ",(0,i.jsx)(n.em,{children:"bom"})," we simply need to comment out the ",(0,i.jsx)(n.em,{children:"test"})," dependency in the top level ",(0,i.jsx)(n.em,{children:"pom.xml"}),", which would result in the following dependency tree"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n\\- com.example:dependency1:jar:1.0.0:compile\n   \\- com.example:dependency2:jar:1.0.0:compile\n      \\- com.example:shared_dependency1:jar:1.0.0:compile\n         \\- com.example:shared_dependency2:jar:1.0.0:compile\n"})}),"\n",(0,i.jsxs)(n.p,{children:["and the following dependency graph in the ",(0,i.jsx)(n.em,{children:"bom"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'<dependencies>\n  <dependency ref="pkg:maven/com.example/trustification@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/shared_dependency1@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/shared_dependency1@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/shared_dependency2@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/shared_dependency2@1.0.0?type=jar"/>\n</dependencies>\n'})}),"\n",(0,i.jsx)(n.p,{children:"How can we fix this while including the test artifact as a dependency? We can rely on the following information"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"the marker artifact has been included in the filtered result tree, however it is without children"}),"\n",(0,i.jsxs)(n.li,{children:["the full dependency tree contains a ",(0,i.jsx)(n.em,{children:"winner"})," artifact which contains any dependent children"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"We can then follow this process"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"retrieve the full dependency tree"}),"\n",(0,i.jsxs)(n.li,{children:["collect all children from top level ",(0,i.jsx)(n.em,{children:"test"})," scoped dependencies"]}),"\n",(0,i.jsxs)(n.li,{children:["search the original tree looking for potential marker artifacts, i.e. those without children, then","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"check the set of hidden artifacts to see if the potential marker artifact is also hidden"}),"\n",(0,i.jsx)(n.li,{children:"if the hidden artifact does exist then transplant its dependencies to the marker artifact"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["The above will allow us to reconstruct the missing parts of the SBOM dependency graph and create my desired ",(0,i.jsx)(n.em,{children:"bom"})," content."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," The same issue will occur with ",(0,i.jsx)(n.em,{children:"runtime"})," scoped artifacts within the graph, these can also conceal ",(0,i.jsx)(n.em,{children:"compile"})," scoped artifacts if closer to the root. The difference between ",(0,i.jsx)(n.em,{children:"test"})," scoped artifacts and those with ",(0,i.jsx)(n.em,{children:"runtime"})," scope is that the ",(0,i.jsx)(n.em,{children:"runtime"})," scoped artifacts can exist anywhere in the dependency tree whereas the ",(0,i.jsx)(n.em,{children:"test"})," artifacts will only be found at the top level. The ",(0,i.jsx)(n.em,{children:"runtime"})," artifacts can be handled by following a similar process to the one above, extended to the full dependency tree."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h1,{id:"part-three---should-consistency-matter",children:"Part Three - Should Consistency Matter?"}),"\n",(0,i.jsxs)(n.p,{children:["In going through the ",(0,i.jsx)(n.em,{children:"bom"})," file we can see that the information is split into two major types, ",(0,i.jsx)(n.strong,{children:"Components"})," and ",(0,i.jsx)(n.strong,{children:"Dependencies"}),". My expectation was that this information would be consistent, with these elements being related as follows"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["each ",(0,i.jsx)(n.strong,{children:"Dependency"})," being associated with a ",(0,i.jsx)(n.strong,{children:"Component"})]}),"\n",(0,i.jsxs)(n.li,{children:["each nested ",(0,i.jsx)(n.strong,{children:"Dependency"})," referencing an existing top level ",(0,i.jsx)(n.strong,{children:"Dependency"})," element"]}),"\n",(0,i.jsxs)(n.li,{children:["each ",(0,i.jsx)(n.strong,{children:"Component"})," being associated with a top level ",(0,i.jsx)(n.strong,{children:"Dependency"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["One of the verification tests I ran on the ",(0,i.jsx)(n.em,{children:"bom"})," files was to test these expectations, and while I did not discover any issues with the ",(0,i.jsx)(n.strong,{children:"Dependencies"})," I did discover numerous examples of ",(0,i.jsx)(n.strong,{children:"Components"})," existing without any associated dependency information."]}),"\n",(0,i.jsxs)(n.p,{children:["We can revisit the example from earlier to explain why this happens. The CycloneDX code decides which components to include based on the set of resolved artifacts derived from the full dependency tree, and it does this separately from determining the filtered dependency graph. The only connection between the two is that, when generating the dependency graph, the existing process will check whether the dependency has an associated ",(0,i.jsx)(n.em,{children:"Component"})," before adding it to the graph. If the ",(0,i.jsx)(n.em,{children:"Component"})," has not been created then the dependency will be ignored."]}),"\n",(0,i.jsx)(n.p,{children:"As a reminder, here's the example we covered earlier as seen by CycloneDX when processing the dependency graph."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- com.example:dependency2:jar:1.0.0:compile\n|     \\- (com.example:shared_dependency1:jar:1.0.0:compile - omitted for duplicate)\n\\- com.example:test_dependency:jar:1.0.0:test\n   \\- com.example:shared_dependency1:jar:1.0.0:compile (scope not updated to compile)\n      \\- com.example:shared_dependency2:jar:1.0.0:compile\n"})}),"\n",(0,i.jsxs)(n.p,{children:["And the following represents the set of resolved artifacts used to determine which ",(0,i.jsx)(n.em,{children:"Components"})," and ",(0,i.jsx)(n.em,{children:"Dependencies"})," are included in the SBOM dependency graph, assuming we are generating the ",(0,i.jsx)(n.em,{children:"bom"})," based on the ",(0,i.jsx)(n.em,{children:"compile"})," scope."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- com.example:dependency2:jar:1.0.0:compile\n\\- <test artifact ignored>\n   \\- com.example:shared_dependency1:jar:1.0.0:compile (scope not updated to compile)\n      \\- com.example:shared_dependency2:jar:1.0.0:compile\n"})}),"\n",(0,i.jsx)(n.p,{children:"There are two issues with this that I can see"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["this will generate ",(0,i.jsx)(n.em,{children:"Components"})," for all ",(0,i.jsx)(n.em,{children:"compile"})," scope artifacts in the tree, including ",(0,i.jsx)(n.strong,{children:"shared_dependency2"})," from the test subtree"]}),"\n",(0,i.jsx)(n.li,{children:"this ignores the cumulative scopes used by maven when filtering the artifacts to create the dependency tree, relying instead on an explicit test of equality"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["All of the instances I have discovered so far have been related to the missing dependency issue from ",(0,i.jsx)(n.a,{href:"#part-two---the-case-of-the-missing-dependency",children:"Part Two"}),", and are addressed by ensuring concealed artifacts are included in the SBOM dependency graph, however I am not yet convinced this is the only circumstance under which this would occur with the current codebase."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," The Maven cumulative scopes are as follows"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"compile -> system, provided and compile"}),"\n",(0,i.jsx)(n.li,{children:"runtime -> compile and runtime"}),"\n",(0,i.jsx)(n.li,{children:"test -> system, provided, compile, runtime and test"}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.p,{children:"Another related issue, coupled with the processing of excluded types, is the possibility of creating split dependency graphs within the same SBOM."}),"\n",(0,i.jsx)(n.p,{children:"Consider the following dependency tree"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- com.example:dependency2:jar:1.0.0:compile\n\\- com.example:type_dependency:test-jar:tests:1.0.0:compile\n   \\- com.example:shared_type_dependency1:jar:1.0.0:compile\n      \\- com.example:shared_type_dependency2:jar:1.0.0:compile\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If we create the SBOM for the above tree, and choose to exclude artifacts of type ",(0,i.jsx)(n.em,{children:"test-jar"})," from the graph, the current approach will result in two dependency graphs being generated. The first would be rooted at ",(0,i.jsxs)(n.strong,{children:["com.example",":trustification"]})," and the second would be rooted at ",(0,i.jsxs)(n.strong,{children:["com.example",":shared_type_dependency1"]}),". This is another consequence of the ",(0,i.jsx)(n.em,{children:"Component"})," creation process, since only the specific ",(0,i.jsxs)(n.strong,{children:["com.example:type_dependency",":test-jar"]})," artifact will be removed from the graph and not its dependencies. This results in the following dependency section within the ",(0,i.jsx)(n.em,{children:"bom"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'<dependencies>\n  \x3c!-- the first dependency graph is rooted here --\x3e\n  <dependency ref="pkg:maven/com.example/trustification@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/dependency1@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/dependency2@1.0.0?type=jar"/>\n\n  \x3c!-- the second dependency graph is rooted here --\x3e\n  <dependency ref="pkg:maven/com.example/shared_type_dependency1@1.0.0?type=jar">\n    <dependency ref="pkg:maven/com.example/shared_type_dependency2@1.0.0?type=jar"/>\n  </dependency>\n  <dependency ref="pkg:maven/com.example/shared_type_dependency2@1.0.0?type=jar"/>\n</dependencies>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["If we move the processing of the excluded types to the creation of the SBOM dependency graph we could address this issue and create only a single dependency graph for the root artifact, however without also addressing how we determine which ",(0,i.jsx)(n.em,{children:"Components"})," are included in the ",(0,i.jsx)(n.em,{children:"bom"})," we would be creating another source for inconsistencies and those now excluded artifacts would still exist in the ",(0,i.jsx)(n.em,{children:"Components"})," section."]}),"\n",(0,i.jsxs)(n.p,{children:["I believe a better approach would be to start with the assumption that all artifacts are included as ",(0,i.jsx)(n.em,{children:"Components"}),", generate the dependency graph with type exclusion, and then prune all unreferenced components from the generated ",(0,i.jsx)(n.em,{children:"bom"}),". Please remember this for now, it will come up again in the next part."]}),"\n",(0,i.jsx)(n.h1,{id:"part-four---the-return-of-the-missing-dependency",children:"Part Four - The Return of the Missing Dependency"}),"\n",(0,i.jsxs)(n.p,{children:["In ",(0,i.jsx)(n.a,{href:"#part-two---the-case-of-the-missing-dependency",children:"Part Two"})," we discussed what happened when the dependency resolution led to parts of the dependency tree being concealed by artifacts with ",(0,i.jsx)(n.em,{children:"test"})," or ",(0,i.jsx)(n.em,{children:"runtime"})," scopes, however one edge case we did not cover is when the dependency is itself the ",(0,i.jsx)(n.em,{children:"test"})," scoped artifact. In the current CycloneDX implementation this will cause the ",(0,i.jsx)(n.em,{children:"test"})," artifact, and its children, to be ignored because of the mechanism used to determine which ",(0,i.jsx)(n.em,{children:"Components"})," are included in the ",(0,i.jsx)(n.em,{children:"bom"}),". Recall from ",(0,i.jsx)(n.a,{href:"#part-three---should-consistency-matter",children:"Part Three"})," that dependencies will not be included in the dependency graph unless they already have an associated ",(0,i.jsx)(n.em,{children:"Component"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["We can show this in action by looking at a modified version of the earlier example, depicted by ",(0,i.jsx)(n.em,{children:"dependency:tree"})," as follows"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- (com.example:test_dependency:jar:1.0.0:compile - omitted for duplicate)\n\\- com.example:test_dependency:jar:1.0.0:test (scope not updated to compile)\n   \\- com.example:shared_dependency1:jar:1.0.0:test\n      \\- com.example:shared_dependency2:jar:1.0.0:test\n"})}),"\n",(0,i.jsxs)(n.p,{children:["One fact we should be aware of is that the only real ",(0,i.jsx)(n.em,{children:"test"})," scoped artifacts in the tree will be at the top level, Maven will ignore lower level ",(0,i.jsx)(n.em,{children:"test"})," scoped artifacts when determining the transitive graph. In this case ",(0,i.jsx)(n.strong,{children:"test_dependency"})," is the only true ",(0,i.jsx)(n.em,{children:"test"})," scoped artifact, and as neither ",(0,i.jsx)(n.strong,{children:"shared_dependency1"})," not ",(0,i.jsx)(n.strong,{children:"shared_dependency2"})," are referenced from a ",(0,i.jsx)(n.em,{children:"compile"})," scope they only have a scope of ",(0,i.jsx)(n.em,{children:"test"})," by inheriting it from the parent. Compare this with the example we used previously, when ",(0,i.jsx)(n.strong,{children:"shared_dependency1"})," was referenced from a ",(0,i.jsx)(n.em,{children:"compile"})," scope."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- com.example:dependency2:jar:1.0.0:compile\n|     \\- (com.example:shared_dependency1:jar:1.0.0:compile - omitted for duplicate)\n\\- com.example:test_dependency:jar:1.0.0:test\n   \\- com.example:shared_dependency1:jar:1.0.0:compile (scope not updated to compile)\n      \\- com.example:shared_dependency2:jar:1.0.0:compile\n"})}),"\n",(0,i.jsx)(n.p,{children:"What I would like to see is the SBOM dependency graph represented as follows"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0\n   \\- com.example:test_dependency:jar:1.0.0\n      \\- com.example:shared_dependency1:jar:1.0.0\n         \\- com.example:shared_dependency2:jar:1.0.0\n"})}),"\n",(0,i.jsxs)(n.p,{children:["This can be fixed by following a similar process to that discussed in ",(0,i.jsx)(n.a,{href:"#part-two---the-case-of-the-missing-dependency",children:"Part Two"}),", however it will also require us to move away from the current mechanism of identifying ",(0,i.jsx)(n.em,{children:"Components"})," and relying on those references to restrict which ",(0,i.jsx)(n.em,{children:"Artifacts"})," can be included in the dependency graph. Instead of the existing mechanism we would start from the assumption that all Artifacts will be included, determine the actual dependency graph, and then use this to prune the set of ",(0,i.jsx)(n.em,{children:"Components"})," down to the required set."]}),"\n",(0,i.jsxs)(n.p,{children:["Once this switch is made we can finally include those remaining missing dependencies in the graph and address the issues from ",(0,i.jsx)(n.a,{href:"#part-three---should-consistency-matter",children:"Part Three"}),", we certainly have a number of reasons for doing so."]}),"\n",(0,i.jsx)(n.p,{children:"There are a few implementation details we do need to be aware of when switching approaches"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"we need to consider excluded types, as moving their processing to the creation of the dependency graph will allow us to correctly handle their subtrees, however they can now also conceal parts of the dependency graph"}),"\n",(0,i.jsxs)(n.li,{children:["we need to ensure we do not inadvertently pull in ",(0,i.jsx)(n.em,{children:"runtime"})," scoped artifacts when reconstructing the graph from concealed dependencies"]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"conclusions",children:"Conclusions"}),"\n",(0,i.jsxs)(n.p,{children:["This has been an interesting journey, and through it I've learned a lot about CycloneDX and more than I had likely wanted to know about the implementation of Maven. I have addressed all of the issues I believe to be present with the current approach, with the exception of one. While it is true that we can reconstruct the dependency tree to include concealed artifacts, the information provided directly by maven is insufficient to resolve all cases. The edge case identified in ",(0,i.jsx)(n.a,{href:"#part-four---the-return-of-the-missing-dependency",children:"Part Four"})," covers the inclusion of ",(0,i.jsx)(n.em,{children:"compile"})," scoped artifacts which are referenced through a top level ",(0,i.jsx)(n.em,{children:"test"})," artifact, however there is also the case of ",(0,i.jsx)(n.em,{children:"runtime"})," artifacts being included which, unfortunately, also have their scopes modified to a ",(0,i.jsx)(n.em,{children:"test"})," scope."]}),"\n",(0,i.jsxs)(n.p,{children:["By way of example, if we were to change the scope of the ",(0,i.jsx)(n.strong,{children:"shared_dependency1"})," dependency within the ",(0,i.jsx)(n.strong,{children:"test_dependency"})," pom.xml to a scope of ",(0,i.jsx)(n.strong,{children:"runtime"})," we would still see the following returned by maven"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"com.example:trustification:jar:1.0.0\n+- com.example:dependency1:jar:1.0.0:compile\n|  \\- (com.example:test_dependency:jar:1.0.0:compile - omitted for duplicate)\n\\- com.example:test_dependency:jar:1.0.0:test (scope not updated to compile)\n   \\- com.example:shared_dependency1:jar:1.0.0:test\n      \\- com.example:shared_dependency2:jar:1.0.0:test\n"})}),"\n",(0,i.jsxs)(n.p,{children:["As things currently stand we now have a ",(0,i.jsx)(n.em,{children:"bom"})," file which is no longer missing dependencies, although it may include the occasional ",(0,i.jsx)(n.em,{children:"runtime"})," scoped artifact when it really shouldn't. In order to fix this edge case we will need to go deeper into the maven level and look at the underlying graph generated by ",(0,i.jsx)(n.a,{href:"https://wiki.eclipse.org/Aether",title:"Eclipse Aether website",children:"Eclipse Aether"})," as this contains more useful information."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Node: com.example:trustification:1.0.0    {}\n  Node: com.example:dependency1:1.0.0    {conflict.originalScope=compile, conflict.originalOptionality=false}\n    Node: com.example:test_dependency:1.0.0    {conflict.winner=com.example:test_dependency:jar:1.0.0 (test), conflict.originalScope=compile, conflict.originalOptionality=false}\n  Node: com.example:test_dependency:1.0.0    {REDUCED_SCOPE=compile, conflict.originalScope=test, conflict.originalOptionality=false}\n    Node: com.example:shared_dependency1:1.0.0    {conflict.originalScope=runtime, conflict.originalOptionality=false}\n      Node: com.example:shared_dependency2:1.0.0    {conflict.originalScope=compile, conflict.originalOptionality=false}\n"})}),"\n",(0,i.jsx)(n.p,{children:"The above information contains the original scope of the dependencies, the optionality and also a reference to the winning dependency in the case of conflict."}),"\n",(0,i.jsx)(n.p,{children:"Switching over to using this tree would likely be intrusive, and not something I would like to do without building up the existing test cases within the project. This is definitely a task for another day \ud83d\ude01"})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>o});var i=t(6540);const s={},r=i.createContext(s);function c(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);