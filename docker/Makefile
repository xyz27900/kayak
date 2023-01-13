FONTCONFIG_VERSION		= 2.14.0
GNUTLS_VERSION			= 3.7.1
LIBFONTENC_VERSION		= 1.1.4
LIBTASN1_VERSION		= 4.17.0
LIBXFONT2_VERSION		= 2.0.4
LIBXRANDR_VERSION		= 1.5.3
LIBXSHMFENCE_VERSION	= 1.3
NOVNC_VERSION			= 1.3.0
PANGO_VERSION			= 1.49.3
TIGERVNC_VERSION		= 1.12.0
XKB_VERSION 			= 2.32
XKBCOMP_VERSION			= 1.4.5
XSERVER_VERSION			= 1.20.13

USER_ID					= 1000
GROUP_ID				= 1000
USER_NAME				= kayak
GROUP_NAME				= kayak

PLATFORM				= linux/arm64/v8

CRDETECTOR_IMAGE		= kayak/crdetector
FONTCONFIG_IMAGE		= kayak/fontconfig:latest
NOVNC_IMAGE				= kayak/novnc:latest
TIGERVNC_IMAGE			= kayak/tigervnc:latest
UPX_IMAGE				= kayak/upx:latest

all: anvil chromium display ffmpeg
	@docker system prune -f

.PHONY: anvil
anvil:
	@docker buildx build \
		--progress=plain \
		--load \
		--platform $(PLATFORM) \
		--tag kayak/anvil:latest \
		--file anvil/Dockerfile anvil

.PHONY: chromium
chromium: crdetector
	@docker buildx build \
		--progress=plain \
		--load \
		--build-arg CRDETECTOR_IMAGE=$(CRDETECTOR_IMAGE) \
		--platform $(PLATFORM) \
		--tag kayak/chromium:cypress \
		--file chromium/Dockerfile.cypress chromium

	@docker buildx build \
		--progress=plain \
		--load \
		--build-arg CRDETECTOR_IMAGE=$(CRDETECTOR_IMAGE) \
		--platform $(PLATFORM) \
		--tag kayak/chromium:playwright \
		--file chromium/Dockerfile.playwright chromium

.PHONY: crdetector
crdetector: upx
	@docker buildx build \
		--progress=plain \
		--load \
		--build-arg UPX_IMAGE=$(UPX_IMAGE) \
		--platform $(PLATFORM) \
		--tag kayak/crdetector:latest \
		--file crdetector/Dockerfile crdetector

.PHONY: display
display: novnc tigervnc
	@docker buildx build \
		--progress=plain \
		--load \
		--build-arg FONTCONFIG_IMAGE=$(FONTCONFIG_IMAGE) \
		--build-arg NOVNC_IMAGE=$(NOVNC_IMAGE) \
		--build-arg TIGERVNC_IMAGE=$(TIGERVNC_IMAGE) \
		--build-arg USER_ID=$(USER_ID) \
		--build-arg GROUP_ID=$(GROUP_ID) \
		--build-arg USER_NAME=$(USER_NAME) \
		--build-arg GROUP_NAME=$(GROUP_NAME) \
		--platform $(PLATFORM) \
		--tag kayak/display:latest \
		--file display/Dockerfile display

.PHONY: ffmpeg
ffmpeg:
	@docker buildx build \
		--progress=plain \
		--load \
		--platform $(PLATFORM) \
		--tag kayak/ffmpeg:latest \
		--file ffmpeg/Dockerfile ffmpeg

.PHONY: fontconfig
fontconfig:
	@docker buildx build \
		--progress=plain \
		--load \
		--build-arg FONTCONFIG_VERSION=$(FONTCONFIG_VERSION) \
		--platform $(PLATFORM) \
		--tag kayak/fontconfig:latest \
		--file fontconfig/Dockerfile fontconfig

.PHONY: novnc
novnc:
	@docker buildx build \
		--progress=plain \
		--load \
		--build-arg NOVNC_VERSION=$(NOVNC_VERSION) \
		--platform $(PLATFORM) \
		--tag kayak/novnc:latest \
		--file novnc/Dockerfile novnc

.PHONY: tigervnc
tigervnc: upx
	@docker buildx build \
		--progress=plain \
		--load \
		--build-arg UPX_IMAGE=$(UPX_IMAGE) \
		--build-arg GNUTLS_VERSION=$(GNUTLS_VERSION) \
		--build-arg LIBFONTENC_VERSION=$(LIBFONTENC_VERSION) \
		--build-arg LIBTASN1_VERSION=$(LIBTASN1_VERSION) \
		--build-arg LIBXFONT2_VERSION=$(LIBXFONT2_VERSION) \
		--build-arg LIBXSHMFENCE_VERSION=$(LIBXSHMFENCE_VERSION) \
		--build-arg TIGERVNC_VERSION=$(TIGERVNC_VERSION) \
		--build-arg XKB_VERSION=$(XKB_VERSION) \
		--build-arg XKBCOMP_VERSION=$(XKBCOMP_VERSION) \
		--build-arg XSERVER_VERSION=$(XSERVER_VERSION) \
		--platform $(PLATFORM) \
		--tag kayak/tigervnc:latest \
		--file tigervnc/Dockerfile tigervnc

.PHONY: upx
upx:
	@docker buildx build \
		--progress=plain \
		--load \
		--platform $(PLATFORM) \
		--tag kayak/upx:latest \
		--file upx/Dockerfile upx
