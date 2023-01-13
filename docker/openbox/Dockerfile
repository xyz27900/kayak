ARG FONTCONFIG_IMAGE
ARG UPX_IMAGE
FROM ${FONTCONFIG_IMAGE} AS fontconfig
FROM ${UPX_IMAGE} AS upx

FROM --platform=$BUILDPLATFORM alpine:3.15 AS openbox
ARG TARGETPLATFORM
COPY --from=tonistiigi/xx / /
COPY --from=fontconfig /opt/fontconfig /tmp/fontconfig-install
COPY . /tmp/build
RUN /tmp/build/build.sh
RUN xx-verify --static \
    /tmp/openbox-install/usr/bin/openbox \
    /tmp/openbox-install/usr/bin/obxprop
COPY --from=upx /usr/bin/upx /usr/bin/upx
RUN upx /tmp/openbox-install/usr/bin/openbox
RUN upx /tmp/openbox-install/usr/bin/obxprop
