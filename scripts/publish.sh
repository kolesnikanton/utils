#!/bin/bash

current_version=$(node -p "require('./package.json').version")
last_commit_version=$(npm info @antonkolesnik/utils version)

echo CURRENT_VERSION = $current_version
echo LAST_PUBLISHED_VERSION = $last_commit_version

if [[ "$current_version" == "$last_commit_version" ]]; then
  echo "The version has not changed. Skipping"
else
  echo "The version has changed. Publishing"
  npm publish --access public
fi
