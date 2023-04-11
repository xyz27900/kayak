ARG FONTCONFIG_IMAGE
ARG UPX_IMAGE

FROM ${FONTCONFIG_IMAGE} AS fontconfig
FROM ${UPX_IMAGE} AS upx

FROM --platform=$BUILDPLATFORM alpine:3.15 AS builder
ARG TARGETPLATFORM

ARG LIBXRANDR_VERSION
ARG OPENBOX_VERSION
ARG PANGO_VERSION

COPY --from=tonistiigi/xx / /
COPY --from=fontconfig /opt/fontconfig /tmp/fontconfig-install
COPY --from=upx /usr/bin/upx /usr/bin/upx

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
    glib-dev \
    && xx-apk --no-cache --no-scripts add \
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

RUN cp -av /tmp/fontconfig-install/usr $(xx-info sysroot)

COPY build-pango.sh /tmp/build-pango.sh
RUN mkdir -p /tmp/pango && curl -# -L "https://download.gnome.org/sources/pango/$(echo $PANGO_VERSION | cut -d. -f1-2)/pango-${PANGO_VERSION}.tar.xz" | tar -xJ --strip 1 -C /tmp/pango \
    && /tmp/build-pango.sh

COPY build-libxrandr.sh /tmp/build-libxrandr.sh
RUN mkdir -p mkdir /tmp/libxrandr && curl -# -L "https://www.x.org/releases/individual/lib/libXrandr-${LIBXRANDR_VERSION}.tar.xz" | tar -xJ --strip 1 -C /tmp/libxrandr \
    && /tmp/build-libxrandr.sh

COPY build-openbox.sh /tmp/build-openbox.sh
RUN mkdir -p /tmp/openbox \
    && curl -# -L "http://openbox.org/dist/openbox/openbox-${OPENBOX_VERSION}.tar.xz" | tar -xJ --strip 1 -C /tmp/openbox \
    && curl -# -L "https://raw.githubusercontent.com/gcc-mirror/gcc/master/config.sub" -o /tmp/openbox/config.sub \
    && /tmp/build-openbox.sh

RUN xx-verify --static /tmp/openbox-install/usr/bin/openbox \
    && xx-verify --static /tmp/openbox-install/usr/bin/obxprop

RUN upx /tmp/openbox-install/usr/bin/openbox \
    && upx /tmp/openbox-install/usr/bin/obxprop

FROM scratch
COPY --from=builder /tmp/openbox-install/usr/bin/openbox /fakeroot/usr/bin/openbox
COPY --from=builder /tmp/openbox-install/usr/bin/obxprop /fakeroot/usr/bin/obxprop
