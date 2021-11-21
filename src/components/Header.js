import React from 'react'
import {Link } from 'react-router-dom'
//Import Firebase SDK
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
//initialize Firebase
firebase.initializeApp({
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


export default function Header(){
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
  