---
sidebar_position: 1
---

# SBOM (Software Bill of Materials)

A software bill of materials (SBOM) is an inventory of all constituent components and software dependencies involved in the development and delivery of an application.

An SBOM is similar to a bill of materials (BOM) used in supply chains and manufacturing. In the IT industry, however, it hasn't been a common feature for all vendors to accurately detail the foundational code components on which an application is built.

## Why is SBOM Important to Security?

SBOM enables organizations to identify and track all third-party components, in particular open source components, and comply with licensing requirements. It also helps ensure that the organization does not run vulnerable open source components and keeps track of critical updates and patches. It helps organizations utilize open source components as needed while maintaining security and compliance.

## SBOM Standards: CycloneDX and SPDX

Most projects that create or process SBOMs use one of two standards:

### CycloneDX

Is sponsored by the Open Web Application Security Project (OWASP). The CycloneDX SBOM has associated metadata and describes a set of software elements broken down into components, services, and dependencies. The SBOM also has constructs that define relationships between elements.

### Software Package Data Exchange (SPDX)

Is a project maintained by the Linux Foundation. The SPDX SBOM model defines three elements: Documents (metadata about the SBOM), Packages (groups of elements), and Files (single files).

## What’s in an SBOM?

The US National Telecommunications and Information Administration (NTIA) released a standard that defines the minimum requirements for an SBOM. According to the NTIA standard, an SBOM must include:

- **Author Name**: usually the organization that develops the software.
- **Vendor Name**: the name of the software vendor, including aliases (alternative names). Vendor and author may be different if a supplier is creating an SBOM on behalf of the vendor.
- **Component Name**: the name and possible aliases of the software component.
- **Version String**: the format of the version information is free-form, but should follow common industry usage.
- **Component Hash**: the best way to identify a software component is to use a cryptographic hash that serves as a unique identifier.
- **Unique Identifier**: in addition to the hash, each component must have an ID number that identifies it within the SBOM.
- **Relationship**: defines the relationship between the component and the package. In most cases, the relationship is “included”, meaning that a certain component is included in a certain package.

In addition to these minimum requirements, an SBOM can include additional information such as security scores, common vulnerabilities and exposure codes (CVEs) of known vulnerabilities in software components, and their severity.
