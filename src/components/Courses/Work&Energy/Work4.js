import React ,{useState , useRef, useContext}from 'react'
import {MathJax, MathJaxContext} from 'better-react-mathjax'
import {Link } from 'react-router-dom'
import {Scene as Scene1} from './Material/Work4Scene1';
import {Scene as Scene5} from './Material/Work4Scene5';
import {MyChart as Chart1} from './Material/Work4Chart1';
import {MyChart as Chart2} from './Material/Work4Chart2';
import {MyChart1,MyChart2,MyChart3,MyChart4} from './Material/Work4Chart3';
import {Chart5} from './Material/Work4Chart5';
import {MyChart as Chart6} from './Material/Work4Chart6';
import {MyChart as Chart7} from './Material/Work4Chart7';
import {CorrectAlert, IncorrectAlert, UpvoteAlert, ReportAlert} from './Alert'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db} from 'Firebase'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export default function Work4() {
// Set Page
var [page, setPage] = useState(1);
//Var Answered
var [Answer3, setAnswer3] = useState(false);
var [Answer4, setAnswer4] = useState(false);
var [Answer5, setAnswer5] = useState(false);
var [Answer6, setAnswer6] = useState(false);
var [Answer7, setAnswer7] = useState(false);
//Var Score
const TotalQuestionNum = useRef(5)
const TotalScore = useRef(0)
const CompletionScore = useRef(0)
const BayesScore = useRef(0)
const ScoreQuestion3 = useRef(0)
const ScoreQuestion4 = useRef(0)
const ScoreQuestion5 = useRef(0)
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
      work4 : firebase.firestore.FieldValue.increment(1)
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
      Work4: ReportText.current
  }, { merge: true });
    setReport(true)
    AlertState.current = 4
    setTimeout(resetAlert,3000)}
    else{alert('You already report this course')}
  
}

function sumScore(){
  
  TotalScore.current = ScoreQuestion3.current + ScoreQuestion4.current + ScoreQuestion5.current + ScoreQuestion6.current + ScoreQuestion7.current
  CompletionScore.current = Math.round(TotalScore.current / TotalQuestionNum.current * 100) / 100
  BayesScore.current = "Not Implemented"

  db.collection('users').doc(currentUser.providerData[0]['uid']).set({
    Work4: CompletionScore.current
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
      Answer3.checked === true && 
      Answer4.checked === false ){correct(4)}
  else{incorrect(4)}
  break;
case 5 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  true&& 
    Answer3.checked === false && 
    Answer4.checked === false ){correct(5)}
else{incorrect(5)}
break;
case 6 :
  if(Answer1.checked === false&& 
    Answer2.checked ===  false&& 
    Answer3.checked === true && 
    Answer4.checked === false ){correct(6)}
else{incorrect(6)}
break;
case 7 :
  if(Answer1.checked === true&& 
    Answer2.checked ===  false&& 
    Answer3.checked === false && 
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
<div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
<div div className="LabInfo">จากการหางานที่ผ่านมาจะเป็นกรณีแรงคงตัวเท่านั้น แต่ในกรณีที่แรงไม่คงตัวเราจะคำนวณอย่างไร<br/>
เราลองสมมุติว่ามีแรง F กระทำต่อวัตถุให้เคลื่อนที่ไปตามแนวตรง โดยเคลื่อนที่ทิศทางตามแรง จะพล็อตกราฟ ตำแหน่งของวัตถุ กับ แรงได้ดังนี้
</div> 
<div className='SceneContainer'>
  <div class="chart-container" style={{position: "absolute" ,height: "300px", width: "500px", left: "43%"}}><Chart1/></div>
  <Scene1/>
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
  <div className="LabNumber">Utilizing Graph</div>
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
<div div className="LabInfo">ดังนั้นในกรณีที่แรงกระทำต่อวัตถุไม่คงตัวเช่นแรงที่ใช้ดึงสปริง เราก็สามารถใช้หลักการเดียวกันใน การคิดงานเนื่องจากแรงด้วย พื้นที่ใต้กราฟ</div> 
<div className='SceneContainer'>
  <Chart2/>
</div>

 <div div className="LabInfo">จากกราฟข้างต้น เป็นกราฟ แรง - การกระจัด โดยแสดงค่าแรงที่ใช้ดึงสปริง
<br/>และคำนวณงานจาก 
<MathJaxContext>
  <MathJax>\[W = F \cdot S\]</MathJax>
  <MathJax>\[W = พื้นที่ใต้กราฟ \]</MathJax>
  <MathJax>\[W =\frac{1}{2} \cdot b \cdot  h\]</MathJax>
  <MathJax>\[W =\frac{1}{2} \cdot 10 \cdot  10\]</MathJax>
  <MathJax>\[W = 50 J \]</MathJax>
  </MathJaxContext>
  </div> 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Utilizing Graph</div>
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
<div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
<div className="LabInfo">และเราก็สามารถใช้หลักการเดียวกันนี้ในการคำนวณ งานเนื่องจากแรงต่างๆ
</div> 
<div className='SceneContainer'>
<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Item><MyChart1/>1</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><MyChart2/>2</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><MyChart3/>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><MyChart4/>4</Item>
        </Grid>
      </Grid>
    </Box>
    </div>
 
 <div div className="FooterSpace"></div>
 <div className="Footer">Curious Project</div>
 <div div className="FooterSpace"></div>
</div>

<div className="split QuestionAnswer"> 
  <div className="LabNumber">Utilizing Graph</div>
  <div className="ProgessBar"><progress value="28" max="100"></progress></div>
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
      {AlertState.current === 1? <CorrectAlert/> : null}
    {AlertState.current === 2? <IncorrectAlert/> : null}
    <div className="split Index">
<div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
<div className="LabInfo">และเราก็สามารถใช้หลักการเดียวกันนี้ในการคำนวณ งานเนื่องจากแรงต่างๆ
</div> 
<div className='SceneContainer'>
<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Item><MyChart1/>1</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><MyChart2/>2</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><MyChart3/>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><MyChart4/>4</Item>
        </Grid>
      </Grid>
    </Box>
    </div>
   <div div className="FooterSpace"></div>
   <div className="Footer">Curious Project</div>
   <div div className="FooterSpace"></div>
  </div>
  
  <div className="split QuestionAnswer"> 
    <div className="LabNumber">Utilizing Graph</div>
    <div className="ProgessBar"><progress value="28" max="100"></progress></div>
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
    <div className="LabInfo">จะสังเกตว่าบางครั้งในกราฟจะแสดง แรงที่มีค่าติดลบ นั้นก็เพราะทิศทางของแรงกับการกระจัดตรงข้ามกันนั้นเอง และก็จะคิดค่างานออกมาได้เป็นงานติดลบด้วย
    </div> 
    <div className='SceneContainer'>
    <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Item><MyChart1/>1</Item>
            </Grid>
            <Grid item xs={6}>
              <Item><MyChart2/>2</Item>
            </Grid>
            <Grid item xs={6}>
              <Item><MyChart3/>3</Item>
            </Grid>
            <Grid item xs={6}>
              <Item><MyChart4/>4</Item>
            </Grid>
          </Grid>
        </Box>
        </div>
     
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Utilizing Graph</div>
      <div className="ProgessBar"><progress value="42" max="100"></progress></div>
      <div className="Question">จากกราฟ F - S ฝั่งซ้าย กราฟในข้อใดเกิดงานน้อยที่สุด</div>
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
    <div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
    <div className="LabInfo">จะสังเกตว่าบางครั้งในกราฟจะแสดง แรงที่มีค่าติดลบ นั้นก็เพราะทิศทางของแรงกับการกระจัดตรงข้ามกันนั้นเอง และก็จะคิดค่างานออกมาได้เป็นงานติดลบด้วย
    </div> 
    <div className='SceneContainer'>
    <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Item><MyChart1/>1</Item>
            </Grid>
            <Grid item xs={6}>
              <Item><MyChart2/>2</Item>
            </Grid>
            <Grid item xs={6}>
              <Item><MyChart3/>3</Item>
            </Grid>
            <Grid item xs={6}>
              <Item><MyChart4/>4</Item>
            </Grid>
          </Grid>
        </Box>
        </div>
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
        <div className="LabNumber">Utilizing Graph</div>
        <div className="ProgessBar"><progress value="42" max="100"></progress></div>
        <div className="Question">จากกราฟ F - S ฝั่งซ้าย กราฟในข้อใดเกิดงานน้อยที่สุด</div>
        <div className="AnswerList">
        <label className="container">กราฟ 1
            <input type="checkbox" id="Answer1" disabled  />
            <span className="checkmark" ></span>
          </label>
          <label className="container">กราฟ 2
            <input type="checkbox" id="Answer2" disabled/>
            <span className="checkmark" ></span>
          </label>
          <label className="container">กราฟ 3
            <input type="checkbox" id="Answer3" checked disabled/>
            <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
          </label>
          <label className="container">กราฟ 4
            <input type="checkbox" id="Answer4"  disabled/>
            <span className="checkmark" ></span>
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
    <div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
    <div div className="LabInfo">ลองเล่นกิจกรรม “งานจากแรงไม่คงที่” ดูครับ<br/>
    ให้นักเรียนลองทำการทดลองดังนี้
    <li>ดึงสปริงในแนวแกนราบ</li>
    <li>ดึงสปริงในแนวแกนดิ่ง</li>
    <li>ดึงสปริงในแนวเฉียง</li>
    </div> 
    <div className='SceneContainer'>
      <div class="chart-container" style={{position: "absolute" ,height: "300px", width: "500px", left: "43%"}}><Chart5/></div>
      <Scene5/>
    </div>
     <div div className="LabInfo">จะสังเกตได้ว่าเมื่อเราดึงตัวสปริงยาวมากขึ้นเท่าไรก็จะใช้แรงมากขึ้นเรื่อยๆ เราสามารถใช้หลักการการหางานจากพื้นที่ใต้กราฟได้ดังนี้
     <MathJaxContext>
      <MathJax>\[W = F \cdot S\]</MathJax>
      <MathJax>\[W = พื้นที่ใต้กราฟ \]</MathJax>
      <MathJax>\[W = \frac{1}{2}\cdot B\cdot H\]</MathJax>
      <MathJax>\[W = \frac{1}{2}\cdot 10\cdot 100\]</MathJax>
      <MathJax>\[W = 500 J \]</MathJax>
    
      </MathJaxContext>
      จะได้ว่างานจากแรงที่ใช้ดึงสปริงจากสภาพสมดุล เป็นระยะ 10 m มีค่าเท่ากับ 500 J 
      </div> 
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Utilizing Graph</div>
      <div className="ProgessBar"><progress value="56" max="100"></progress></div>
      <div className="Question">จากการทดลองดังกล่าว จงหางานที่ใช้ในการดึงสปริง 7 m </div>
      <div className="AnswerList">
      <label className="container">250 J
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">350 J
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">700 J
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">850 J
          <input type="checkbox" id="Answer4"/>
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
      <div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
      <div div className="LabInfo">ลองเล่นกิจกรรม “งานจากแรงไม่คงที่” ดูครับ<br/>
      ให้นักเรียนลองทำการทดลองดังนี้
      <li>ดึงสปริงในแนวแกนราบ</li>
      <li>ดึงสปริงในแนวแกนดิ่ง</li>
      <li>ดึงสปริงในแนวเฉียง</li>
      </div> 
      <div className='SceneContainer'>
        <div class="chart-container" style={{position: "absolute" ,height: "300px", width: "500px", left: "43%"}}><Chart5/></div>
        <Scene5/>
      </div>
       <div div className="LabInfo">จะสังเกตได้ว่าเมื่อเราดึงตัวสปริงยาวมากขึ้นเท่าไรก็จะใช้แรงมากขึ้นเรื่อยๆ เราสามารถใช้หลักการการหางานจากพื้นที่ใต้กราฟได้ดังนี้
       <MathJaxContext>
        <MathJax>\[W = F \cdot S\]</MathJax>
        <MathJax>\[W = พื้นที่ใต้กราฟ \]</MathJax>
        <MathJax>\[W = \frac{1}{2}\cdot B\cdot H\]</MathJax>
        <MathJax>\[W = \frac{1}{2}\cdot 10\cdot 100\]</MathJax>
        <MathJax>\[W = 500 J \]</MathJax>
      
        </MathJaxContext>
        จะได้ว่างานจากแรงที่ใช้ดึงสปริงจากสภาพสมดุล เป็นระยะ 10 m มีค่าเท่ากับ 500 J 
        </div> 
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
      <div className="LabNumber">Utilizing Graph</div>
      <div className="ProgessBar"><progress value="56" max="100"></progress></div>
      <div className="Question">จากการทดลองดังกล่าว จงหางานที่ใช้ในการดึงสปริง 7 m </div>
      <div className="AnswerList">
      <label className="container" >250 J
          <input type="checkbox" id="Answer1" disabled />
          <span className="checkmark"></span>
        </label>
        <label className="container">350 J
          <input type="checkbox" id="Answer2" checked disabled/>
          <span className="checkmark" style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
        </label>
        <label className="container">700 J
          <input type="checkbox" id="Answer3" disabled/>
          <span className="checkmark"></span>
        </label>
        <label className="container">850 J
          <input type="checkbox" id="Answer4" disabled/>
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
      <div className="split Index">
    <div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
    <div div className="LabInfo">เมื่อมีแรงมากระทำต่อวัตถุให้เคลื่อนที่ตามแนวแรงโดยแรงที่กระทำสัมพันธ์กับการกระจัดดังกราฟ จงหางานเมื่อวัตถุเคลื่อนที่ไปได้ไกล 20 เมตร
      </div> 
      <div className='SceneContainer'>
  <Chart6/>
</div>
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Utilizing Graph</div>
      <div className="ProgessBar"><progress value="70" max="100"></progress></div>
      <div className="Question">จงหางานเมื่อวัตถุเคลื่อนที่ไปได้ไกล 20 เมตร</div>
      <div className="AnswerList">
      <label className="container">80 J
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">100 J
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">120 J
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">140 J
          <input type="checkbox" id="Answer4"/>
          <span className="checkmark"></span>
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
      <div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
      <div div className="LabInfo">เมื่อมีแรงมากระทำต่อวัตถุให้เคลื่อนที่ตามแนวแรงโดยแรงทีี่กระทำสัมพันธ์กับการกระจัดดังกราฟ จงหางานเมื่อวัตถุเคลื่อนที่ไปได้ไกล 20 เมตร
        </div> 
        <div className='SceneContainer'>
  <Chart6/>
</div>
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
      <div className="LabNumber">Utilizing Graph</div>
      <div className="ProgessBar"><progress value="70" max="100"></progress></div>
      <div className="Question">จงหางานเมื่อวัตถุเคลื่อนที่ไปได้ไกล 20 เมตร</div>
      <div className="AnswerList">
      <label className="container" >80 J
          <input type="checkbox" id="Answer1" disabled />
          <span className="checkmark"></span>
        </label>
        <label className="container">100 J
          <input type="checkbox" id="Answer2"disabled/>
          <span className="checkmark" ></span>
        </label>
        <label className="container">120 J
          <input type="checkbox" id="Answer3" checked disabled/>
          <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
        </label>
        <label className="container">140 J
          <input type="checkbox" id="Answer4" disabled/>
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
    <div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
    <div div className="LabInfo">แรงซึ่งไม่คงที่กระทำต่อวัตถุให้เคลื่อนที่ตามแนวแรงได้ความสัมพันธ์ดังกราฟ จงหางานเมื่อวัตถุเคลื่อนที่ได้ระยะการกระจัดจาก 20 เมตร
      </div> 
      <div className='SceneContainer'>
  <Chart7/>
</div>
     <div div className="FooterSpace"></div>
     <div className="Footer">Curious Project</div>
     <div div className="FooterSpace"></div>
    </div>
    
    <div className="split QuestionAnswer"> 
      <div className="LabNumber">Utilizing Graph</div>
      <div className="ProgessBar"><progress value="84" max="100"></progress></div>
      <div className="Question">จงหางานเมื่อวัตถุเคลื่อนที่ได้ระยะการกระจัดจาก 20 เมตร</div>
      <div className="AnswerList">
      <label className="container">400 J
          <input type="checkbox" id="Answer1" />
          <span className="checkmark"></span>
        </label>
        <label className="container">408.2 J
          <input type="checkbox" id="Answer2"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">450 J
          <input type="checkbox" id="Answer3"/>
          <span className="checkmark"></span>
        </label>
        <label className="container">471 J
          <input type="checkbox" id="Answer4"/>
          <span className="checkmark"></span>
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
      <div className="LabName">งานเนื่องจากแรงไม่คงตัว</div>
      <div div className="LabInfo">แรงซึ่งไม่คงที่กระทำต่อวัตถุให้เคลื่อนที่ตามแนวแรงได้ความสัมพันธ์ดังกราฟ จงหางานเมื่อวัตถุเคลื่อนที่ได้ระยะการกระจัดจาก 20 เมตร
       <br/> <mark>สังเกตว่าเราสามารถจัดพื้นที่ใหม่ให้เป็นรูปร่างสี่เหลี่ยมจตุรัส กว้าง 20 ยาว 20 แล้วหาพื้นที่ใต้กราฟ</mark></div> 
        <div className='SceneContainer'>
  <Chart7/>
</div>
       <div div className="FooterSpace"></div>
       <div className="Footer">Curious Project</div>
       <div div className="FooterSpace"></div>
      </div>
      
      <div className="split QuestionAnswer"> 
      <div className="LabNumber">Utilizing Graph</div>
      <div className="ProgessBar"><progress value="84" max="100"></progress></div>
      <div className="Question">จงหางานเมื่อวัตถุเคลื่อนที่ได้ระยะการกระจัดจาก 20 เมตร</div>
      <div className="AnswerList">
      <label className="container" >400 J
          <input type="checkbox" id="Answer1"checked  disabled />
          <span className="checkmark"style={{backgroundColor : "rgb(var(--primary-color))"}}></span>
        </label>
        <label className="container">408.2 J
          <input type="checkbox" id="Answer2" disabled/>
          <span className="checkmark" ></span>
        </label>
        <label className="container">450 J
          <input type="checkbox" id="Answer3" disabled/>
          <span className="checkmark"></span>
        </label>
        <label className="container">471 J
          <input type="checkbox" id="Answer4" disabled/>
          <span className="checkmark"></span>
        </label>
    
        <button className = "btn btn-primary btn-answerSent " style={{backgroundColor : "rgb(var(--bg-color))"}} >Answer Sent !</button>
        
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