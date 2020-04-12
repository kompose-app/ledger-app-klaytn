#!/bin/bash

set -e

cd ../..
PATH=$(yarn bin):$PATH
cd -
documentation readme src/** --config documentation.yml --section=API
