#!/bin/sh
set -e
set -u

cd /tmp/libfontenc && ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --with-encodingsdir=/usr/share/fonts/encodings \
    --enable-static \
    --disable-shared

make -C /tmp/libfontenc -j$(nproc)
make DESTDIR=$(xx-info sysroot) -C /tmp/libfontenc install