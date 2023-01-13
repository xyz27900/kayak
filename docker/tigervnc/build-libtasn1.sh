#!/bin/sh
set -e
set -u

cd /tmp/libtasn1 && CFLAGS="$CFLAGS -Wno-error=inline" ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --enable-static \
    --disable-shared

make -C /tmp/libtasn1 -j$(nproc)
make DESTDIR=$(xx-info sysroot) -C /tmp/libtasn1 install
