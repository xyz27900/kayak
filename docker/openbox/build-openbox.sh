#!/bin/sh
set -e
set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

function log {
    echo ">>> $*"
}

log "Installing fontconfig..."
cp -av /tmp/fontconfig-install/usr $(xx-info sysroot)

# The config.sub provided with Openbox is too old.  Get a recent one from
# https://github.com/gcc-mirror/gcc/blob/master/config.sub
#cp -v "$SCRIPT_DIR"/config.sub /tmp/openbox

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
    --disable-xinerama

make V=1 -C /tmp/openbox -j$(nproc)
make DESTDIR=/tmp/openbox-install -C /tmp/openbox install
