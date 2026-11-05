#!/usr/bin/env bash
# Usage: scripts/set-site.sh https://yourdomain.com you@yourdomain.com [ca-pub-XXXXXXXXXXXXXXXX]
# Updates the site address and contact email everywhere. With a publisher id it also
# turns ads ON and writes ads.txt. Run it once after buying a domain / getting approved.
set -e
cd "$(dirname "$0")/.."
NEW="${1%/}"; MAIL="$2"; PUB="$3"
[ -z "$NEW" ] || [ -z "$MAIL" ] && { echo "usage: $0 https://domain email [ca-pub-id]"; exit 1; }
OLD=$(grep -o "url: '[^']*'" assets/shared.js | head -1 | sed "s/url: '//;s/'//")
OLDMAIL=$(grep -o 'mailto:[^"]*' contact/index.html | head -1 | sed 's/mailto://')
FILES=$(find . -path ./.git -prune -o -type f \( -name '*.html' -o -name '*.xml' -o -name '*.txt' -o -name '*.js' \) -print)
for f in $FILES; do sed -i "s|$OLD|$NEW|g; s|$OLDMAIL|$MAIL|g" "$f"; done
if [ -n "$PUB" ]; then
  sed -i "s|enabled: false|enabled: true |; s|ca-pub-[0-9]*|$PUB|" assets/shared.js
  printf 'google.com, pub-%s, DIRECT, f08c47fec0942fa0\n' "${PUB#ca-pub-}" > ads.txt
fi
echo "Site: $OLD -> $NEW | email: $OLDMAIL -> $MAIL${PUB:+ | ads ON with $PUB}"
