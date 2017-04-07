#!/bin/bash

GerritRootPath="$1"
RepositoryIP="$2"
RepositoryUser="$3"
RepositoryPassword="$4"
RepositoryPath="$5"

cd ../..

npm run build-release || { echo -e "\n npm run build-release failed!";exit 1; }

if [ -d  "paletxUI" ]; then { echo "delete paletxUI";rm -fr paletxUI; }; fi;
mv dist paletxUI
tar zcvf paletxUI.tar.gz paletxUI

if [ ! -f "paletxUI.tar.gz" ]; then echo "paletxUI.tar.gz not exist!"; exit 1; fi
sshpass -p ${RepositoryPassword} scp paletxUI.tar.gz ${RepositoryUser}@${RepositoryIP}:${RepositoryPath} || { echo -e "\n push repository to server failed!";exit 1; }


