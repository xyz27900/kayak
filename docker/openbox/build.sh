#!/bin/sh
#
# Helper script that builds Openbox as a static binary.
#
# NOTE: This script is expected to be run under Alpine Linux.
#

set -e # Exit immediately if a command exits with a non-zero status.
set -u # Treat unset variables as an error.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Define software versions.
OPENBOX_VERSION=3.6.1
PANGO_VERSION=1.49.3
LIBXRANDR_VERSION=1.5.3

# Define software download URLs.
OPENBOX_URL=http://openbox.org/dist/openbox/openbox-${OPENBOX_VERSION}.tar.xz
PANGO_URL=https://download.gnome.org/sources/pango/${PANGO_VERSION%.*}/pango-${PANGO_VERSION}.tar.xz
LIBXRANDR_URL=https://www.x.org/releases/individual/lib/libXrandr-${LIBXRANDR_VERSION}.tar.xz

function log {
    echo ">>> $*"
}

log "Patching Openbox..."
patch -p1 -d /tmp/openbox < "$SCRIPT_DIR"/disable-x-locale.patch
patch -p1 -d /tmp/openbox < "$SCRIPT_DIR"/menu-file-order.patch

log "Configuring Openbox..."
(
    cd /tmp/openbox && \
        OB_LIBS="-lX11 -lxcb -lXdmcp -lXau -lXext -lXft -lXrandr -lfontconfig -lfreetype -lpng -lXrender -lexpat -lxml2 -lz -lbz2 -llzma -lbrotlidec -lbrotlicommon -lintl -lfribidi -lharfbuzz -lpangoxft-1.0 -lpangoft2-1.0 -lpango-1.0 -lgio-2.0 -lgobject-2.0 -lglib-2.0 -lpcre -lgraphite2 -lffi" \
        LDFLAGS="$LDFLAGS -Wl,--start-group $OB_LIBS -Wl,--end-group" LIBS="$LDFLAGS" ./configure \
        --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
        --host=$(xx-clang --print-target-triple) \
        --prefix=/usr \
        --datarootdir=/opt/base/share \
        --disable-shared \
        --enable-static \
        --disable-nls \
        --disable-startup-notification \
        --disable-xcursor \
        --disable-librsvg \
        --disable-session-management \
        --disable-xkb \
        --disable-xinerama \
)

make V=1 -C /tmp/openbox -j$(nproc)
make DESTDIR=/tmp/openbox-install -C /tmp/openbox install
