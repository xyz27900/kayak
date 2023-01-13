#!/bin/sh
set -e
set -u

cd /tmp/gnutls && ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --disable-openssl-compatibility \
    --disable-rpath \
    --disable-guile \
    --disable-valgrind-tests \
    --disable-cxx \
    --without-p11-kit \
    --disable-tools \
    --disable-doc \
    --enable-static \
    --disable-shared

make -C /tmp/gnutls -j$(nproc)
make DESTDIR=$(xx-info sysroot) -C /tmp/gnutls install
