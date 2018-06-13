#!/usr/bin/env bash
: ${MONGODB_USERNAME=realmq}
: ${MONGODB_PASSWORD=realmq}
: ${MONGODB_DATABASE=realmq}

set -e
docker-compose exec database \
  mongo \
  "$MONGODB_DATABASE" \
  -u "$MONGODB_USERNAME" \
  -p "$MONGODB_PASSWORD" \
  --eval "db.getCollectionNames().forEach(name => db.getCollection(name).drop());"
