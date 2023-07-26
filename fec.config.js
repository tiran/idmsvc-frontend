module.exports = {
  appUrl: ['/settings/idmsvc'],
  debug: true,
  useProxy: true,
  useCloud: false,
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
    /* Add routes to the backend  */
    '/api/idmsvc/': { host: 'http://localhost:8000' },
    '/beta/api/idmsvc/': { host: 'http://localhost:8000' },
    '/preview/api/idmsvc/': { host: 'http://localhost:8000' },

    /* Add routes to the chrome-service*/
    '/api/chrome-service/v1/static/': { host: 'http://localhost:9999' },
    '/beta/api/chrome-service/v1/static/': { host: 'http://localhost:9999' },
    '/preview/api/chrome-service/v1/static/': { host: 'http://localhost:9999' },
  },
};
