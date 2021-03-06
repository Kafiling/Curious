import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {CorrectAlert, IncorrectAlert, UpvoteAlert, ReportAlert} from './Alert'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {Scene as Scene1} from './Material/Ek1Scene1';
//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function KineticEnergy () {
// Set Page
var [page, setPage] = useState(1);
//Var Answered
var [Answer3, setAnswer3] = useState(false);
var [Answer6, setAnswer6] = useState(false);
//Var Score
const TotalQuestionNum = useRef(2)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
const ScoreQuestion3 = useRef(0)
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
      KineticEnergy : firebase.firestore.FieldValue.increment(1)
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
      KineticEnergy: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}

function sumScore(){
  
  TotalScore.current = ScoreQuestion3.current + ScoreQuestion6.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    KineticEnergy: CompletionScore.current
}, { merge: true });
  

}

  //เช็คคำตอบถูก-ผิด
function correct(QuestionPage){
  //เช็คถูก
  AlertState.current = 1
  setTimeout(resetAlert,3000)
  switch(QuestionPage){
    case 3 :setAnswer3(true)
    ScoreQuestion3.current = 1
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
    case 3 :setAnswer3(true)
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
    case 3 : if(Answer1.checked === false && 
      Answer2.checked === true && 
      Answer3.checked === false && 
      Answer4.checked === false ) {correct(3)}
  else{incorrect(3)}
  break;
case 6 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === false && 
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
<div className="LabName">เกี่ยวกับพลังงาน</div>
<div div className="LabInfo">พลังงานคืออะไร พลังงานนั้นเป็นปริมาณที่ไม่สามารถมองเห็นหรือจับต้องได้ แต่สามารถรับรู้จากผลของพลังงานนั้นได้ 
เช่น พลังงานจากแสงอาทิตย์ที่ทำให้รู้สึกร้อน พลังงานเสียงที่มากไปทำให้เราปวดหู หรือพลังงานไฟฟ้านำไปใช้ในเครื่องใช้ไฟฟ้าต่างๆ
</div>
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEk1%2FEkP1.png?alt=media&token=5d59369b-c46d-4d22-a357-31d73fab4e5a" />
<div div className="LabInfo">
พลังงานมีหลากหลายชนิดเช่น พลังงานแสง พลังงานเสียง พลังงานความร้อน พลังงานเคมี จนไปถึง พลังงานนิวเคลียร์ โดยในบทเรียนนี้จะหยิบ พลังงานทางกลศาสตร์ 2 ชนิด มาทำการเรียนรู้กัน ได้แก่ พลังงานศักย์ (Potential energy) และ พลังงานจลน์ (Kinetic energy)
<br/><br/>
พลังงานมีหน่วยเป็น จูล (Joules : J)
</div> 

 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADpjrSOZOI'>iconsy</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Velocity is Energy</div>
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
<div className="LabName">พลังงานจลน์</div>
<div div className="LabInfo">
เริ่มจากพลังงานจลน์(Kinetic energy) เป็นพลังงานของวัตถุที่กำลังเคลื่อนที่ (มีความเร็ว) 
<br/>
โดยพิสูจน์จาก งานจากแรง			
<MathJaxContext>
      <MathJax>\[W = F \cdot S \]
        \[W = m \cdot a \cdot S....(1) \]
        จากสมการการเคลื่อนที่แนวตรง  \[S = ut+ \cfrac{1}{2} \cdot at^2		\]
        แทนค่า u = 0 \[S = \cfrac{1}{2}at^2 ....(2)		\]
        แทนค่า S ใน (1)
        \[W = m \cdot a \cdot \cfrac{1}{2} \cdot at^2\]
        \[W = \cfrac{1}{2} \cdot m \cdot (at) ^2\]
        \[W = \cfrac{1}{2} \cdot m \cdot v^2\]
        \[Ek = \cfrac{1}{2} \cdot m \cdot v^2\]
      </MathJax>
      </MathJaxContext>

  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Velocity is Energy</div>
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
<div className="LabName">พลังงานจลน์</div>
<div className="LabInfo">เรามาลองคำนวณพลังงานจลน์ในข้อนี้ดูนะครับ<br/><br/>
วัตถุก้อนหนึ่งมีมวล 0.5 kg กำลังเคลื่อนที่ด้วย ความเร็ว 10 m/s จะมีพลังงานจลน์เท่าไร
</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEk1%2FEkP3.png?alt=media&token=042abf49-cb96-44fc-90d4-390964ca080c" />
 
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADk9yVjvJU'>sketchify</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Velocity is Energy</div>
  <div className="ProgessBar"><progress value="34" max="100"></progress></div>
  <div className="Question"></div>
  <div className="AnswerList">
  <label className="container">20 J
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">25 J
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">30 J
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">35 J
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
<div className="LabName">พลังงานจลน์</div>
<div className="LabInfo">เรามาลองคำนวณพลังงานจลน์ในข้อนี้ดูนะครับ<br/><br/>
วัตถุก้อนหนึ่งมีมวล 0.5 kg กำลังเคลื่อนที่ด้วย ความเร็ว 10 m/s จะมีพลังงานจลน์เท่าไร
</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEk1%2FEkP3.png?alt=media&token=042abf49-cb96-44fc-90d4-390964ca080c" />
 
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADk9yVjvJU'>sketchify</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Velocity is Energy</div>
    <div className="ProgessBar"><progress value="34" max="100"></progress></div>
    <div className="Question"></div>
    <div className="AnswerList">
    <label className="container">20 J
        <input type="checkbox" id="Answer1" disabled  />
        <span className="checkmark" ></span>
      </label>
      <label className="container">25 J
        <input type="checkbox" id="Answer2" checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">30 J
        <input type="checkbox" id="Answer3"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">35 J
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
    <div className="LabName">พลังงานจลน์</div>
    <div className="LabInfo">งานกับการเปลี่ยนพลังงานจลน์<br/><br/>
เราได้ค้นพบแล้วว่างานจากแรงสามารถทำให้วัตถุที่อยู่นิ่ง เคลื่อนที่ได้ (มีพลังงานจลน์) แล้วหากวัตถุมีพลังงานจลน์อยู่แล้ว มีงานจากแรงเข้าไปกระทำเพิ่มอีกจะส่งผลอย่างไร
<br/>
    เนื่องจากแรงลัพธ์เป็นแรงคงตัว ดังนั้นความเร่งจึงมีค่าคงตัวด้วย จากสมการ
    <MathJaxContext>
      <MathJax>\[v^2 = u^2 + 2 \cdot a \cdot \Delta x\]
        \[v^2 - u^2 = 2 \cdot a \cdot \Delta x\]
        \[v^2 - u^2 = 2 \cdot \frac Fm \cdot \Delta x\]
        \[\cfrac{1}{2} \cdot m \cdot v^2 - \cfrac{1}{2} \cdot m \cdot u^2 = F \cdot \Delta x\]
        \[Ef - Ei - = W\]
        \[W = Ef - Ei = \Delta Ek\]
      เมื่อ W คืองานของแรงลัพธ์คงตัวที่ไม่เป็นศูนย์
      </MathJax>
      </MathJaxContext>
      <br/><br/>จากสมการดังกล่าวจะสรุปได้ว่า งานเนื่องจากแรงลัพธ์ที่ไม่เป็น 0 (งานสามารถเป็น บวก หรือ ลบ) 
      กระทำกับวัตถุจะทำให้พลังงานจลน์ของวัตถุเปลี่ยนไป เป็นความสัมพันธ์นี้ว่า Work-kinetic energy theorem (ทฤษฎีบทงาน-พลังงานจลน์)
    </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
  <div className="LabNumber">Velocity is Energy</div>
  <div className="ProgessBar"><progress value="51" max="100"></progress></div>
  <div className="Question">กดปุ่มสีเขียว เพื่อไปหน้าต่อไป</div>
  <div className="AnswerList">
  
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
        <div className="LabName">พลังงานจลน์</div>
        <div className="LabInfo">จะกล่าวได้ว่าพลังงานจลน์ของจะเพิ่มหรือลดได้หากมีงานเนื่องจากแรงเข้ามากกระทำกับกับวัตถุ 
        เช่น วัตถุกำลังเคลื่อนที่แล้วเราเอามือไปกั้นทำให้วัตถุหยุดเคลื่อนที่ หรือ ลูกบอลกำลังกลิ้งด้วยความเร็ว แล้วเราไปเตะลูกบอลทำให้ ความเร็วลูกบอลเพิ่มขึ้น
        </div>
        <div className="LabInfo">การทดลอง การเพื่มพลังงานจลน์ด้วยการทำงาน <br/>
        เมื่อผู้เรียนกดคลิกใน Simulation จะทำการออกแรงผลักลูกบอลออกไป
        ให้สังเกตการเปลี่ยนแปลงของลูกบอลหลังโดนผลัก
        <li>เมื่อผลักขณะลูกบอลหยุดนิ่ง</li>
        <li>เมื่อผลักขณะลูกบอลกำลังวิ่ง</li>
        <li>เมื่อผลักขณะลูกบอลถูกผลัก</li>
        </div> 
        <div className='SceneContainer'>
      <Scene1/>
    </div>
    <div className="LabInfo">สังเกตได้ว่าหลังจากผลักแนงเสริมลูกบอลทั้งขณะที่ลูกบอลกำลังวิ่งหรือหยุดอยู่กับที่ จะทำให้ลูกมีความเร็วมากขึ้น หมายถึง <mark>การทำงานจะส่งผลให้มีพลังงานจลน์เพิ่มขึ้นนั้นเอง</mark>
        </div>
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
  <div className="LabNumber">Velocity is Energy</div>
  <div className="ProgessBar"><progress value="68" max="100"></progress></div>
  <div className="Question">กดปุ่มสีเขียว เพื่อไปหน้าต่อไป</div>
  <div className="AnswerList">
  
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
          <div className="LabName">พลังงานจลน์</div>
          <div className="LabInfo">รถมวล 800 kg แล่นด้วยความเร็ว 20 m/s คนขับเบรกรถ เมื่อเริ่มเบรกรถเคลื่อนไปได้อีก 10 m ก่อนจะหยุดนิ่ง จงหางานในการเบรกรถ
          </div> 
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEk1%2FEkP5.png?alt=media&token=ae79bb3a-d0cf-4d38-a717-9dc9a82db3af" />
           <div div className="FooterSpace"></div>
           <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAEaNirpHr0'>sketchify</a></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
  <div className="LabNumber">Velocity is Energy</div>
  <div className="ProgessBar"><progress value="85" max="100"></progress></div>
  <div className="Question"></div>
  <div className="AnswerList">
  <label className="container">-100 J
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">-160 J
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">-100 kJ
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">-160 kJ
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
          <div className="LabName">พลังงานจลน์</div>
          <div className="LabInfo">รถมวล 800 kg แล่นด้วยความเร็ว 20 m/s คนขับเบรกรถ เมื่อเริ่มเบรกรถเคลื่อนไปได้อีก 10 m ก่อนจะหยุดนิ่ง จงหางานในการเบรกรถ
          </div> 
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEk1%2FEkP5.png?alt=media&token=ae79bb3a-d0cf-4d38-a717-9dc9a82db3af" />
           <div div className="FooterSpace"></div>
           <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAEaNirpHr0'>sketchify</a></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Velocity is Energy</div>
    <div className="ProgessBar"><progress value="85" max="100"></progress></div>
    <div className="Question"></div>
    <div className="AnswerList">
    <label className="container">-100 J
        <input type="checkbox" id="Answer1" disabled  />
        <span className="checkmark" ></span>
      </label>
      <label className="container">-160 J
        <input type="checkbox" id="Answer2" disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">-100 kJ
        <input type="checkbox" id="Answer3"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">-160 kJ
        <input type="checkbox" id="Answer4" checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
  
      <button className = "btn btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
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
  

else if (page === 3 && Answer3 === false) {
return(<div><Page3/></div>)
}
else if (page === 3 && Answer3 === true) {
  return(<div><Page3Answered/></div>)
}

else if (page === 4) {return (
  <div><Page4/></div>)}
  
  else if (page === 5) {return (
    <div><Page5/></div>)}

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