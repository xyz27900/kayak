#!/bin/sh
set -e
set -u

LDFLAGS="-Wl,--as-needed --static -static -Wl,--strip-all -Wl,--start-group -lX11 -lxcb -lXdmcp -lXau -Wl,--end-group" && \
cd /tmp/xkbcomp && \
    LDFLAGS="-Wl,--as-needed --static -static -Wl,--strip-all -Wl,--start-group -lX11 -lxcb -lXdmcp -lXau -Wl,--end-group" LIBS="$LDFLAGS" ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr

make -C /tmp/xkbcomp -j$(nproc)
make DESTDIR=/tmp/xkbcomp-install -C /tmp/xkbcomp install