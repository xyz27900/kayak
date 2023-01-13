FROM --platform=$BUILDPLATFORM alpine:3.15 AS builder
ARG TARGETPLATFORM

ARG FONTCONFIG_VERSION

COPY --from=tonistiigi/xx / /

ENV CFLAGS="-Os -fomit-frame-pointer" \
    CXXFLAGS="$CFLAGS" \
    CPPFLAGS="$CFLAGS" \
    LDFLAGS="-Wl,--strip-all -Wl,--as-needed" \
    CC=xx-clang \
    CXX=xx-clang++

RUN apk --no-cache add \
    curl \
    build-base \
    clang \
    pkgconfig \
    gperf \
    python3 \
    font-croscore

RUN xx-apk --no-cache --no-scripts add \
    glib-dev \
    g++ \
    freetype-dev \
    expat-dev

COPY build-fontconfig.sh /tmp/build-fontconfig.sh
RUN mkdir -p /tmp/fontconfig && curl -# -L "https://www.freedesktop.org/software/fontconfig/release/fontconfig-${FONTCONFIG_VERSION}.tar.gz" | tar -xz --strip 1 -C /tmp/fontconfig
RUN /tmp/build-fontconfig.sh

FROM scratch
COPY --from=builder /tmp/fontconfig-install/config /opt/fontconfig/config
COPY --from=builder /tmp/fontconfig-install/usr /opt/fontconfig/usr
