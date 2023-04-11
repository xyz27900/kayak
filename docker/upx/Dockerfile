FROM --platform=$BUILDPLATFORM alpine:3.15 AS builder
RUN apk --no-cache add build-base curl make cmake git \
    && mkdir /tmp/upx \
    && curl -# -L https://github.com/upx/upx/releases/download/v4.0.1/upx-4.0.1-src.tar.xz | tar xJ --strip 1 -C /tmp/upx \
    && make -C /tmp/upx build/release-gcc -j$(nproc) \
    && cp -v /tmp/upx/build/release-gcc/upx /usr/bin/upx

FROM scratch
COPY --from=builder /usr/bin/upx /usr/bin/upx
