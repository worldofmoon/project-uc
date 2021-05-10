#!/bin/sh

set -e

yarn run typeorm migration:run

exec "$@"
