---
tags: [Build, Virtual Machines, Rust, Avalanche-RS]
description: Learn how to set up an environment for developing Rust-based VMs
sidebar_label: Setting Up Your Rust Environment
pagination_label: Setting Up Your Rust Environment
sidebar_position: 2
---

# Setting Up Your Rust Environment

In this section, we will focus on getting set up with the Rust environment necessary to build with the `avalanche-types` crates (recall that `avalanche-types` contains the SDK we want to use to build our Rust VM).

### Installing Rust

First and foremost, we will need to have Rust installed locally. If you do not have Rust installed, you can install `rustup` (the tool that manages your Rust installation) [here](https://www.rust-lang.org/tools/install).

### Adding `avalanche-types` to Your Project

Once you have Rust installed and are ready to build, you will want to add the Avalanche-Types crate to your project. Below is a baseline example of how you can do this:

```toml title="Cargo.toml"
[dependencies]
avalanche-types = "0.1.4"
```

However, if you want to use the [TimestampVM](https://github.com/ava-labs/timestampvm-rs) as a reference for your project, a more appropiate import would be the following:

```toml title="Cargo.toml"
[dependencies]
avalanche-types = { version = "0.1.4", features = ["subnet", "codec_base64"] } 
```