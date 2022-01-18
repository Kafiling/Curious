import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {CorrectAlert, IncorrectAlert, UpvoteAlert, ReportAlert} from './Alert'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function Power1() {
// Set Page
var [page, setPage] = useState(1);
//Var Answered
var [Answer3, setAnswer3] = useState(false);
var [Answer4, setAnswer4] = useState(false);
var [Answer5, setAnswer5] = useState(false);
//Var Score
const TotalQuestionNum = useRef(3)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
const ScoreQuestion3 = useRef(0)
const ScoreQuestion4 = useRef(0)
const ScoreQuestion5 = useRef(0)
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
      power1 : firebase.firestore.FieldValue.increment(1)
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
      Power1: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}

function sumScore(){
  
  TotalScore.current = ScoreQuestion3.current + ScoreQuestion4.current + ScoreQuestion5.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    Power1: CompletionScore.current
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
    case 4 :setAnswer4(true)
    ScoreQuestion4.current = 1
      break;
    case 5 :setAnswer5(true)
    ScoreQuestion5.current = 1
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
    case 4 :setAnswer4(true)
      break;
    case 5 :setAnswer5(true)
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
      Answer4.checked ===  false){correct(4)}
  else{incorrect(4)}
  break;
case 5 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  true&& 
    Answer3.checked === false && 
    Answer4.checked === false ){correct(5)}
