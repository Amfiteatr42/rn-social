import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDSizRkbAqxO6n49MHOwZmxirzPuRwGVc",
  authDomain: "react-native-tet.firebaseapp.com",
  projectId: "react-native-tet",
  storageBucket: "react-native-tet.appspot.com",
  messagingSenderId: "652283795083",
  appId: "1:652283795083:web:07525d29c11608586ea68e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
