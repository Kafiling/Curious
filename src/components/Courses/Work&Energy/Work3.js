import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {CorrectAlert, IncorrectAlert, UpvoteAlert, ReportAlert} from './Alert'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function Work3() {
// Set Page
var [page, setPage] = useState(1);
//Var Answered
var [Answer2, setAnswer2] = useState(false);
var [Answer3, setAnswer3] = useState(false);
var [Answer4, setAnswer4] = useState(false);
var [Answer5, setAnswer5] = useState(false);
var [Answer6, setAnswer6] = useState(false);
//Var Score
const TotalQuestionNum = useRef(5)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
const ScoreQuestion2 = useRef(0)
const ScoreQuestion3 = useRef(0)
const ScoreQuestion4 = useRef(0)
const ScoreQuestion5 = useRef(0)
const ScoreQuestion6 = useRef(0)
//Alert
const AlertState = useRef(0)
var [Upvote, setUpvote] = useState(false);
var [Report, setReport] = useState(false);
const ReportText = useRef(null)
//Var currentUser (Context from Firebase.js)
const {currentUser} = useContext(AuthContext)

function resetAlert(){
  AlertState.current = 0
}

function handleUpvote(){
  if(Upvote === false){
    db.collection('feedback').doc('upvote').update({
      work3 : firebase.firestore.FieldValue.increment(1)
    })
    setUpvote(true)
    AlertState.current = 3
    setTimeout(resetAlert,3000)}
  
  else{alert('You already upvote this course')}
}

function handleReport(){
  if(Report === false){
    ReportText.current = prompt('โปรดระบุข้อผิดพลาด/เฉลยผิด/โจทย์ผิด/ข้อติชม')
    db.collection('report').doc(currentUser.providerData[0]['uid']).set({
      Work3: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}

function sumScore(){
  
  TotalScore.current =  ScoreQuestion2.current + ScoreQuestion3.current + ScoreQuestion4.current + ScoreQuestion5.current + ScoreQuestion6.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    Work3: CompletionScore.current
}, { merge: true });
  

}

  //เช็คคำตอบถูก-ผิด
function correct(QuestionPage){
  //เช็คถูก
  AlertState.current = 1
  setTimeout(resetAlert,3000)
  switch(QuestionPage){
    case 2 :setAnswer2(true)
    ScoreQuestion2.current = 1
      break;
    case 3 :setAnswer3(true)
    ScoreQuestion3.current = 1
      break;
    case 4 :setAnswer4(true)
    ScoreQuestion4.current = 1
      break;
    case 5 :setAnswer5(true)
    ScoreQuestion5.current = 1
      break;
      case 6 :setAnswer6(true)
      ScoreQuestion6.current = 1
        break;
    default :
    alert("Scoring Error")
    break;
  }
}

function incorrect(QuestionPage){
  AlertState.current = 2
  setTimeout(resetAlert,3000)
  switch(QuestionPage){
    case 2 :setAnswer2(true)
      break;
    case 3 :setAnswer3(true)
      break;
    case 4 :setAnswer4(true)
      break;
    case 5 :setAnswer5(true)
      break;
      case 6 :setAnswer6(true)
      break;
    default :
    alert("Scoring Error")
    break;
  }
}  

function retry(){
  alert("กรุณาเลือกอย่างน้อย 1 คำตอบจ้า")
}

  function checkAnswer(QuestionNumber) {
    let Answer1 = document.getElementById("Answer1")
    let Answer2 = document.getElementById("Answer2")
    let Answer3 = document.getElementById("Answer3")
    let Answer4 = document.getElementById("Answer4")
    
    if(Answer1.checked === false && 
      Answer2.checked === false && 
      Answer3.checked === false && 
      Answer4.checked === false ){retry()}
  
  else{ 
    switch(QuestionNumber){
  case 2 : if(Answer1.checked === true && 
      Answer2.checked === false && 
      Answer3.checked === false && 
      Answer4.checked === false ) {correct(2)}
  else{incorrect(2)}
  break;
  case 3 : 
  if(Answer1.checked === true && 
      Answer2.checked === false && 
      Answer3.checked === false && 
      Answer4.checked === false ) {correct(3)}
  else{incorrect(3)}
  break;
  case 4 :
    if(Answer1.checked === false&& 
      Answer2.checked ===  false&& 
      Answer3.checked === false && 
      Answer4.checked === true ){correct(4)}
  else{incorrect(4)}
  break;
case 5 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === false && 
    Answer4.checked === true ){correct(5)}
else{incorrect(5)}
break;
case 6 :
  if(Answer1.checked === true&& 
    Answer2.checked ===  true&& 
    Answer3.checked === true && 
    Answer4.checked === true ){correct(6)}
else{incorrect(6)}
break;
default :
    alert("Checking Error")
    break;
}
}}

  
  
  function Page1 (){
return(
  <div>
  <div className="split Index">
<div className="LabName">งานทางฟิสิกส์</div>
<div div className="LabInfo">จากคอร์สเรียนที่เราได้เรียน “W = F • S • Cosθ” จะสังเกตว่า
หาก แทน θ = 90° <br/>จะทำให้ Cosθ = 0 ส่งผลให้ งานนั้นกลายเป็น 0 ไปด้วย
</div>
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P1.gif?alt=media&token=e2d431a9-c48b-48db-b87f-285154026093" />
 <div div className="LabInfo"> <br/>คิดงานโดยการแตกแรงให้อยู่แกนเดียวกับการกระจัด : <br/>
 <MathJaxContext>
      <MathJax>\[W = F \cdot S \cdot Cosθ\]
      \[W = F \cdot S \cdot (0)\]
      \[W = 0\]

      </MathJax>
      </MathJaxContext>
<div div className="LabInfo"> จากภาพเนื่องจากแรงกระทำกับวัตถุในแนวแกนดิ่ง แต่กลับไม่มีการกระจัดในแนวดิ่งทำให้ไม่มีการเกิดงานนั้นเอง
</div>
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">No work is done</div>
  <div className="ProgessBar"><progress value="0" max="100"></progress></div>
  <div className="Question">กดปุ่มสีเขียว เพื่อไปหน้าต่อไป</div>
  <div className="AnswerList">
  
</div>
<div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" style={{visibility: "hidden"}} >Previous page</button>
<button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(2)}>Next page</button></div>
</div>
</div>)
}

