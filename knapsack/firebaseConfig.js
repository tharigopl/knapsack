// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7TS36d2PCz_1ABQz-X0fgrVs7Jr6_DT4",
  authDomain: "stripefunctions-cdb57.firebaseapp.com",
  projectId: "stripefunctions-cdb57",
  storageBucket: "stripefunctions-cdb57.appspot.com",
  messagingSenderId: "170153844659",
  appId: "1:170153844659:web:f949f29a0fbf99358cf5c6",
  measurementId: "G-YNFL4MJDRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
//export const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };

