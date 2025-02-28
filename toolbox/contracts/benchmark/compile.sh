#!/bin/bash

SCRIPT_DIR=$(dirname "$0")
mkdir -p $SCRIPT_DIR/compiled
docker run --rm -v $SCRIPT_DIR:/contracts ghcr.io/foundry-rs/foundry:latest "forge build && cp -r /out/*.sol/*.json /contracts/compiled/"
