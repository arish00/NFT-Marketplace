import { initializeApp } from "@firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "nft-marketplace-332cc.firebaseapp.com",
  projectId: "nft-marketplace-332cc",
  storageBucket: "nft-marketplace-332cc.appspot.com",
  messagingSenderId: "947056879952",
  appId: "1:947056879952:web:983c340f723d10c489e455",
  measurementId: "G-2F3V2G7QRY"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
