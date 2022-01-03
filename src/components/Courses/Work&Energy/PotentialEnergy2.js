import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {Scene} from './Material/Work4Scene1';

//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function PotentialEnergy2() {
// Set Page
var [page, setPage] = useState(1);
//Var Answered

var [Answer4, setAnswer4] = useState(false);
var [Answer5, setAnswer5] = useState(false);
var [Answer6, setAnswer6] = useState(false);
var [Answer7, setAnswer7] = useState(false);
//Var Score
const TotalQuestionNum = useRef(4)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
const ScoreQuestion4 = useRef(0)
const ScoreQuestion5 = useRef(0)
const ScoreQuestion6 = useRef(0)
const ScoreQuestion7 = useRef(0)
//Var currentUser (Context from Firebase.js)
const {currentUser} = useContext(AuthContext)


function sumScore(){
  
  TotalScore.current =   ScoreQuestion4.current + ScoreQuestion5.current + ScoreQuestion6.current +  ScoreQuestion7.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    PotentialEnergy2: CompletionScore.current
}, { merge: true });
  

}

  //เช็คคำตอบถูก-ผิด
function correct(QuestionPage){
  //เช็คถูก
  alert("ถูกต้องคร้าบบ")
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
     case 7 :setAnswer7(true)
    ScoreQuestion7.current = 1
      break;
    default :
    alert("Scoring Error")
    break;
  }
}

