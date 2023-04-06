ifneq (,$(wildcard ./.env))
    include .env
    export
endif

ifneq (,$(wildcard ../.env))
    include ../.env
    export
endif

.PHONY: npmrc
npmrc:
	@if [ -z "$(NPM_REGISTRY)" ]; then echo "NPM_REGISTRY is not set"; exit 1; fi
	@if [ -z "$(NPM_AUTH_TOKEN)" ]; then echo "NPM_AUTH_TOKEN is not set"; exit 1; fi
	@set -e; \
	for pkg in cli core cypress eslint-config metamask playwright; do \
		echo "[NPMRC] $$pkg"; \
		cd $$pkg && echo "$(NPM_REGISTRY)/:_authToken=$(NPM_AUTH_TOKEN)" > .npmrc
		cd ..; \
	done

.PHONY: lint
lint:
	@set -e; \
	for pkg in cli core cypress metamask playwright; do \
		echo "[Lint] $$pkg"; \
		cd $$pkg && pnpm lint; \
		cd ..; \
	done

.PHONY: build
build:
	@set -e; \
	for pkg in core metamask cypress playwright cli; do \
		echo "[Build] $$pkg"; \
		cd $$pkg && pnpm build; \
		cd ..; \
	done

.PHONY: publish
publish:
	@if [ -z "$(NPM_REGISTRY)" ]; then echo "NPM_REGISTRY is not set"; exit 1; fi
	@set -e; \
	for pkg in cli core cypress eslint-config metamask playwright; do \
		echo "[Publish] $$pkg"; \
		cd $$pkg && pnpm publish --registry $(NPM_REGISTRY) --no-git-checks; \
		cd ..; \
	done

.PHONY: unpublish
unpublish:
	@if [ -z "$(NPM_REGISTRY)" ]; then echo "NPM_REGISTRY is not set"; exit 1; fi
	@set -e; \
	for pkg in cli core cypress eslint-config metamask playwright; do \
		echo "[Unpublish] $$pkg"; \
		cd $$pkg && pnpm unpublish --force --registry $(NPM_REGISTRY); \
		cd ..; \
	done

.PHONY: republish
republish:
	@make unpublish
	@make build
	@make publish
