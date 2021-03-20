#!/bin/bash

# Helps the user replace their avalanchego executable with the last working 
# version in case of a broken build.

usage() {
  echo "Usage: $0 [--list] [--tag valid-release-tag]"
  exit 1
}

# We want error messages in English

export LANG=C
export LC_ALL=C

# Has avalanchego been installed using avalanchego-installer.sh?

if [ ! -f $HOME/avalanche-node/avalanchego ]
then
  echo "avalanchego is not installed in $HOME/avalanche-node."
  exit 1
fi

# Latest release, major.minor version, compatibility list, default target

AVAROOT=https://api.github.com/repos/ava-labs/avalanchego

LATEST=`wget -O - -q $AVAROOT/releases/latest \
        | grep tag_name \
        | sed 's/.*: "\(.*\)".*/\1/'`

MAJMIN=`echo $LATEST \
        | sed 's/\(^[^\.]*[0-9]*\.[0-9]\).*/\1/'`

LIST=`wget -q -O - $AVAROOT/releases \
      | grep tag_name \
      | sed 's/.*: "\(.*\)".*/\1/' \
      | grep -vw $LATEST \
      | grep $MAJMIN`

TARGET=`echo "$LIST" \
        | head -1`

# Shall we list compatible versions? Is a release tag specified?

if [ $# -ne 0 ]
then
  case $1 in
    --list)
      echo "$LIST"
      exit 0
      ;;
    --tag)
      if [ $# -eq 2 ]
      then
        TARGET=$2
        echo "$LIST" \
        | grep -q "^$TARGET$" || \
          usage
      else
        usage
      fi
      ;;
    *)
      usage
     ;;
  esac
fi

# Architecture

if [ `uname -m` = x86_64 ]
then 
  ARCH=amd64
else 
  ARCH=arm64
fi 

cd /tmp

# Getting the exact URL and file name

URL=`wget -q -O - $AVAROOT/releases \
     | grep "browser.*$TARGET/.*linux.*$ARCH" \
     | grep -v "\.sig" \
     | sed 's/.*: "\(.*\)".*/\1/'`
TARBALL=`basename $URL 2>/dev/null`

# Just do it--wait, are you sure?

read -p "This will install $TARGET. Ok [y/n]? " -n 1 -r
echo
[[ $REPLY =~ ^[Yy]$ ]] || \
  exit 1

wget -q -nd -m $URL
tar xzf /tmp/$TARBALL -C $HOME/avalanche-node --strip-components=1

echo "Version $TARGET installed."
