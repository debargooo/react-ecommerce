
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCXY9XLEK5Lw1WwYBwa1IVGNPYneDkdj-E",
  authDomain: "e-commerce-react-7c31e.firebaseapp.com",
  databaseURL: "https://e-commerce-react-7c31e-default-rtdb.firebaseio.com",
  projectId: "e-commerce-react-7c31e",
  storageBucket: "e-commerce-react-7c31e.appspot.com",
  messagingSenderId: "78616003588",
  appId: "1:78616003588:web:f4bed75ecf222cbfed6151"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });


const db = getFirestore(app);

export { auth, db };
export default app;
