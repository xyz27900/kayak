#!/bin/sh
set -e
set -u

xdpyprobe

echo ">>> Configuring X11..."

xhost +
xrdb -merge /.Xresources
