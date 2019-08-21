// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    baseUrl: 'http://localhost/api/v2/',
    security: {
        indentyServer: {
            apiRoot: 'https://securinganglarappscourse-api.azurewebsites.net',
            stsAuthority: 'https://securingangularappscourse-sts.azurewebsites.net',
            client_id: 'spa-client',
            redirect_url: `https://localhost:4200/assets/oidc-login-redirect.html`,
            scope: 'openid project-api profile',
            response_type: 'id_token token',
            post_logout_redirect_url: 'https://localhost:4200?postlogout=true',
            userStore: null
        },
        auth0: {
            authority: 'https://softinsight.auth0.com/',
            client_id: 'FVZYzaiuyFYR4bxPTtSriqNLgAE69Btn',
            redirect_uri: `https://localhost:4200/assets/oidc-login-redirect.html`,
            scope: 'openid project-api profile',
            response_type: 'id_token token',
            post_logout_redirect_url: 'https://localhost:4200?postlogout=true',
            metadata: {
                authorization_endpoint: `https://softinsignt.auth0.com/authorize?audience=project-api`,
                issuer: `https://softinsignt.auth0.com/`,
                jwks_uri: `https://softinsignt.auth0.com/.well-known/jwks.json`,
                end_session_endpoint: ``
            },
            userStore: null
        },
        google_auth: {
            // need an authority or metadataurl...
            authority: 'https://accounts.google.com',
            // stsServer: 'https://acounts/google.com',
            client_id: '963812180237-ktpv0d9k7ulvmmdmqbtu4418v1j29v3t.apps.googleusercontent.com',
            redirect_uri: 'https://localhost:4200/assets/oidc-login-redirect.html',
            response_type: 'token id_token',
            scope: 'openid profile email',
            post_logout_redirect_url: 'https://localhost:4200?postlogout=true',
            metadata: {
                issuer: 'https://accounts.google.com',
                authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
                token_endpoint: 'https://oauth2.googleapis.com/token',
                userinfo_endpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
                end_session_endpoint: 'https://oauth2.googleapis.com/revoke',
                revocation_endpoint: "https://oauth2.googleapis.com/revoke",
                jwks_uri: 'https://www.googleapis.com/oauth2/v3/certs',
            },
            userStore: null,
            project_id: 'footballpickem',
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_secret: 'o_3K56BXN15TkZwsZcYT0q5f',
            redirect_uris: [
                'https://footballpickem.net/assets/oidc-login-redirect.html',
                'https://localhost/assets/oidc-login-redirect.html'
            ],
            javascript_origins: [
                'https://footballpickem.net',
                'http://localhost'
            ]
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
