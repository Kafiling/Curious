import React from 'react'
import { AuthProvider, firebaseApp } from 'Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { isMobileOnly } from "react-device-detect";
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



export default function Homepage() {
  
    function reDirect(){
        if(auth.currentUser){
        window.location.replace("/v1.0/courses");
        } 
        if (isMobileOnly){
          window.location.replace("/v1.0/moblie_error");
        }
        setTimeout(reDirect, 200)
    }
    

    const  signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }
    const  signInWithFacebook = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider);
      }
    const  signInWithAnonymous = () => {
        firebase.auth().signInAnonymously()
      }
      
      reDirect()

    return (
        <div>

            <div className = 'FinishContainer'>
      <img className='FinishImg' id='img' alt ="Welcome.png"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/real_logo.svg?alt=media&token=cb7a42a7-f46f-4dba-82fa-6b128e49388a" />
    </div>
    <div className = 'FinishContainer'>
    <div className="FinishInfo">ยินดีต้อนรับเข้าสู่ Curious!<br/><br/>กรุณา login เพื่อเข้าใช้งาน</div>
    </div>

    < div className = 'FinishContainer'>
      <button className = "btn btn-glow btn-secondary" style = {{backgroundColor: "rgb(var(--secondary-color))" }} onClick={() => signInWithGoogle()}>Sign in with Google</button>
      <button className = "btn btn-glow btn-secondary" style = {{backgroundColor: "rgb(var(--secondary-color))" }} onClick={() => signInWithFacebook()}>Sign in with Facebook</button>
      <button className = "btn btn-glow btn-secondary" style = {{backgroundColor: "rgb(var(--secondary-color))" }} onClick={() => signInWithAnonymous()}>Sign in Anonymously</button>
    </div>
        </div>
    )
}
