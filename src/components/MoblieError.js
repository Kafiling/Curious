import React from 'react'
import { AuthProvider, firebaseApp } from 'Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



export default function MoblieError() {
    return (
        <div>

            <div className = 'FinishContainer'>
      <img className='FinishImg' id='img' alt ="Welcome.png"src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_cross_icon.svg" />
    </div>
    <div className = 'FinishContainer'>
    <div className="FinishInfo">ขออภัย!<br/><br/>ขนาดหน้าจอของมือถือไม่สามารถถ่ายทอดความสนุกและความรู้ที่แอพพลิเคชั่นของเราสามารถให้ได้<br/><br/>โปรดใช้แอพพลิเคชั่นของเราใน Computer หรือ Tablet</div>
    </div>
        </div>
    )
}
