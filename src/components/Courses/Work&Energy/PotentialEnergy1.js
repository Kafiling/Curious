import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {CorrectAlert, IncorrectAlert, UpvoteAlert, ReportAlert} from './Alert'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {Scene as Scene1} from './Material/Ep1Scene1';
import {Scene as Scene2} from './Material/Ep1Scene2';
//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function PotentialEnergy1() {
// Set Page
var [page, setPage] = useState(1);
//Var Answered
var [Answer2, setAnswer2] = useState(false);
var [Answer4, setAnswer4] = useState(false);
var [Answer6, setAnswer6] = useState(false);
var [Answer7, setAnswer7] = useState(false);
//Var Score
const TotalQuestionNum = useRef(4)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
const ScoreQuestion2 = useRef(0)
const ScoreQuestion4 = useRef(0)
const ScoreQuestion6 = useRef(0)
const ScoreQuestion7 = useRef(0)
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
      PotentialEnergy1 : firebase.firestore.FieldValue.increment(1)
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
      PotentialEnergy1: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}


function sumScore(){
  
  TotalScore.current = ScoreQuestion2.current + ScoreQuestion4.current + ScoreQuestion6.current +  ScoreQuestion7.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    PotentialEnergy1: CompletionScore.current
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
    case 4 :setAnswer4(true)
    ScoreQuestion4.current = 1
      break;
    case 6 :setAnswer6(true)
    ScoreQuestion6.current = 1
      break;
     case 7 :setAnswer7(true)
    ScoreQuestion7.current = 1
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
    case 4 :setAnswer4(true)
      break;
    case 6 :setAnswer6(true)
      break;
    case 7 :setAnswer7(true)
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
        Answer2.checked === true && 
        Answer3.checked === true&& 
        Answer4.checked === false ) {correct(2)}
    else{incorrect(2)}
    break;
  case 4 :
    if(Answer1.checked === true&& 
      Answer2.checked ===  false&& 
      Answer3.checked === false && 
      Answer4.checked === false){correct(4)}
  else{incorrect(4)}
  break;
case 6 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  true&& 
    Answer3.checked === false && 
    Answer4.checked === false ){correct(6)}
else{incorrect(6)}
break;
case 7 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === true && 
    Answer4.checked === false ){correct(7)}