function incorrect(QuestionPage){
  alert("ผิดจ้า ลองทบทวนอีกทีนะ")
  switch(QuestionPage){
    case 4 :setAnswer4(true)
      break;
      case 5 :setAnswer5(true)
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
  
  case 4 :
    if(Answer1.checked === false&& 
      Answer2.checked ===  false&& 
      Answer3.checked === true && 
      Answer4.checked === false){correct(4)}
  else{incorrect(4)}
  break;
  case 5 : if(Answer1.checked === false && 
    Answer2.checked === true && 
    Answer3.checked === false && 
    Answer4.checked === false ) {correct(5)}
else{incorrect(5)}
break;
case 6 :
  if(Answer1.checked === true&& 
    Answer2.checked ===  false&& 
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
<div div className="LabInfo"><br/>
ถ้าเราออกแรงดึงสปริงออกจากตำแหน่งเริ่มต้นเราจะรู้สึกว่ายิ่งเรายืดสปริงมากขึ้นเท่าไร <br/>แรงที่สปริงดึงกลับก็มากตามไปด้วย 
และหากเราผลักสปริงให้หดเข้าไป ก็จะพบว่าสปริงก็จะผลักเราเช่นกัน
<br/><br/><br/>********Matter.js แน่ๆ*<br/><br/><br/>
จากความสัมพันธ์นี้เราจะพบว่าแรงที่สปริงออกมาเป็นสมการเส้นตรง<br/><br/>
จาก
<MathJaxContext>
      <MathJax>\[y = m \cdot x +c\]
        \[F \cdot s = k \cdot x + 0\]
        \[F \cdot s = k \cdot x \]
      </MathJax>
      </MathJaxContext>
      โดยที่ <br/>Fs แทน แรงจากสปริง (N)<br/>
	x แทน ระยะที่สปริงยืด - หด จากระยะเริ่มต้น (m)<br/>
	k แทน ค่านิจสปริง (ความแข็งของสปริง) (N/m)


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
<div className="LabName">พลังงานศักย์</div>
<div div className="LabInfo"><br/>
ค่านิจสปริง เป็นค่าคงตัวที่แสดงความแข็งของสปริง มีหน่วยเป็น N/m 
เช่น สปริงในปากกามี<br/>ค่านิจสปริง 20 N/m หมายความว่า ต้องออกแรง 20 N ถึงจะหดสปริงได้ 1 m ในขณะที่สปริงของโช๊คมอเตอร์ไซค์ จะมีค่านิจสปริงอยู่ที่ 5000 N/m 


<br/><br/><br/>********Matter.js เปลี่ยน ค่า K*<br/><br/><br/>
ค่านิจสปริงจะมีส่วนสำคัญ เช่น สปริงปากกา ต้องการความสะดวกสะบาย ก็จะมีค่านิจสปริงน้อย เพื่อกดง่ายๆ 
แต่สปริงของโช๊คมอเตอร์ไซค์จะมีค่านิจสปริงสูงเพื่อรับแรงกระแทก แต่ก็ไม่มาก<br/>เกินไปเพื่อความนิ่มนวลในการขับขี่

  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Introducing Work</div>
  <div className="ProgessBar"><progress value="14" max="100"></progress></div>
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
<div className="LabName">พลังงานศักย์</div>
<div className="LabInfo"> <br/>เมื่อเราสามารถหาแรงจากสปริงได้แล้ว เราก็สามารถหางานจากพื้นที่ใต้กราฟ F-S
<br/><br/><br/>********Chart.js แบบเบิ้มๆ*<br/><br/><br/>
<MathJaxContext>
      <MathJax>\[W = พื้นที่ใต้กราฟ\]
        \[W = \cfrac{1}{2} \cdot k \cdot x \cdot x\]
        \[W = \cfrac{1}{2} \cdot k \cdot x^2\]
      </MathJax>
      </MathJaxContext>

</div> 

 
<div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Introducing Work</div>
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
    <div className="LabInfo"><br/>เรามาทดสอบความเข้าใจกันครับ
    <br/> <br/><br/>ถ้าออกแรง 5 N กดสปริงที่มีค่านิจ 50 N/m จงหาว่าสปริงหดจากเดิมกี่ cm
    <br/><br/><br/>********ใส่รูปจ้า*
    </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="42" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">0.1 cm
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">1 cm
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">10 cm
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">100 cm
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
      <div className="LabName">พลังงานศักย์</div>
      <div className="LabInfo"><br/>เรามาทดสอบความเข้าใจกันครับ
    <br/> <br/><br/>ถ้าออกแรง 5 N กดสปริงที่มีค่านิจ 50 N/m จงหาว่าสปริงหดจากเดิมกี่ cm
    <br/><br/><br/>********ใส่รูปจ้า*
      </div> 
     
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="42" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">0.1 cm
            <input type="checkbox" id="Answer1" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">1 cm
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">10 cm
            <input type="checkbox" id="Answer3"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">100 cm
            <input type="checkbox" id="Answer4" disabled />
            <span className="checkmark"></span>
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
        <div className="LabName">พลังงานศักย์</div>
        <div className="LabInfo"><br/>จากกราฟจงหาค่านิจสปริง 

        <br/><br/><br/>********รูปรูปรูปรูปรูปรูป*
        </div> 
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="56" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">40 N/m
            <input type="checkbox" id="Answer1" />
            <span className="checkmark"></span>
          </label>
          <label className="container">80 N/m
            <input type="checkbox" id="Answer2"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">120 N/m
            <input type="checkbox" id="Answer3"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">180 N/m
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
        <div className="split Index">
      <div className="LabName">พลังงานศักย์</div>
      <div className="LabInfo"><br/>จากกราฟจงหาค่านิจสปริง 

<br/><br/><br/>********รูปรูปรูปรูปรูปรูป*
      </div> 
     
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="56" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">40 N/m
            <input type="checkbox" id="Answer1" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">80 N/m
            <input type="checkbox" id="Answer2"disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">120 N/m
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">180 N/m
            <input type="checkbox" id="Answer4" disabled />
            <span className="checkmark"></span>
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
    <div className="LabName">พลังงานศักย์</div>
    <div className="LabInfo"><br/>จากข้อ 5 จงหา แรงและงานที่ใช้ยืดสปริงออก 2 m
    <br/><br/><br/>********ใส่รูปจ้า*<br/><br/><br/>


    </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="70" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">160 N, 160J
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">160 N, 320 J
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">320 N, 320 J
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">320 N, 640 J
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
      <div className="LabName">พลังงานศักย์</div>
      <div className="LabInfo"><br/>จากข้อ 5 จงหา แรงและงานที่ใช้ยืดสปริงออก 2 m
    <br/><br/><br/>********ใส่รูปจ้า*<br/><br/><br/>
      </div> 
     
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="70" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">160 N, 160 J
            <input type="checkbox" id="Answer1" disabled checked/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">160 N, 320 J
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">320 N, 320 J
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">320 N, 640 J
            <input type="checkbox" id="Answer4" disabled />
            <span className="checkmark"></span>
          </label>
      
          <button className = "btn btn-glow btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
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
    <div className="LabInfo"><br/>มวล 5 kg ผูกติดกับสปริงที่ผูกไว้ติดกับผนัง ปรากฎว่าสปริงยืดออก 10 cm
จากนั้นนำมวลใหม่เข้าไปผูกทำให้ในสปริงเกิดพลังงานศักย์ยืดหยุ่น 250 J จงหาว่าสปริงยืดจากเดิมกี่ cm


    <br/><br/><br/>********ใส่รูปจ้า*
    </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="84" max="100"></progress></div>
      <div className="Question"></div>
      <div className="AnswerList">
      <label className="container">25 cm
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">50 cm
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">100 cm
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">250 cm
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
        <div className="split Index">
      <div className="LabName">พลังงานศักย์</div>
      <div className="LabInfo"><br/>มวล 5 kg ผูกติดกับสปริงที่ผูกไว้ติดกับผนัง ปรากฎว่าสปริงยืดออก 10 cm
จากนั้นนำมวลใหม่เข้าไปผูกทำให้ในสปริงเกิดพลังงานศักย์ยืดหยุ่น 250 J จงหาว่าสปริงยืดจากเดิมกี่ cm

    <br/><br/><br/>********ใส่รูปจ้า*
      </div> 
     
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="84" max="100"></progress></div>
        <div className="Question"></div>
        <div className="AnswerList">
        <label className="container">25 cm
            <input type="checkbox" id="Answer1" disabled />
            <span className="checkmark" ></span>
          </label>
          <label className="container">50 cm
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">100 cm
            <input type="checkbox" id="Answer3"disabled checked/>
            <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">250 cm
            <input type="checkbox" id="Answer4" disabled />
            <span className="checkmark"></span>
          </label>
      
          <button className = "btn btn-glow btn-answerSent" style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
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