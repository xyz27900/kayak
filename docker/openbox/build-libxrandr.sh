#!/bin/sh
set -e
set -u

cd /tmp/libxrandr && LDFLAGS= ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --disable-shared \
    --enable-static \
    --enable-malloc0returnsnull

make -C /tmp/libxrandr -j$(nproc)
make DESTDIR=$(xx-info sysroot) -C /tmp/libxrandr install
