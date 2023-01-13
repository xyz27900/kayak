ARG UPX_IMAGE=kayak/upx:latest

FROM --platform=$BUILDPLATFORM alpine:3.15 AS builder
ARG TARGETPLATFORM

COPY --from=tonistiigi/xx / /
COPY --from=$UPX_IMAGE /usr/bin/upx /usr/bin/upx

ENV CFLAGS="-Os -fomit-frame-pointer" \
    CXXFLAGS="$CFLAGS" \
    CPPFLAGS="$CFLAGS" \
    LDFLAGS="-Wl,--as-needed --static -static -Wl,--strip-all" \
    CC=xx-clang

RUN apk --no-cache add \
    git \
    build-base \
    clang \
    autoconf \
    automake \
    util-macros

RUN xx-apk --no-cache --no-scripts add \
    g++ \
    xproto \
    xcb-util-dev \
    libx11-dev \
    libx11-static \
    libxcb-static \
    libxmu-dev

COPY build-xset.sh /tmp/build-xset.sh
RUN git clone "https://gitlab.freedesktop.org/xorg/app/xset" /tmp/xset
RUN /tmp/build-xset.sh

RUN xx-verify --static /tmp/xset-install/usr/bin/xset
RUN upx /tmp/xset-install/usr/bin/xset

FROM scratch
COPY --from=builder /tmp/xset-install/usr/bin/xset /fakeroot/usr/bin/xset
