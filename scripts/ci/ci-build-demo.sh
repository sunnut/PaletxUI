#!/bin/bash

echo "\nBegin Build PaletxUI Demo App\n"
JsonServerUrl="$1"
GerritRootPath=`pwd`

echo '\n1. CheckCommitMsg\n'
chmod a+x ./tools/check-commit-msg.sh
./tools/check-commit-msg.sh || { echo -e "\n Check Commit Msg failed!";exit 1; }

echo '\n2. Run PaletxUI Demo App Build\n'
chmod a+x ./tools/run-build-demo.sh
./tools/run-build-demo.sh ${GerritRootPath} || { echo -e "\n run build demo app failed!";exit 1; }

echo "\nBuild PaletxUI demo app success!\n"
exit 0;
