#!/bin/bash
set -e
set -u

xdpyprobe
(trap 'kill 0' SIGINT; crdetector & "$@")
