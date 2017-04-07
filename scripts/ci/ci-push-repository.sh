#!/bin/bash

if [ $# -lt 4 ]; then
    echo -e "\e[1;32musage:\e[0m"
    echo -e "\e[1;32m   eg1: run-push-repository.sh RepositoryIP RepositoryUser RepositoryPassword RepositoryPath\e[0m"
    exit 1
fi

GerritRootPath=`pwd`
RepositoryIP="$1"
RepositoryUser="$2"
RepositoryPassword="$3"
RepositoryPath="$4"

echo "\n Begin build release And push repository to server"
chmod a+x ./tools/run-push-repository.sh
./tools/run-push-repository.sh ${GerritRootPath} ${RepositoryIP} ${RepositoryUser} ${RepositoryPassword} ${RepositoryPath} || { echo -e "\n run push repository failed!";exit 1; }

echo "\n push repository to server success!\n"
exit 0;
