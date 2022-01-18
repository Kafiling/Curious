import React ,{useState , useRef, useContext}from 'react'
import {Link } from 'react-router-dom'
import {AnswerSentAlert, UpvoteAlert, ReportAlert} from './Alert'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {MyChart as Chart5} from './Material/Work4Chart7';
import {MyChart as Chart6} from './Material/ExamWorkChart6';
import {MyChart as Chart7} from './Material/ExamWorkChart7';
//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function ExamWork() {
// Set Page
var [page, setPage] = useState(1);
//Var Answered
var [Answer1, setAnswer1] = useState(false);
var [Answer2, setAnswer2] = useState(false);
var [Answer3, setAnswer3] = useState(false);
var [Answer4, setAnswer4] = useState(false);
var [Answer5, setAnswer5] = useState(false);
var [Answer6, setAnswer6] = useState(false);
var [Answer7, setAnswer7] = useState(false);
var [Answer8, setAnswer8] = useState(false);
var [Answer9, setAnswer9] = useState(false);
var [Answer10, setAnswer10] = useState(false);
//Var Score
const TotalQuestionNum = useRef(10)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
const ScoreQuestion1 = useRef(0)
const ScoreQuestion2 = useRef(0)
const ScoreQuestion3 = useRef(0)
const ScoreQuestion4 = useRef(0)
const ScoreQuestion5 = useRef(0)
const ScoreQuestion6 = useRef(0)
const ScoreQuestion7 = useRef(0)
const ScoreQuestion8 = useRef(0)
const ScoreQuestion9 = useRef(0)
const ScoreQuestion10 = useRef(0)
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
      ExamWork : firebase.firestore.FieldValue.increment(1)
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
      ExamWork: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}

function sumScore(){
  
  TotalScore.current = ScoreQuestion1.current + ScoreQuestion2.current + ScoreQuestion3.current + ScoreQuestion4.current + ScoreQuestion5.current + ScoreQuestion6.current + ScoreQuestion7.current + ScoreQuestion8.current + ScoreQuestion9.current + ScoreQuestion10.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    ExamWork: CompletionScore.current
}, { merge: true });
  

}

  //เช็คคำตอบถูก-ผิด
function correct(QuestionPage){
  //เช็คถูก
  AlertState.current = 1
  setTimeout(resetAlert,3000)
  switch(QuestionPage){
    case 1 :setAnswer1(true)
    ScoreQuestion1.current = 1
      break;
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
    case 7 :setAnswer7(true)
    ScoreQuestion7.current = 1
      break;
    case 8 :setAnswer8(true)
    ScoreQuestion8.current = 1
      break;
    case 9 :setAnswer9(true)
    ScoreQuestion9.current = 1
      break;
    case 10 :setAnswer10(true)
    ScoreQuestion10.current = 1
      break;
    default :
    alert("Scoring Error")
    break;
  }
}

function incorrect(QuestionPage){
  AlertState.current = 1
  setTimeout(resetAlert,3000)
  switch(QuestionPage){
    case 1 :setAnswer1(true)
      break;
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
    case 7 :setAnswer7(true)
      break;
    case 8 :setAnswer8(true)
      break;
    case 9 :setAnswer9(true)
      break;
    case 10 :setAnswer10(true)
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
  case 1 : if(Answer1.checked === true && 
        Answer2.checked === false && 
        Answer3.checked === false && 
        Answer4.checked === false ) {correct(1)} 
    else{incorrect(1)}
    break;
  case 2 : if(Answer1.checked === false && 
      Answer2.checked === false && 
      Answer3.checked === false && 
      Answer4.checked === true ) {correct(2)}
  else{incorrect(2)}
  break;
  case 3 : if(Answer1.checked === false && 
      Answer2.checked === true && 
      Answer3.checked === false && 
      Answer4.checked === false ) {correct(3)}
  else{incorrect(3)}
  break;
  case 4 :
    if(Answer1.checked === false&& 
      Answer2.checked ===  false&& 
      Answer3.checked === true && 
      Answer4.checked === false ){correct(4)}
  else{incorrect(4)}
  break;
case 5 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === true&& 
    Answer4.checked === false ){correct(5)}
else{incorrect(5)}
break;
case 6 :
  if(Answer1.checked === true&& 
    Answer2.checked ===  false&& 
    Answer3.checked === false&& 
    Answer4.checked === false ){correct(6)}
else{incorrect(6)}
break;
case 7 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === true&& 
    Answer4.checked === false ){correct(7)}
else{incorrect(7)}
break;
case 8 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === false&& 
    Answer4.checked === true ){correct(8)}
else{incorrect(8)}
break;
case 9 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === false&& 
    Answer4.checked === true ){correct(9)}
