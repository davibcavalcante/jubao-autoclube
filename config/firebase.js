const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.resolve(__dirname, "serviceAccount.json");
const serviceAccount = require(serviceAccountPath);

class Firebase {
    connect() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: "jubao-autoclube.appspot.com"
        });
    }
};

module.exports = Firebase;