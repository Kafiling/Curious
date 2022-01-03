import react, { Component , useState , useEffect } from 'react';
import {Link } from 'react-router-dom'
//Import Firebase SDK
import { AuthProvider, firebaseApp } from 'Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
//initialize Firebase
firebase.initializeApp({
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


export default function Header(){
  const [user, setUser] = useState(null);
    useEffect(() =>{
      firebaseApp.auth().onAuthStateChanged(user=> {
  setUser(user)
      })}, []);

    const  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);

    
  }
    if (auth.currentUser == null) {
      return(<div className = "Header">
      <li></li>
      <li className = "Curious">Curious</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li onClick={signInWithGoogle}>Sign in with Google</li>
      <li></li>
      </div>
      )
    }
  
  else{
    return auth.currentUser && (
      <div className = "Header">
      <li></li>
      <li className = "Curious">Curious</li>
      <li></li>
      <li><Link to = "/">Home</Link></li>
      <li><Link to = "/dashboard">Dashboard</Link></li>
      <li><Link to = "/courses">Courses</Link></li>
      <li><Link to = "/about_us">About Us</Link></li>
      <li></li>
      <li onClick = {() => auth.signOut()} >Sign Out</li>
      <li></li>
      </div>
    )}
  }
  