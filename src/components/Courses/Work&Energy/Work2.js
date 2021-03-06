import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {CorrectAlert, IncorrectAlert, UpvoteAlert, ReportAlert} from './Alert'
import {Scene as Scene1} from './Material/Work2Scene1';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function Work2() {
// Set Page
var [page, setPage] = useState(1);
//Var Answered
var [Answer4, setAnswer4] = useState(false);
var [Answer5, setAnswer5] = useState(false);
var [Answer6, setAnswer6] = useState(false);
//Var Score
const TotalQuestionNum = useRef(3)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
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
      work2 : firebase.firestore.FieldValue.increment(1)
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
      Work2: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}

function sumScore(){
  
  TotalScore.current = ScoreQuestion4.current + ScoreQuestion5.current + ScoreQuestion6.current 
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    Work2: CompletionScore.current
}, { merge: true });
  

}

  //เช็คคำตอบถูก-ผิด
function correct(QuestionPage){
  //เช็คถูก
  AlertState.current = 1
  setTimeout(resetAlert,3000)
  switch(QuestionPage){
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
      case 4 :
    if(Answer1.checked === false&& 
      Answer2.checked ===  true&& 
      Answer3.checked === false && 
      Answer4.checked ===  false){correct(4)}
  else{incorrect(4)}
  break;
    case 5 : if(Answer1.checked === false && 
      Answer2.checked === false && 
      Answer3.checked === false && 
      Answer4.checked === true ) {correct(5)}
  else{incorrect(5)}
  break;
  case 6 :
    if(Answer1.checked === true&& 
      Answer2.checked ===  false&& 
      Answer3.checked === false && 
      Answer4.checked === false ){correct(6)}
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
<div div className="LabInfo">จะสังเกตได้ว่า จากข้อที่ผ่านๆมา แรงจะมีทิศทางไปทางเดียวกับการกระจัด จะเป็นอย่างไรหากแรงกับการกระจัดมีทิศทางต่างๆกันออกไป</div> 
<br/><br/>
 <div div className="LabInfo">
 <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P1.gif?alt=media&token=26321e6d-a316-491a-b10b-d837237a8dff" />
 
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Playing with angles</div>
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
  <div div className="LabInfo">ในกรณีที่แรงไม่ได้มีทิศทางเดียวกับการกระจัด เราจะทำการแยกองค์ประกอบแรง (เรียกง่ายๆว่า “แตกแรง”) 2 แรงที่ตั้งฉากกัน (แตกออกเป็นแกน x และ y) โดยให้แรงหนึ่งแนวขนานกับการกระจัด</div> 
  <br/><br/>
   <div div className="LabInfo">
   <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P2.png?alt=media&token=df68d801-87a3-4b94-b4b0-4e8fa70d21d3" />
   <br/><br/>ในภาพนี้ Fx เป็นแรงองค์ประกอบของ F ในแนวระดับ 
  
  ส่วน Fy เป็นแรงองค์ประกอบของ F ในแนวตั้งฉากกับการกระจัด ซึ่งอยู่ในแนวดิ่ง ไม่ส่งผลต่อการเคลื่อนที่แนวระดับ จึงไม่มีผลกับการเกิดงาน (อธิบายอย่างละเอียดในเนื้อหาถัดไป) 
  
   
    </div> 
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Playing with angles</div>
    <div className="ProgessBar"><progress value="17" max="100"></progress></div>
    <div className="Question">กดปุ่มสีเขียว เพื่อไปหน้าต่อไป</div>
    <div className="AnswerList">
    
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
    <div div className="LabInfo">ในการแตกองค์ประกองของแรง จะยึดด้านที่อยู่ “ใกล้มุม” หรือ ด้านที่ติดกับมุมเป็น Fcosθ และด้านที่อยู่ “ไกลมุม” เป็น Fsinθ
  </div> 
  
     <div div className="LabInfo">
     <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P3.png?alt=media&token=f592b0b3-e591-4a1d-b6ae-f82f8b16bb4d" />
     <br/><br/>ดังนั้น งานจากแรง F ในภาพนี้ จะมีค่าเท่ากับ<br/>
     <MathJaxContext>
      <MathJax>\[W = F \cdot S \cdot cos \theta \]</MathJax>
      </MathJaxContext>
        โดย<br/>W แทน งาน มีหน่วยเป็น นิวตัน-เมตร หรือ จูล (N⋅m / J)<br/>
      F แทน แรง มีหน่วยเป็น นิวตัน (N)<br/>
      S แทน การกระจัด มีหน่วยเป็น เมตร (m)<br/>
      และ θ แทน มุมระหว่างทิศทางออกแรงกับการกระจัด มีหน่วยเป็น องศา (°)
  
      <br/><br/>ทดสอบความเข้าใจได้โดยทำโจทย์ด้านขวามือครับ 
      </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
  
      <div className="split QuestionAnswer"> 
    <div className="LabNumber">Playing with angles</div>
    <div className="ProgessBar"><progress value="34" max="100"></progress></div>
    <div className="Question">กดปุ่มสีเขียว เพื่อไปหน้าต่อไป</div>
    <div className="AnswerList"></div>
  
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
  <div div className="LabInfo">วัตถุหนึ่งถูกฉุดด้วยแรง 20 N ซึ่งทำมุม 37 องศากับแนวระดับดังรูป ถ้าวัตถุเคลื่อนที่ด้วยความเร็วคงที่เป็นระยะทาง 100 เมตร จงหางานในการฉุดวัตถุนี้
</div> 

   <div div className="LabInfo">
   <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P4.png?alt=media&token=e824d974-dcd5-4290-ba83-c2b960aca2f5" />
  
    </div> 
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  

    <div className="split QuestionAnswer"> 
  <div className="LabNumber">Playing with angles</div>
  <div className="ProgessBar"><progress value="51" max="100"></progress></div>
  <div className="Question">จงหางานในการฉุดวัตถุนี้</div>
  <div className="AnswerList">
  <label className="container">1200 J
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">1600 J
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">1800 J
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">2000 J
      <input type="checkbox" id="Answer4"/>
      <span className="checkmark"></span>
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
  <div div className="LabInfo">วัตถุหนึ่งถูกฉุดด้วยแรง 20 N ซึ่งทำมุม 37 องศากับแนวระดับดังรูป ถ้าวัตถุเคลื่อนที่ด้วยแรงคงที่เป็นระยะทาง 100 เมตร จงหางานในการฉุดวัตถุนี้
  <br/><mark>เฉลย :<br/>คิดงานโดยใช้แรง Fx ที่แตกออกมาให้ขนานกับการกระจัดเพื่อคิดงาน</mark></div> 

   <div div className="LabInfo">
   <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P4.png?alt=media&token=e824d974-dcd5-4290-ba83-c2b960aca2f5" />
  
    </div> 
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
      <div className="split QuestionAnswer"> 
    <div className="LabNumber">Playing with angles</div>
    <div className="ProgessBar"><progress value="51" max="100"></progress></div>
    <div className="Question">จงหางานในการฉุดวัตถุนี้</div>
    <div className="AnswerList">
    <label className="container">1200 J
        <input type="checkbox" id="Answer1"disabled />
        <span className="checkmark"></span>
      </label>
      <label className="container">1600 J
        <input type="checkbox" id="Answer2"disabled checked/>
        <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">1800 J
        <input type="checkbox" id="Answer3"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">2000 J
        <input type="checkbox" id="Answer4"disabled/>
        <span className="checkmark"></span>
      </label>
  
      <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
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
<div div className="LabInfo">จากหลักการเบื้องต้นจะเห็นว่า เมื่อแรงกับการกระจัดอยู่ในทิศทางตรงข้ามกัน<br/>จะทำมุมกัน 180 องศา จากสมการจะได้</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P5.gif?alt=media&token=9bc1d693-a7b7-4b13-9718-9b4fd5e1497c" />
<MathJaxContext>
  <MathJax>\[W = F \cdot S \cdot cos180°   = F \cdot S \cdot (-1)\]</MathJax>
  <MathJax>\[W = -F \cdot S \]</MathJax>
  </MathJaxContext>
 <div div className="LabInfo">ซึ่งจะทำให้งานติดลบนั่นเอง แต่เครื่องหมายบวกหรือลบของงานไม่ได้เป็นสิ่งที่แสดงทิศทางของงาน เพราะงานเป็นปริมาณสเกลาร์จึงไม่มีทิศทาง <mark>งานที่ติดลบมักจะพบได้เมื่อมีแรงต้าน ที่ไปต้านการเคลื่อนที่ของวัตถุ</mark>เช่น แรงต้านอากาศ แรงเสียดทาน แรงตึงผิว
  <br/><br/></div> 
  <Scene1/>
  <div div className="LabInfo"> ด้านบนเป็น Simulation โดยกล่องทั้ง 3 มีสัมประสิทธิ์แรงต้านอากาศไม่เท่ากัน อันที่มีสัมประสิทธิ์น้อย(แรงต้านอากาศน้อย) จะตกเร็วกว่าอันที่มีสัมประสิทธิ์แรงต้านอากาศมาก เพราะมีงานต้านอากาศน้อยกว่านั้นเอง
  </div>
  <div div className="LabInfo"> ทดสอบความเข้าใจได้โดยทำโจทย์ด้านขวามือครับ 
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Playing with angles</div>
  <div className="ProgessBar"><progress value="68" max="100"></progress></div>
  <div className="Question">งานในข้อใดมีค่าติดลบ</div>
  <div className="AnswerList">
  <label className="container">งานจากแรงขับเครื่องยนต์ที่ขับรถไปข้างหน้า
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">งานจากการเตะฟุตบอล
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">งานจากการถือกระเป๋าเดินบนพื้นราบ
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">งานจากแรงเสียดทานของวัตถุที่กำลังเคลื่อนที่ไปข้างหน้า
      <input type="checkbox" id="Answer4"/>
      <span className="checkmark"></span>
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
<div div className="LabInfo">จากหลักการเบื้องต้นจะเห็นว่า เมื่อแรงกับการกระจัดอยู่ในทิศทางตรงข้ามกัน<br/>จะทำมุมกัน 180 องศา จากสมการจะได้</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P5.gif?alt=media&token=9bc1d693-a7b7-4b13-9718-9b4fd5e1497c" />
<MathJaxContext>
  <MathJax>\[W = F \cdot S \cdot cos180°   = F \cdot S \cdot (-1)\]</MathJax>
  <MathJax>\[W = -F \cdot S \]</MathJax>
  </MathJaxContext>
 <div div className="LabInfo">ซึ่งจะทำให้งานติดลบนั่นเอง แต่เครื่องหมายบวกหรือลบของงานไม่ได้เป็นสิ่งที่แสดงทิศทางของงาน เพราะงานเป็นปริมาณสเกลาร์จึงไม่มีทิศทาง <mark>งานที่ติดลบมักจะพบได้เมื่อมีแรงต้าน ที่ไปต้านการเคลื่อนที่ของวัตถุ</mark>เช่น แรงต้านอากาศ แรงเสียดทาน แรงตึงผิว
  <br/><br/></div> 
  <Scene1/>
  <div div className="LabInfo"> ด้านบนเป็น Simulation โดยกล่องทั้ง 3 มีสัมประสิทธิ์แรงต้านอากาศไม่เท่ากัน อันที่มีสัมประสิทธิ์น้อย(แรงต้านอากาศน้อย) จะตกเร็วกว่าอันที่มีสัมประสิทธิ์แรงต้านอากาศมาก เพราะมีงานต้านอากาศน้อยกว่านั้นเอง
  </div>
  <div div className="LabInfo"> ทดสอบความเข้าใจได้โดยทำโจทย์ด้านขวามือครับ 
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Playing with angles</div>
    <div className="ProgessBar"><progress value="68" max="100"></progress></div>
    <div className="Question">งานในข้อใดมีค่าติดลบ</div>
    <div className="AnswerList">
    <label className="container">งานจากแรงขับเครื่องยนต์ที่ขับรถไปข้างหน้า
        <input type="checkbox" id="Answer1"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">งานจากการเตะฟุตบอล
        <input type="checkbox" id="Answer2"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">งานจากการถือกระเป๋าเดินบนพื้นราบ
        <input type="checkbox" id="Answer3"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">งานจากแรงเสียดทานที่กำลังเคลื่อนที่ไปข้างหน้า
        <input type="checkbox" id="Answer4"checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
        
      </label>
  
      <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
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
<div className="LabInfo">เช่นเดียวกับงานที่มีหลายแรงกระทำกับวัตถุ ให้ทำการรวมแรงแล้วค่อยคิดคำนวณ<br/>
โดยแรงที่สามารถรวมกันได้จะต้องแตกแรงให้อยู่ในทิศทางเดียวกันก่อน<br/>
</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P6.gif?alt=media&token=82783dbe-3b91-4453-a9da-975f5ad9adec" />
 <div div className="LabInfo">เราลองเอาหลักการงานนี้ไปปรับใช้ทำโจทย์ด้านขวามือกันครับ<br/>
 <br/>ทบทวน : <MathJaxContext>
  <MathJax>\[W = F \cdot S \cdot cos \theta \]</MathJax>
  </MathJaxContext>
    โดย<br/>W แทน งาน มีหน่วยเป็น นิวตัน-เมตร หรือ จูล (N⋅m / J)<br/>
  F แทน แรง มีหน่วยเป็น นิวตัน (N)<br/>
  S แทน การกระจัด มีหน่วยเป็น เมตร (m)<br/>
  และ θ แทน มุมระหว่างทิศทางออกแรงกับการกระจัด องศา (°)
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Playing with angles</div>
  <div className="ProgessBar"><progress value="85" max="100"></progress></div>
  <div className="Question">จากภาพจะมีงานที่เกิดจากแรงลัพธ์เท่าไหร่<br/>
  : กำหนดให้ระยะทางหลังจากเกิดแรงลัพธ์คือ 3 เมตร
  </div>
  <div className="AnswerList">
  <label className="container">90 J
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">100 J
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">120 J
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">150 J
      <input type="checkbox" id="Answer4"/>
      <span className="checkmark"></span>
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
  <div className="LabInfo">เช่นเดียวกับงานที่มีหลายแรงกระทำกับวัตถุ ให้ทำการรวมแรงแล้วค่อยคิดคำนวณ<br/>
  โดยแรงที่สามารถรวมกันได้จะต้องแตกแรงให้อยู่ในทิศทางเดียวกันก่อน<br/>
  </div> 
  <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P6.gif?alt=media&token=82783dbe-3b91-4453-a9da-975f5ad9adec" />
   <div div className="LabInfo">เราลองเอาหลักการงานนี้ไปปรับใช้ทำโจทย์ด้านขวามือกันครับ<br/>
   <br/>ทบทวน : <MathJaxContext>
    <MathJax>\[W = F \cdot S \cdot cos \theta \]</MathJax>
    </MathJaxContext>
      โดย<br/>W แทน งาน มีหน่วยเป็น นิวตัน-เมตร หรือ จูล (N⋅m / J)<br/>
    F แทน แรง มีหน่วยเป็น นิวตัน (N)<br/>
    S แทน การกระจัด มีหน่วยเป็น เมตร (m)<br/>
    และ θ แทน มุมระหว่างทิศทางออกแรงกับการกระจัด องศา (°)
    </div> 
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Playing with angles</div>
    <div className="ProgessBar"><progress value="85" max="100"></progress></div>
    <div className="Question">จากภาพจะมีงานที่เกิดจากแรงลัพธ์เท่าไหร่<br/>
    : กำหนดให้ระยะทางหลังจากเกิดแรงลัพธ์คือ 3 เมตร
    </div>
    <div className="AnswerList">
    <label className="container">90 J
        <input type="checkbox" id="Answer1" checked disabled/>
        <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">100 J
        <input type="checkbox" id="Answer2"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">120 J
        <input type="checkbox" id="Answer3"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">150 J
        <input type="checkbox" id="Answer4"disabled/>
        <span className="checkmark"></span>
      </label>
  
      <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
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

else if (page === 2) {return (
  <div><Page2/></div>)}
 
  

  else if (page === 3) {return (
    <div><Page3/></div>)}

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