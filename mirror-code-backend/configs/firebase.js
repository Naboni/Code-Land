const admin = require('firebase-admin');

const serviceAccount = require('../mirror-code-firebase-adminsdk.json');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mirror-code.firebaseio.com',
});

module.exports = { app };
