// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAc7BiRVIVERcmjcWYkq_X5WHA_oekmizo",
  authDomain: "myblog-webapp-imagedb.firebaseapp.com",
  projectId: "myblog-webapp-imagedb",
  storageBucket: "myblog-webapp-imagedb.appspot.com",
  messagingSenderId: "233387874491",
  appId: "1:233387874491:web:5c1f40958dc69c1bc2b19e",
  measurementId: "G-ZD02DWN4EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const imageDB = getStorage(app);