#!/bin/bash

GerritRootPath="$1"

CurPath=`pwd`

cd ${GerritRootPath}

npm run build-demo || { echo -e "\n npm run build-demo failed!";exit 1; }

cd ${CurPath}