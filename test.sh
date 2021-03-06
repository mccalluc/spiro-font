#!/usr/bin/env bash
set -o errexit

start() { echo "::group::$1"; }
end() { echo "::endgroup::"; }
die() { set +v; echo "$*" 1>&2 ; sleep 1; exit 1; }


start changelog
cd docs
bundle exec jekyll serve &
cd -
end changelog


start npm
npm run test
end npm

echo 'PASS!'