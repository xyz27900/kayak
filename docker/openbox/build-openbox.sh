#!/bin/sh
set -e
set -u

cd /tmp/openbox && \
    OB_LIBS="-lX11 -lxcb -lXdmcp -lXau -lXext -lXft -lXrandr -lfontconfig -lfreetype -lpng -lXrender -lexpat -lxml2 -lz -lbz2 -llzma -lbrotlidec -lbrotlicommon -lintl -lfribidi -lharfbuzz -lpangoxft-1.0 -lpangoft2-1.0 -lpango-1.0 -lgio-2.0 -lgobject-2.0 -lglib-2.0 -lpcre -lgraphite2 -lffi" \
    LDFLAGS="$LDFLAGS -Wl,--start-group $OB_LIBS -Wl,--end-group" LIBS="$LDFLAGS" ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --datarootdir=/usr/share \
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
