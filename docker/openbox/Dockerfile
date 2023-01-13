ARG FONTCONFIG_IMAGE
ARG UPX_IMAGE
FROM ${FONTCONFIG_IMAGE} AS fontconfig
FROM ${UPX_IMAGE} AS upx

FROM --platform=$BUILDPLATFORM alpine:3.15 AS openbox
ARG TARGETPLATFORM
COPY --from=tonistiigi/xx / /
COPY --from=fontconfig /opt/fontconfig /tmp/fontconfig-install

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

COPY meson-cross.sh /tmp/meson-cross.sh
RUN /tmp/meson-cross.sh

COPY . /tmp/build
RUN /tmp/build/build.sh
RUN xx-verify --static \
    /tmp/openbox-install/usr/bin/openbox \
    /tmp/openbox-install/usr/bin/obxprop
COPY --from=upx /usr/bin/upx /usr/bin/upx
RUN upx /tmp/openbox-install/usr/bin/openbox
RUN upx /tmp/openbox-install/usr/bin/obxprop
