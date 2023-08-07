---
tags: [Build, Virtual Machines]
description: Getting started with building a Rust VM. 
sidebar_label: Getting Started
pagination_label: Getting Started
sidebar_position: 0
---

# Getting Started with Building a Rust VM

The Avalanche Rust SDK is a developer toolkit composed of powerful building blocks and primitive
types. This tutorial will walk you through the creation of a simple VM known as the [TimestampVM
RS](https://github.com/ava-labs/timestampvm-rs) using the Rust SDK. Each block in the TimestampVM's
blockchain contains a monotonically increasing timestamp when the block was created and a 32-byte
payload of data.

## Prerequisites

- Install the latest stable version of Rust using [`rustup`](https://www.rust-lang.org/tools/install).
- Bookmark and review the [avalanche-types](https://github.com/ava-labs/avalanche-types-rs) GitHub
  repository specifically the traits and helpers defined in the
  [`subnet/rpc`](https://github.com/ava-labs/avalanche-types-rs/tree/main/src/subnet/rpc) mod.
- For developers new to Rust please visit the free online book [The Rust Programming
  Language](https://doc.rust-lang.org/book/).

If you have experimented with our Golang example VMs you will find the Rust SDK fairly familiar.
Completely new to creating a custom VM on Avalanche? No problem please review [Introduction to
VMs](/build/vm/intro.md).

## Components

A VM defines how a blockchain should be built. A block is populated with a transaction which mutates
the state of the blockchain when executed. By executing a series of blocks chronologically, anyone
can verify and reconstruct the state of the blockchain at an arbitrary point in time.

The TimestampVM RS repository has a few components to handle the lifecycle of tasks from a
transaction being issued to a block being accepted across the network:

- **Mempool** - Stores pending transactions that haven't been finalized yet.
- **Block** - Defines the block format, how to verify it, and how it should be accepted or rejected
  across the network
- **Virtual Machine** - Application-level logic. Implements the VM trait needed to interact with
  Avalanche consensus and defines the blueprint for the blockchain.
- **Service** - Exposes APIs so users can interact with the VM.
- **State** - Manages both in memory and persistent states.