else{incorrect(9)}
break;
default :
    alert("Checking Error")
    break;
}
}}
function checkAnswer8Choice(QuestionNumber){
  let Answer1 = document.getElementById("Answer1")
  let Answer2 = document.getElementById("Answer2")
  let Answer3 = document.getElementById("Answer3")
  let Answer4 = document.getElementById("Answer4")
  let Answer5 = document.getElementById("Answer5")
  let Answer6 = document.getElementById("Answer6")
  let Answer7 = document.getElementById("Answer7")
  let Answer8 = document.getElementById("Answer8")
  if(Answer1.checked === false && 
    Answer2.checked === false && 
    Answer3.checked === false && 
    Answer4.checked === false && 
    Answer5.checked === false && 
    Answer6.checked === false && 
    Answer7.checked === false && 
    Answer8.checked === false ){retry()}
  
  else{switch(QuestionNumber){
    case 10 :
      if(Answer1.checked === true&& 
        Answer2.checked ===  true&& 
        Answer3.checked === true&& 
        Answer4.checked === true&&
        Answer5.checked ===  false&& 
        Answer6.checked === true&&
        Answer7.checked ===  true&& 
        Answer8.checked === false){correct(10)}
else{incorrect(10)}
break;
default :
    alert("Checking Error")
    break;
}}}

function allAnswerSummitCheck(){
  let arr = [Answer1,Answer2,Answer3,Answer4,Answer5,Answer6,Answer7,Answer8,Answer9,Answer10]
  let filtered = arr.filter(Boolean);
  let NumQuestionNotAnswered = 10 - filtered.length 
  if(Answer1 && Answer2 && Answer3 && Answer4 && Answer5 && Answer6 && Answer7 && Answer8 && Answer9 && Answer10){
    setPage(11)
  }
  else {
    alert("ตอบไม่ยังครบขาดอีก" + NumQuestionNotAnswered + "ข้อ")
  }
  
}
  
