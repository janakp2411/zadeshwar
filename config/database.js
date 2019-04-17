const isDev = true; // make this flag true for dev else make false for production
const domain = "https://janakpatel.herokuapp.com";
const frontendServer = 'http://localhost:4200';
const backendServer = 'http://localhost:8080';
const baseUrl = (!isDev) ? domain : frontendServer;
const serverHost = (!isDev) ? domain : backendServer;
const fileUpload = (!isDev) ? './public/assets/imgs/' : './angular-src/src/assets/imgs/'

module.exports = {
  database: process.env.DATA_BASE_KEY,
  GEO_API: process.env.GEO_API,
  secret: process.env.SECRET_KEY,
  email:  process.env.EMAIL_NAME,
  baseUrl: baseUrl,
  serverHost: serverHost,
  userRole: 'userRole',
  uIfileUpload: './assets/imgs/',
  emailAPIkey: process.env.EMAIL_API_KEY
}
