import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {Scene} from './Material/Work4Scene1';

//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function KineticEnergy () {
// Set Page
var [page, setPage] = useState(1);
//Var Answered
var [Answer2, setAnswer2] = useState(false);
var [Answer3, setAnswer3] = useState(false);
var [Answer4, setAnswer4] = useState(false);
var [Answer5, setAnswer5] = useState(false);
//Var Score
const TotalQuestionNum = useRef(4)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
const ScoreQuestion2 = useRef(0)
const ScoreQuestion3 = useRef(0)
const ScoreQuestion4 = useRef(0)
const ScoreQuestion5 = useRef(0)
//Var currentUser (Context from Firebase.js)
const {currentUser} = useContext(AuthContext)


function sumScore(){
  
  TotalScore.current = ScoreQuestion2.current + ScoreQuestion3.current + ScoreQuestion4.current + ScoreQuestion5.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    Power2: CompletionScore.current
}, { merge: true });
  

}

  //เช็คคำตอบถูก-ผิด
function correct(QuestionPage){
  //เช็คถูก
  alert("ถูกต้องคร้าบบ")
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
    default :
    alert("Scoring Error")
    break;
  }
}

function incorrect(QuestionPage){
  alert("ผิดจ้า ลองทบทวนอีกทีนะ")
  switch(QuestionPage){
    case 2 :setAnswer2(true)
    break;
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
    case 2 : if(Answer1.checked === false && 
        Answer2.checked === false && 
        Answer3.checked === true && 
        Answer4.checked === false ) {correct(2)}
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
      Answer3.checked === false && 
      Answer4.checked === true ){correct(4)}
  else{incorrect(4)}
  break;
case 5 :
  if(Answer1.checked === true&& 
    Answer2.checked ===  true&& 
    Answer3.checked === true && 
    Answer4.checked === true ){correct(5)}
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
<div className="LabName">พลังงานจลน์</div>
<div div className="LabInfo"><br/>พลังงานคืออะไร พลังงานนั้นเป็นปริมาณที่ไม่สามารถมองเห็นหรือจับต้องได้ แต่สามารถรับรู้จากผลของพลังงานนั้นได้ 
เช่น พลังงานจากแสงอาทิตย์ที่ทำให้รู้สึกร้อน พลังงานเสียงที่มากไปทำให้เราปวดหู หรือพลังงานไฟฟ้านำไปใช้ในเครื่องใช้ไฟฟ้าต่างๆ
<br/><br/><br/>********ภาพพลังงานชนิดต่างๆ*<br/><br/><br/>

พลังงานมีหลากหลายชนิดเช่น พลังงานแสง พลังงานเสียง พลังงานความร้อน พลังงานเคมี จนไปถึง พลังงานนิวเคลียร์ โดยในบทเรียนนี้จะหยิบ พลังงานทางกลศาสตร์ 2 ชนิด มาทำการเรียนรู้กัน ได้แก่ พลังงานศักย์ (Potential energy) และ พลังงานจลน์ (Kinetic energy)
<br/><br/>
พลังงานมีหน่วยเป็น จูล (Joules : J)


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
<div className="LabName">พลังงานจลน์</div>
<div div className="LabInfo"><br/>
เริ่มจากพลังงานจลน์(Kinetic energy) เป็นพลังงานของวัตถุที่กำลังเคลื่อนที่ (มีความเร็ว) 
<br/><br/><br/>********ภาพ or Matter.js*<br/><br/><br/>
โดยพิสูจน์จาก <br/>
(งานจากแรง) 			
<MathJaxContext>
      <MathJax>\[W = F \cdot S \]
        \[W = m \cdot a \cdot S....(1) \]
        จาก  \[S = ut+ \cfrac{1}{2} \cdot at^2		\]
        \[S = \cfrac{1}{2}at^2 ; u = 0 ....(2)		\]
        แทนค่า S ใน (1)
        \[W = m \cdot a \cdot \cfrac{1}{2} \cdot at^2\]
        \[W = \cfrac{1}{2} \cdot m \cdot (at) ^2\]
        \[W = \cfrac{1}{2} \cdot m \cdot v^2; u = 0\]
        \[Ek = \cfrac{1}{2} \cdot m \cdot v^2\]
      </MathJax>
      </MathJaxContext>

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
<div className="LabInfo"> <br/>จากข้อ 2 เครื่องยนต์นี้มีกำลังกี่แรงม้า
เครื่องยนต์รถ สามารถส่งแรง 2000 N <br/>ทำให้รถเคลื่อนที่ไปด้วยความเร็ว 72 km/hr
<br/><br/><br/>********ใส่รูปจ้า*
</div> 

 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Introducing Work</div>
  <div className="ProgessBar"><progress value="20" max="100"></progress></div>
  <div className="Question"></div>
  <div className="AnswerList">
  <label className="container">50.12 hp
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">53.62 hp
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">57.34 hp
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">61.78 hp
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
    <div className="split Index">
<div className="LabName">กำลัง</div>
<div className="LabInfo"><br/>จากข้อ 2 เครื่องยนต์นี้มีกำลังกี่แรงม้า
เครื่องยนต์รถ สามารถส่งแรง 2000 N <br/>ทำให้รถเคลื่อนที่ไปด้วยความเร็ว 72 km/hr
<br/><br/><br/>********ใส่รูปจ้า*
</div> 
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Introducing Work</div>
    <div className="ProgessBar"><progress value="40" max="100"></progress></div>
    <div className="Question"></div>
    <div className="AnswerList">
    <label className="container">50.12 hp
        <input type="checkbox" id="Answer1" disabled  />
        <span className="checkmark" ></span>
      </label>
      <label className="container">53.62 hp
        <input type="checkbox" id="Answer2" checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">57.34 hp
        <input type="checkbox" id="Answer3"disabled/>
        <span className="checkmark"></span>
      </label>
      <label className="container">61.78 hp

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
    <div className="LabInfo"><br/>นักวิ่งคนหนึ่งมีมวล 60 กิโลกรัม วิ่งขึ้นอาคาร 25 ชั้น ด้วยอัตราเร็วคงตัว โดยใช้เวลา 10 นาที <br/>แต่ละชั้นสูง 3.2 เมตร จงหากำลังเฉลี่ยของนักวิ่ง
    <br/><br/><br/>********ใส่รูปจ้า*
    </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="60" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">65 W
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">70 W
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">75 W
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">80 W
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
        <div className="split Index">
      <div className="LabName">กำลัง</div>
      <div className="LabInfo"><br/>นักวิ่งคนหนึ่งมีมวล 60 กิโลกรัม วิ่งขึ้นอาคาร 25 ชั้น ด้วยอัตราเร็วคงตัว โดยใช้เวลา 10 นาที <br/>แต่ละชั้นสูง 3.2 เมตร จงหากำลังเฉลี่ยของนักวิ่ง
    <br/><br/><br/>********ใส่รูปจ้า*
      </div> 
     
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="60" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">65 W
            <input type="checkbox" id="Answer1" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">70 W
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">75 W
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">80 W
            <input type="checkbox" id="Answer4" disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
      
          <button className = "btn btn-glow btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
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
        <div className="LabInfo"><br/>กำลังเฉลี่ยเกี่ยวข้องกับปริมาณใดบ้าง 
        <br/><br/><br/>********ใส่รูปจ้า*
        </div> 
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Introducing Work</div>
          <div className="ProgessBar"><progress value="80" max="100"></progress></div>
          <div className="Question"></div>
          <div className="AnswerList">
          <label className="container">แรง (Force)
              <input type="checkbox" id="Answer1" />
              <span className="checkmark"></span>
            </label>
            <label className="container">การกระจัด (Displacement)
              <input type="checkbox" id="Answer2"/>
              <span className="checkmark"></span>
            </label>
            <label className="container">เวลา (Time)
              <input type="checkbox" id="Answer3"/>
              <span className="checkmark"></span>
            </label>
            <label className="container">ความเร็ว (Velocity)
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
            <div className="split Index">
          <div className="LabName">กำลัง</div>
          <div className="LabInfo"><br/>กำลังเฉลี่ยเกี่ยวข้องกับปริมาณใดบ้าง 
        <br/><br/><br/>********ใส่รูปจ้า*
          </div> 
    
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Introducing Work</div>
            <div className="ProgessBar"><progress value="80" max="100"></progress></div>
            <div className="Question"> </div>
            <div className="AnswerList">
            <label className="container">แรง (Force)
                <input type="checkbox" id="Answer1" disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
              <label className="container">การกระจัด (Displacement)
                <input type="checkbox" id="Answer2"disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
              <label className="container">เวลา (Time)
                <input type="checkbox" id="Answer3"disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
              <label className="container">ความเร็ว (Velocity)
                <input type="checkbox" id="Answer4" disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
          
              <button className = "btn btn-glow btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
            
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
      <button className = "UpvoteButton" >Upvote!</button>
      <button className = "ReportButton" >Report</button>
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