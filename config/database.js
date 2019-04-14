const isDev = true; // make this flag true for dev else make false for production
const domain = "https://janakpatel.herokuapp.com";
const frontendServer = 'http://localhost:4200';
const backendServer = 'http://localhost:8080';
const baseUrl = (!isDev) ? domain : frontendServer;
const serverHost = (!isDev) ? domain : backendServer;
const fileUpload = (!isDev) ? './public/assets/imgs/' : './angular-src/src/assets/imgs/'
const GEO_API = "AIzaSyAKI3dAptAxQRezsMG7yIrGYl9BzxqsdSY";

module.exports = {
  // configure the code below with your username, password and mlab database information
  database: 'mongodb://zadeshwar:zadeshwar123@ds233806.mlab.com:33806/zadeshwar',   //prod
  //database: 'mongodb://localhost:27017/meanauth',    //dev
  secret: 'yoursecret',
  email: 'janakp2411@gmail.com',
  baseUrl: baseUrl,
  serverHost: serverHost,
  userRole: 'userRole',
  uIfileUpload: './assets/imgs/',
  emailAPIkey: "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"
}