function Page1 (){
  return(
    <div>
    <div className="split Index">
  <div className="LabName">งานทางฟิสิกส์</div>
  <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
  <div className="LabInfo">ชายคนหนึ่งแบกวัตถุมวล 10 กิโลกรัม ไว้บนบ่าเดินขึ้นสะพานลอยข้ามถนนซึ่งสูง 5 เมตรยาว 30 เมตร จงหางานของชายคนนั้นที่กระทำต่อวัตถุ
</div>
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP1.png?alt=media&token=3852505d-e5b4-4e1a-bc8c-7f1071bb6132" />
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Exam : Work (1/10)</div>
    <div className="ProgessBar"><progress value="0" max="100"></progress></div>
    
    <div className="AnswerList">
    <label className="container">0 J
        <input type="checkbox" id="Answer1" />
        <span className="checkmark"></span>
      </label>
      <label className="container">150 J
        <input type="checkbox" id="Answer2"/>
        <span className="checkmark"></span>
      </label>
      <label className="container">500 J
        <input type="checkbox" id="Answer3"/>
        <span className="checkmark"></span>
      </label>
      <label className="container">3000 J
        <input type="checkbox" id="Answer4"/>
        <span className="checkmark"></span>
      </label>
  
      <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(1)}>Send Answer</button>
    
  </div>
  <div className="ButtonContainer">
  <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(2)} style={{left : "60%"}}>Next page</button></div>
  </div>
  </div>)
  }
  function Page1Answered (){
    return(
      <div>
        {AlertState.current === 1? <AnswerSentAlert/> : null}
  <div className="split Index">
  <div className="LabName">งานทางฟิสิกส์</div>
  <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
  <div className="LabInfo">ชายคนหนึ่งแบกวัตถุมวล 10 กิโลกรัม ไว้บนบ่าเดินขึ้นสะพานลอยข้ามถนนซึ่งสูง 5 เมตรยาว 30 เมตร จงหางานของชายคนนั้นที่กระทำต่อวัตถุ
</div>
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP1.png?alt=media&token=3852505d-e5b4-4e1a-bc8c-7f1071bb6132" />
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Exam : Work (1/10)</div>
      <div className="ProgessBar"><progress value="0" max="100"></progress></div>
      
      <div className="AnswerList">
      <label className="container">0 J
          <input type="checkbox" id="Answer1"disabled/>
          <span className="checkmark"></span>
        </label>
        <label className="container">150 J
          <input type="checkbox" id="Answer2"disabled/>
          <span className="checkmark"></span>
        </label>
        <label className="container">500 J
          <input type="checkbox" id="Answer3"disabled/>
          <span className="checkmark"></span>
        </label>
        <label className="container">3000 J
          <input type="checkbox" id="Answer4"disabled/>
          <span className="checkmark"></span>
        </label>
    
        <button className = "btn btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
      
    </div>
    <div className="ButtonContainer">
    <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(2)}>Next page</button></div>
    </div>
    </div>)
    }
  function Page2 (){
      return(
        <div>
        <div className="split Index">
      <div className="LabName">งานทางฟิสิกส์</div>
      <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
      <div className="LabInfo">ชายคนหนึ่งยกวัตถุมวล 5 กิโลกรัม ขึ้นสูง 2 เมตร จงหางานของแรงยก
    </div>
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP2.png?alt=media&token=6e24fb48-bc0e-4c29-b382-840df03a2a88" />
       <div div className="FooterSpace"></div>
       <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD6nx-Rhrc'> sketchify</a></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Exam : Work (2/10)</div>
        <div className="ProgessBar"><progress value="10" max="100"></progress></div>ื
        <div className="AnswerList">
        <label className="container">0 J
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">10 J
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">50 J
            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">100 J
            <input type="checkbox" id="Answer4"/>
            <span className="checkmark"></span>
          </label>
      
          <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(2)}>Send Answer</button>
        
      </div>
      <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(1)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(3)} >Next page</button></div>
      </div>
      </div>)
      }
  function Page2Answered (){
        return(
          <div>
            {AlertState.current === 1? <AnswerSentAlert/> : null}
          <div className="split Index">
        <div className="LabName">งานทางฟิสิกส์</div>
        <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
        <div className="LabInfo">ชายคนหนึ่งยกวัตถุมวล 5 กิโลกรัม ขึ้นสูง 2 เมตร จงหางานของแรงยก
    </div>
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP2.png?alt=media&token=6e24fb48-bc0e-4c29-b382-840df03a2a88" />
         <div div className="FooterSpace"></div>
         <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD6nx-Rhrc'> sketchify</a></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Exam : Work (2/10)</div>
          <div className="ProgessBar"><progress value="10" max="100"></progress></div>
          <div className="AnswerList">
          <label className="container">0 J
              <input type="checkbox" id="Answer1" disabled />
              <span className="checkmark"></span>
            </label>
            <label className="container">10 J
              <input type="checkbox" id="Answer2"disabled/>
              <span className="checkmark"></span>
            </label>
            <label className="container">50 J
              <input type="checkbox" id="Answer3"disabled/>
              <span className="checkmark"></span>
            </label>
            <label className="container">100 J
              <input type="checkbox" id="Answer4"disabled/>
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
              {AlertState.current === 1? <AnswerSentAlert/> : null}
            <div className="split Index">
          <div className="LabName">งานทางฟิสิกส์</div>
          <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
          <div className="LabInfo">ปรีดาซ้อมขี่จักรยานขึ้นไปตามถนนราบเอียงยาว 5 km ทำมุม 15˚ กับแนวระดับ 
          ด้วยความเร็วคงที่ 36 กิโลเมตร/ชั่วโมงปรีดาและจักรยานมีมวลรวม 8 กิโลกรัม 
          จงหางานของปรีดาที่ใช้ขี่จักรยาน ( sin15˚ = 0.26, cos15˚ = 0.97)
        </div>
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP3.png?alt=media&token=9cbd7246-e4db-4c4b-b1a3-ae0f381f96f6" />
           <div div className="FooterSpace"></div>
           <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADxz61GV1o'> sketchify</a></div>
           <div className="Footer">Curious Project</div>
           
           
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Exam : Work (3/10)</div>
            <div className="ProgessBar"><progress value="20" max="100"></progress></div>ื
            
            <div className="AnswerList">
            <label className="container">20.8 kJ
                <input type="checkbox" id="Answer1" />
                <span className="checkmark"></span>
              </label>
              <label className="container">104 kJ
                <input type="checkbox" id="Answer2"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">2080 kJ
                <input type="checkbox" id="Answer3"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">10400 kJ
                <input type="checkbox" id="Answer4"/>
                <span className="checkmark"></span>
              </label>
          
              <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(3)}>Send Answer</button>
            
          </div>
          <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(2)}>Previous page</button>
          <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(4)} >Next page</button></div>
          </div>
          </div>)
          }
  function Page3Answered (){
            return(
              <div>
                {AlertState.current === 1? <AnswerSentAlert/> : null}
              <div className="split Index">
            <div className="LabName">งานทางฟิสิกส์</div>
            <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
            <div className="Labinfo">ปรีดาซ้อมขี่จักรยานขึ้นไปตามถนนราบเอียงยาว 5 km ทำมุม 15˚ กับแนวระดับ ด้วยความเร็วคงที่ 36 กิโลเมตร/ชั่วโมงปรีดาและจักรยานมีมวลรวม 8 กิโลกรัม จงหางานของปรีดาที่ใช้ขี่จักรยาน ( sin15˚ = 0.26, cos15˚ = 0.97)
        </div>
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP3.png?alt=media&token=9cbd7246-e4db-4c4b-b1a3-ae0f381f96f6" />
             <div div className="FooterSpace"></div>
             <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADxz61GV1o'> sketchify</a></div>
             <div className="Footer">Curious Project</div>
             <div div className="FooterSpace"></div>
            </div>
            
            <div className="split QuestionAnswer"> 
              <div className="LabNumber">Exam : Work (3/10)</div>
              <div className="ProgessBar"><progress value="20" max="100"></progress></div>
              <div className="AnswerList">
              <label className="container">20.8 kJ
                  <input type="checkbox" id="Answer1" disabled />
                  <span className="checkmark"></span>
                </label>
                <label className="container">104 kJ
                  <input type="checkbox" id="Answer2"disabled/>
                  <span className="checkmark"></span>
                </label>
                <label className="container">2080 kJ
                  <input type="checkbox" id="Answer3"disabled/>
                  <span className="checkmark"></span>
                </label>
                <label className="container">10400 kJ
                  <input type="checkbox" id="Answer4"disabled/>
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
              <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
              <div className="LabInfo">วัตถุหนัก 20 นิวตัน วางอยู่บนพื้นที่จุด A จุด B อยู่เหนือจุด A และสูงจาก A เท่ากับ 4 เมตร  จุด C อยู่ในแนวระดับเดียวกันกับจุด B และห่างจาก B เป็นระยะ 3 เมตร จงหางานที่ทำในการยกวัตถุจาก A ไป B แล้วไป C
            </div>
            <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg4.png?alt=media&token=ac33f6a5-aab3-47e4-a533-bff1ba91c84d" />
               <div div className="FooterSpace"></div>
               <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD1F0snXpo'> sketchify</a></div>
               <div className="Footer">Curious Project</div>
               <div div className="FooterSpace"></div>
              </div>
              
              <div className="split QuestionAnswer"> 
                <div className="LabNumber">Exam : Work (4/10)</div>
                <div className="ProgessBar"><progress value="30" max="100"></progress></div>ื
                
                <div className="AnswerList">
                <label className="container">0 J
                    <input type="checkbox" id="Answer1" />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">50√2 J
                    <input type="checkbox" id="Answer2"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">80 J
                    <input type="checkbox" id="Answer3"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">140 J
                    <input type="checkbox" id="Answer4"/>
                    <span className="checkmark"></span>
                  </label>
              
                  <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(4)}>Send Answer</button>
                
              </div>
              <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(3)}>Previous page</button>
              <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(5)} >Next page</button></div>
              </div>
              </div>)
              }
      function Page4Answered (){
                return(
                  <div>
                    {AlertState.current === 1? <AnswerSentAlert/> : null}
                  <div className="split Index">
                <div className="LabName">งานทางฟิสิกส์</div>
                <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
                <div className="LabInfo">วัตถุหนัก 20 นิวตัน วางอยู่บนพื้นที่จุด A จุด B อยู่เหนือจุด A และสูงจาก A เท่ากับ 4 เมตร  จุด C อยู่ในแนวระดับเดียวกันกับจุด B และห่างจาก B เป็นระยะ 3 เมตร จงหางานที่ทำในการยกวัตถุจาก A ไป B แล้วไป C
            </div>
            <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg4.png?alt=media&token=ac33f6a5-aab3-47e4-a533-bff1ba91c84d" />
                 <div div className="FooterSpace"></div>
                 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD1F0snXpo'> sketchify</a></div>
                 <div className="Footer">Curious Project</div>
                 <div div className="FooterSpace"></div>
                </div>
                
                <div className="split QuestionAnswer"> 
                  <div className="LabNumber">Exam : Work (4/10)</div>
                  <div className="ProgessBar"><progress value="30" max="100"></progress></div>
                  <div className="AnswerList">
                  <label className="container">0 J
                      <input type="checkbox" id="Answer1" disabled />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">50√2 J
                      <input type="checkbox" id="Answer2"disabled/>
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">80 J
                      <input type="checkbox" id="Answer3"disabled/>
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">140 J
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
      <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
      <div className="LabInfo">แรงไม่คงที่กระทำต่อวัตถุให้เคลื่อนที่ตามแนวแรงได้ความสัมพันธ์ดังกราฟ จงหางานเมื่อวัตถุเคลื่อนที่ได้ระยะกระจัด 20 เมตร
    </div>
    <div className='SceneContainer'>
  <Chart5/>
</div>
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Exam : Work (5/10)</div>
        <div className="ProgessBar"><progress value="40" max="100"></progress></div>ื
        <div className="AnswerList">
        <label className="container">200 J
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">350 J
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">400 J 
            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">450 J 
            <input type="checkbox" id="Answer4"/>
            <span className="checkmark"></span>
          </label>
      
          <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(5)}>Send Answer</button>
        
      </div>
      <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(4)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(6)} >Next page</button></div>
      </div>
      </div>)
      }
  function Page5Answered (){
        return(
          <div>
            {AlertState.current === 1? <AnswerSentAlert/> : null}
          <div className="split Index">
        <div className="LabName">งานทางฟิสิกส์</div>
        <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
        <div className="LabInfo">แรงไม่คงที่กระทำต่อวัตถุให้เคลื่อนที่ตามแนวแรงได้ความสัมพันธ์ดังกราฟ จงหางานเมื่อวัตถุเคลื่อนที่ได้ระยะกระจัด 20 เมตร
    </div>
    <div className='SceneContainer'>
  <Chart5/>
</div>
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Exam : Work (5/10)</div>
          <div className="ProgessBar"><progress value="40" max="100"></progress></div>
          <div className="AnswerList">
          <label className="container">200 J
              <input type="checkbox" id="Answer1" disabled />
              <span className="checkmark"></span>
            </label>
            <label className="container">350 J
              <input type="checkbox" id="Answer2"disabled/>
              <span className="checkmark"></span>
            </label>
            <label className="container">400 J 
              <input type="checkbox" id="Answer3"disabled/>
              <span className="checkmark"></span>
            </label>
            <label className="container">450 J 
              <input type="checkbox" id="Answer4"disabled/>
              <span className="checkmark"></span>
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
              {AlertState.current === 1? <AnswerSentAlert/> : null}
            <div className="split Index">
          <div className="LabName">งานทางฟิสิกส์</div>
          <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
          <div className="LabInfo">แรงไม่คงที่กระทำต่อวัตถุหนึ่ง นำค่าแรงในแนวขนานกับการกระจัดมาเขียนความสัมพันธ์ได้ดังกราฟ จงหางานลัพธ์ ที่ทำให้วัตถุเคลื่อนได้ระยะทาง 30 เมตร
          <div className='SceneContainer'>
  <Chart6/>
</div>
        </div>
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Exam : Work (6/10)</div>
            <div className="ProgessBar"><progress value="50" max="100"></progress></div>ื
            <div className="AnswerList">
            <label className="container">300 J
                <input type="checkbox" id="Answer1" />
                <span className="checkmark"></span>
              </label>
              <label className="container">400 J
                <input type="checkbox" id="Answer2"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">600 J
                <input type="checkbox" id="Answer3"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">800 J
                <input type="checkbox" id="Answer4"/>
                <span className="checkmark"></span>
              </label>
          
              <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(6)}>Send Answer</button>
            
          </div>
          <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(5)}>Previous page</button>
          <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(7)} >Next page</button></div>
          </div>
          </div>)
          }
      function Page6Answered (){
            return(
              <div>
                {AlertState.current === 1? <AnswerSentAlert/> : null}
              <div className="split Index">
            <div className="LabName">งานทางฟิสิกส์</div>
            <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
            <div className="LabInfo">แรงไม่คงที่กระทำต่อวัตถุหนึ่ง นำค่าแรงในแนวขนานกับการกระจัดมาเขียนความสัมพันธ์ได้ดังกราฟ จงหางานลัพธ์ ที่ทำให้วัตถุเคลื่อนได้ระยะทาง 30 เมตร
            <div className='SceneContainer'>
  <Chart6/>
</div>
        </div>
             <div div className="FooterSpace"></div>
             <div className="Footer">Curious Project</div>
             <div div className="FooterSpace"></div>
            </div>
            
            <div className="split QuestionAnswer"> 
              <div className="LabNumber">Exam : Work (6/10)</div>
              <div className="ProgessBar"><progress value="50" max="100"></progress></div>
              <div className="AnswerList">
              <label className="container">300 J
                  <input type="checkbox" id="Answer1" disabled/>
                  <span className="checkmark"></span>
                </label>
                <label className="container">400 J
                  <input type="checkbox" id="Answer2"disabled/>
                  <span className="checkmark"></span>
                </label>
                <label className="container">600 J
                  <input type="checkbox" id="Answer3"disabled/>
                  <span className="checkmark"></span>
                </label>
                <label className="container">800 J
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
        function Page7 (){
              return(
                <div>
                <div className="split Index">
              <div className="LabName">งานทางฟิสิกส์</div>
              <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
              <div className="LabInfo">เมื่อใช้แรง F ดึงวัตถุให้เคลื่อนไปในแนวระดับ กราฟด้านล่าง แรง F และแรงเสียดทาน f แสดงดังรูป เมื่อวัตถุเคลื่อนไปด้านขวาจงหา งานของแรง F งานของแรงเสียดทาน และงานของแรงลัพธ์ (Cos 37˚ = 4/5  Sin 37˚ = 3/5)
            </div>
            <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP7.png?alt=media&token=dede91d7-ec36-40cd-99e3-838620288e24" />
            <div className='SceneContainer'>
  <Chart7/>
</div>
               <div div className="FooterSpace"></div>
               <div className="Footer">Curious Project</div>
               <div div className="FooterSpace"></div>
              </div>
              
              <div className="split QuestionAnswer"> 
                <div className="LabNumber">Exam : Work (7/10)</div>
                <div className="ProgessBar"><progress value="60" max="100"></progress></div>ื
                <div className="AnswerList">
                <label className="container">100 J , 50 J , 50 J
                    <input type="checkbox" id="Answer1" />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">90 J , 40 J , 50 J
                    <input type="checkbox" id="Answer2"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">80 J , 40 J , 40 J
                    <input type="checkbox" id="Answer3"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">70 J, 30 J , 40 J
                    <input type="checkbox" id="Answer4"/>
                    <span className="checkmark"></span>
                  </label>
              
                  <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(7)}>Send Answer</button>
                
              </div>
              <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(6)}>Previous page</button>
              <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(8)} >Next page</button></div>
              </div>
              </div>)
              }
          function Page7Answered (){
                return(
                  <div>
                    {AlertState.current === 1? <AnswerSentAlert/> : null}
                    <div className="split Index">
              <div className="LabName">งานทางฟิสิกส์</div>
              <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
              <div className="LabInfo">เมื่อใช้แรง F ดึงวัตถุให้เคลื่อนไปในแนวระดับ กราฟด้านล่าง แรง F และแรงเสียดทาน f แสดงดังรูป เมื่อวัตถุเคลื่อนไปด้านขวาจงหา งานของแรง F งานของแรงเสียดทาน และงานของแรงลัพธ์ (Cos 37˚ = 4/5  Sin 37˚ = 3/5)
            </div>
            <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP7.png?alt=media&token=dede91d7-ec36-40cd-99e3-838620288e24" />
            <div className='SceneContainer'>
  <Chart7/>
</div>
               <div div className="FooterSpace"></div>
               <div className="Footer">Curious Project</div>
               <div div className="FooterSpace"></div>
              </div>
                
                <div className="split QuestionAnswer"> 
                  <div className="LabNumber">Exam : Work (7/10)</div>
                  <div className="ProgessBar"><progress value="60" max="100"></progress></div>
                  <div className="AnswerList">
                  <label className="container">100 J , 50 J , 50 J
                      <input type="checkbox" id="Answer1" disabled />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">90 J , 40 J , 50 J
                      <input type="checkbox" id="Answer2"disabled/>
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">80 J , 40 J , 40 J
                      <input type="checkbox" id="Answer3"disabled/>
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">70 J, 30 J , 40 J
                      <input type="checkbox" id="Answer4"disabled/>
                      <span className="checkmark"></span>
                    </label>
                
                    <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
                  
                </div>
                <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(6)}>Previous page</button>
              <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(8)}>Next page</button></div>
                </div>
                </div>)
                }
  function Page8 (){
      return(
        <div>
        <div className="split Index">
      <div className="LabName">งานทางฟิสิกส์</div>
      <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
      <div className="LabInfo">จงหางานอย่างน้อยที่กรรมกรคนหนึ่งต้องทำในการดันกล่องสินค้ามวล 50 กิโลกรัมขึ้นไปตามพื้นเอียงทำมุม 53 องศากับพื้นราบ ถึงจุดสูงสุดจากพื้นราบ 4 เมตร ถ้าแรงเสียดทานระหว่างพื้นเอียงกับกล่องเป็น 80 นิวตัน (กำหนด Sin 53 = 4/5)
      <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg3.png?alt=media&token=745b2355-f8ce-46d2-9fad-6286dad2111d" />
    </div>
       <div div className="FooterSpace"></div>
       <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoO6srWSU'> sketchify</a></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Exam : Work (8/10)</div>
        <div className="ProgessBar"><progress value="70" max="100"></progress></div>ื
        <div className="AnswerList">
        <label className="container">400 J
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">520 J
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">2000 J
            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">2400 J
            <input type="checkbox" id="Answer4"/>
            <span className="checkmark"></span>
          </label>
      
          <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(8)}>Send Answer</button>
        
      </div>
      <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(7)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(9)} >Next page</button></div>
      </div>
      </div>)
      }
  function Page8Answered (){
        return(
          <div>
            {AlertState.current === 1? <AnswerSentAlert/> : null}
          <div className="split Index">
        <div className="LabName">งานทางฟิสิกส์</div>
        <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
        <div className="LabInfo">จงหางานอย่างน้อยที่กรรมกรคนหนึ่งต้องทำในการดันกล่องสินค้ามวล 50 กิโลกรัมขึ้นไปตามพื้นเอียงทำมุม 53 องศากับพื้นราบ ถึงจุดสูงสุดจากพื้นราบ 4 เมตร ถ้าแรงเสียดทานระหว่างพื้นเอียงกับกล่องเป็น 80 นิวตัน (กำหนด Sin 53 = 4/5)
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg3.png?alt=media&token=745b2355-f8ce-46d2-9fad-6286dad2111d" />

    </div>
         <div div className="FooterSpace"></div>
         <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoO6srWSU'> sketchify</a></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Exam : Work (8/10)</div>
          <div className="ProgessBar"><progress value="70" max="100"></progress></div>
          <div className="AnswerList">
          <label className="container">400 J
              <input type="checkbox" id="Answer1" disabled />
              <span className="checkmark"></span>
            </label>
            <label className="container">520 J
              <input type="checkbox" id="Answer2"disabled/>
              <span className="checkmark"></span>
            </label>
            <label className="container">2000 J 
              <input type="checkbox" id="Answer3"disabled/>
              <span className="checkmark"></span>
            </label>
            <label className="container">2400 J 
              <input type="checkbox" id="Answer4"disabled/>
              <span className="checkmark"></span>
            </label>
        
            <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
          
        </div>
        <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(7)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(9)}>Next page</button></div>
        </div>
        </div>)
        }
