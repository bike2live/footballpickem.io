// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    baseUrl: 'http://localhost/api/v2/',
    allowRegistration: false,
    security: {
        indentyServer: {
            apiRoot: 'https://securinganglarappscourse-api.azurewebsites.net',
            stsAuthority: 'https://securingangularappscourse-sts.azurewebsites.net',
            client_id: 'spa-client',
            redirect_url: `http://localhost:4200/assets/oidc-login-redirect.html`,
            scope: 'openid project-api profile',
            response_type: 'id_token token',
            post_logout_redirect_url: 'http://localhost:4200?postlogout=true',
            userStore: null
        },
        auth0: {
            authority: 'https://softinsight.auth0.com/',
            client_id: 'FVZYzaiuyFYR4bxPTtSriqNLgAE69Btn',
            redirect_uri: `http://localhost:4200/assets/oidc-login-redirect.html`,
            scope: 'openid project-api profile',
            response_type: 'id_token token',
            post_logout_redirect_url: 'http://localhost:4200?postlogout=true',
            metadata: {
                authorization_endpoint: `https://softinsignt.auth0.com/authorize?audience=project-api`,
                issuer: `https://softinsignt.auth0.com/`,
                jwks_uri: `https://softinsignt.auth0.com/.well-known/jwks.json`,
                end_session_endpoint: `https://softinsight.auth0.com/v2/logout?returnTo=http://localhost:4200/?postLogout=true`
            },
            userStore: null
        },
        google_auth: {
            authority: 'https://accounts.google.com',
            client_id: '963812180237-ktpv0d9k7ulvmmdmqbtu4418v1j29v3t.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:4200/assets/oidc-login-redirect.html',
            response_type: 'token id_token',
            scope: 'openid profile email',
            post_logout_redirect_url: 'http://localhost:4200?postlogout=true'
        }
    }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
