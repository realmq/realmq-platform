#!/usr/bin/env bash
ROOT=$(pwd)
SCRIPT="${ROOT}/scripts/validate-openapi-spec.js"

if [ "$#" = "0" ]; then
  # called without parameters
  # validate all yaml files
  exec find src -name 'openapi.yaml' -or -name 'openapi.yml' -exec "$SCRIPT" '{}' \;
else
  # called with parameters
  # validate just the specified files
  root=$(pwd)

  # npm exports original working directory as INIT_CWD
  if [ -n "$INIT_CWD" ]; then
    # switch to orig cwd so relative paths work again
    cd "$INIT_CWD"
  fi

  exec "$SCRIPT" $@
fi