function Page9 (){
      return(
        <div>
        <div className="split Index">
      <div className="LabName">งานทางฟิสิกส์</div>
      <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
      
      <div className="LabInfo">กรณีในข้อใดต่อไปนี้ไม่เกิดงานในความหมายทางฟิสิกส์
      <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg2.png?alt=media&token=a7abff26-88d5-4523-809f-04288e4bddf5" />
    </div>
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Exam : Work (9/10)</div>
        <div className="ProgessBar"><progress value="80" max="100"></progress></div>ื
        <div className="AnswerList">
        <label className="container">ยกของจากพื้นขึ้นไปไว้บนโต๊ะ
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">เดินจากชั้นล่างขึ้นบน
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">เข็นรถให้เคลื่อนที่

            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">กรรมกรเดินแบกกระสอบข้าวสารไปตามถนนราบ 
            <input type="checkbox" id="Answer4"/>
            <span className="checkmark"></span>
          </label>
      
          <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(9)}>Send Answer</button>
        
      </div>
      <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(8)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(10)} >Next page</button></div>
      </div>
      </div>)
      }
  function Page9Answered (){
        return(
          <div>
            {AlertState.current === 1? <AnswerSentAlert/> : null}
          <div className="split Index">
        <div className="LabName">งานทางฟิสิกส์</div>
        <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
        <div className="LabInfo">กรณีในข้อใดต่อไปนี้ไม่เกิดงานในความหมายทางฟิสิกส์
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg2.png?alt=media&token=a7abff26-88d5-4523-809f-04288e4bddf5" />

    </div>
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Exam : Work (9/10)</div>
          <div className="ProgessBar"><progress value="80" max="100"></progress></div>
          <div className="AnswerList">
          <label className="container">ยกของจากพื้นขึ้นไปไว้บนโต๊ะ
              <input type="checkbox" id="Answer1" disabled />
              <span className="checkmark"></span>
            </label>
            <label className="container">เดินจากชั้นล่างขึ้นบน
              <input type="checkbox" id="Answer2"disabled/>
              <span className="checkmark"></span>
            </label>
            <label className="container">เข็นรถให้เคลื่อนที่
              <input type="checkbox" id="Answer3"disabled/>
              <span className="checkmark"></span>
            </label>
            <label className="container">กรรมกรเดินแบกกระสอบข้าวสารไปตามถนนราบ
              <input type="checkbox" id="Answer4"disabled/>
              <span className="checkmark"></span>
            </label>
        
            <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
          
        </div>
        <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(8)}>Previous page</button>
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(10)}>Next page</button></div>
        </div>
        </div>)
        }
