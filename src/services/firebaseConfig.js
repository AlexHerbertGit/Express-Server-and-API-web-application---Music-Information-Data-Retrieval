const admin = require('firebase-admin');


const serviceAccount = require('../web601-api-backend-firebase-adminsdk-c1t1q-97180fe1df.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
