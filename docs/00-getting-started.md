# Getting Started

Tech stack used:

- [Typescript](https://www.typescriptlang.org/).
- [React](https://react.dev/).
- [ReactRouter](https://reactrouter.com/en/main).
- [Patternfly](https://www.patternfly.org/).
- [Axio](https://axios-http.com/docs/intro) - self-generated from openapi spec.
- [Jest](https://jestjs.io/) - test framework.
- [TODO TBD doc]() - generate documentation.
  - [Docz](https://www.docz.site/docs/introduction).

## Install tools

As the last version of fedora provides a higher version of nodejs than
the ones is used into the development environment, I suggest to use `nvm`
tool to move between different versions, and install and use the v16 of nodejs.

(not available) Another option if you are using vscode could be `devcontainer` which I think
is a better solution, which does not require add additional tools, and everything
to be used is self-contained into the development container. This approach does not
exists currently, so if you are a guru on that or just want to try to get it, feel
free to collaborate.

- [Installing nvm](https://github.com/nvm-sh/nvm#install--update-script).
- Install version by `nvm install v16`
- Use the required version `nvm use v16`
- From the repo directory run `make install-tools`

## Running chrome-service-backend locally

In one terminal:

- Clone `chrome-service-backend`.
- Run `make dev-static port=9999`.

From a second terminal:

- Go to your idm-domains-frontend repository.
- Edit `fec.config.js` to look like this (look at `routes` and
  `interceptChromeConfig`).

```js
module.exports = {
  appUrl: ['/settings/hmsidm'],
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  // interceptChromeConfig: true,
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  _unstableHotReload: process.env.HOT === 'true',
  routes: {
    '/api/hmsidm/': {
      host: 'http://localhost:8000',
    },
    /* if using stage-beta you can comment the chrome-service proxy */
    '/api/chrome-service/v1/static/': {
      host: 'http://localhost:9999',
    },
  },
};
```

- run `make run`.

## Repository layout

```raw
api/      git submodule hooked up to the api version that satisfy the
          repository state.
config/   we can find the the local bonfire configuration file for this
          repository, so anyone could deploy the current repository state
          in the ephemeral environment. TODO
deploy/   hold the openshift template with the Frontend descriptor for the
          FE operator.
dist/     contains the generated files for the frontend.
docs/     any repo documentation file is stored here.
src/      the source code files
  Api/    self-generated code to communicate with the backend.
  Components/  shared components between different views for this micro-frontend.
  Routes/ hold the different pages
  Routes/*Page/Components components that only belongs to this page.

```

---

Next: [Create a component](01-create-component.md).
