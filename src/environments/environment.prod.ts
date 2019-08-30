export const environment = {
    production: true,
    baseUrl: '/api/v2/',
    allowRegistration: false,
    security: {
        google_auth: {
            authority: 'https://accounts.google.com',
            client_id: '963812180237-ktpv0d9k7ulvmmdmqbtu4418v1j29v3t.apps.googleusercontent.com',
            redirect_uri: 'https://footballpickem.org/assets/oidc-login-redirect.html',
            response_type: 'token id_token',
            scope: 'openid profile email',
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
