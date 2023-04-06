PACKAGES_TO_LINT = cypress cypress-plugin playwright playwright-plugin

.PHONY: lint
lint:
	@set -e; \
	for pkg in $(PACKAGES_TO_LINT); do \
		echo "[Lint] $$pkg"; \
		cd $$pkg && pnpm lint; \
		cd ..; \
	done
