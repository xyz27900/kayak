FROM --platform=$BUILDPLATFORM alpine:3.15

RUN apk --no-cache add \
    curl \
    ffmpeg

COPY crprobe /usr/bin/crprobe
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ffmpeg -y -f x11grab \
    -hide_banner \
    -loglevel error \
    -video_size "$DISPLAY_WIDTH"x"$DISPLAY_HEIGHT" \
    -r 25 \
    -i "$DISPLAY" \
    -pix_fmt yuv420p \
    /videos/"$VIDEO_FILENAME"
