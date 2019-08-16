export const environment = {
    production: true,
    baseUrl: '/api/v3/',
    security: {
        indentyServer: {
            apiRoot: 'https://securinganglarappscourse-api.azurewebsites.net',
            stsAuthority: 'https://securingangularappscourse-sts.azurewebsites.net',
            client_id: 'spa-client',
            redirect_url: `https://localhost:4200/assets/oidc-login-redirect.html`,
            scope: 'openid project-api profile',
            response_type: 'id_token token',
            post_logout_redirect_url: 'https://localhost:4200?postlogout=true'
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
            }
        },
        google_auth: {
            // need an authority or metadataurl...
            authority: 'https://acounts/google.com',
            client_id: '963812180237-ktpv0d9k7ulvmmdmqbtu4418v1j29v3t.apps.googleusercontent.com',
            redirect_uri: 'http://footballpickem.org/assets/oidc-login-redirect.html',
            response_type: 'id_token token',
            scope: 'openid',
            post_logout_redirect_url: 'https://footballpickem.org?postlogout=true',
            metadata: {
                issuer: 'https://accounts.google.com',
                authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
                token_endpoint: 'https://oauth2.googleapis.com/token',
                userinfo_endpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
                end_session_endpoint: 'https://oauth2.googleapis.com/revoke',
                jwks_uri: 'https://www.googleapis.com/oauth2/v3/certs',
            }
        }
    }
};
