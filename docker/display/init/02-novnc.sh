#!/bin/sh
set -e
set -u

xdpyprobe

echo ">>> Starting noVNC..."

/opt/noVNC/utils/novnc_proxy --vnc 0.0.0.0:"$VNC_PORT" --listen "$WEB_PORT"
