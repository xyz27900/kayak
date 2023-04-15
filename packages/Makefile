NPM_REGISTRY      = http://127.0.0.1:4873
ALL_PACKAGES      = $(shell find . -maxdepth 1 -type d | sed 's/^\.\///' | grep -v '^\.$$' | grep -v '^\..*')
PACKAGES_TO_LINT  = cli core cypress metamask playwright
PACKAGES_TO_TEST  = cli
PACKAGES_TO_BUILD = core metamask cypress playwright cli

.PHONY: lint
lint:
	@set -e; \
	for pkg in $(PACKAGES_TO_LINT); do \
		echo "[Lint] $$pkg"; \
		cd $$pkg && pnpm lint; \
		cd ..; \
	done

.PHONY: test
test:
	@set -e; \
	for pkg in $(PACKAGES_TO_TEST); do \
		echo "[Test] $$pkg"; \
		cd $$pkg && pnpm test; \
		cd ..; \
	done

.PHONY: build
build:
	@set -e; \
	for pkg in $(PACKAGES_TO_BUILD); do \
		echo "[Build] $$pkg"; \
		cd $$pkg && pnpm build; \
		cd ..; \
	done

.PHONY: publish
publish:
	@if [ -z "$(NPM_REGISTRY)" ]; then echo "NPM_REGISTRY is not set"; exit 1; fi
	@set -e; \
	for pkg in $(ALL_PACKAGES); do \
		echo "[Publish] $$pkg"; \
		cd $$pkg; \
		echo "$(NPM_REGISTRY)/:_authToken=$(NPM_AUTH_TOKEN)" > .npmrc; \
		pnpm publish --registry $(NPM_REGISTRY) --no-git-checks; \
		rm .npmrc; \
		cd ..; \
	done

.PHONY: unpublish
unpublish:
	@if [ -z "$(NPM_REGISTRY)" ]; then echo "NPM_REGISTRY is not set"; exit 1; fi
	@set -e; \
	for pkg in $(ALL_PACKAGES); do \
		echo "[Unpublish] $$pkg"; \
		cd $$pkg && pnpm unpublish --force --registry $(NPM_REGISTRY); \
		cd ..; \
	done

.PHONY: republish
republish:
	@make unpublish
	@make build
	@make publish