function Page10 (){
          return(
            <div>
              {AlertState.current === 1? <AnswerSentAlert/> : null}
            <div className="split Index">
          <div className="LabName">งานทางฟิสิกส์</div>
          <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
          <img className='LabImg' id='img' alt ="LabImg"src="" />
          <div className="Labinfo">ข้อใดต่อไปนี้กล่าวได้ถูกต้อง
        </div>
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Exam : Work (10/10)</div>
            <div className="ProgessBar"><progress value="90" max="100"></progress></div>ื
            
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
              <label className="container">งานมีสูตรว่า W = F ⋅ S
                <input type="checkbox" id="Answer4"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">การที่แรงตั้งฉากกับการกระจัดจะทำให้เกิดงาน
                <input type="checkbox" id="Answer5" />
                <span className="checkmark"></span>
              </label>
              <label className="container">หน่วย J ใช้บอกปริมาณงานที่ทำหรือพลังงานที่ต้องการออกแรง จำนวน 1 นิวตัน เป็นระยะทาง 1 เมตร
                <input type="checkbox" id="Answer6"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S สามารถใช้หางานของแรง F ได้
                <input type="checkbox" id="Answer7"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S หา งานได้จากความชันของกราฟ
                <input type="checkbox" id="Answer8"/>
                <span className="checkmark"></span>
              </label>
              <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer8Choice(10)}>Send Answer</button>
            
          </div>
          <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(9)}>Previous page</button>
          <button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>
          </div>
          </div>)
          }
  function Page10Answered (){
            return(
              <div>
                {AlertState.current === 1? <AnswerSentAlert/> : null}
              <div className="split Index">
            <div className="LabName">งานทางฟิสิกส์</div>
            <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
            <img className='LabImg' id='img' alt ="LabImg"src="" />
            <div className="Labinfo">ข้อใดต่อไปนี้กล่าวได้ถูกต้อง
        </div>
             <div div className="FooterSpace"></div>
             <div className="Footer">Curious Project</div>
             <div div className="FooterSpace"></div>
            </div>
            
            <div className="split QuestionAnswer"> 
              <div className="LabNumber">Exam : Work (10/10)</div>
              <div className="ProgessBar"><progress value="90" max="100"></progress></div>
              <div className="AnswerList">
              <label className="container">เมื่อแรงมีทิศตรงข้ามกับการกระจัด จะได้งานเป็นลบ
                <input type="checkbox" id="Answer1" disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">เมื่อมีหลายแรงกระทำ ให้ทำการรวมแรงแล้วค่อยคำนวณ
                <input type="checkbox" id="Answer2"disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">เมื่อแรงทำมุมกับการกระจัดให้แตกแรงแล้วคำนวณ
                <input type="checkbox" id="Answer3"disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">งานมีสูตรว่า W = F ⋅ S
                <input type="checkbox" id="Answer4"disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">การที่แรงตั้งฉากกับการกระจัดจะทำให้เกิดงาน
                <input type="checkbox" id="Answer5"disabled />
                <span className="checkmark"></span>
              </label>
              <label className="container">หน่วย J ใช้บอกปริมาณงานที่ทำหรือพลังงานที่ต้องการออกแรง จำนวน 1 นิวตัน เป็นระยะทาง 1 เมตร
                <input type="checkbox" id="Answer6"disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S สามารถใช้หางานของแรง F ได้
                <input type="checkbox" id="Answer7"disabled/>
                <span className="checkmark"></span>
              </label>
              <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S หา งานได้จากความชันของกราฟ
                <input type="checkbox" id="Answer8"disabled/>
                <span className="checkmark"></span>
              </label>
            
                <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
              
            </div>
            <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(9)}>Previous page</button>
          <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => allAnswerSummitCheck()}>Next page</button></div>
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
      Bayes's Score = {BayesScore.current}</div>
    </div>
    < div className = 'FinishContainer'>
    <button className = "UpvoteButton" style = {{right : "0%" , backgroundColor: "rgb(var(--secondary-color))" }}  ><Link to = "/courses" >Back to Courses</Link></button>
    </div>
    < div className = 'FinishContainer'>
    <button className = "UpvoteButton" onClick={() => handleUpvote()}>Upvote!</button>
      <button className = "ReportButton" onClick={() => handleReport()}>Report</button>
    </div>
    
     </div> )
    }

      
if (page === 1 && Answer1 === false) {
        return(<div><Page1/></div>)
        }
else if (page === 1 && Answer1 === true) {
          return(<div><Page1Answered/></div>)
        }
        
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
else if (page === 7 && Answer7 === false) {
          return(<div><Page7/></div>)
          }
     else if (page === 7 && Answer7 === true) {
            return(<div><Page7Answered/></div>)
          }
else if (page === 8 && Answer8 === false) {
    return(<div><Page8/></div>)
    }
  else if (page === 8 && Answer8 === true) {
      return(<div><Page8Answered/></div>)
    }
else if (page === 9 && Answer9 === false) {
  return(<div><Page9/></div>)
  }
  else if (page === 9 && Answer9 === true) {
    return(<div><Page9Answered/></div>)
  }
else if (page === 10 && Answer10 === false) {
    return(<div><Page10/></div>)
    }
  else if (page === 10 && Answer10 === true) {
      return(<div><Page10Answered/></div>)
    }
else if (page === 11) {return(
    <div><FinishPage/></div>)}
    
else   {return(<div>
  <h1>Error 404 Webpage not fonud</h1>
  <p>Course page not found, Please try again shortly</p></div>
)}
}