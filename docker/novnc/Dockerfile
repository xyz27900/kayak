FROM --platform=$BUILDPLATFORM alpine:3.15 AS builder

ARG NOVNC_VERSION

RUN apk --no-cache --virtual .build-deps add \
    curl \
    git \
    && mkdir /tmp/noVNC \
    && curl -# -L "https://github.com/novnc/noVNC/archive/refs/tags/v${NOVNC_VERSION}.tar.gz" | tar -xz --strip 1 -C /tmp/noVNC \
    && cd /tmp/noVNC \
    && git clone "https://github.com/novnc/websockify" /tmp/noVNC/utils/websockify \
    && apk del .build-deps \
    && mv /tmp/noVNC /opt/noVNC

FROM scratch
COPY --from=builder /opt/noVNC /opt/noVNC
