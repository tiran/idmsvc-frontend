##
#
##

PUBLIC_OPENAPI = api/public.openapi.yaml
NODE_BIN = node_modules/.bin
APIDIR = src/Api

$(NODE_BIN)/%: package.json package-lock.json
	npm install
	touch $(NODE_BIN)/*

$(PUBLIC_OPENAPI):
	git submodule update --init

.PHONY: build
build: $(NODE_BIN)/fec  ## Build the resulting javascript code
	npm run build

.PHONY: clean
clean:  ## Clean the build
	rm -rf dist

.PHONY: lint
lint:  $(NODE_BIN)/eslint $(NODE_BIN)/stylelint  ## Execute linters
	npm run lint

.PHONY: test
test:  $(NODE_BIN)/jest ## Execute unit tests
	npm run test

.PHONY: run
run:$(NODE_BIN)/fec  ## Execute frontend
	npm run start

.PHONY: generate-api
generate-api: $(NODE_BIN)/openapi-generator-cli $(PUBLIC_OPENAPI) ## Generate the API client from openapi specification
	npm run openapi-generator-cli -- generate -i "$(PUBLIC_OPENAPI)" -g typescript-axios -o .$(APIDIR)
	rm -f $(APIDIR)/.gitignore
	rm -f $(APIDIR)/.npmignore
	rm -f $(APIDIR)/git_push.sh
