#!/bin/sh
set -e
set -u

xdpyprobe

echo ">>> Starting Openbox..."

openbox
