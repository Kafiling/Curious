//Import React 
import react, { useState , useEffect } from 'react';

//Import Firebase SDK
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



//initialize Firebase
export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAkEuo0aQSQzpO4quILJXe36eq-sgOWHHQ",
    authDomain: "lab-anywhere.firebaseapp.com",
    projectId: "lab-anywhere",
    storageBucket: "lab-anywhere.appspot.com",
    messagingSenderId: "513398828622",
    appId: "1:513398828622:web:4c2a5ea10909b928e7dd1f",
    measurementId: "G-P7LGDRT24B"
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
 

