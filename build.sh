#!/usr/bin/env bash
# Cloudflare Pages: set Build command to "bash build.sh" (not "yarn build").
set -euo pipefail
cd "$(dirname "$0")"
export NODE_OPTIONS="${NODE_OPTIONS:---openssl-legacy-provider}"
pnpm run build
