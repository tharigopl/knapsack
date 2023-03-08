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
  apiKey: "AIzaSyCOEFMt-omBPjjHaBpw6culaahIwf-CQKM",
  authDomain: "wunme-53e1d.firebaseapp.com",
  databaseURL: "https://wunme-53e1d-default-rtdb.firebaseio.com",
  projectId: "wunme-53e1d",
  storageBucket: "wunme-53e1d.appspot.com",
  messagingSenderId: "364205383599",
  appId: "1:364205383599:web:4fdf0f99a66a555c2cd95a",
  measurementId: "G-L7NDHVV8J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
//export const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };

