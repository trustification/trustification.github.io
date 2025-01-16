import type { ReactNode } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Hero } from "@site/src/components/Hero";
import { SectionTitle } from "@site/src/components/SectionTitle";
import { Video } from "@site/src/components/Video";

import styles from "./index.module.css";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <Hero />
      <SectionTitle pretitle="Watch a video" title="Software Supply Chain">
        Understanding how important is for you will help you to achieve your
        goals.
      </SectionTitle>
      <Video />
    </Layout>
  );
}
