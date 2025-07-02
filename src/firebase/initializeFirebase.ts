import * as admin from "firebase-admin";

export const initializeFirebase = () => {
  let app = null;

  const pathUrl = __dirname + "../configuration/firebaseKeys/asahi_key.json";
  const serviceAccount = require(pathUrl);

  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return app;
};
