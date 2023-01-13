FROM --platform=$BUILDPLATFORM alpine:3.15

ARG USER_ID
ARG GROUP_ID
ARG USER_NAME
ARG GROUP_NAME

COPY --from=kayak/fontconfig /opt/fontconfig/usr /usr
COPY --from=kayak/novnc /opt/noVNC /opt/noVNC
COPY --from=kayak/openbox /fakeroot /
COPY --from=kayak/tigervnc /fakeroot /
COPY fakeroot /
COPY init /init

RUN apk add --no-cache \
    sudo \
    bash \
    procps \
    # Has to be replaced with more lightweight alternative
    supervisor \
    xhost \
    xrdb \
    xterm

ENV VNC_PORT=5900 \
    WEB_PORT=5800

ENV USER_ID=$USER_ID \
    GROUP_ID=$GROUP_ID \
    USER_NAME=$USER_NAME \
    GROUP_NAME=$GROUP_NAME

RUN addgroup -g $GROUP_ID $GROUP_NAME && \
    adduser -D -u $USER_ID -G $GROUP_NAME $USER_NAME && \
    echo "$USER_NAME ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

RUN mkdir -p /config/xdg/cache/fontconfig && chown $USER_ID:$GROUP_ID /config/xdg/cache/fontconfig
RUN mkdir -p /tmp/.X11-unix && chmod 1777 /tmp/.X11-unix

WORKDIR /home/$USER_NAME
USER $USER_NAME

EXPOSE 5800

CMD ["supervisord", "-c", "/etc/supervisord.conf"]
#CMD ["/init/init.sh", "/init/01-xvnc.sh", "/init/02-novnc.sh", "/init/03-openbox.sh", "/init/04-configure.sh"]
