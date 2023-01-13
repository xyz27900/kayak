#!/bin/sh
set -e
set -u

cd /tmp/xset && ./autogen.sh &&
    LDFLAGS="-Wl,--as-needed --static -static -Wl,--strip-all -Wl,--start-group -lX11 -lxcb -lXdmcp -lXau -lXext -lXmuu -Wl,--end-group" LIBS="$LDFLAGS" ./configure \
        --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
        --host=$(xx-clang --print-target-triple) \
        --prefix=/usr

make -C /tmp/xset -j$(nproc)
make DESTDIR=/tmp/xset-install -C /tmp/xset install
