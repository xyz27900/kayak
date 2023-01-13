#!/bin/sh
set -e
set -u

mkdir -p /tmp/fontconfig-install/usr/share/fonts
for FONT in Arimo-Regular Arimo-Bold Cousine-Regular Cousine-Bold
do
    cp -v /usr/share/fonts/noto/$FONT.ttf /tmp/fontconfig-install/usr/share/fonts/
done

cd /tmp/fontconfig && ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --with-default-fonts=/usr/share/fonts \
    --with-baseconfigdir=/usr/share/fontconfig \
    --with-configdir=/usr/share/fontconfig/conf.d \
    --with-templatedir=/usr/share/fontconfig/conf.avail \
    --with-cache-dir=/config/xdg/cache/fontconfig \
    --disable-shared \
    --enable-static \
    --disable-docs \
    --disable-nls \
    --disable-cache-build

make -C /tmp/fontconfig -j$(nproc)
make DESTDIR=/tmp/fontconfig-install -C /tmp/fontconfig install

sed -i 's/<reset-dirs \/>//' /tmp/fontconfig-install/usr/share/fontconfig/conf.avail/05-reset-dirs-sample.conf
