import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'

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
//Var currentUser (Context from Firebase.js)
const {currentUser} = useContext(AuthContext)


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
  alert("ถูกต้องคร้าบบ")
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
  alert("ผิดจ้า ลองทบทวนอีกทีนะ")
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
}
}}

  
  
function Page1 (){
  return(
    <div>
    <div className="split Index">
  <div className="LabName">งานทางฟิสิกส์</div>
  <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
  <img className='LabImg' id='img' alt ="LabImg"src="" />
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Exam Work</div>
    <div className="ProgessBar"><progress value="40" max="100"></progress></div>
    <div className="Question">ชายคนหนึ่งแบกวัตถุมวล 10 กิโลกรัม ไว้บนบ่าเดินขึ้นสะพานลอยข้ามถนนซึ่งสูง 5 เมตรยาว 30 เมตร จงหางานของชายคนนั้นที่กระทำต่อวัตถุ
</div>
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
  <button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>
  </div>
  </div>)
  }
  function Page1Answered (){
    return(
      <div>
      <div className="split Index">
    <div className="LabName">งานทางฟิสิกส์</div>
    <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
    <img className='LabImg' id='img' alt ="LabImg"src="" />
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Exam Work</div>
      <div className="ProgessBar"><progress value="40" max="100"></progress></div>
      <div className="Question">ชายคนหนึ่งแบกวัตถุมวล 10 กิโลกรัม ไว้บนบ่าเดินขึ้นสะพานลอยข้ามถนนซึ่งสูง 5 เมตรยาว 30 เมตร จงหางานของชายคนนั้นที่กระทำต่อวัตถุ
  </div>
      <div className="AnswerList">
      <label className="container">0 J
          <input type="checkbox" id="Answer1" disabled checked />
          <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
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
    
        <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
      
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
      <img className='LabImg' id='img' alt ="LabImg"src="" />
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Choice</div>
        <div className="ProgessBar"><progress value="40" max="100"></progress></div>ื
        <div className="Question">ชายคนหนึ่งยกวัตถุมวล 5 กิโลกรัม ขึ้นสูง 2 เมตร จงหางานของแรงยก
    </div>
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
      <button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>
      </div>
      </div>)
      }
     function Page2Answered (){
        return(
          <div>
          <div className="split Index">
        <div className="LabName">งานทางฟิสิกส์</div>
        <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
        <img className='LabImg' id='img' alt ="LabImg"src="" />
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Exam Work</div>
          <div className="ProgessBar"><progress value="40" max="100"></progress></div>
          <div className="Question">ชายคนหนึ่งแบกวัตถุมวล 10 กิโลกรัม ไว้บนบ่าเดินขึ้นสะพานลอยข้ามถนนซึ่งสูง 5 เมตรยาว 30 เมตร จงหางานของชายคนนั้นที่กระทำต่อวัตถุ
      </div>
          <div className="AnswerList">
          <label className="container">0 J
              <input type="checkbox" id="Answer1" disabled checked />
              <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
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
        
            <button className = "btn btn-glow btn-primary" onClick={() =>checkAnswer(1)}>Send Answer</button>
          
        </div>
        <div className="ButtonContainer">
      <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(2)}>Next page</button></div>
        </div>
        </div>)
        }
  function Page3 (){
          return(
            <div>
            <div className="split Index">
          <div className="LabName">งานทางฟิสิกส์</div>
          <div div className="LabInfo">จากนี้จะเป็นโจทย์เพื่อทำความเข้าใจกับเนื้อหาที่เรียนได้มากขึ้น</div> 
          <img className='LabImg' id='img' alt ="LabImg"src="" />
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Choice</div>
            <div className="ProgessBar"><progress value="40" max="100"></progress></div>ื
            <div className="Question">ชายคนหนึ่งยกวัตถุมวล 5 กิโลกรัม ขึ้นสูง 2 เมตร จงหางานของแรงยก
        </div>
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
          <button className = "btn btn-glow btn-primary btn-nextPage" style={{visibility: "hidden"}}>Next page</button></div>
          </div>
          </div>)
          }
  function FinishPage (){
    sumScore()
    return(
      <div>
    <div className = 'FinishContainer'>
      <img className='FinishImg' id='img' alt ="Check.png"src="https://firebasestorage.googleapis.com/v0/b/lab-anywhere.appspot.com/o/check.png?alt=media&token=10d8a285-0a16-4009-a4fa-5725aeba2cef" />
    </div>
    <div className = 'FinishContainer'>
      <div className="FinishInfo">จบกิจกรรมแล้ว อยากเรียนรู้เรื่องอะไรต่อดี? <br/><br/>
      Completion Score = {CompletionScore.current*100}% ({TotalScore.current}/{TotalQuestionNum.current}) <br/>
      Bayes's Score = {BayesScore.current}</div>
    </div>
    < div className = 'FinishContainer'>
      <button className = "UpvoteButton" style = {{right : "0%"}} onClick ={() => setPage(4)}><Link to = "/courses" >Back to Courses</Link></button>
    </div>
    < div className = 'FinishContainer'>
      <button className = "UpvoteButton" onClick ={() => setPage(4)}>Upvote!</button>
      <button className = "ReportButton" onClick ={() => setPage(6)}>Report</button>
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
  
/*else if (page === 3 && Answer3 === false) {
  return(<div><Page3/></div>)
  }
  else if (page === 3 && Answer3 === true) {
    return(<div><Page3Answered/></div>)
  }*/
  

else if (page === 6) {return(
    <div><FinishPage/></div>)}
    
else   {return(<div>
  <h1>Error 404 Webpage not fonud</h1>
  <p>Course page not found, Please try again shortly</p></div>
)}
}