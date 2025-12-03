import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

const serviceAccountPath = resolve("./firebase.json");

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const db = admin.firestore();
