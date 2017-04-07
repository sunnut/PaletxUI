#!/bin/bash

GerritRootPath="$1"

cd ${GerritRootPath}
npm run build-release || { echo -e "\n npm run build-release failed!";exit 1; }