function Page2 (){
return(
  <div>
  <div className="split Index">
<div className="LabName">งานทางฟิสิกส์</div>
<div div className="LabInfo">เรามาลองทดสอบความเข้าใจกันครับ<br/><br/>
  ชายคนหนึ่งยกกล่องน้ำหนัก 50 นิวตัน เดินไปบนทางราบ 20 เมตร จะเกิดงานกี่จูล
</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P2.png?alt=media&token=e53ca502-9285-4b52-8930-4d8554236a3d" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD6nx-Rhrc'> sketchify</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">No work is done</div>
  <div className="ProgessBar"><progress value="17" max="100"></progress></div>
  <div className="Question"></div>
  <div className="AnswerList">
  <label className="container">0 J
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">50 J
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">100 J
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">1000 J
      <input type="checkbox" id="Answer4"/>
      <span className="checkmark"></span>
    </label>

    <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(2)}>Send Answer</button>
  
</div>
<div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(1)}>Previous page</button>
<button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>

</div>
</div>)
}
function Page2Answered (){
  return(
    <div>
      {AlertState.current === 1? <CorrectAlert/> : null}
    {AlertState.current === 2? <IncorrectAlert/> : null}
    <div className="split Index">
<div className="LabName">งานทางฟิสิกส์</div>
<div div className="LabInfo">เรามาลองทดสอบความเข้าใจกันครับ<br/><br/>
  ชายคนหนึ่งยกกล่องน้ำหนัก 50 นิวตัน เดินไปบนทางราบ 20 เมตร จะเกิดงานกี่จูล
</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P2.png?alt=media&token=e53ca502-9285-4b52-8930-4d8554236a3d" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD6nx-Rhrc'> sketchify</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">No work is done</div>
    <div className="ProgessBar"><progress value="17" max="100"></progress></div>
    <div className="Question"></div>
    <div className="AnswerList">
    <label className="container">0 J
        <input type="checkbox" id="Answer1" checked disabled  />
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">50 J
        <input type="checkbox" id="Answer2" disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">100 J
        <input type="checkbox" id="Answer3" disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">1000 J
        <input type="checkbox" id="Answer4" disabled/>
        <span className="checkmark"></span>
      </label>
  
      <button className = "btn btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
  </div>
  <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(1)}>Previous page</button>
  <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(3)}>Next page</button></div>
  
  </div>
  </div>)
  }
