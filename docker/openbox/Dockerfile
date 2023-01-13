ARG FONTCONFIG_IMAGE
ARG UPX_IMAGE
FROM ${FONTCONFIG_IMAGE} AS fontconfig
FROM ${UPX_IMAGE} AS upx

FROM --platform=$BUILDPLATFORM alpine:3.15 AS openbox
ARG TARGETPLATFORM

ARG LIBXRANDR_VERSION
ARG OPENBOX_VERSION
ARG PANGO_VERSION

COPY --from=tonistiigi/xx / /
COPY --from=fontconfig /opt/fontconfig /

ENV CFLAGS="-Os -fomit-frame-pointer" \
    CXXFLAGS="$CFLAGS" \
    CPPFLAGS="$CFLAGS" \
    LDFLAGS="-Wl,--as-needed --static -static -Wl,--strip-all" \
    CC=xx-clang-wrapper \
    CXX=xx-clang++

RUN apk --no-cache add \
    curl \
    build-base \
    clang \
    meson \
    pkgconfig \
    patch \
    glib-dev

RUN xx-apk --no-cache --no-scripts add \
    g++ \
    glib-dev \
    glib-static \
    fribidi-dev \
    fribidi-static \
    harfbuzz-dev \
    harfbuzz-static \
    cairo-dev \
    cairo-static \
    libxft-dev \
    libxml2-dev \
    libx11-dev \
    libx11-static \
    libxcb-static \
    libxdmcp-dev \
    libxau-dev \
    freetype-static \
    expat-static \
    libpng-dev \
    libpng-static \
    zlib-static \
    bzip2-static \
    pcre-dev \
    libxrender-dev \
    graphite2-static \
    libffi-dev \
    xz-dev \
    brotli-static

# https://github.com/jlesage/docker-baseimage-gui/blob/master/src/openbox/xx-clang-wrapper
COPY xx-clang-wrapper /usr/bin/xx-clang-wrapper

COPY meson-cross.sh /tmp/meson-cross.sh
RUN /tmp/meson-cross.sh

COPY . /tmp/build

COPY build-pango.sh /tmp/build-pango.sh
RUN mkdir -p /tmp/pango && curl -# -L "https://download.gnome.org/sources/pango/$(echo $PANGO_VERSION | cut -d. -f1-2)/pango-${PANGO_VERSION}.tar.xz" | tar -xJ --strip 1 -C /tmp/pango
RUN /tmp/build-pango.sh

COPY build-libxrandr.sh /tmp/build-libxrandr.sh
RUN mkdir -p mkdir /tmp/libxrandr && curl -# -L "https://www.x.org/releases/individual/lib/libXrandr-${LIBXRANDR_VERSION}.tar.xz" | tar -xJ --strip 1 -C /tmp/libxrandr
RUN /tmp/build-libxrandr.sh

RUN mkdir -p /tmp/openbox && curl -# -L "http://openbox.org/dist/openbox/openbox-${OPENBOX_VERSION}.tar.xz" | tar -xJ --strip 1 -C /tmp/openbox
# https://github.com/gcc-mirror/gcc/blob/master/config.sub
COPY config.sub /tmp/openbox/config.sub

RUN /tmp/build/build.sh
RUN xx-verify --static \
    /tmp/openbox-install/usr/bin/openbox \
    /tmp/openbox-install/usr/bin/obxprop
COPY --from=upx /usr/bin/upx /usr/bin/upx
RUN upx /tmp/openbox-install/usr/bin/openbox
RUN upx /tmp/openbox-install/usr/bin/obxprop
