# idm-domains-frontend

## Initial etc/hosts setup

In order to access the https://[env].foo.redhat.com in your browser, you have to add entries to your `/etc/hosts` file. This is a **one-time** setup that has to be done only once (unless you modify hosts) on each machine.

To setup the hosts file run following command:

```bash
npm run patch:hosts
```

If this command throws an error run it as a `sudo`:

```bash
sudo npm run patch:hosts
```

## Getting started

1. `make run`.

2. Open browser in URL listed in the terminal output.

3. Currently, `App.tsx` will throw a type error until your app is registered and a `navId` has been set.

Update `config/dev.webpack.config.js` according to your application URL. [Read more](https://github.com/RedHatInsights/frontend-components/tree/master/packages/config#useproxy).

### Testing

- Run unit tests by `make test`.
- Run linter by `make lint`.

## Development

Update `src/Api` from the openapi specification by running `make generate-api`.

* [Development Docs](docs/INDEX.md).
* [Pattern Fly 4 - Components](https://www.patternfly.org/v4/components/about-modal).