function Page3 (){
return(
  <div>
  <div className="split Index">
<div className="LabName">งานทางฟิสิกส์</div>
<div className="LabInfo">นายเอถือกระเป๋าน้ำหนัก 15 นิวตัน ต้องการเดินข้ามถนนเพื่อข้ามไปยังอีกฝั่ง
<br/>โดยใช้สะพานลอยที่สูง 10 เมตร และยาว 30 เมตร จงหางานที่เกิดจากการถือกระเป๋าเท่าไหร่
  </div>
  
  <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P3.png?alt=media&token=748584fb-474a-4e9c-bf01-795842f13f6b " />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD6nx-Rhrc'> sketchify</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">No work is done</div>
  <div className="ProgessBar"><progress value="34" max="100"></progress></div>
  <div className="Question">จงหางานที่เกิดจากการถือกระเป๋า</div>
  <div className="AnswerList">
  <label className="container">0 J
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">150 J
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">300 J
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">450 J
      <input type="checkbox" id="Answer4"/>
      <span className="checkmark"></span>
    </label>

    <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(3)}>Send Answer</button>
  
</div>
<div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(2)}>Previous page</button>
<button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>

</div>
</div>)
}

function Page3Answered (){
  return(
    <div>
      {AlertState.current === 1? <CorrectAlert/> : null}
    {AlertState.current === 2? <IncorrectAlert/> : null}
    <div className="split Index">
<div className="LabName">งานทางฟิสิกส์</div>
<div className="LabInfo">นายเอถือกระเป๋าน้ำหนัก 15 นิวตัน ต้องการเดินข้ามถนนเพื่อข้ามไปยังอีกฝั่ง
<br/>โดยใช้สะพานลอยที่สูง 10 เมตร และยาว 30 เมตร จงหางานที่เกิดจากการถือกระเป๋าเท่าไหร่
  </div>
  <div className="LabInfo"><mark>เฉลย :<br/>จะพบว่านายเอเดินขึ้นและลงสะพานลอยจึงทำให้การกระจัดในแนวดิ่ง เป็น 0 ส่งผลให้งานเป็น 0 ไปด้วย</mark>
  </div>
  <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P3.png?alt=media&token=748584fb-474a-4e9c-bf01-795842f13f6b " />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD6nx-Rhrc'> sketchify</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">No work is done</div>
    <div className="ProgessBar"><progress value="34" max="100"></progress></div>
    <div className="Question"></div>
    <div className="AnswerList">
    <label className="container">0 J
        <input type="checkbox" id="Answer1" checked disabled  />
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">150 J
        <input type="checkbox" id="Answer2" disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">300 J
        <input type="checkbox" id="Answer3" disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">450 J
        <input type="checkbox" id="Answer4" disabled/>
        <span className="checkmark"></span>
      </label>
  
      <button className = "btn btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
  </div>
  <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(2)}>Previous page</button>
  <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(4)}>Next page</button></div>
  
  </div>
  </div>)
  }
  function Page4 (){
    return(
      <div>
      <div className="split Index">
    <div className="LabName">งานทางฟิสิกส์</div>
    <div className="LabInfo">เมื่อเราเรียนรู้การคำนวณงานในรูปแบบต่างๆ แล้วลองนำความรู้มาประยุกต์ทำโจทย์กันครับ<br/><br/>
    ชายคนหนึ่งใช้เชือกลากกล่องไม้มวล 60 กิโลกรัม ด้วยอัตราเร็วสม่ำเสมอ เป็นระยะทาง 1 กิโลเมตร ถ้าสัมประสิทธิ์ความเสียดทานระหว่างพื้นกับกล่องไม้เท่ากับ 0.02
   จงหางานที่ชายคนนี้ทำและงานเนื่องจากแรงเสียดทานระหว่างพื้นกับกล่องไม้
    <br/><br/>
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P4.png?alt=media&token=3c27a772-7bad-4620-a48d-ec0db344d40a" />
    <br/><br/> <mark className="Yellow">Hint : </mark>ลากวัตถุด้วยความเร็วสม่ำเสมอหมายความว่า วัตถุไม่มีความเร่ง ผลรวมแรง = 0 (ΣF = 0)
      </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">No work is done</div>
      <div className="ProgessBar"><progress value="51" max="100"></progress></div>
      <div className="Question">จงหางานที่เกิดจากการถือกระเป๋า</div>
      <div className="AnswerList">
      <label className="container">10 kJ , -5 kJ
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">12 kJ , -8 kJ
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">12 kJ , -2 kJ
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">12 kJ , -12 kJ
          <input type="checkbox" id="Answer4" />
          <span className="checkmark" ></span>
        </label>
    
        <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(4)}>Send Answer</button>
      
    </div>
    <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(3)}>Previous page</button>
    <button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>
    
    </div>
    </div>)
    }

    function Page4Answered (){
      return(
        <div>
          {AlertState.current === 1? <CorrectAlert/> : null}
    {AlertState.current === 2? <IncorrectAlert/> : null}
        <div className="split Index">
      <div className="LabName">งานทางฟิสิกส์</div>
      <div className="LabInfo">เมื่อเราเรียนรู้การคำนวณงานในรูปแบบต่างๆ แล้วลองนำความรู้มาประยุกต์ทำโจทย์กันครับ<br/><br/>
    ชายคนหนึ่งใช้เชือกลากกล่องไม้มวล 60 กิโลกรัม ด้วยอัตราเร็วสม่ำเสมอ เป็นระยะทาง 1 กิโลเมตร ถ้าสัมประสิทธิ์ความเสียดทานระหว่างพื้นกับกล่องไม้เท่ากับ 0.02
   จงหางานที่ชายคนนี้ทำและงานเนื่องจากแรงเสียดทานระหว่างพื้นกับกล่องไม้
    <br/><br/><mark>เนื่องจากกล่องไม้เคลื่อนที่ด้วยอัตราเร็วสม่ำเสมอ แรงที่ชายกระทำกับกล่องจึงมีค่าเท่ากับแรงเสียดทาน <br/>(กฏของนิวตันของที่ 1) เราจึงทำการหาปริมาณแรงที่กระทำจากแรงเสียดทาน แล้วค่อยมาหางานทีหลัง</mark>
    <br/><br/>
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P4.png?alt=media&token=3c27a772-7bad-4620-a48d-ec0db344d40a" />
    <br/><br/> <mark className="Yellow">Hint : </mark>ลากวัตถุด้วยความเร็วสม่ำเสมอหมายความว่า วัตถุไม่มีความเร่ง ผลรวมแรง = 0 (ΣF = 0)
        </div> 
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">No work is done</div>
        <div className="ProgessBar"><progress value="51" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">10 kJ , -5 kJ
            <input type="checkbox" id="Answer1" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">12 kJ , -8 kJ
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">12 kJ , -2 kJ
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">12 kJ , -12 kJ
            <input type="checkbox" id="Answer4" disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
      
          <button className = "btn btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
      </div>
      <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(3)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(5)}>Next page</button></div>
      
      </div>
      </div>)
      }