else{incorrect(7)}
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
<div className="LabName">พลังงานศักย์</div>
<div div className="LabInfo">จากทฤษฎีบทงาน-พลังงานจลน์ ในตอนที่แล้ว อาจจะทำให้สงสัยได้ 
<br/> ลองพิจารณาลูกแอปเปิ้ลที่อยู่บนต้นไม้ จะพบได้ว่าลูกแอปเปิ้ลนั้นไม่มีพลังงานจลน์
<br/> แต่เมื่อลูกแอปเปิ้ลหลุดลงมาจะพบว่า ลูกแอปเปิ้ลมีความเร็วเพิ่มขึ้นเรื่อยๆ (พลังงานจลน์เพิ่มขึ้นเรื่อยๆ) 
ตามระยะทางที่เคลื่อนลงมา พลังงานนี้มาจากไหนกัน?
</div> 
<div className='SceneContainer'>
      <Scene1/>
    </div>
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Contained Energy</div>
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
<div className="LabName">พลังงานศักย์</div>
<div div className="LabInfo">
นักฟิสิกส์นิยามพลังงานที่สะสมไว้ในวัตถุและพร้อมที่จะนำมาใช้ว่า พลังงานศักย์ (Potential Energy) 
โดยพลังงานศักย์มีหลายประเภทเช่น พลังงานศักย์โน้มถ่วง (พลังงานศักย์เนื่องจากแรงโน้มถ่วง) พลังงานศักย์ยืดหยุ่น (พลังงานศักย์เนื่องจากแรงยืดหยุ่นจากสปริง/สายธนู) 
<br/>พลังงานเคมี พลังงานนิวเคลียร์ และอื่นๆอีกมากมาย แต่ในบทนี้จะหยิบยก 2 ชนิดมาทำการศึกษาคือ พลังงานศักย์โน้มถ่วง และ พลังงานศักย์ยืดหยุ่น 
</div> 
  <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P2.png?alt=media&token=cfb3ec4c-6c2d-4b9c-8128-74da1f0b982a" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Contained Energy</div>
  <div className="ProgessBar"><progress value="14" max="100"></progress></div>
  <div className="Question">ข้อใดถูกเกี่ยวกับพลังงานศักย์</div>
  <div className="AnswerList">
  <label className="container">พลังงานที่สะสมไว้ในวัตถุและพร้อมที่จะนำมาใช้
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">พลังงานศักย์โน้มถ่วง เป็นพลังงานศักย์เนื่องจากแรงโน้มถ่วง
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">ลูกแอปเปิ้ลที่อยู่บนต้นไม้มีพลังงานศักย์โน้มถ่วง
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">พลังงานศักย์ เป็นพลังงานของวัตถุที่กำลังเคลื่อนที่
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
<div className="LabName">พลังงานศักย์</div>
<div div className="LabInfo">
นักฟิสิกส์นิยามพลังงานที่สะสมไว้ในวัตถุและพร้อมที่จะนำมาใช้ว่า พลังงานศักย์ (Potential Energy) 
โดยพลังงานศักย์มีหลายประเภทเช่น พลังงานศักย์โน้มถ่วง (พลังงานศักย์เนื่องจากแรงโน้มถ่วง) พลังงานศักย์ยืดหยุ่น (พลังงานศักย์เนื่องจากแรงยืดหยุ่นจากสปริง/สายธนู) 
<br/>พลังงานเคมี พลังงานนิวเคลียร์ และอื่นๆอีกมากมาย แต่ในบทนี้จะหยิบยก 2 ชนิดมาทำการศึกษาคือ พลังงานศักย์โน้มถ่วง และ พลังงานศักย์ยืดหยุ่น 
</div> 
  <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P2.png?alt=media&token=cfb3ec4c-6c2d-4b9c-8128-74da1f0b982a" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Contained Energy</div>
    <div className="ProgessBar"><progress value="14" max="100"></progress></div>
    <div className="Question">ข้อใดถูกเกี่ยวกับพลังงานศักย์</div>
    <div className="AnswerList">
    <label className="container">พลังงานที่สะสมไว้ในวัตถุและพร้อมที่จะนำมาใช้
        <input type="checkbox" id="Answer1" checked disabled  />
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">พลังงานศักย์โน้มถ่วง เป็นพลังงานศักย์เนื่องจากแรงโน้มถ่วง
        <input type="checkbox" id="Answer2"checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">ลูกแอปเปิ้ลที่อยู่บนต้นไม้มีพลังงานศักย์โน้มถ่วง
        <input type="checkbox" id="Answer3"checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">พลังงานศักย์ เป็นพลังงานของวัตถุที่กำลังเคลื่อนที่
        <input type="checkbox" id="Answer4" disabled/>
        <span className="checkmark"></span>
      </label>
  
      <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
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
<div className="LabName">พลังงานศักย์</div>
<div className="LabInfo">พลังงานศักย์โน้มถ่วงคือพลังงานที่สะสมอยู่ในวัตถุ เกิดจากแรงโน้มถ่วงและตำแหน่ง<br/>ความสูงของวัตถุ 
โดยทำเมื่อเราทำการปล่อยมวล m ลงจากความสูง h จะพบว่า<div/>
<div className='SceneContainer'>
      <Scene2/>
    </div>
<div className="LabInfo">
<br/>เกิดงานเนื่องจากแรงโน้มถ่วง จาก  

<MathJaxContext>
      <MathJax>\[W = F \cdot S \]
        \[W = (m \cdot g) \cdot h \]
        \[W = m \cdot g \cdot h \]
       
      </MathJax>
      </MathJaxContext>
      <br/>ทำให้สามารถทราบพลังงานศักย์โน้มถ่วงมีค่าเท่ากับ mgh นั่นเอง</div>
