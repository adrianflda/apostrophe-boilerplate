var path = require('path');

var apos = require('apostrophe')({
  shortName: 'apostrophe-boilerplate',
  baseUrl: 'https://apostrophe.dnsroute53test.net',

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.

  modules: {

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    'apostrophe-templates': {
      viewsFolderFallback: path.join(__dirname, 'views')
    },
    'apostrophe-db': {
      uri: `mongodb://${process.env.MONGODB_PORT_27017_TCP_ADDR}:${process.env.MONGODB_PORT_27017_TCP_PORT}/oauth2`
    },
    'apostrophe-passport': {
      strategies: [
        {
          // google login via openauth
          // You must npm install --save this module in your project first
          module: 'passport-oauth2',
          // Default is to match usernames, google has none, so match on emails
          match: 'email',
          // IMPORTANT: accept only users with an email address at our company
          //emailDomain: 'mycompany.com',
          options: {
            // options for passport-google-oauth20, see the documentation of
            // that module, you do not have to set callbackURL    
            authorizationURL: 'https://auth.vrewardsapps.com/oauth2/authorize',
            tokenURL: 'https://auth.vrewardsapps.com/oauth2/token',
            clientID: '00000000-0000-0000-0000-000000000017',
            clientSecret: 'h45nAT7L_LPpX_2AzaYEefrOn0A91kdAysdg3zZfcQQ',
            callbackURL: 'https://apostrophe.dnsroute53test.net/auth/oauth2/callback',
            passReqToCallback: true
          },
          // Options that must be passed to the authenticate middleware
          authenticate: {
            // minimum scopes for matching logins based on email addresses.
            // profile is absolutely required, you almost certainly want email too
            scope: ['profile']
          }
        }
      ],
      // Presence of "create" key means we'll create users on the fly
      create: {
        // Presence of "group" means we'll add them to a group...
        group: {
          // Called "google"...
          title: 'fusion',
          // With these Apostrophe permissions (admin can do ANYTHING, so be careful)
          permissions: ['admin']
        }
      }
    },
    'apostrophe-login': {
      // We disable it here, by configuring the built-in apostrophe-login` module
      localLogin: false
    }

  }
});
