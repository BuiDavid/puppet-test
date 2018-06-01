#!/bin/bash

node /home/dtbui/myKeystoneApp/keystone.js certonly \
  --agree-tos --email 'david.bui@carnwennan.com' \
  --standalone \
  --domains le-testserver.ddns.net \
  --server https://acme-staging.api.letsencrypt.org/directory://acme-staging.api.letsencrypt.org/directory \
  --config-dir ~/letsencrypt.test/etc
