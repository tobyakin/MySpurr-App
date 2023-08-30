import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
 apiKey: "AIzaSyCdzHK_aLLyW7TNuCU0z1tMJXuFELyabDw",
  authDomain: "myspurr.firebaseapp.com",
  projectId: "myspurr",
  storageBucket: "myspurr.appspot.com",
  messagingSenderId: "51718199021",
  appId: "1:51718199021:web:19228dcb7f8e2be3ad5ee4",
  measurementId: "G-HBZH3Z3GX8"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }