import React ,{useState , useRef, useContext}from 'react'
import {Link } from 'react-router-dom'
import {AnswerSentAlert, UpvoteAlert, ReportAlert} from './Alert'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function FinalExam() {
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
var [Answer11, setAnswer11] = useState(false);
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
const ScoreQuestion11 = useRef(0)
const BayesQuestion1 = useRef(0)
const BayesQuestion2 = useRef(0)
const BayesQuestion3 = useRef(0)
const BayesQuestion4 = useRef(0)
const BayesQuestion5 = useRef(0)
const BayesQuestion6 = useRef(0)
const BayesQuestion7 = useRef(0)
const BayesQuestion8 = useRef(0)
const BayesQuestion9 = useRef(0)
const BayesQuestion11 = useRef(0)

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
      FinalLCE : firebase.firestore.FieldValue.increment(1)
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
      ExamLCE: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}

function sumScore(){
  
  TotalScore.current = ScoreQuestion1.current + ScoreQuestion2.current + ScoreQuestion3.current + ScoreQuestion4.current + ScoreQuestion5.current + ScoreQuestion6.current + ScoreQuestion7.current + ScoreQuestion8.current + ScoreQuestion9.current + ScoreQuestion10.current + ScoreQuestion11.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = Math.round((BayesQuestion1.current + BayesQuestion2.current + BayesQuestion3.current + BayesQuestion4.current + BayesQuestion5.current + BayesQuestion6.current +BayesQuestion7.current +BayesQuestion8.current +BayesQuestion9.current +BayesQuestion11.current)/10*100)/100

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    ExamLCE: CompletionScore.current,
    BayesExamLCE: BayesScore.current
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
    BayesQuestion1.current = 22/34
      break;
    case 2 :setAnswer2(true)
    ScoreQuestion2.current = 1
    BayesQuestion2.current = 20/25
      break;
    case 3 :setAnswer3(true)
    ScoreQuestion3.current = 1
    BayesQuestion3.current = 25/29
      break;
    case 4 :setAnswer4(true)
    ScoreQuestion4.current = 1
    BayesQuestion4.current = 24/24
      break;
    case 5 :setAnswer5(true)
    ScoreQuestion5.current = 1
    BayesQuestion5.current = 23/24
      break;
    case 6 :setAnswer6(true)
    ScoreQuestion6.current = 1
    BayesQuestion6.current = 22/22
      break;
    case 7 :setAnswer7(true)
    ScoreQuestion7.current = 1
    BayesQuestion7.current = 22/24
      break;
    case 8 :setAnswer8(true)
    ScoreQuestion8.current = 1
    BayesQuestion8.current = 18/19
      break;
    case 9 :setAnswer9(true)
    ScoreQuestion9.current = 1
    BayesQuestion9.current = 15/16
      break;
    case 10 :setAnswer10(true)
    ScoreQuestion10.current = 1
      break;
    case 11 :setAnswer11(true)
    ScoreQuestion11.current = 1
    BayesQuestion11.current = 22/25
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
    BayesQuestion1.current = 3/16
      break;
    case 2 :setAnswer2(true)
    BayesQuestion2.current = 5/25
      break;
    case 3 :setAnswer3(true)
    BayesQuestion3.current = 0/21
      break;
    case 4 :setAnswer4(true)
    BayesQuestion4.current = 1/26
      break;
    case 5 :setAnswer5(true)
    BayesQuestion5.current = 2/26
      break;
    case 6 :setAnswer6(true)
    BayesQuestion6.current = 3/28
      break;
    case 7 :setAnswer7(true)
    BayesQuestion7.current = 3/26
      break;
    case 8 :setAnswer8(true)
    BayesQuestion8.current = 7/31
      break;
      case 9 :setAnswer9(true)
      BayesQuestion9.current = 10/24
      break;
    case 10 :setAnswer10(true)
      break;
    case 11 :setAnswer11(true)
    BayesQuestion11.current = 3/25
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
  case 1 : if(Answer1.checked === false && 
        Answer2.checked === false && 
        Answer3.checked === true && 
        Answer4.checked === false ) {correct(1)} 
    else{incorrect(1)}
    break;
  case 2 : if(Answer1.checked === true && 
      Answer2.checked === false && 
      Answer3.checked === false && 
      Answer4.checked === false ) {correct(2)}
  else{incorrect(2)}
  break;
  case 3 : if(Answer1.checked === true && 
      Answer2.checked === false && 
      Answer3.checked === false && 
      Answer4.checked === false ) {correct(3)}
  else{incorrect(3)}
  break;
  case 4 :
    if(Answer1.checked === true&& 
      Answer2.checked ===  false&& 
      Answer3.checked === false && 
      Answer4.checked === false ){correct(4)}
  else{incorrect(4)}
  break;
case 5 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  true&& 
    Answer3.checked === false&& 
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
    Answer3.checked === false&& 
    Answer4.checked === true ){correct(7)}
