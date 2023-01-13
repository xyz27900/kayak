#!/bin/sh
set -e
set -u

cd /tmp/libxfont2 && ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --without-fop \
    --without-xmlto \
    --disable-devel-docs \
    --enable-static \
    --disable-shared

sed 's/^noinst_PROGRAMS = /#noinst_PROGRAMS = /' -i /tmp/libxfont2/Makefile.in
make -C /tmp/libxfont2 -j$(nproc)
make DESTDIR=$(xx-info sysroot) -C /tmp/libxfont2 install