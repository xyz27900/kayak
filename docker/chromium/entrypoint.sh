#!/bin/bash
set -e
set -u

xprobe
(trap 'kill 0' SIGINT; crdetector & "$@")
