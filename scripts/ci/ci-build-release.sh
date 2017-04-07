#!/bin/bash 

echo "\nBegin Build PaletxUI\n"
GerritRootPath=`pwd`

echo '\nRun PaletxUI Build\n'
chmod a+x ./tools/run-build-release.sh
./tools/run-build-release.sh ${GerritRootPath} || { echo -e "\n run build release failed!";exit 1; }

echo "\nBuild PaletxUI success!\n"
exit 0;
