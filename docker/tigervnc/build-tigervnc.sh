#!/bin/sh
set -e
set -u

patch -p1 -d /tmp/tigervnc/unix/xserver < /tmp/tigervnc/unix/xserver120.patch

sed 's/target_link_libraries(vncpasswd tx rfb os)/target_link_libraries(vncpasswd -static tx rfb os)/' -i /tmp/tigervnc/unix/vncpasswd/CMakeLists.txt

sed 's/if(UNIX AND NOT APPLE)/if(USE_LINUX_PAM)/' -i /tmp/tigervnc/CMakeLists.txt
sed 's/if(UNIX AND NOT APPLE)/if(USE_LINUX_PAM)/' -i /tmp/tigervnc/common/rfb/CMakeLists.txt
sed 's/#if !defined(WIN32) && !defined(__APPLE__)/#if defined(USE_LINUX_PAM)/' -i  /tmp/tigervnc/common/rfb/SSecurityPlain.cxx
sed 's/#elif !defined(__APPLE__)/#elif defined(USE_LINUX_PAM)/' -i  /tmp/tigervnc/common/rfb/SSecurityPlain.cxx

cd /tmp/tigervnc && cmake -G "Unix Makefiles" \
    $(xx-clang --print-cmake-defines) \
    -DCMAKE_FIND_ROOT_PATH=$(xx-info sysroot) \
    -DCMAKE_FIND_ROOT_PATH_MODE_LIBRARY=ONLY \
    -DCMAKE_FIND_ROOT_PATH_MODE_INCLUDE=ONLY \
    -DCMAKE_FIND_ROOT_PATH_MODE_PACKAGE=ONLY \
    -DCMAKE_FIND_ROOT_PATH_MODE_PROGRAM=NEVER \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_BUILD_TYPE=Release \
    -DINSTALL_SYSTEMD_UNITS=OFF \
    -DENABLE_NLS=OFF \
    -DENABLE_GNUTLS=ON \
    -DBUILD_VIEWER=OFF

make -C /tmp/tigervnc/common -j$(nproc)
make -C /tmp/tigervnc/unix/common -j$(nproc)
make -C /tmp/tigervnc/unix/vncpasswd -j$(nproc)

autoreconf -fiv /tmp/tigervnc/unix/xserver
cd /tmp/tigervnc/unix/xserver && CFLAGS="$CFLAGS -Wno-implicit-function-declaration" ./configure \
    --build=$(TARGETPLATFORM= xx-clang --print-target-triple) \
    --host=$(xx-clang --print-target-triple) \
    --prefix=/usr \
    --sysconfdir=/etc/X11 \
    --localstatedir=/var \
    --with-xkb-path=/usr/share/X11/xkb \
    --with-xkb-output=/var/lib/xkb \
    --with-xkb-bin-directory=/usr/bin \
    --with-default-font-path=/usr/share/fonts/misc,/usr/share/fonts/100dpi:unscaled,/usr/share/fonts/75dpi:unscaled,/usr/share/fonts/TTF,/usr/share/fonts/Type1 \
    --disable-docs \
    --disable-unit-tests \
    --without-dtrace \
    \
    --with-pic \
    --disable-static \
    --disable-shared \
    \
    --disable-listen-tcp \
    --enable-listen-unix \
    --disable-listen-local \
    \
    --disable-dpms \
    \
    --disable-systemd-logind \
    --disable-config-hal \
    --disable-config-udev \
    --disable-xorg \
    --disable-dmx \
    --disable-libdrm \
    --disable-dri \
    --disable-dri2 \
    --disable-dri3 \
    --disable-present \
    --disable-xvfb \
    --disable-glx \
    --disable-xinerama \
    --disable-record \
    --disable-xf86vidmode \
    --disable-xnest \
    --disable-xquartz \
    --disable-xwayland \
    --disable-xwayland-eglstream \
    --disable-standalone-xpbproxy \
    --disable-xwin \
    --disable-glamor \
    --disable-kdrive \
    --disable-xephyr

find /tmp/tigervnc -name "*.la" -exec sed 's/^dependency_libs/#dependency_libs/' -i {} ';'
sed 's/^XSERVER_SYS_LIBS = .*/XSERVER_SYS_LIBS = -lXau -lXdmcp -lpixman-1 -ljpeg -lXfont2 -lfreetype -lfontenc -lpng16 -lbrotlidec -lbrotlicommon -lz -lbz2 -lgnutls -lhogweed -lgmp -lnettle -lunistring -ltasn1 -lbsd -lmd/' -i /tmp/tigervnc/unix/xserver/hw/vnc/Makefile

make -C /tmp/tigervnc/unix/xserver -j$(nproc)

make DESTDIR=/tmp/tigervnc-install -C /tmp/tigervnc/unix/xserver install

make DESTDIR=/tmp/tigervnc-install -C /tmp/tigervnc/unix/vncpasswd install
