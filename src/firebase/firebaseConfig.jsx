import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAusgDxj1SLtpuXYdEu4mQiUiaCpYM7gaA",
    authDomain: "my-project-2a29c.firebaseapp.com",
    projectId: "my-project-2a29c",
    storageBucket: "my-project-2a29c.firebasestorage.app",
    messagingSenderId: "826801983195",
    appId:" 1:826801983195:web:20ede4f50413201a78c6fe",
   
  };
  


const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