</div> 

 
<div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Contained Energy</div>
  <div className="ProgessBar"><progress value="28" max="100"></progress></div>
  <div className="Question">กดปุ่มสีเขียว เพื่อไปหน้าต่อไป</div>
  <div className="AnswerList">
  
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
    <div className="LabName">พลังงานศักย์</div>
    <div className="LabInfo">มาทดสอบความเข้าใจกันครับ
      <br/><br/>ก้อนหิน มวล 10 kg ปล่อยจากความสูง 10 m ในแนวดิ่ง จงหาพลังงานศักย์โน้มถ่วง<br/>ตอนเริ่มปล่อย
    </div> 
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P3.png?alt=media&token=79020c1b-f699-43e2-915a-6cc84b66c9c2" />
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Contained Energy</div>
      <div className="ProgessBar"><progress value="42" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">1000 J
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">2000 J
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">16000 J
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">40000 J
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
    <div className="LabName">พลังงานศักย์</div>
    <div className="LabInfo">มาทดสอบความเข้าใจกันครับ
      <br/><br/>ก้อนหิน มวล 10 kg ปล่อยจากความสูง 10 m ในแนวดิ่ง จงหาพลังงานศักย์โน้มถ่วง<br/>ตอนเริ่มปล่อย
    </div> 
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P3.png?alt=media&token=79020c1b-f699-43e2-915a-6cc84b66c9c2" />
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Contained Energy</div>
        <div className="ProgessBar"><progress value="42" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">1000 J
            <input type="checkbox" id="Answer1" disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">2000 J
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">16000 J
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">40000 J
            <input type="checkbox" id="Answer4" disabled />
            <span className="checkmark"></span>
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
        <div className="LabName">พลังงานศักย์</div>
        <div className="LabInfo">ในการทำโจทย์เกี่ยวกับพลังงานศักย์โน้มถ่วง เรามักจะมีการตั้ง “ระดับอ้างอิง” 
        <br/>โดยเรามักจะกำหนดให้ระดับที่เราสนใจเป็นระดับอ้างอิง (h = 0) เพื่อความสะดวกในการคำนวณ<br/><br/>
        นกตัวหนึ่งบินสูงจากระดับน้ำทะเล 10 m คาบกิ่งไม้แล้วปล่อยกิ่งไม้กลางอากาศให้ตกลงบนภูเขาซึ่งสูงจากระดับน้ำทะเล 6 m จงหางานที่เกิดในการปล่อยกิ่งไม้(กำหนดกิ่งไม้หนัก 100 g)
        </div> 
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P4.png?alt=media&token=d893d1c1-fb51-4b22-b0f1-7c1cb322621b" />
        <div className="LabInfo">เนื่องจากนกปล่อยกิ่งไม้จากความสูง 10 m {'-->'} ความสูง 6 m เราจึงสามารถตั้งระดับอ้างอิงที่จุดต่ำสุด (6 m) ได้<br/>
        ดังนั้นเราจะถือว่า ที่สูงกว่าระดับน้ำทะเล 6 m จะอยู่ที่ความสูง 0 m และ สูงกว่าระดับน้ำทะเล 10 m จะอยู่ที่ความสูง 4 m<br/>
        <MathJaxContext>
      <MathJax>
        \[W = m \cdot g \cdot h \]
        \[W = 0.1 \cdot 10 \cdot 4 \]
        \[W = 4J\]
      </MathJax>
      </MathJaxContext>
        </div> 
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
  <div className="LabNumber">Contained Energy</div>
  <div className="ProgessBar"><progress value="56" max="100"></progress></div>
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
    <div className="LabName">พลังงานศักย์</div>
    <div className="LabInfo">จากรูปวัตถุมีมวล 1 กิโลกรัมเคลื่อนที่จากจุด A ไปอยู่ที่จุด E โดยทางโค้งไม่มีแรงเสียดทาน<br/>
    จงหาผลต่างพลังงานศักย์ ของจุด A และ จุด C
    </div> 
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P5.png?alt=media&token=44b39353-448b-4eb0-8655-3277af1ecc80" />
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Contained Energy</div>
      <div className="ProgessBar"><progress value="70" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">20 J
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">30 J
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">50 J
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">170 J
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
    <div className="LabName">พลังงานศักย์</div>
    <div className="LabInfo">จากรูปวัตถุมีมวล 1 กิโลกรัมเคลื่อนที่จากจุด A ไปอยู่ที่จุด E โดยทางโค้งไม่มีแรงเสียดทาน<br/>
    จงหาผลต่างพลังงานศักย์ ของจุด A และ จุด C
    </div> 
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P5.png?alt=media&token=44b39353-448b-4eb0-8655-3277af1ecc80" />
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Contained Energy</div>
        <div className="ProgessBar"><progress value="70" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">20 J
            <input type="checkbox" id="Answer1" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">30 J
            <input type="checkbox" id="Answer2"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">50 J
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">170 J
            <input type="checkbox" id="Answer4" disabled />
            <span className="checkmark"></span>
          </label>
      
          <button className = "btn btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
      </div>
      <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(5)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(7)}>Next page</button></div>
      
      </div>
      </div>)
      }
      function Page7 (){
    return(
      <div>
      <div className="split Index">
    <div className="LabName">พลังงานศักย์</div>
    <div className="LabInfo">ปล่อยหินมวล 5 kg จากหอคอยที่สูงจากพื้น 15 m ลงไปในบ่อน้ำลึกจากพื้น 25 m จงหาพลังงานศักย์โน้มถ่วงตอนเริ่มปล่อยก้อนหิน
    </div> 
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/well.svg?alt=media&token=6d421624-34c3-486c-a161-a7e562df410f" />
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Contained Energy</div>
      <div className="ProgessBar"><progress value="84" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">2000 J
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">3000 J
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">4000 J
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">5000 J
          <input type="checkbox" id="Answer4" />
          <span className="checkmark" ></span>
        </label>
    
        <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(7)}>Send Answer</button>
      
    </div>
    <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(6)}>Previous page</button>
    <button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>
    
    </div>
    </div>)
    }

    function Page7Answered (){
      return(
        <div>
          {AlertState.current === 1? <CorrectAlert/> : null}
    {AlertState.current === 2? <IncorrectAlert/> : null}
    <div className="split Index">
    <div className="LabName">พลังงานศักย์</div>
    <div className="LabInfo">ปล่อยหินมวล 5 kg จากหอคอยที่สูงจากพื้น 15 m ลงไปในบ่อน้ำลึกจากพื้น 25 m จงหาพลังงานศักย์โน้มถ่วงตอนเริ่มปล่อยก้อนหิน
    </div> 
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/well.svg?alt=media&token=6d421624-34c3-486c-a161-a7e562df410f" />
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Contained Energy</div>
        <div className="ProgessBar"><progress value="84" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">2000 J
            <input type="checkbox" id="Answer1" disabled />
            <span className="checkmark" ></span>
          </label>
          <label className="container">3000 J
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">4000 J
            <input type="checkbox" id="Answer3"disabled checked/>
            <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">5000 J
            <input type="checkbox" id="Answer4" disabled />
            <span className="checkmark"></span>
          </label>
      
          <button className = "btn btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
      </div>
      <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(6)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(8)}>Next page</button></div>
      
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
  

else if (page === 3) {return (
  <div><Page3/></div>)}
  

else if (page === 4 && Answer4 === false) {
  return(<div><Page4/></div>)
  }
  else if (page === 4 && Answer4 === true) {
    return(<div><Page4Answered/></div>)
  }
  else if (page === 5) {return (
    <div><Page5/></div>)}
    
else if (page === 6 && Answer6 === false) {
  return(<div><Page6/></div>)
  }
  else if (page === 6 && Answer6 === true) {
    return(<div><Page6Answered/></div>)
  }
  
else if (page === 7 && Answer7 === false) {
  return(<div><Page7/></div>)
  }
  else if (page === 7 && Answer7 === true) {
    return(<div><Page7Answered/></div>)
  }
else if (page === 8) {return(
    <div><FinishPage/></div>)}
    


else   {return(<div>
  <h1>Error 404 Webpage not fonud</h1>
  <p>Course page not found, Please try again shortly</p></div>
)}
}