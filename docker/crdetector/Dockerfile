ARG UPX_IMAGE
FROM ${UPX_IMAGE} AS upx

FROM --platform=$BUILDPLATFORM golang:1.19-alpine3.15 AS builder
ARG TARGETPLATFORM

COPY --from=tonistiigi/xx / /
COPY --from=upx /usr/bin/upx /usr/bin/upx

ENV CGO_ENABLED=1

RUN apk --no-cache add \
    clang \
    lld

RUN xx-apk --no-cache --no-scripts add \
    musl-dev \
    gcc

COPY app /app

RUN cd /app \
    && xx-go mod tidy \
    && xx-go build \
        -ldflags "-linkmode external -extldflags -static" -a \
        -o /app/crdetector \
        /app/crdetector.go

RUN xx-verify --static /app/crdetector
RUN upx /app/crdetector

FROM scratch
COPY --from=builder /app/crdetector /fakeroot/usr/bin/crdetector
