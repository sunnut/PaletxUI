#!/bin/bash
#校验git  commit 格式符合项目关联jira号的要求
commitMsg=`git log -1 --pretty=format:"%s"`
commiter=`git log -1 --pretty=format:"%an"`
if [ "$commiter" = "iportalci" ]
then
  echo "\nAuthor:iportalci  does not need to be checked!"
else
  if [[ "$commitMsg" =~ ^[A-Za-z]*-[0-9]*.*:[A-Za-z]*-[0-9]*$ ]]
  then 
  	echo "\nCommitMsg parity check"
  else  
  	echo "\nCommitMsg check is not passed!"
  exit 1
  fi
fi
