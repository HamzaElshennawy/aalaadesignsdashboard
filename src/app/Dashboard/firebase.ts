import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrTECdorMUotOIwdAzCx_bYJrOCsqgGno",

  authDomain: "aalaadesigns1.firebaseapp.com",

  projectId: "aalaadesigns1",

  storageBucket: "aalaadesigns1.appspot.com",

  messagingSenderId: "796146413795",

  appId: "1:796146413795:web:e3a8efd384b80681c295d6",

  measurementId: "G-S21BW8874B",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