function Page5 (){
        return(
          <div>
          <div className="split Index">
        <div className="LabName">งานทางฟิสิกส์</div>
        <div className="LabInfo">นายบีเดินหิ้วกระเป๋าหนัก 30 นิวตัน เดินลงบันไดสูง 4 เมตร จงหางานที่นายบีทำในการหิ้วกระเป๋า
          </div> 
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P5.png?alt=media&token=7fc700c8-0c65-4a8c-8010-748280cb1681" />
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">No work is done</div>
          <div className="ProgessBar"><progress value="68" max="100"></progress></div>
          <div className="Question"></div>
          <div className="AnswerList">
          <label className="container">80 J
              <input type="checkbox" id="Answer1" />
              <span className="checkmark"></span>
            </label>
            <label className="container">120 J
              <input type="checkbox" id="Answer2"/>
              <span className="checkmark"></span>
            </label>
            <label className="container">-80 J
              <input type="checkbox" id="Answer3"/>
              <span className="checkmark"></span>
            </label>
            <label className="container">-120 J
              <input type="checkbox" id="Answer4" />
              <span className="checkmark" ></span>
            </label>
        
            <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(5)}>Send Answer</button>
          
        </div>
        <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(4)}>Previous page</button>
        <button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>
        
        </div>
        </div>)
        }
    
        function Page5Answered (){
          return(
            <div>
              {AlertState.current === 1? <CorrectAlert/> : null}
    {AlertState.current === 2? <IncorrectAlert/> : null}
            <div className="split Index">
          <div className="LabName">งานทางฟิสิกส์</div>
          <div className="LabInfo">นายบีเดินหิ้วกระเป๋าหนัก 30 นิวตัน เดินลงบันไดสูง 4 เมตร จงหางานที่นายบีทำในการหิ้วกระเป๋า
          <br/><br/><mark>จะพบว่านายบีออกแรงยกกระเป๋าในแนวดิ่ง เดินลงบันไดทำให้เกิดระยะกระจัด 4 เมตรในแนวตรงข้าม ทำให้เกิดงานติดลบ</mark>
            </div> 
            <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P5.png?alt=media&token=7fc700c8-0c65-4a8c-8010-748280cb1681" />
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">No work is done</div>
            <div className="ProgessBar"><progress value="68" max="100"></progress></div>
            <div className="Question"></div>
            <div className="AnswerList">
            <label className="container">80 J
                <input type="checkbox" id="Answer1" disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">120 J
                <input type="checkbox" id="Answer2"disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">-80 J
                <input type="checkbox" id="Answer3"disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">-120 J
                <input type="checkbox" id="Answer4" disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
          
              <button className = "btn btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
            
          </div>
          <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(4)}>Previous page</button>
          <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(6)}>Next page</button></div>
          </div>
          </div>)
  }
  function Page6 (){
    return(
      <div>
      <div className="split Index">
    <div className="LabName">งานทางฟิสิกส์</div>
    <div className="LabInfo">ข้อใดกล่าวถูกต้องเกี่ยวกับงาน
      </div> 
      <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P6.jpg?alt=media&token=288b7e31-7396-4868-928a-ed94cd2892ea" />
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">No work is done</div>
      <div className="ProgessBar"><progress value="85" max="100"></progress></div>
      <div className="Question">ข้อใดกล่าวถูกต้องเกี่ยวกับงาน</div>
      <div className="AnswerList">
      <label className="container">เมื่อแรงมีทิศตรงข้ามกับการกระจัด จะได้งานเป็นลบ
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">เมื่อมีหลายแรงกระทำ ให้ทำการรวมแรงแล้วค่อยคำนวณ
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">เมื่อแรงทำมุมกับการกระจัดให้แตกแรงแล้วคำนวณ
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">งานมีสูตรว่า W = F • S 
          <input type="checkbox" id="Answer4" />
          <span className="checkmark" ></span>
        </label>
    
        <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(6)}>Send Answer</button>
      
    </div>
    <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(5)}>Previous page</button>
    <button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>
    
    </div>
    </div>)
    }

    function Page6Answered (){
      return(
        <div>
          {AlertState.current === 1? <CorrectAlert/> : null}
    {AlertState.current === 2? <IncorrectAlert/> : null}
        <div className="split Index">
      <div className="LabName">งานทางฟิสิกส์</div>
      <div className="LabInfo">ข้อใดกล่าวถูกต้องเกี่ยวกับงาน
        </div> 
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P6.jpg?alt=media&token=288b7e31-7396-4868-928a-ed94cd2892ea" />
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">No work is done</div>
        <div className="ProgessBar"><progress value="85" max="100"></progress></div>
        <div className="Question">ข้อใดกล่าวถูกต้องเกี่ยวกับงาน</div>
        <div className="AnswerList">
        <label className="container">เมื่อแรงมีทิศตรงข้ามกับการกระจัด จะได้งานเป็นลบ
            <input type="checkbox" id="Answer1" disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">เมื่อมีหลายแรงกระทำ ให้ทำการรวมแรงแล้วค่อยคำนวณ
            <input type="checkbox" id="Answer2"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">เมื่อแรงทำมุมกับการกระจัดให้แตกแรงแล้วคำนวณ
            <input type="checkbox" id="Answer3"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">งานมีสูตรว่า W = F • S 
            <input type="checkbox" id="Answer4" disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
      
          <button className = "btn btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
      </div>
      <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(5)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(7)}>Next page</button></div>
      </div>
      </div>)
}
  function FinishPage (){
    sumScore()
    return(
      <div>
        {AlertState.current === 3? <UpvoteAlert/> : null}
    {AlertState.current === 4? <ReportAlert/> : null}
    <div className = 'FinishContainer'>
      <img className='FinishImg' id='img' alt ="Check.png"src="https://firebasestorage.googleapis.com/v0/b/lab-anywhere.appspot.com/o/check.png?alt=media&token=10d8a285-0a16-4009-a4fa-5725aeba2cef" />
    </div>
    <div className = 'FinishContainer'>
      <div className="FinishInfo">จบกิจกรรมแล้ว อยากเรียนรู้เรื่องอะไรต่อดี? <br/><br/>
      Completion Score = {CompletionScore.current*100}% ({TotalScore.current}/{TotalQuestionNum.current}) <br/>
      </div>
    </div>
    < div className = 'FinishContainer'>
      <button className = "UpvoteButton" style = {{right : "0%", backgroundColor: "rgb(var(--secondary-color))" }} ><Link to = "/v1.0/courses" >Back to Courses</Link></button>
    </div>
    < div className = 'FinishContainer'>
    <button className = "UpvoteButton" onClick={() => handleUpvote()}>Upvote!</button>
      <button className = "ReportButton" onClick={() => handleReport()}>Report</button>
    </div>
    
     </div> )
    }

if (page === 1) {return (
<div><Page1/></div>)}

else if (page === 2 && Answer2 === false) {
  return(<div><Page2/></div>)
  }
  else if (page === 2 && Answer2 === true) {
    return(<div><Page2Answered/></div>)
  }

  else if (page === 3 && Answer3 === false) {
    return(<div><Page3/></div>)
    }
    else if (page === 3 && Answer3 === true) {
      return(<div><Page3Answered/></div>)
    }

else if (page === 4 && Answer4 === false) {
  return(<div><Page4/></div>)
  }
  else if (page === 4 && Answer4 === true) {
    return(<div><Page4Answered/></div>)
  }
else if (page === 5 && Answer5 === false) {
    return(<div><Page5/></div>)
  }
  else if (page === 5 && Answer5 === true) {
      return(<div><Page5Answered/></div>)
  }
  else if (page === 6 && Answer6 === false) {
    return(<div><Page6/></div>)
  }
  else if (page === 6 && Answer6 === true) {
      return(<div><Page6Answered/></div>)
  }
else if (page === 7) {return(
    <div><FinishPage/></div>)}
    


else   {return(<div>
  <h1>Error 404 Webpage not fonud</h1>
  <p>Course page not found, Please try again shortly</p></div>
)}
}