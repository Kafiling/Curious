import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {Scene} from './Material/Work4Scene1';

//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'


export default function Power2() {
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
//Var currentUser (Context from Firebase.js)
const {currentUser} = useContext(AuthContext)


function sumScore(){
  
  TotalScore.current = ScoreQuestion3.current + ScoreQuestion4.current + ScoreQuestion5.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    Work1: CompletionScore.current
}, { merge: true });
  

}

  //เช็คคำตอบถูก-ผิด
function correct(QuestionPage){
  //เช็คถูก
  alert("ถูกต้องคร้าบบ")
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
  alert("ผิดจ้า ลองทบทวนอีกทีนะ")
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
    case 3 : if(Answer1.checked === false && 
      Answer2.checked === true && 
      Answer3.checked === true && 
      Answer4.checked === true ) {correct(3)}
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
<div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
<div div className="LabInfo">จากการหางานที่ผ่านมาจะเป็นกรณีแรงคงตัวเท่านั้น แต่ในกรณีที่แรงไม่คงตัวเราจะคำนวณอย่างไร<br/>
เราลองสมมุติว่ามีแรง F กระทำต่อวัตถุให้เคลื่อนที่ไปตามแนวตรง โดยเคลื่อนที่ทิศทางตามแรง จะพล็อตกราฟ ตำแหน่งของวัตถุ กับ แรงได้ดังนี้
</div> 
<div className='SceneContainer'>
  <div class="chart-container" style={{position: "absolute" ,height: "150px", width: "300px", left: "32%"}}></div>
  <Scene/>
</div>
 <div div className="LabInfo">จากกราฟนี้แปลความหมายได้ว่ามีแรง 5N กระทำกับวัตถุทำให้วัตถุเลื่อนจากจุด X1 ไปจุด X2 เป็นระยะกระจัด 10 m
 <MathJaxContext>
  <MathJax>\[W = F \cdot S\]</MathJax>
  <MathJax>\[W = F \cdot (X_{2} - X_{1})\]</MathJax>
  <MathJax>\[W = 5 N \cdot 10 m\]</MathJax>
  <MathJax>\[W = 50 \]</MathJax>
  <MathJax>\[W = พื้นที่ใต้กราฟ \]</MathJax>
  </MathJaxContext>
  จะได้ว่างานจากแรง F กระทำเป็นระยะกระจัด S มีค่าเท่ากับพื่นที่สี่เหลี่ยมใต้กราฟ F-S ที่เราสนใจนั้นเอง <br/>
  W = F · S = พื้นที่ใต้กราฟ F-S
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
<div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
<div div className="LabInfo">ดังนั้นในกรณีที่แรงกระทำต่อวัตถุไม่คงตัว เราก็สามารถใช้หลักการเดียวกันใน การคิดงานเนื่องจากแรงด้วย พื้นที่ใต้กราฟ</div> 
<img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/lab-anywhere.appspot.com/o/Work%26Energy%2FWork01-2.png?alt=media&token=835c6f5d-3289-47aa-b58d-8d17ae591d43" />
 <div div className="LabInfo">จากกราฟข้างต้น เป็นกราฟ แรง - การกระจัด โดยแสดงค่าแรงที่ใช้ดึงสปริง
<br/>และคำนวณงานจาก W = F · S = พื้นที่ใต้กราฟ F-S
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
<div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
<div className="LabInfo">และเราก็สามารถใช้หลักการเดียวกันนี้ในการคำนวณ งานเนื่องจากแรงต่างๆ
</div> 

 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Introducing Work</div>
  <div className="ProgessBar"><progress value="40" max="100"></progress></div>
  <div className="Question">จากกราฟ F - S ฝั่งซ้าย กราฟในข้อใดแสดงแรงไม่คงที่</div>
  <div className="AnswerList">
  <label className="container">กราฟ 1
      <input type="checkbox" id="Answer1" />
      <span className="checkmark"></span>
    </label>
    <label className="container">กราฟ 2
      <input type="checkbox" id="Answer2"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">กราฟ 3
      <input type="checkbox" id="Answer3"/>
      <span className="checkmark"></span>
    </label>
    <label className="container">กราฟ 4
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
<div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
<div className="LabInfo">และเราก็สามารถใช้หลักการเดียวกันนี้ในการคำนวณ งานเนื่องจากแรงต่างๆ
</div> 
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Introducing Work</div>
    <div className="ProgessBar"><progress value="40" max="100"></progress></div>
    <div className="Question">จากกราฟ F - S ฝั่งซ้าย กราฟในข้อใดแสดงแรงไม่คงที่</div>
    <div className="AnswerList">
    <label className="container">กราฟ 1
        <input type="checkbox" id="Answer1" disabled  />
        <span className="checkmark" ></span>
      </label>
      <label className="container">กราฟ 2
        <input type="checkbox" id="Answer2" checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">กราฟ 3
        <input type="checkbox" id="Answer3" checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
      </label>
      <label className="container">กราฟ 4
        <input type="checkbox" id="Answer4" checked disabled/>
        <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
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
    <div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
    <div className="LabInfo">ลองเล่นกิจกรรม “งานจากแรงไม่คงที่” ดูครับ
    </div> 
    <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/lab-anywhere.appspot.com/o/Work%26Energy%2FWork01-4.png?alt=media&token=1f05a2fd-c436-4560-8ea5-e3a693b52e3a" />
     <div div className="LabInfo">ทบทวน : <MathJaxContext>
      <MathJax>\[W = F \cdot S\]</MathJax>
      </MathJaxContext>
      โดย<br/>W แทน งาน มีหน่วยเป็น นิวตัน-เมตร หรือ จูล (N⋅m / J)<br/>
      F แทน แรง มีหน่วยเป็น นิวตัน (N)<br/>
      S แทน การกระจัด มีหน่วยเป็น เมตร (m)
      </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Introducing Work</div>
      <div className="ProgessBar"><progress value="60" max="100"></progress></div>
      <div className="Question">งานของแรงที่ดึงวัตถุมีขนาดเท่าใด</div>
      <div className="AnswerList">
      <label className="container">80 J
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">200 J
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">320 J
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">400 J
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
      <div className="LabInfo"><mark className="Yellow">มีเฉลยอยู่ด้านล่างจ้า</mark><br/><br/>เก่งมาก! ทีนี้มาลองอีกข้อนึงนะ! <br/><br/>
      "ออกแรง 40 นิวตันทิศขนานกับทางลาด ดึงวัตถุขึ้นทางลาดผิวเกลี้ยงทำมุม 53 องศากับแนวระดับ เมื่อเคลื่อนวัตถุไปได้ไกล 8 เมตร <mark className="Yellow">ตามแนวราบ</mark> งานของแรงที่ดึงวัตถุมีขนาดเท่าใด"
      <br/><br/>อย่าลืมว่าก่อนคิดงานต้องทำให้ทิศทางของแรงกับการกระจัดขนานกันก่อนนะ
      </div> 
      <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/lab-anywhere.appspot.com/o/Work%26Energy%2FWork01-5.png?alt=media&token=c6ecf8ac-db7d-453b-a0b1-716d94a736e6" />
       <div div className="LabInfo"> วิธีคิด: ทำการแตกการกระจัดให้ขนานกับงานโดยใช้<a className="IndexWarp" href = "https://th.wikipedia.org/wiki/%E0%B8%9F%E0%B8%B1%E0%B8%87%E0%B8%81%E0%B9%8C%E0%B8%8A%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B9%82%E0%B8%81%E0%B8%93%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%B4">
         ฟังก์ชันตรีโกณมิติ</a> cos 53° = ชิด/ฉาก จะได้ว่า 3/5 = 8/x =&gt; x = 10 m <br/><br/>
       จาก W = FS = 40 N(10 m) = 400 J
       <br/><br/><br/> 
         ทบทวน : <MathJaxContext>
        <MathJax>\[W = F \cdot S\]</MathJax>
        </MathJaxContext>
        โดย<br/>W แทน งาน มีหน่วยเป็น นิวตัน-เมตร หรือ จูล (N⋅m / J)<br/>
        F แทน แรง มีหน่วยเป็น นิวตัน (N)<br/>
        S แทน การกระจัด มีหน่วยเป็น เมตร (m)
        </div> 
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Introducing Work</div>
        <div className="ProgessBar"><progress value="60" max="100"></progress></div>
        <div className="Question">งานของแรงที่ดึงวัตถุมีขนาดเท่าใด</div>
        <div className="AnswerList">
        <label className="container">80 J
            <input type="checkbox" id="Answer1" disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">200 J
            <input type="checkbox" id="Answer2"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">320 J
            <input type="checkbox" id="Answer3"disabled/>
            <span className="checkmark"></span>
          </label>
          <label className="container">400 J
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
        <div className="LabInfo">มาทบทวนกันอีกทีนะ <br/><br/>
        "งานตามความหมายของฟิสิกส์จะเกิดขึ้นได้ก็ต่อเมื่อ มีแรงมากระทำต่อวัตถุ ทำให้วัตถุมีการเคลื่อนที่เกิดการกระจัด โดย<mark className="Yellow">งานจะขึ้นอยู่กับแรงและการกระจัด</mark>"
        <br/><br/>อย่าลืมว่าก่อนคิดงานต้องทำให้ทิศทางของแรงกับการกระจัดขนานกันก่อนนะ
        </div> 
        <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/lab-anywhere.appspot.com/o/Work%26Energy%2FWork01-1.png?alt=media&token=d2c2ffa4-f6bc-40db-a20c-85e175c8b831" />
         <div div className="LabInfo">ทบทวน : <MathJaxContext>
          <MathJax>\[W = F \cdot S\]</MathJax>
          </MathJaxContext>
          โดย<br/>W แทน งาน มีหน่วยเป็น นิวตัน-เมตร หรือ จูล (N⋅m / J)<br/>
          F แทน แรง มีหน่วยเป็น นิวตัน (N)<br/>
          S แทน การกระจัด มีหน่วยเป็น เมตร (m)
          </div> 
         <div div className="FooterSpace"></div>
         <div className="Footer">Curious Project</div>
         <div div className="FooterSpace"></div>
        </div>
        
        <div className="split QuestionAnswer"> 
          <div className="LabNumber">Introducing Work</div>
          <div className="ProgessBar"><progress value="80" max="100"></progress></div>
          <div className="Question">ข้อใดถูกต้องเกี่ยวกับงาน</div>
          <div className="AnswerList">
          <label className="container">งานมีสูตรว่า W = F ⋅ S
              <input type="checkbox" id="Answer1" />
              <span className="checkmark"></span>
            </label>
            <label className="container">ก่อนจะคิดงานต้องทำให้ทิศทางของการกระจัดกับแรงขนานกันก่อน
              <input type="checkbox" id="Answer2"/>
              <span className="checkmark"></span>
            </label>
            <label className="container">ยกของหนัก 10 N ขึ้น 1.5 m เกิดงาน 15 J
              <input type="checkbox" id="Answer3"/>
              <span className="checkmark"></span>
            </label>
            <label className="container">หน่วย J ใช้บอกปริมาณงานที่ทำหรือพลังงานที่ต้องการออกแรง จำนวน 1 นิวตัน เป็นระยะทาง 1 เมตร
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
          <div className="LabInfo">มาทบทวนกันอีกทีนะ <br/><br/>
        "งานตามความหมายของฟิสิกส์จะเกิดขึ้นได้ก็ต่อเมื่อ มีแรงมากระทำต่อวัตถุ ทำให้วัตถุมีการเคลื่อนที่เกิดการกระจัด โดย<mark className="Yellow">งานจะขึ้นอยู่กับแรงและการกระจัด</mark>"
        <br/><br/>อย่าลืมว่าก่อนคิดงานต้องทำให้ทิศทางของแรงกับการกระจัดขนานกันก่อนนะ
          </div> 
          <img className='LabImg' id='img' alt ="LabImg"src="https://firebasestorage.googleapis.com/v0/b/lab-anywhere.appspot.com/o/Work%26Energy%2FWork01-1.png?alt=media&token=d2c2ffa4-f6bc-40db-a20c-85e175c8b831" />
           <div div className="LabInfo"> วิธีคิด: ทำการแตกการกระจัดให้ขนานกับงานโดยใช้<a className="IndexWarp" href = "https://th.wikipedia.org/wiki/%E0%B8%9F%E0%B8%B1%E0%B8%87%E0%B8%81%E0%B9%8C%E0%B8%8A%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B9%82%E0%B8%81%E0%B8%93%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%B4">
             ฟังก์ชันตรีโกณมิติ</a> cos 53° = ชิด/ฉาก จะได้ว่า 3/5 = 8/x =&gt; x = 10 m <br/><br/>
           จาก W = FS = 40 N(10 m) = 400 J
           <br/><br/><br/> 
             ทบทวน : <MathJaxContext>
            <MathJax>\[W = F \cdot S\]</MathJax>
            </MathJaxContext>
            โดย<br/>W แทน งาน มีหน่วยเป็น นิวตัน-เมตร หรือ จูล (N⋅m / J)<br/>
            F แทน แรง มีหน่วยเป็น นิวตัน (N)<br/>
            S แทน การกระจัด มีหน่วยเป็น เมตร (m)
            </div> 
           <div div className="FooterSpace"></div>
           <div className="Footer">Curious Project</div>
           <div div className="FooterSpace"></div>
          </div>
          
          <div className="split QuestionAnswer"> 
            <div className="LabNumber">Introducing Work</div>
            <div className="ProgessBar"><progress value="80" max="100"></progress></div>
            <div className="Question">ข้อใดถูกต้องเกี่ยวกับงาน</div>
            <div className="AnswerList">
            <label className="container">งานมีสูตรว่า W = F ⋅ S
                <input type="checkbox" id="Answer1" disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
              <label className="container">ก่อนจะคิดงานต้องทำให้ทิศทางของการกระจัดกับแรงขนานกันก่อน
                <input type="checkbox" id="Answer2"disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
              <label className="container">ยกของหนัก 10 N ขึ้น 1.5 m เกิดงาน 15 J
                <input type="checkbox" id="Answer3"disabled checked/>
                <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
              </label>
              <label className="container">หน่วย J ใช้บอกปริมาณงานที่ทำหรือพลังงานที่ต้องการออกแรง จำนวน 1 นิวตัน เป็นระยะทาง 1 เมตร
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