FROM --platform=$BUILDPLATFORM alpine:3.15 AS builder
ARG TARGETPLATFORM

ARG GNUTLS_VERSION
ARG LIBFONTENC_VERSION
ARG LIBTASN1_VERSION
ARG LIBXFONT2_VERSION
ARG LIBXSHMFENCE_VERSION
ARG TIGERVNC_VERSION
ARG XKB_VERSION
ARG XKBCOMP_VERSION
ARG XSERVER_VERSION

COPY --from=tonistiigi/xx / /
COPY --from=kayak/upx /usr/bin/upx /usr/bin/upx

ENV CFLAGS="-Os -fomit-frame-pointer" \
    CXXFLAGS="$CFLAGS" \
    CPPFLAGS="$CFLAGS" \
    LDFLAGS="-Wl,--as-needed --static -static -Wl,--strip-all" \
    CC=xx-clang

RUN apk --no-cache add \
    curl \
    build-base \
    clang \
    cmake \
    autoconf \
    automake \
    libtool \
    pkgconf \
    meson \
    util-macros \
    font-util-dev \
    xtrans

RUN xx-apk --no-cache --no-scripts add \
    g++ \
    xcb-util-dev \
    pixman-dev \
    libx11-dev \
    libgcrypt-dev \
    libxkbfile-dev \
    libxfont2-dev \
    libjpeg-turbo-dev \
    nettle-dev \
    libunistring-dev \
    gnutls-dev \
    fltk-dev \
    libxrandr-dev \
    libxtst-dev \
    freetype-dev \
    libfontenc-dev \
    zlib-dev \
    libx11-static \
    libxcb-static \
    zlib-static \
    pixman-static \
    libjpeg-turbo-static \
    freetype-static \
    libpng-static \
    bzip2-static \
    brotli-static \
    libunistring-static \
    nettle-static \
    gettext-static \
    libunistring-dev \
    libbsd-dev

COPY build-gnutls.sh /tmp/build-gnutls.sh
RUN mkdir -p /tmp/gnutls && curl -# -L "https://www.gnupg.org/ftp/gcrypt/gnutls/v$(echo $GNUTLS_VERSION | cut -d. -f1-2)/gnutls-${GNUTLS_VERSION}.tar.xz" | tar -xJ --strip 1 -C /tmp/gnutls
RUN /tmp/build-gnutls.sh

COPY build-libxfont2.sh /tmp/build-libxfont2.sh
RUN mkdir -p /tmp/libxfont2 && curl -# -L "https://www.x.org/pub/individual/lib/libXfont2-${LIBXFONT2_VERSION}.tar.bz2" | tar -xj --strip 1 -C /tmp/libxfont2
RUN /tmp/build-libxfont2.sh

COPY build-libfontenc.sh /tmp/build-libfontenc.sh
RUN mkdir -p /tmp/libfontenc && curl -# -L "https://www.x.org/releases/individual/lib/libfontenc-${LIBFONTENC_VERSION}.tar.bz2" | tar -xj --strip 1 -C /tmp/libfontenc
RUN /tmp/build-libfontenc.sh

COPY build-libtasn1.sh /tmp/build-libtasn1.sh
RUN mkdir -p /tmp/libtasn1 && curl -# -L "https://ftp.gnu.org/gnu/libtasn1/libtasn1-${LIBTASN1_VERSION}.tar.gz" | tar -xz --strip 1 -C /tmp/libtasn1
RUN /tmp/build-libtasn1.sh

COPY build-libxshmfence.sh /tmp/build-libxshmfence.sh
RUN mkdir -p /tmp/libxshmfence && curl -# -L "https://www.x.org/releases/individual/lib/libxshmfence-${LIBXSHMFENCE_VERSION}.tar.bz2" | tar -xj --strip 1 -C /tmp/libxshmfence
RUN /tmp/build-libxshmfence.sh

COPY build-xkb.sh /tmp/build-xkb.sh
RUN mkdir -p /tmp/xkb && curl -# -L "https://www.x.org/archive/individual/data/xkeyboard-config/xkeyboard-config-${XKB_VERSION}.tar.bz2" | tar -xj --strip 1 -C /tmp/xkb
RUN /tmp/build-xkb.sh

COPY build-xkbcomp.sh /tmp/build-xkbcomp.sh
RUN mkdir -p /tmp/xkbcomp && curl -# -L "https://www.x.org/releases/individual/app/xkbcomp-${XKBCOMP_VERSION}.tar.bz2" | tar -xj --strip 1 -C /tmp/xkbcomp
RUN /tmp/build-xkbcomp.sh

COPY build-tigervnc.sh /tmp/build-tigervnc.sh
RUN mkdir -p /tmp/tigervnc \
    && curl -# -L "https://github.com/TigerVNC/tigervnc/archive/v${TIGERVNC_VERSION}.tar.gz" | tar -xz --strip 1 -C /tmp/tigervnc \
    && curl -# -L "https://github.com/freedesktop/xorg-xserver/archive/xorg-server-${XSERVER_VERSION}.tar.gz" | tar -xz --strip 1 -C /tmp/tigervnc/unix/xserver
RUN /tmp/build-tigervnc.sh

RUN xx-verify --static /tmp/tigervnc-install/usr/bin/Xvnc
RUN xx-verify --static /tmp/tigervnc-install/usr/bin/vncpasswd
RUN upx /tmp/tigervnc-install/usr/bin/Xvnc
RUN upx /tmp/tigervnc-install/usr/bin/vncpasswd

FROM scratch
COPY --from=builder /tmp/tigervnc-install/usr/bin/Xvnc      /fakeroot/usr/bin/Xvnc
COPY --from=builder /tmp/tigervnc-install/usr/bin/vncpasswd /fakeroot/usr/bin/vncpasswd
COPY --from=builder /tmp/xkbcomp-install/usr/bin/xkbcomp    /fakeroot/usr/bin/xkbcomp
COPY --from=builder /tmp/xkb-install/usr/share/X11/xkb      /fakeroot/usr/share/X11/xkb
