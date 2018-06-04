#!/usr/bin/env bash
version=$1
if [ -z "$version" ]; then
  echo "usage: $0 <version>" 1>&2
  exit 1
fi

date=$(date +%Y-%m-%d)
previous_version=$(grep -Eo '^##\s*\[[^]]+\]' CHANGELOG.md | sed -E 's|##\s*\[([^]]+)\]|\1|' | sed -n 2p)

if [ "$previous_version" == "$version" ]; then
  echo "already bumped to version ${version}" 1>&2
  exit 0
fi;

unreleased_compare_link="https://github.com/RealMQ/realmq-platform/compare/${version}...HEAD"
version_compare_link="https://github.com/RealMQ/realmq-platform/compare/${previous_version}...${version}"

sed -i.bak -E "/^##\s*\[Unreleased\]/ a\\\n## [${version}] - ${date}" CHANGELOG.md
sed -i.bak -E "/^\s*\[Unreleased\]/ c\[Unreleased]: ${unreleased_compare_link}\\n[${version}]: ${version_compare_link}" CHANGELOG.md
sed -i.bak -E "s/(\"version\":\s*)\"[^\"]*\"/\1\"${version}\"/" package.json
sed -i.bak -E "s/(Version\s*=\s*)\"[^\"]*\"/\1\"${version}\"/" Dockerfile
