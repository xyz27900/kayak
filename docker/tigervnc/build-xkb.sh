#!/bin/sh
set -e
set -u

cd /tmp/xkb && abuild-meson . build
meson compile -C /tmp/xkb/build
DESTDIR="/tmp/xkb-install" meson install --no-rebuild -C /tmp/xkb/build

TO_KEEP="
    geometry/pc
    symbols/pc
    symbols/us
    symbols/srvr_ctrl
    symbols/keypad
    symbols/altwin
    symbols/inet
    compat/accessx
    compat/basic
    compat/caps
    compat/complete
    compat/iso9995
    compat/ledcaps
    compat/lednum
    compat/ledscroll
    compat/level5
    compat/misc
    compat/mousekeys
    compat/xfree86
    keycodes/evdev
    keycodes/aliases
    types/basic
    types/complete
    types/extra
    types/iso9995
    types/level5
    types/mousekeys
    types/numpad
    types/pc
    rules/evdev
"

find /tmp/xkb-install/usr/share/X11/xkb -mindepth 2 -maxdepth 2 -type d -print -exec rm -r {} ';'
find /tmp/xkb-install/usr/share/X11/xkb -mindepth 1 ! -type d $(printf "! -wholename /tmp/xkb-install/usr/share/X11/xkb/%s " $(echo "$TO_KEEP")) -print -delete
