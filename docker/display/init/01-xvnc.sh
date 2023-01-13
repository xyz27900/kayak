#!/bin/sh
set -e
set -u

echo ">>> Starting Xvnc..."

Xvnc \
    -listen tcp \
    -listen local \
    -listen unix \
    -geometry "$DISPLAY_WIDTH"x"$DISPLAY_HEIGHT" \
    -depth 24 \
    -securitytypes=none \
    -rfbport="$VNC_PORT" \
    -rfbunixpath=/tmp/vnc.sock \
    -rfbunixmode=0660
