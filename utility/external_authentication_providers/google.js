const {OAuth2Client} = require('google-auth-library');
const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: process.env.GOOGLE_REDIRECT // this must match your google api settings
};

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email'
];

function getClient(){
    return new OAuth2Client(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}


function getAuthUrl() {
    const oAuth2Client = getClient()
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: defaultScope,
        prompt: 'consent'
    });

    return authorizeUrl
}



async function getLoginRedirect() {
    const url = getAuthUrl(); // this is from previous step
    return url;
}

async function getEmailFromGoogle(code) {

    const oAuth2Client = getClient();
    const result = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(result.tokens);
    const info = await oAuth2Client.getTokenInfo(oAuth2Client.credentials.access_token);
    return info.email
}


module.exports = {getLoginRedirect,getEmailFromGoogle}