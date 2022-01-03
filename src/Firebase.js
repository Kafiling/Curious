//Import React 
import react, { useState , useEffect } from 'react';

//Import Firebase SDK
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



//initialize Firebase
export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCLzwwu-Ag4jcnkxWNl_kQ41kziCCFRFVs",
  authDomain: "keep-curious.firebaseapp.com",
  projectId: "keep-curious",
  storageBucket: "keep-curious.appspot.com",
  messagingSenderId: "968580312590",
  appId: "1:968580312590:web:731281b07985cd799ed65f",
  measurementId: "G-D2NMVZ97XT"
  })
  
//ประกาศตัวแปรของ Firebase Service
export const auth = firebase.auth();
export const db = firebase.firestore();

export const AuthContext = react.createContext()

export const AuthProvider = ({ children }) => {
const [currentUser, SetCurrentUser] = useState(null)
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      SetCurrentUser(user)
    })
   
  }, [])

return (
<AuthContext.Provider value = {{currentUser}}>
  {children}
</AuthContext.Provider>
)
}
 

