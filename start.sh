#!/bin/bash

set -e

CURRDIR=$(pwd)

rm -rf $CURRDIR/out

cp -r $CURRDIR/back-end $CURRDIR/out

cd $CURRDIR/front-end

if command -v yarn &> /dev/null; then
    yarn build
else
    npm build
fi

mv dist/traning-bank $CURRDIR/out/public

cd $CURRDIR/out

docker-compose up --build -d
