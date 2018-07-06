#!/usr/bin/env bash
: ${SMOKE_TARGET_HOST=localhost}
: ${SMOKE_TARGET_PORT=8080}
: ${SMOKE_TARGET_SCHEME=http}

email="test@example.com"
password="test"
baseUrl="${SMOKE_TARGET_SCHEME}://${SMOKE_TARGET_HOST}:${SMOKE_TARGET_PORT}"

adminRequest() {
  method=$1
  path=$2
  data=$3

  url="${baseUrl}/admin/v1${path}"
  curl -Ssf -X "$method" \
    --basic -u "$email:$password" \
    -H "Content-Type: application/json" \
    "$url" \
    -d "$data"
}

clientRequest() {
  token=$1
  method=$2
  path=$3
  data=$4

  url="${baseUrl}/client/v1${path}"
  curl -Ssf -X "$method" \
    -H "Authorization: Bearer $token" \
    -H "Content-Type: application/json" \
    "$url" \
    -d "$data"
}

set -e

echo "Create account"
adminRequest "POST" "/accounts" "{\"email\":\"$email\",\"password\":\"$password\"}" > /dev/null

echo "Create realm"
realmId=$(adminRequest "POST" "/realms" '{"name":"test"}' | jq -r .id)

echo "Create admin user via admin api"
adminAuthToken=$(adminRequest "POST" "/realms/${realmId}/tokens" '{"scope":"admin","userId":"admin"}' | jq -r .token)

echo "Create client user via client api"
userAuthToken=$(clientRequest "$adminAuthToken" "POST" "/auth/tokens" '{"scope":"user","userId":"user"}' | jq -r .token)

echo "Create channel"
clientRequest "$adminAuthToken" "POST" "/channels" '{"id":"test"}' > /dev/null

echo "Create subscription"
clientRequest "$adminAuthToken" "POST" "/subscriptions" '{"id":"test","userId":"user","channelId":"test"}' > /dev/null
