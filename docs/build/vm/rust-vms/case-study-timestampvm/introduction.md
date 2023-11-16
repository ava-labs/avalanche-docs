---
tags: [Build, Virtual Machines, Rust, Avalanche-RS]
description: Understand what TimestampVM is
sidebar_label: Introduction
pagination_label: Introduction
sidebar_position: 1
---

# Case Study: TimestampVM

To really get an understanding of how one can use the `avalanche-types` library to build a Rust-based VM, we will look at [TimeStampVM](https://github.com/ava-labs/timestampvm-rs/tree/main), a basic VM which utilizes the `avalanche-types` library. 

### Idea of TimestampVM

In contrast to complex VMs like the EVM which provide a general-purpose computing environment, TimestampVM is *much, much* simpler. In fact, we can describe the goal of TimestampVM in two bullet points:

- To store the timestamp when each block was appended to the blockchain
- To store arbitrary payloads of data (within each block)

Even though the above seems quite simple, this still requires us to define and build out an architecture to support such functionalities. In this case study, we will look at the following pieces of the architecture that define TimestampVM:

- State
- Blocks
- API
- The VM itself

