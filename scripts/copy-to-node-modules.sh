#!/bin/bash

echo 'Copying directories to node_modules from packages/mobile/node_modules'

if [ -d "./node_modules/@react-native-community/picker" ]
then
  echo "@react-native-community/picker already copied"
else
  cp -R ./packages/mobile/node_modules/@react-native-community/picker ./node_modules/@react-native-community/
fi

if [ -d "./node_modules/react-router-native" ]
then
  echo "react-router-native already copied"
else
  cp -R ./packages/mobile/node_modules/react-router-native ./node_modules/
fi