else{incorrect(5)}
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
<div className="LabName">กำลัง</div>
<div div className="LabInfo">กำลัง (Power) คือ อัตราการทำงานหรืองานที่เกิดขึ้นในหนึ่งหน่วยเวลา<br/><br/>
“กำลัง” ใช้บอกความสามารถทำงานได้มาก-น้อยในช่วงเวลาหนึ่ง เช่น ปั้นจั่นดึงวัตถุ มีกำลัง 10000 W หมายความว่า ใน 1 วินาที ปั่นจั่น สามารถออกงานได้ 10000 J
</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower1%2FPower1P1.png?alt=media&token=ff218331-6949-462a-9dae-5e72c347f0ef" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoiVmEBYc'>iconsy</a>&nbsp; and &nbsp;<a href='https://www.canva.com/media/MAEPygH4D60'>pixabay</a></div>
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
<div className="LabName">กำลัง</div>
<div div className="LabInfo">โดยทั่วไป กำลังที่ใช้บอกความสามารถของอุปกรณ์ จะหมายถึง กำลังเฉลี่ย
</div> 
<div div className="LabInfo">เขียนเป็นสมการได้ดังนี้
 <MathJaxContext>
  <MathJax style={{textAlign: 'center'}}>{"\\(P = \\frac{W}{t} \\)"}</MathJax>
  </MathJaxContext>
  โดย<br/>
  P แทน กำลัง มีหน่วยเป็น จูลต่อวินาที หรือ วัตต์ (J/s / W)<br/>
  W แทน งาน มีหน่วยเป็น นิวตัน-เมตร หรือ จูล (N⋅m / J)<br/>
  t แทน เวลา มีหน่วยเป็น วินาที (s)
  </div> 
 <div div className="LabInfo">เนื่องจากงานและช่วงเวลาเป็นปริมาณสเกลาร์ กำลังจึงเป็นปริมารสเกลาร์ด้วย
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Introducing Work</div>
  <div className="ProgessBar"><progress value="20" max="100"></progress></div>
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
<div className="LabName">กำลัง</div>
<div className="LabInfo">ทำโจทย์เพื่อทดสอบความเข้าใจครับ<br/><br/>ปั้นจั่นยกของมวล 1500 กิโลกรัม ขึ้นสูง 10 เมตร ในเวลา 20 วินาที <br/>จงหากำลังของปั้นจั่นในการยกของนี้
</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower1%2FPower1P3.png?alt=media&token=7bd9558b-4cc2-427d-ae9b-fd2bd26af4d3" />
 
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoiVmEBYc'>iconsy</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Introducing Work</div>
  <div className="ProgessBar"><progress value="40" max="100"></progress></div>
  <div className="Question"></div>
  <div className="AnswerList">
  <label className="container">7500 W
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">8000 W
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">8500 W
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">9000 W
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
<div className="LabName">กำลัง</div>
<div className="LabInfo">ทำโจทย์เพื่อทดสอบความเข้าใจครับ<br/><br/>ปั้นจั่นยกของมวล 1500 กิโลกรัม ขึ้นสูง 10 เมตร ในเวลา 20 วินาที <br/>จงหากำลังของปั้นจั่นในการยกของนี้
</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower1%2FPower1P3.png?alt=media&token=7bd9558b-4cc2-427d-ae9b-fd2bd26af4d3" />
 
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoiVmEBYc'>iconsy</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Introducing Work</div>
    <div className="ProgessBar"><progress value="40" max="100"></progress></div>
    <div className="Question"></div>
    <div className="AnswerList">
    <label className="container">7500 W
        <input type="checkbox" id="Answer1"checked disabled  />
        <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}} ></span>
      </label>
      <label className="container">8000 W
        <input type="checkbox" id="Answer2" disabled/>
        <span className="checkmark" ></span>
      </label>
      <label className="container">8500 W
        <input type="checkbox" id="Answer3" disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">9000 W
        <input type="checkbox" id="Answer4" disabled/>
        <span className="checkmark"></span>
      </label>
  
      <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
    
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
    <div className="LabName">กำลัง</div>
    <div className="LabInfo">จงหากำลังของเครื่องจักรเครื่องหนึ่ง ซึ่งกำลังยกวัตถุมวล 500 กิโลกรัม <br/>ขึ้นในแนวดิ่งด้วยความเร็วคงที่ 1.6 เมตรต่อวินาที
    </div> 
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower1%2FPower1P4.png?alt=media&token=0329ecf6-1046-4be4-a31c-878df63f64fe" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoiVmEBYc'>iconsy</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="60" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">8 kW
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">9.6 kW
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">11.2 kW
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">12.8 kW
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
      <div className="LabName">กำลัง</div>
      <div className="LabInfo">จงหากำลังของเครื่องจักรเครื่องหนึ่ง ซึ่งกำลังยกวัตถุมวล 500 กิโลกรัม <br/>ขึ้นในแนวดิ่งด้วยความเร็วคงที่ 1.6 เมตรต่อวินาที
      </div> 
      <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower1%2FPower1P4.png?alt=media&token=0329ecf6-1046-4be4-a31c-878df63f64fe" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MADoiVmEBYc'>iconsy</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="60" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">8 kW
            <input type="checkbox" id="Answer1"checked disabled/>
            <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">9.6 kW
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">11.2 kW
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">12.8 kW
            <input type="checkbox" id="Answer4" disabled/>
            <span className="checkmark" ></span>
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
        <div className="LabName">กำลัง</div>
        <div className="LabInfo">รถอีแต๋นคันหนึ่งใช้เครื่องยนต์ซึ่งมีกำลัง 5 กิโลวัตต์ <br/>สามารถแล่นได้เร็วสูงสุด 36 กิโลเมตรต่อชั่วโมง จงหาแรงฉุดสูงสุดของเครื่องยนต์
        </div> 
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower1%2FPower1P5.png?alt=media&token=07c74411-3851-44cd-b2ff-52b1b909591b" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAEaNirpHr0'>sketchify</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Introducing Work</div>
          <div className="ProgessBar"><progress value="80" max="100"></progress></div>
          <div className="Question"></div>
          <div className="AnswerList">
          <label className="container">288 N
              <input type="checkbox" id="Answer1" />
              <span className="checkmark"></span>
            </label>
            <label className="container">300 N
              <input type="checkbox" id="Answer2"/>
              <span className="checkmark"></span>
            </label>
            <label className="container">324 N
              <input type="checkbox" id="Answer3"/>
              <span className="checkmark"></span>
            </label>
            <label className="container">350 N
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
        <div className="LabName">กำลัง</div>
        <div className="LabInfo">รถอีแต๋นคันหนึ่งใช้เครื่องยนต์ซึ่งมีกำลัง 5 กิโลวัตต์ <br/>สามารถแล่นได้เร็วสูงสุด 36 กิโลเมตรต่อชั่วโมง จงหาแรงฉุดสูงสุดของเครื่องยนต์
        </div> 
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower1%2FPower1P5.png?alt=media&token=07c74411-3851-44cd-b2ff-52b1b909591b" />
 <div div className="FooterSpace"></div>
 <div className="Footer">Image by &nbsp;<a href='https://www.canva.com/media/MAEaNirpHr0'>sketchify</a></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
        </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Introducing Work</div>
            <div className="ProgessBar"><progress value="80" max="100"></progress></div>
            <div className="Question"></div>
            <div className="AnswerList">
            <label className="container">288 N
                <input type="checkbox" id="Answer1" disabled/>
                <span className="checkmark" ></span>
              </label>
              <label className="container">300 N
                <input type="checkbox" id="Answer2"disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
              <label className="container">324 N
                <input type="checkbox" id="Answer3"disabled/>
                <span className="checkmark" ></span>
              </label>
              <label className="container">350 N
                <input type="checkbox" id="Answer4" disabled/>
                <span className="checkmark" ></span>
              </label>
          
              <button className = "btn btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
            
          </div>
          <div className="ButtonContainer"><button className = "btn btn-glow btn-secondary btn-previousPage" onClick ={() => setPage(4)}>Previous page</button>
          <button className = "btn btn-glow btn-primary btn-nextPage" onClick ={() => setPage(6)}>Next page</button></div>
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

else if (page === 2) {return(
<div><Page2/></div>)}

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
  
else if (page === 6) {return(
    <div><FinishPage/></div>)}
    


else   {return(<div>
  <h1>Error 404 Webpage not fonud</h1>
  <p>Course page not found, Please try again shortly</p></div>
)}
}