ARG CRDETECTOR_IMAGE
FROM ${CRDETECTOR_IMAGE} AS crdetector

FROM --platform=$BUILDPLATFORM node:16-bullseye-slim AS cypress

RUN npm install -g cypress

FROM --platform=$BUILDPLATFORM node:16-bullseye-slim

COPY --from=crdetector /fakeroot /
COPY --from=cypress /root/.cache/Cypress /root/.cache/Cypress
COPY xprobe /usr/bin/xprobe
COPY install-chromium.sh /install-chromium.sh
COPY entrypoint.sh /entrypoint.sh

RUN apt update && apt install -y --no-install-recommends \
    libnotify-bin \
    x11-xserver-utils \
    && rm -rf /var/lib/apt/lists/*

RUN /install-chromium.sh

ENV KAYAK_DOCKER=true

ENTRYPOINT ["/entrypoint.sh"]
