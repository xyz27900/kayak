#!/bin/sh
set -e
set -u

cd /tmp/libxshmfence && ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --enable-static \
    --disable-shared \
    --enable-futex

make -C /tmp/libxshmfence -j$(nproc)
make DESTDIR=$(xx-info sysroot) -C /tmp/libxshmfence install
