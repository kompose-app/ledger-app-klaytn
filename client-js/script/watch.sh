#!/bin/bash

set -e

cd ../..
PATH=$(yarn bin):$PATH
cd -
export NODE_ENV=production
BABEL_ENV=cjs babel --source-maps --watch -d lib src &
flow-copy-source -v src lib  -w &
BABEL_ENV=es babel --source-maps --watch -d lib-es src &
flow-copy-source -v src lib-es -w
