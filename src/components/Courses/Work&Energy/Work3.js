import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'

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
//Var currentUser (Context from Firebase.js)
const {currentUser} = useContext(AuthContext)


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
      case 6 :setAnswer6(true)
      ScoreQuestion6.current = 1
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

</div>  <br/> <br/> <br/>
<img className='LabImg' id='img' alt ="LabImg"src="" />
 <div div className="LabInfo"> <br/> <br/>

 <MathJaxContext>
      <MathJax>\[W = F \cdot S \cdot Cosθ\]
      \[W = F \cdot S \cdot (0)\]
      \[W = 0\]

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
<div className="LabName">งานทางฟิสิกส์</div>
<div div className="LabInfo"><br/>เรามาลองทดสอบความเข้าใจกันครับ<br/><br/>
  ชายคนหนึ่งยกกล่องน้ำหนัก 50 นิวตัน เดินไปบนทางราบ 20 เมตร จะเกิดงานกี่จูล
<br/><br/><br/>รูปจ้า*********<br/><br/><br/>
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
    <div className="split Index">
  <div className="LabName">งานทางฟิสิกส์</div>
  <div className="LabInfo"><br/>เรามาลองทดสอบความเข้าใจกันครับ<br/>
  <br/>ชายคนหนึ่งยกกล่องน้ำหนัก 50 นิวตัน เดินไปบนทางราบ 20 เมตร จะเกิดงานกี่จูล
  <br/><br/><br/>รูปจ้า*********<br/><br/><br/>
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
<div className="LabName">งานทางฟิสิกส์</div>
<div className="LabInfo">นายเอถือกระเป๋าน้ำหนัก 15 นิวตัน ต้องการเดินข้ามถนนเพื่อข้ามไปยังอีกฝั่ง
<br/>โดยใช้สะพานลอยที่สูง 10 เมตร และยาว 30 เมตร จงหางานที่เกิดจากการถือกระเป๋าเท่าไหร่
<br/><br/><br/>รูปจ้า*********<br/><br/><br/>
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
    <div className="split Index">
  <div className="LabName">งานทางฟิสิกส์</div>
  <div className="LabInfo">นายเอถือกระเป๋าน้ำหนัก 15 นิวตัน ต้องการเดินข้ามถนนเพื่อข้ามไปยังอีกฝั่ง 
  <br/>โดยใช้สะพานลอยที่สูง 10 เมตร และยาว 30 เมตร จงหางานที่เกิดจากการถือกระเป๋าเท่าไหร่
  <br/><br/><br/>รูปจ้า*********<br/><br/><br/>
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
    <div className="LabName">งานทางฟิสิกส์</div>
    <div className="LabInfo">เมื่อเราเรียนรู้การคำนวณงานในรูปแบบต่างๆ แล้วลองนำความรู้มาประยุกต์ทำโจทย์กันครับ<br/><br/><br/>
    ชายคนหนึ่งใช้เชือกลากกล่องไม้มวล 60 กิโลกรัม ด้วยอัตราเร็วสม่ำเสมอ เป็นระยะทาง 1 กิโลเมตร ถ้าสัมประสิทธิ์ความเสียดทานระหว่างพื้นกับกล่องไม้เท่ากับ 0.02
   จงหางานที่ชายคนนี้ทำและงานเนื่องจากแรงเสียดทานระหว่างพื้นกับกล่องไม้
    <br/><br/>

    <br/><br/> <mark className="Yellow">Hint : </mark>ลากวัตถุด้วยความเร็วสม่ำเสมอหมายความว่า วัตถุไม่มีความเร่ง ผลรวมแรง = 0 (ΣF = 0)
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
        <div className="split Index">
      <div className="LabName">งานทางฟิสิกส์</div>
      <div className="LabInfo">เมื่อเราเรียนรู้การคำนวณงานในรูปแบบต่างๆ แล้วลองนำความรู้มาประยุกต์ทำโจทย์กันครับ<br/><br/><br/>
    ชายคนหนึ่งใช้เชือกลากกล่องไม้มวล 60 กิโลกรัม ด้วยอัตราเร็วสม่ำเสมอ เป็นระยะทาง 1 กิโลเมตร ถ้าสัมประสิทธิ์ความเสียดทานระหว่างพื้นกับกล่องไม้เท่ากับ 0.02
   จงหางานที่ชายคนนี้ทำและงานเนื่องจากแรงเสียดทานระหว่างพื้นกับกล่องไม้
    <br/><br/>

    <br/><br/> <mark className="Yellow">Hint : </mark>ลากวัตถุด้วยความเร็วสม่ำเสมอหมายความว่า วัตถุไม่มีความเร่ง ผลรวมแรง = 0 (ΣF = 0)
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
        <div className="LabName">งานทางฟิสิกส์</div>
        <div className="LabInfo">ด.ช.ป๋องเดินหิ้วกระเป๋าหนัก 30 นิวตัน เดินลงบันไดสูง 4 เมตร จงหางานที่ ด.ช.ป๋อง ทำได้ในการหิ้วกระเป๋า
 
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
            <div className="split Index">
          <div className="LabName">งานทางฟิสิกส์</div>
          <div className="LabInfo">ด.ช.ป๋องเดินหิ้วกระเป๋าหนัก 30 นิวตัน เดินลงบันไดสูง 4 เมตร จงหางานที่ ด.ช.ป๋อง ทำได้ในการหิ้วกระเป๋า


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
          
              <button className = "btn btn-glow btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
            
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
        <div className="split Index">
      <div className="LabName">งานทางฟิสิกส์</div>
      <div className="LabInfo">ข้อใดกล่าวถูกต้องเกี่ยวกับงาน


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
      
          <button className = "btn btn-glow btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
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