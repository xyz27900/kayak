#!/bin/sh
set -e
set -u

cd /tmp/pango && LDFLAGS= abuild-meson \
    -Ddefault_library=static \
    -Dintrospection=disabled \
    -Dgtk_doc=false \
    --cross-file /tmp/meson-cross.txt \
    build

meson compile -C /tmp/pango/build
DESTDIR=$(xx-info sysroot) meson install --no-rebuild -C /tmp/pango/build
