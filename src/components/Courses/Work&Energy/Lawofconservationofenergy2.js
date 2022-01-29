import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {Scene} from './Material/Work4Scene1';
import {CorrectAlert, IncorrectAlert, UpvoteAlert, ReportAlert} from './Alert'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function Lawofconservationofenergy2() {
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
      LCE2 : firebase.firestore.FieldValue.increment(1)
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
      LCE2: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}

function sumScore(){
  
  TotalScore.current =   ScoreQuestion2.current + ScoreQuestion3.current + ScoreQuestion4.current + ScoreQuestion5.current + ScoreQuestion6.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    Lawofconservationofenergy2: CompletionScore.current
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
      Answer4.checked === false){retry()}
  
  else{ 
    switch(QuestionNumber){
      case 2 :
        if(Answer1.checked === false&& 
          Answer2.checked ===  true&& 
          Answer3.checked ===  false&& 
          Answer4.checked === false){correct(2)}
      else{incorrect(2)}
      break;
  case 3 :
    if(Answer1.checked === false&& 
      Answer2.checked ===  true&& 
      Answer3.checked ===  false&& 
      Answer4.checked === false){correct(3)}
  else{incorrect(3)}
  break;
case 4 :
    if(Answer1.checked === false&& 
      Answer2.checked ===  false&& 
      Answer3.checked ===  true&& 
      Answer4.checked === false){correct(4)}
  else{incorrect(4)}
  break;
  case 5 : if(Answer1.checked === false && 
    Answer2.checked ===  false&& 
    Answer3.checked === true && 
    Answer4.checked === false ) {correct(5)}
else{incorrect(5)}
break;
default :
    alert("Checking Error")
    break;
}
}}
function checkAnswer12Choice(QuestionNumber){
  let Answer1 = document.getElementById("Answer1")
  let Answer2 = document.getElementById("Answer2")
  let Answer3 = document.getElementById("Answer3")
  let Answer4 = document.getElementById("Answer4")
  let Answer5 = document.getElementById("Answer5")
  let Answer6 = document.getElementById("Answer6")
  let Answer7 = document.getElementById("Answer7")
  let Answer8 = document.getElementById("Answer8")
  let Answer9 = document.getElementById("Answer9")
  let Answer10 = document.getElementById("Answer10")
  let Answer11 = document.getElementById("Answer11")
  let Answer12 = document.getElementById("Answer12")

  if(Answer1.checked === false && 
    Answer2.checked === false && 
    Answer3.checked === false && 
    Answer4.checked === false && 
    Answer5.checked === false && 
    Answer6.checked === false && 
    Answer7.checked === false && 
    Answer8.checked === false &&
    Answer9.checked === false &&
    Answer10.checked === false &&
    Answer11.checked === false &&
    Answer12.checked === false ){retry()}
  
  else{switch(QuestionNumber){
    case 6 :
      if(Answer1.checked === true&& 
        Answer2.checked ===  true&& 
        Answer3.checked === false&& 
        Answer4.checked === false&&
        Answer5.checked ===  true&& 
        Answer6.checked === true&&
        Answer7.checked ===  true&& 
        Answer8.checked === false&&
        Answer9.checked === true&&
        Answer10.checked === true&&
        Answer11.checked === false&&
        Answer12.checked === true){correct(6)}
else{incorrect(6)}
break;
default :
    alert("Checking Error")
    break;
}}}

  
  
  function Page1 (){
return(
  <div>
  <div className="split Index">
<div className="LabName">กฎการอนุรักษ์พลังงาน</div>
<div div className="LabInfo">
แรงเสริมหรือแรงต้าน<br/><br/>
เมื่อวัตถุถูกกระทำด้วยแรง ระหว่างเคลื่อนที่จากจุดหนึ่งไปอีกจุดหนึ่ง เราสามารถคิดเป็นงาน
<br/>จากแรงเสริม/ต้าน เพิ่มเข้าไปในระบบได้เลย เช่น<br/><br/>รถของเล่นมวล 2 kg เคลื่อนที่ด้วยความเร็ว 10 m/s ถูกผลักด้วยแรง 10N เป็นระยะทาง 10 m จงหาความเร็วของรถหลังถูกแรงกระทำ
<br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P1.png?alt=media&token=f6c07a42-9461-4b16-a297-cd540deb422b" />
<MathJaxContext>
      <MathJax>\[E1 + W = E2 \]
        \[(\cfrac{1}{2} \cdot m \cdot v^2)..1 + (F \cdot S) = (\cfrac{1}{2} \cdot m \cdot v^2)..2\]
        \[(100) + (10 \cdot 10) = (\cfrac{1}{2} \cdot 2 \cdot v^2)..2\]
        \[v^2 = 200 \]
        \[v = 10\sqrt{2} m/s \]
      </MathJax>
      </MathJaxContext>
     
</div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Introducing Work</div>
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
<div className="LabName">กฎการอนุรักษ์พลังงาน</div>
<div div className="LabInfo">สามารถทดสอบความเข้าใจได้จากโจทย์ต่อไปนี้ครับ<br/><br/>
แอปเปิ้ลมวล 100 g ตกจากต้นที่สูง 5 m ระหว่างตกถูกแรงต้านอากาศขนาด 0.2 N กระทำ <br/>จงหาความเร็วของลูกแอปเปิ้ลก่อนถึงพื้น
<br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P2.png?alt=media&token=083fce3c-34b0-4b0e-a184-d794e115e6b3" />
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="17" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">4√2 m/s
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">4√5 m/s
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">5√2 m/s
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">5√3 m/s
          <input type="checkbox" id="Answer4" />
          <span className="checkmark" ></span>
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
<div className="LabName">กฎการอนุรักษ์พลังงาน</div>
<div div className="LabInfo">สามารถทดสอบความเข้าใจได้จากโจทย์ต่อไปนี้ครับ<br/><br/>
แอปเปิ้ลมวล 100 g ตกจากต้นที่สูง 5 m ระหว่างตกถูกแรงต้านอากาศขนาด 0.2 N กระทำ <br/>จงหาความเร็วของลูกแอปเปิ้ลก่อนถึงพื้น
<br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P2.png?alt=media&token=083fce3c-34b0-4b0e-a184-d794e115e6b3" />
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Introducing Work</div>
    <div className="ProgessBar"><progress value="17" max="100"></progress></div>
    <div className="Question"></div>
    <div className="AnswerList">
    <label className="container">4√2 m/s
        <input type="checkbox" id="Answer1" disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">4√5 m/s
        <input type="checkbox" id="Answer2"disabled  checked />
        <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">5√2 m/s
        <input type="checkbox" id="Answer3"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">5√3 m/s
        <input type="checkbox" id="Answer4" disabled/>
        <span className="checkmark" ></span>
      </label>
  
      <button className = "btn btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
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
<div className="LabName">กฎการอนุรักษ์พลังงาน</div>
<div className="LabInfo">ลูกตุ้มมวล 10 kg เหล็กตกจากความสูง 5 m ลงบนพื้นทราย พบว่าลูกตุ้มจมลึก 20 cm <br/>จงหาแรงต้านเฉลี่ยของพื้นทราย
<br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P3.png?alt=media&token=548056b8-6be6-41a1-998b-bd3c46373504" />

</div> 
<div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="34" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">2400 N
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">2500 N
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">2600 N
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">3000 N
          <input type="checkbox" id="Answer4" />
          <span className="checkmark" ></span>
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
<div className="LabName">กฎการอนุรักษ์พลังงาน</div>
<div className="LabInfo">ลูกตุ้มมวล 10 kg เหล็กตกจากความสูง 5 m ลงบนพื้นทราย พบว่าลูกตุ้มจมลึก 20 cm <br/>จงหาแรงต้านเฉลี่ยของพื้นทราย
<br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P3.png?alt=media&token=548056b8-6be6-41a1-998b-bd3c46373504" />

</div> 
<div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Introducing Work</div>
    <div className="ProgessBar"><progress value="34" max="100"></progress></div>
    <div className="Question"></div>
    <div className="AnswerList">
    <label className="container">2400 N
        <input type="checkbox" id="Answer1" disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">2500 N
        <input type="checkbox" id="Answer2"disabled checked />
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">2600 N
        <input type="checkbox" id="Answer3"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">3000 N
        <input type="checkbox" id="Answer4" disabled/>
        <span className="checkmark"></span>
      </label>
  
      <button className = "btn btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
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
    <div className="LabName">กฎการอนุรักษ์พลังงาน</div>
    <div className="LabInfo">จากรูปผิวโค้งลื่น แต่ผิวราบขรุขระมัสัมประสิทธิ์ความเสียดทาย 0.2 ยาว 4 m ถ้าวัตถุถูกปล่อยมาจากจุด A สูง 2 m จงหาว่าวัตถุจะขึ้นไปถึง D สูงเท่าไร


    <br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P4.png?alt=media&token=39df6c01-8285-4631-a72b-af9736fd5873" />
    </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="51" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">100 cm
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">110 cm
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">120 cm
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">130 cm
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
      <div className="LabName">กฎการอนุรักษ์พลังงาน</div>
      <div className="LabInfo">
      จากรูปผิวโค้งลื่น แต่ผิวราบขรุขระมัสัมประสิทธิ์ความเสียดทาย 0.2 ยาว 4 m ถ้าวัตถุถูกปล่อยมาจากจุด A สูง 2 m จงหาว่าวัตถุจะขึ้นไปถึง D สูงเท่าไร

    <br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P4.png?alt=media&token=39df6c01-8285-4631-a72b-af9736fd5873" />
    <mark className="Yellow">เฉลย</mark>
    <MathJaxContext>
      <MathJax>\[(m \cdot g \cdot h)..A - W = (m \cdot g \cdot h)..D \]
        \[(m \cdot g \cdot h)..A - (µ \cdot m \cdot g \cdot S) = (m \cdot g \cdot h)..D\]
        \[(m \cdot g )\cdot [(h)..A - (µ \cdot S)] = (m \cdot g) \cdot h..D\]
        \[2 - (0.8) = h\]
        \[h = 1.2 m \]
      </MathJax>
      </MathJaxContext>
      </div> 
     
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="51" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">100 cm
            <input type="checkbox" id="Answer1" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">110 cm
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">120 cm
            <input type="checkbox" id="Answer3"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">130 cm
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
        <div className="LabName">กฎการอนุรักษ์พลังงาน</div>
        <div className="LabInfo">จากข้อ 4 วัตถุจะไปหยุดห่างจากจุด B กี่เมตร<br/><br/>
จากรูปผิวโค้งลื่น แต่ผิวราบขรุขระมัสัมประสิทธิ์ความเสียดทาย 0.2 ยาว 4 m <br/>ถ้าวัตถุถูกปล่อยมาจากจุด A สูง 2 m 

        <br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P4.png?alt=media&token=39df6c01-8285-4631-a72b-af9736fd5873" />
        </div> 
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="68" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">0.5 m
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">1.5 m
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">2.0 m
            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">3.5 m
            <input type="checkbox" id="Answer4" />
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
      <div className="LabName">กฎการอนุรักษ์พลังงาน</div>
      <div className="LabInfo">จากข้อ 4 วัตถุจะไปหยุดห่างจากจุด B กี่เมตร<br/><br/>
จากรูปผิวโค้งลื่น แต่ผิวราบขรุขระมัสัมประสิทธิ์ความเสียดทาย 0.2 ยาว 4 m <br/>ถ้าวัตถุถูกปล่อยมาจากจุด A สูง 2 m 

        <br/><img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P4.png?alt=media&token=39df6c01-8285-4631-a72b-af9736fd5873" />
        <mark className="Yellow">เฉลย</mark>
    <MathJaxContext>
      <MathJax>\[(m \cdot g \cdot h) - W = 0 \]
        \[(m \cdot g \cdot h) - (µ \cdot m \cdot g \cdot S) = 0\]
        \[(m \cdot g )\cdot [(h) - (µ \cdot S)] = 0\]
        \[2 - (0.2 \cdot S) = 0\]
        \[S = 10 m \]
      </MathJax>
      </MathJaxContext>
      วัตถุจะหยุดอยู่ตรงกลางของผิวโค้ง ทำให้ห่างจากจุด B เป็นระยะทาง 2 เมตร
      </div> 
     
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="68" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">0.5 m
            <input type="checkbox" id="Answer1" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">1.5 m
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark" ></span>
          </label>
          <label className="container">2.0 m
            <input type="checkbox" id="Answer3"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">3.5 m
            <input type="checkbox" id="Answer4" disabled />
            <span className="checkmark"></span>
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
        <div className="LabName">กฎการอนุรักษ์พลังงาน</div>
        <div className="LabInfo">ข้อใดถูกต้องเกี่ยวกับงาน กำลัง และ พลังงาน
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P6-1.png?alt=media&token=6a3f0d95-eb73-443a-97bc-05778a1cf693" />
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P6-2.png?alt=media&token=aae17327-1da5-4072-a4e0-4f7fa7b7cf1d" />
        </div> 
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="85" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">เมื่อแรงมีทิศตรงข้ามกับการกระจัด จะได้งานเป็นลบ
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">งานมีสูตรว่า W=F (dot product) S 
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">การที่แรงตั้งฉากกับการกระจัดจะทำให้เกิดงาน
            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S หา งานได้จากความชันของกราฟ
            <input type="checkbox" id="Answer4" />
            <span className="checkmark"></span>
          </label>
          <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S สามารถใช้หางานของแรง F ได้
            <input type="checkbox" id="Answer5" />
            <span className="checkmark"></span>
          </label>
          <label className="container">หน่วย J ใช้บอกปริมาณงานที่ทำหรือพลังงานที่ต้องการออกแรง จำนวน 1 นิวตัน เป็นระยะทาง 1 เมตร
            <input type="checkbox" id="Answer6" />
            <span className="checkmark"></span>
          </label>
          <label className="container">กำลัง ใช้บอกความสามารถทำงานได้มาก-น้อยในช่วงเวลาหนึ่ง
            <input type="checkbox" id="Answer7"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">กำลัง มีหน่วยเป็น จูล (J)
            <input type="checkbox" id="Answer8"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">พลังงานรูปหนึ่งสามารถเปลี่ยนเป็นพลังงานรูปอื่นๆได้
            <input type="checkbox" id="Answer9" />
            <span className="checkmark"></span>
          </label>
          <label className="container">พลังงานจลน์(Kinetic energy) เป็นพลังงานของวัตถุที่กำลังเคลื่อนที่
            <input type="checkbox" id="Answer10" />
            <span className="checkmark"></span>
          </label>
          <label className="container">พลังงานมี 2 ชนิด ได้แก่ พลังงานศักย์ และ พลังงานจลน์
            <input type="checkbox" id="Answer11" />
            <span className="checkmark"></span>
          </label>
          <label className="container">พลังงานศักย์ คือ พลังงานที่สะสมไว้ในวัตถุและพร้อมที่จะนำมาใช้
            <input type="checkbox" id="Answer12" />
            <span className="checkmark"></span>
          </label>
          
          <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer12Choice(6)}>Send Answer</button>
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
        <div className="LabName">กฎการอนุรักษ์พลังงาน</div>
        <div className="LabInfo">ข้อใดถูกต้องเกี่ยวกับงาน กำลัง และ พลังงาน
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P6-1.png?alt=media&token=6a3f0d95-eb73-443a-97bc-05778a1cf693" />
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P6-2.png?alt=media&token=aae17327-1da5-4072-a4e0-4f7fa7b7cf1d" />
        </div> 
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="85" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">เมื่อแรงมีทิศตรงข้ามกับการกระจัด จะได้งานเป็นลบ
            <input type="checkbox" id="Answer1"disabled checked />
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">งานมีสูตรว่า W=F (dot product) S 
            <input type="checkbox" id="Answer2"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">การที่แรงตั้งฉากกับการกระจัดจะทำให้เกิดงาน
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S หา งานได้จากความชันของกราฟ
            <input type="checkbox" id="Answer4" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S สามารถใช้หางานของแรง F ได้
            <input type="checkbox" id="Answer5"disabled checked />
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">หน่วย J ใช้บอกปริมาณงานที่ทำหรือพลังงานที่ต้องการออกแรง จำนวน 1 นิวตัน เป็นระยะทาง 1 เมตร
            <input type="checkbox" id="Answer6"disabled checked />
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">กำลัง ใช้บอกความสามารถทำงานได้มาก-น้อยในช่วงเวลาหนึ่ง
            <input type="checkbox" id="Answer7"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">กำลัง มีหน่วยเป็น จูล (J)
            <input type="checkbox" id="Answer8"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">พลังงานรูปหนึ่งสามารถเปลี่ยนเป็นพลังงานรูปอื่นๆได้
            <input type="checkbox" id="Answer9"disabled checked />
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">พลังงานจลน์(Kinetic energy) เป็นพลังงานของวัตถุที่กำลังเคลื่อนที่
            <input type="checkbox" id="Answer10"disabled checked />
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">พลังงานมี 2 ชนิด ได้แก่ พลังงานศักย์ และ พลังงานจลน์
            <input type="checkbox" id="Answer11" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">พลังงานศักย์ คือ พลังงานที่สะสมไว้ในวัตถุและพร้อมที่จะนำมาใช้
            <input type="checkbox" id="Answer12"disabled checked />
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
      <button className = "UpvoteButton" style = {{right : "0%", backgroundColor: "rgb(var(--secondary-color))" }} ><Link to = "/courses" >Back to Courses</Link></button>
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