else{incorrect(7)}
break;
case 8 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === true&& 
    Answer4.checked === false ){correct(8)}
else{incorrect(8)}
break;
case 9 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  true&& 
    Answer3.checked === false&& 
    Answer4.checked === false ){correct(9)}
else{incorrect(9)}
break;
case 10 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  true&& 
    Answer3.checked === false&& 
    Answer4.checked === false ){correct(10)}
else{incorrect(10)}
break;
case 11 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  true&& 
    Answer3.checked === false&& 
    Answer4.checked === false ){correct(11)}
else{incorrect(11)}
break;
default :
    alert("Checking Error")
    break;
}
}}

function allAnswerSummitCheck(){
  let arr = [Answer1,Answer2,Answer3,Answer4,Answer5,Answer6,Answer7,Answer8,Answer9,Answer11]
  let filtered = arr.filter(Boolean);
  let NumQuestionNotAnswered = 10 - filtered.length 
  if(Answer1 && Answer2 && Answer3 && Answer4 && Answer5 && Answer6 && Answer7 && Answer8 && Answer9 && Answer11){
    setPage(11)
  }
  else {
    alert("ตอบไม่ยังครบขาดอีก" + NumQuestionNotAnswered + "ข้อ")
  }
  
}
  
function Page1 (){
  return(
    <div>
      {AlertState.current === 1? <AnswerSentAlert/> : null}
    <div className="split Index">
  <div className="LabName">Final Exam</div>
  <div div className="LabInfo">วัตถุก้อนหนึ่งมีมวล 0.5 กิโลกรัม กำลังเคลื่อนที่ด้วยอัตราเร็ว 10 เมตรต่อวินาที <br/>จะมีพลังงานจลน์เท่าไหร่
 <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FFinal%2FFinalP1.png?alt=media&token=b5dd797a-8800-45c1-ada5-5e802875b8db" />
</div>
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Final Exam (1/10)</div>
    <div className="ProgessBar"><progress value="0" max="110"></progress></div>
    
    <div className="AnswerList">
    <label className="container">35 J
        <input type="checkbox" id="Answer1" />
        <span className="checkmark"></span>
      </label>
      <label className="container">20 J
        <input type="checkbox" id="Answer2"/>
        <span className="checkmark"></span>
      </label>
      <label className="container">0.025 kJ
        <input type="checkbox" id="Answer3"/>
        <span className="checkmark"></span>
      </label>
      <label className="container">0.015 kJ
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
    <div className="LabName">Final Exam</div>
    <div div className="LabInfo">วัตถุก้อนหนึ่งมีมวล 0.5 กิโลกรัม กำลังเคลื่อนที่ด้วยอัตราเร็ว 10 เมตรต่อวินาที <br/>จะมีพลังงานจลย์เท่าไหร่
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FFinal%2FFinalP1.png?alt=media&token=b5dd797a-8800-45c1-ada5-5e802875b8db" />
  </div>
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Final Exam (1/10)</div>
      <div className="ProgessBar"><progress value="0" max="110"></progress></div>
      
      <div className="AnswerList">
      <label className="container">35 J

        </label>
        <label className="container">20 J

        </label>
        <label className="container">0.025 kJ

        </label>
        <label className="container">0.015 kJ

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
          {AlertState.current === 1? <AnswerSentAlert/> : null}
        <div className="split Index">
      <div className="LabName">Final Exam</div>
      <div div className="LabInfo">วัตถุวางอยู่บนพื้นระดับลื่น ด้านหนึ่งของววัตถุติดกับสปริงซึ่งมีค่านิจสปริง 400 นิวตันต่อเมตร <br/>อีกด้านหนึ่งมีแรงมากระทำค่อยค่อยเพิ่มขึ้นดังรูป เมื่อวัตถุเคลื่อนที่ไปได้ 30 เซนติเมตร <br/>จงหาพลังงานศักย์ยืดหยุ่นในสปริง
      <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FFinal%2FFinalP2.png?alt=media&token=b2e329a6-2abc-4335-b023-e7ca81acb750" />
    </div>
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Final Exam (2/10)</div>
        <div className="ProgessBar"><progress value="10" max="110"></progress></div>ื
        <div className="AnswerList">
        <label className="container">18 J
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">26 J
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">0.03 kJ
            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">0.045 kJ
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
        <div className="LabName">Final Exam</div>
        <div div className="LabInfo">วัตถุวางอยู่บนพื้นระดับลื่น ด้านหนึ่งของววัตถุติดกับสปริงซึ่งมีค่านิจสปริง 400 นิวตันต่อเมตร <br/>อีกด้านหนึ่งมีแรงมากระทำค่อยค่อยเพิ่มขึ้นดังรูป เมื่อวัตถุเคลื่อนที่ไปได้ 30 เซนติเมตร <br/>จงหาพลังงานศักย์ยืดหยุ่นในสปริง
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FFinal%2FFinalP2.png?alt=media&token=b2e329a6-2abc-4335-b023-e7ca81acb750" />
    </div>
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Final Exam (2/10)</div>
          <div className="ProgessBar"><progress value="10" max="110"></progress></div>
          <div className="AnswerList">
          <label className="container">18 J

            </label>
            <label className="container">26 J

            </label>
            <label className="container">0.03 kJ

            </label>
            <label className="container">0.045 kJ

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
          <div className="LabName">Final Exam</div>
          <div div className="LabInfo">ชายคนหนึ่งแบกวัตถุมวล 10 กิโลกรัม ไว้บนบ่าเดินขึ้นสะพานลอยข้ามถนนซึ่งสูง 5 เมตร<br/>ยาว 30 เมตร จงหางานของชายคนนั้นที่กระทำต่อวัตถุ
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg2.png?alt=media&token=a7abff26-88d5-4523-809f-04288e4bddf5" />
        </div>
           <div div className="FooterSpace"></div>
           <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADohmFXfv0'> iconsy</a></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Final Exam (3/10)</div>
            <div className="ProgessBar"><progress value="20" max="110"></progress></div>
            
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
          <div className="LabName">Final Exam</div>
          <div div className="LabInfo">ชายคนหนึ่งแบกวัตถุมวล 10 กิโลกรัม ไว้บนบ่าเดินขึ้นสะพานลอยข้ามถนนซึ่งสูง 5 เมตร<br/>ยาว 30 เมตร จงหางานของชายคนนั้นที่กระทำต่อวัตถุ
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg2.png?alt=media&token=a7abff26-88d5-4523-809f-04288e4bddf5" />
        </div>
           <div div className="FooterSpace"></div>
           <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADohmFXfv0'> iconsy</a></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
            
            <div className="split QuestionAnswer"> 
              <div className="LabNumber">Final Exam (3/10)</div>
              <div className="ProgessBar"><progress value="20" max="110"></progress></div>
              <div className="AnswerList">
              <label className="container">0 J

                </label>
                <label className="container">150 J

                </label>
                <label className="container">500 J

                </label>
                <label className="container">3000 J

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
                  {AlertState.current === 1? <AnswerSentAlert/> : null}
                <div className="split Index">
              <div className="LabName">Final Exam</div>
              <div div className="LabInfo">ข้อใดกล่าวถูกต้องเกี่ยวกับงานและกำลัง
              <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg3.png?alt=media&token=745b2355-f8ce-46d2-9fad-6286dad2111d" />
            </div>
               <div div className="FooterSpace"></div>
               <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoO6srWSU'> sketchify</a></div>
               <div className="Footer">Curious Project</div>
               <div div className="FooterSpace"></div>
              </div>
              
              <div className="split QuestionAnswer"> 
                <div className="LabNumber">Final Exam (4/10)</div>
                <div className="ProgessBar"><progress value="30" max="110"></progress></div>ื
                
                <div className="AnswerList">
                <label className="container">เมื่อแรงมีทิศตรงข้ามกับการกระจัด จะได้งานเป็นลบ
                    <input type="checkbox" id="Answer1" />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">การที่แรงตั้งฉากกับการกระจัดจะทำให้เกิดงาน
                    <input type="checkbox" id="Answer2"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S หา งานได้จากความชันของกราฟ
                    <input type="checkbox" id="Answer3"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">กำลังแสดงอัตราการออกแรงต่อเวลา
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
              <div className="LabName">Final Exam</div>
              <div div className="LabInfo">ข้อใดกล่าวถูกต้องเกี่ยวกับงานและกำลัง
              <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg3.png?alt=media&token=745b2355-f8ce-46d2-9fad-6286dad2111d" />
            </div>
               <div div className="FooterSpace"></div>
               <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoO6srWSU'> sketchify</a></div>
               <div className="Footer">Curious Project</div>
               <div div className="FooterSpace"></div>
              </div>
                
                <div className="split QuestionAnswer"> 
                  <div className="LabNumber">Final Exam (4/10)</div>
                  <div className="ProgessBar"><progress value="30" max="110"></progress></div>
                  <div className="AnswerList">
                  <label className="container">เมื่อแรงมีทิศตรงข้ามกับการกระจัด จะได้งานเป็นลบ

                    </label>
                    <label className="container">การที่แรงตั้งฉากกับการกระจัดจะทำให้เกิดงาน

                    </label>
                    <label className="container">กราฟความสัมพันธ์ระหว่าง F กับ S หา งานได้จากความชันของกราฟ

                    </label>
                    <label className="container">กำลังแสดงอัตราการออกแรงต่อเวลา

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
          {AlertState.current === 1? <AnswerSentAlert/> : null}
          <div className="split Index">
          <div className="LabName">Final Exam</div>
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
        <div className="LabNumber">Final Exam (5/10)</div>
        <div className="ProgessBar"><progress value="40" max="110"></progress></div>ื
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
          <div className="LabName">Final Exam</div>
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
          <div className="LabNumber">Final Exam (5/10)</div>
          <div className="ProgessBar"><progress value="40" max="110"></progress></div>
          <div className="AnswerList">
          <label className="container">20.8 kJ

            </label>
            <label className="container">104 kJ

            </label>
            <label className="container">2080 kJ

            </label>
            <label className="container">10400 kJ

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
          <div className="LabName">Final Exam</div>
          <div div className="LabInfo">จากรูปวัตถุมีมวล 1 กิโลกรัมเคลื่อนที่จากจุด A ไปอยู่ที่จุด E โดยทางโค้งไม่มีแรงเสียดทาน <br/>ข้อใดกล่าวถูกต้อง
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P5.png?alt=media&token=44b39353-448b-4eb0-8655-3277af1ecc80" />
        </div>
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Final Exam (6/10)</div>
            <div className="ProgessBar"><progress value="50" max="110"></progress></div>ื
            <div className="AnswerList">
            <label className="container">ความเร็วที่จุด B มีค่าเท่ากับ ความเร็วที่จุด D
                <input type="checkbox" id="Answer1" />
                <span className="checkmark"></span>
              </label>
              <label className="container">ความเร็วที่จุด D มีค่าเท่ากับ ความเร็วที่จุด E
                <input type="checkbox" id="Answer2"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">วัตถุเคลื่อนที่จากจุด A ไป E ไม่มีการสูญเสียพลังงานให้สิ่งแวดล้อม
                <input type="checkbox" id="Answer3"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">ความเร็วที่จุด E มากกว่า ความเร็วที่จุด B
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
          <div className="LabName">Final Exam</div>
          <div div className="LabInfo">จากรูปวัตถุมีมวล 1 กิโลกรัมเคลื่อนที่จากจุด A ไปอยู่ที่จุด E โดยทางโค้งไม่มีแรงเสียดทาน <br/>ข้อใดกล่าวถูกต้อง
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P5.png?alt=media&token=44b39353-448b-4eb0-8655-3277af1ecc80" />
        </div>
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
            
            <div className="split QuestionAnswer"> 
              <div className="LabNumber">Final Exam (6/10)</div>
              <div className="ProgessBar"><progress value="50" max="110"></progress></div>
              <div className="AnswerList">
              <label className="container">ความเร็วที่จุด B มีค่าเท่ากับ ความเร็วที่จุด D

                </label>
                <label className="container">ความเร็วที่จุด D มีค่าเท่ากับ ความเร็วที่จุด E

                </label>
                <label className="container">วัตถุเคลื่อนที่จากจุด A ไป E ไม่มีการสูญเสียพลังงานให้สิ่งแวดล้อม

                </label>
                <label className="container">ความเร็วที่จุด E มากกว่า ความเร็วที่จุด B

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
                  {AlertState.current === 1? <AnswerSentAlert/> : null}
                <div className="split Index">
              <div className="LabName">Final Exam</div>
              <div div className="LabInfo">จากรูปผิวโค้งลื่น แต่ผิวราบขรุขระมีสัมประสิทธิ์ความเสียดทาน 0.2 ยาว 4 เมตร <br/>ถ้าวัตถุถูกปล่อยมาจากจุด A สูง 2 เมตร
              วัตถุขึ้นไปถึง D สูงเท่าใด
              <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P4.png?alt=media&token=39df6c01-8285-4631-a72b-af9736fd5873" />
            </div>
               <div div className="FooterSpace"></div>
               <div className="Footer">Curious Project</div>
               <div div className="FooterSpace"></div>
              </div>
              
              <div className="split QuestionAnswer"> 
                <div className="LabNumber">Final Exam (7/10)</div>
                <div className="ProgessBar"><progress value="60" max="110"></progress></div>ื
                <div className="AnswerList">
                <label className="container">75 cm
                    <input type="checkbox" id="Answer1" />
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">80 cm
                    <input type="checkbox" id="Answer2"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">95 cm
                    <input type="checkbox" id="Answer3"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">120 cm
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
                <div className="LabName">Final Exam</div>
                <div div className="LabInfo">จากรูปผิวโค้งลื่น แต่ผิวราบขรุขระมีสัมประสิทธิ์ความเสียดทาน 0.2 ยาว 4 เมตร <br/>ถ้าวัตถุถูกปล่อยมาจากจุด A สูง 2 เมตร
              วัตถุขึ้นไปถึง D สูงเท่าใด
              <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P4.png?alt=media&token=39df6c01-8285-4631-a72b-af9736fd5873" />
            </div>
                 <div div className="FooterSpace"></div>
                 <div className="Footer">Curious Project</div>
                 <div div className="FooterSpace"></div>
                </div>
                
                <div className="split QuestionAnswer"> 
                  <div className="LabNumber">Final Exam (7/10)</div>
                  <div className="ProgessBar"><progress value="60" max="110"></progress></div>
                  <div className="AnswerList">
                  <label className="container">75 cm

                    </label>
                    <label className="container">80 cm

                    </label>
                    <label className="container">95 cm

                    </label>
                    <label className="container">120 cm

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
          {AlertState.current === 1? <AnswerSentAlert/> : null}
        <div className="split Index">
      <div className="LabName">Final Exam</div>
      <div div className="LabInfo">มวล 1 กิโลกรัม ผูกด้วยเชือกยาว 2 เมตร เดิมอยู่นิ่ง แนวเส้นเชือกอยู่ในแนวระดับ 
      <br/> แล้วปล่อยลงมาชนสปริงที่วางตั้งไว้ในแนวระดับที่จุดต่ำสุดของเชือกดังรูป <br/>สปริงหดสั้นที่สุดเท่าไหร่ กำหนดให้ค่านิจสปริง 1000 นิวตันต่อเมตร
      <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FFinal%2FFinalP8.png?alt=media&token=281bea01-48d8-4162-b72f-4afd02e51a94" />
    </div>
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Final Exam (8/10)</div>
        <div className="ProgessBar"><progress value="70" max="110"></progress></div>ื
        <div className="AnswerList">
        <label className="container">5 cm
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">10 cm
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">20 cm
            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">50 cm
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
      <div className="LabName">Final Exam</div>
      <div div className="LabInfo">มวล 1 กิโลกรัม ผูกด้วยเชือกยาว 2 เมตร เดิมอยู่นิ่ง แนวเส้นเชือกอยู่ในแนวระดับ 
      <br/> แล้วปล่อยลงมาชนสปริงที่วางตั้งไว้ในแนวระดับที่จุดต่ำสุดของเชือกดังรูป <br/>สปริงหดสั้นที่สุดเท่าไหร่ กำหนดให้ค่านิจสปริง 1000 นิวตันต่อเมตร
      <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FFinal%2FFinalP8.png?alt=media&token=281bea01-48d8-4162-b72f-4afd02e51a94" />
    </div>
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Final Exam (8/10)</div>
          <div className="ProgessBar"><progress value="70" max="110"></progress></div>
          <div className="AnswerList">
          <label className="container">5 cm

            </label>
            <label className="container">10 cm

            </label>
            <label className="container">20 cm

            </label>
            <label className="container">50 cm

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
              {AlertState.current === 1? <AnswerSentAlert/> : null}
            <div className="split Index">
          <div className="LabName">Final Exam</div>
          <div div className="LabInfo">วัตถุก้อนหนึ่งผูกเชือกยาว 2.5 เมตร ปลายเชือกข้างหนึ่ง ผูกติดกับเพดาน 
          ดึงวัตถุจนแนวเส้นเชือกทำมุม 60 องศากับแนวดิ่ง แล้วปล่อยให้วัตถุเคลื่อนที่ ขณะผ่านจุดต่ำสุดวัตถุนี้มีอัตราเร็วเท่าใด
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FFinal%2FFinalP9.png?alt=media&token=d13709b1-fec6-4e69-b64a-d6928d5b77d8" />
        </div>
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Final Exam (9/10)</div>
            <div className="ProgessBar"><progress value="80" max="110"></progress></div>ื
            <div className="AnswerList">
            <label className="container">2.5 m/s
                <input type="checkbox" id="Answer1" />
                <span className="checkmark"></span>
              </label>
              <label className="container">5.0 m/s
                <input type="checkbox" id="Answer2"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">7.5 m/s
                <input type="checkbox" id="Answer3"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">0 m/s
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
          <div className="LabName">Final Exam</div>
          <div div className="LabInfo">วัตถุก้อนหนึ่งผูกเชือกยาว 2.5 เมตร ปลายเชือกข้างหนึ่ง ผูกติดกับเพดาน 
          ดึงวัตถุจนแนวเส้นเชือกทำมุม 60 องศากับแนวดิ่ง แล้วปล่อยให้วัตถุเคลื่อนที่ ขณะผ่านจุดต่ำสุดวัตถุนี้มีอัตราเร็วเท่าใด
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FFinal%2FFinalP9.png?alt=media&token=d13709b1-fec6-4e69-b64a-d6928d5b77d8" />
        </div>
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
            
            <div className="split QuestionAnswer"> 
              <div className="LabNumber">Final Exam (9/10)</div>
              <div className="ProgessBar"><progress value="80" max="110"></progress></div>
              <div className="AnswerList">
              <label className="container">2.5 m/s

                </label>
                <label className="container">5.0 m/s

                </label>
                <label className="container">7.5 m/s

                </label>
                <label className="container">0 m/s

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
            <div className="split Index">
          <div className="LabName">Final Exam</div>
          <div div className="LabInfo">รถทดลองมวล 0.5 กิโลกรัม วิ่งเข้าชนสปริงที่มีค่านิจ 200 นิวตันต่อเมตร <br/>ด้วยอัตราเร็ว 10 เมตรต่อวินาที ขณะที่รถทดลองมีอัตราเร็วเป็นศูนย์ ขนาดของแรงดันในสปริง<br/>มีค่ากี่นิวตัน
</div>
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg4.png?alt=media&token=ac33f6a5-aab3-47e4-a533-bff1ba91c84d" />
               <div div className="FooterSpace"></div>
               <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD1F0snXpo'> sketchify</a></div>
               <div className="Footer">Curious Project</div>
               <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Final Exam (10/10)</div>
            <div className="ProgessBar"><progress value="90" max="110"></progress></div>ื
            
            <div className="AnswerList">
            <label className="container">50 N
                <input type="checkbox" id="Answer1" />
                <span className="checkmark"></span>
              </label>
              <label className="container">100 N
                <input type="checkbox" id="Answer2"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">175 N
                <input type="checkbox" id="Answer3"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">200 N
                <input type="checkbox" id="Answer4"/>
                <span className="checkmark"></span>
              </label>
              <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(11)}>Send Answer</button>
            
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
          <div className="LabName">Final Exam</div>
          <div div className="LabInfo">รถทดลองมวล 0.5 กิโลกรัม วิ่งเข้าชนสปริงที่มีค่านิจ 200 นิวตันต่อเมตร <br/>ด้วยอัตราเร็ว 10 เมตรต่อวินาที ขณะที่รถทดลองมีอัตราเร็วเป็นศูนย์ ขนาดของแรงดันในสปริง<br/>มีค่ากี่นิวตัน
</div>
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/NoImg4.png?alt=media&token=ac33f6a5-aab3-47e4-a533-bff1ba91c84d" />
               <div div className="FooterSpace"></div>
               <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAD1F0snXpo'> sketchify</a></div>
               <div className="Footer">Curious Project</div>
               <div div className="FooterSpace"></div>
          </div>
            
            <div className="split QuestionAnswer"> 
              <div className="LabNumber">Final Exam (10/10)</div>
              <div className="ProgessBar"><progress value="90" max="110"></progress></div>
              <div className="AnswerList">
              <label className="container">50 N

              </label>
              <label className="container">100 N

              </label>
              <label className="container">175 N

              </label>
              <label className="container">200 N

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
else if (page === 10 && Answer11 === false) {
          return(<div><Page10/></div>)
          }
     else if (page === 10 && Answer11 === true) {
            return(<div><Page10Answered/></div>)
          }

else if (page === 11) {return(
    <div><FinishPage/></div>)}
    
else   {return(<div>
  <h1>Error 404 Webpage not fonud</h1>
  <p>Course page not found, Please try again shortly</p></div>
)}
}