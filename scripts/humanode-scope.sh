#!/usr/bin/env bash
# Moves every mention of upstream's `@hyperlane-xyz` npm scope to our
# `@humanode-hyperlane` scope, and points the package manifests' `repository` at
# our forks.
#
# The rename is a fixed text substitution, so an upstream commit goes through
# the same substitution before it is applied, and then applies without conflicts
# from the rename:
#
#   git format-patch -1 --stdout <commit> | scripts/humanode-scope.sh --filter | git am -3
#
# Without arguments, the script rewrites every tracked file in place, except
# `.npmrc` and this script, which name the upstream scope on purpose.
# `.npmrc` refuses installing from and publishing to `@hyperlane-xyz`, in case
# something is left behind.

set -euo pipefail

EXPR='
  s{\@hyperlane-xyz\b}{\@humanode-hyperlane}g;
  s{("repository": "https://github\.com/)hyperlane-xyz(/hyperlane-(?:monorepo|registry)")}{$1humanode-network$2}g;
'

case "${1:-}" in
  --filter)
    exec perl -pe "$EXPR"
    ;;
  "")
    cd "$(git rev-parse --show-toplevel)"
    git grep -I -l -z -E '@hyperlane-xyz|"repository": "https://github\.com/hyperlane-xyz/' -- . ':!.npmrc' ':!scripts/humanode-scope.sh' |
      xargs -0 -r perl -pi -e "$EXPR"
    ;;
  *)
    echo "usage: $0 [--filter]" >&2
    exit 2
    ;;
esac
