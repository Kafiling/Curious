import React,{useState , useEffect, useContext} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import firebase from 'firebase/compat/app';
import { onSnapshot,  collection, query, where }from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";

//ประกาศตัวแปรของ Firebase Service
import {AuthContext, db, firebaseApp} from 'Firebase';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));



export default function Dashboard() {
  
  //Var currentUser (Context from Firebase.js)
  const {currentUser} = useContext(AuthContext)

  const [Data, setData] = useState([{ name: "Loading...", id: "initial" }]);
  useEffect(
    () =>
      onSnapshot (collection(db, "users"), (snapshot) =>
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  
 
  console.log(Data)

    return (
        <div>
            <div className='CoursePageName'>Work and Energy</div>
            <div div className="LabInfo">เราใช้พลังงานรูปต่างๆในชีวิตประจำวัน เช่น พลังงานไฟฟ้าที่ใช้เปิดไฟให้ส่องสว่าง หรือ พลังงานความร้อนที่ให้ความอบอุ่น ในบทเรียนนี้จะได้เรียนรู้เกี่ยวกับ งาน(พลังงานจากแรง) การทำงานในรูปแบบต่างๆ อัตราการทำงานเพื่อบอกประสิทธิภาพ จนถึงพลังงานในรปูต่างๆ เช่น พลังงานจลน์ พลังงานศักย์โน้มถ่วง  พลังงานศักย์ยืดหยุ่น นิยามของพลังงาน การหาพลังงานในวัตถุ การเปลี่ยนแปลงรูปของพลังงาน และ กฎอนุรักษ์พลังงาน
            </div> 
            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item><h2>Course</h2><br/>13</Item>
        </Grid>
        <Grid item xs={4}>
          <Item><h2>Page/Lab/Chart/Img</h2><br/>85 / 9 / 16 / 84</Item>
        </Grid>
        <Grid item xs={4}>
          <Item><h2>Time estimate</h2><br/>4.5 hr</Item>
        </Grid>
        <Grid item xs={4}>
          <Item><h2>Completion Score</h2><br/> Start learning to see your score!</Item>
        </Grid>
        <Grid item xs={4}>
          <Item><h2>Bayes's Score</h2><br/>Start learning to see your score!</Item>
        </Grid>

      </Grid>
    </Box>
            <div className='Fragment-Container'>
                <div className='Fragment-Name'><span className='Fragment-Number' style={{backgroundColor: '#44CF6C'}}>1</span><h1>Introducing Work</h1></div>
                <div className='Fragment-Sub'>เรียนรู้เกี่ยวกับงานทางฟิสิกส์ การกระทำงาน ทำงานในรูปแบบต่างๆ และ ผลของงาน</div>
            <ul className='Fragment-List'>
            <li id = 'CourseCard'><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/work1'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/lab-anywhere.appspot.com/o/Work%26Energy%2FWork01-1.png?alt=media&token=d2c2ffa4-f6bc-40db-a20c-85e175c8b831"
          alt="Work1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Introducing Work
          </Typography>
          <Typography variant="body2" color="text.primary">
          งานตามความหมายของฟิสิกส์จะเกิดขึ้นได้ก็ต่อเมื่อ มีแรงมากระทำต่อวัตถุ ทำให้วัตถุมีการเคลื่อนที่เกิดการกระจัด โดยงานจะขึ้นอยู่กับแรงและการกระจัด

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/work2'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork2%2FWork2P2.png?alt=media&token=df68d801-87a3-4b94-b4b0-4e8fa70d21d3"
          alt="Work2"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Playing with angles
          </Typography>
          <Typography variant="body2" color="text.primary">
            จะเป็นอย่างไรหากแรงกับการกระจัดกระทำกันในทิศทางต่างๆกันออกไป การออกแรงแบบ 2 มิติจะทำให้เกิดอะไรขึ้น
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/work3'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FWork3%2FWork3P3.png?alt=media&token=748584fb-474a-4e9c-bf01-795842f13f6b"
          alt="Work3"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          No work is done
          </Typography>
          <Typography variant="body2" color="text.primary">
            ออกแรงแต่ไม่เกิดงาน หมายความว่ายังไงกัน เรียนรู้การคิดงานในระบบ 2 มิติ
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/work4'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Screenshot%202022-01-24%20214310.png?alt=media&token=b310c837-3153-4272-9498-1cc2ae9339b0"
          alt="Work4"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <div className='Fragment-Name'>Utilizing Graph<span className='Fragment-Number' style={{backgroundColor: '#44CF6C'}}>↑</span></div>
          </Typography>
          <Typography variant="body2" color="text.primary">
          กรณีที่แรงกระทำต่อวัตถุไม่คงตัวเช่นแรงที่ใช้ดึงสปริงเราจะคำนวณอย่างไร ลองมองงานจากมุมมองของกราฟ
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    
            </ul>
            </div>

            <div className='Fragment-Container'>
            <div className='Fragment-Name'><span className='Fragment-Number' style={{backgroundColor: '#FF8400'}}>2</span><h1>Introducing Power</h1></div>
                <div className='Fragment-Sub'>กำลัง (Power) คือ อัตราการทำงานหรืองานที่เกิดขึ้นในหนึ่งหน่วยเวลา</div>
            <ul className='Fragment-List'>
            <li id = 'CourseCard'><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/power1'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower1%2FPower1P1.png?alt=media&token=ff218331-6949-462a-9dae-5e72c347f0ef"
          alt="Power1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Work by time
          </Typography>
          <Typography variant="body2" color="text.primary">
          กำลัง (Power) คือ อัตราการทำงานหรืองานที่เกิดขึ้นในหนึ่งหน่วยเวลา
          “กำลัง” ใช้บอกความสามารถทำงานได้มาก-น้อยในช่วงเวลาหนึ่ง 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/power2'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FPower2%2FPower2P1.png?alt=media&token=1fbc10d2-a290-4883-9262-ee5981d14979"
          alt="Power2"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Horse and Watt
          </Typography>
          <Typography variant="body2" color="text.primary">
          กำลังวัตต์ (Watt) กำลังม้า (Horse Power : hp) และกำลังในชีวิตประจำวัน
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/exam_work'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FExamWork%2FExamWorkP3.png?alt=media&token=9cbd7246-e4db-4c4b-b1a3-ae0f381f96f6"
          alt="Exam Work"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Exam : Work & Power
          </Typography>
          <Typography variant="body2" color="text.primary">
            ตะลุยโจทย์ งาน และ กำลัง เสริมประสบการณ์ทำโจทย์<br/>
            (มีการเก็บ Bayes's Score)
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
            </ul>
            </div>

            <div className='Fragment-Container'>
            <div className='Fragment-Name'><span className='Fragment-Number' style={{backgroundColor: '#473BF0'}}>3</span><h1>Introducing Energy</h1></div>
                <div className='Fragment-Sub'>พลังงานคืออะไร ทำความรู้จักกับชนิดของพลังงาน การคิดพลังงานกล และผลของพลังงานในชีวิตประจำวัน</div>
            <ul className='Fragment-List'>
            <li id = 'CourseCard'><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/kineticenergy'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEk1%2FEkP3.png?alt=media&token=042abf49-cb96-44fc-90d4-390964ca080c"
          alt="kineticenergy"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Velocity is Energy
          </Typography>
          <Typography variant="body2" color="text.primary">
พลังงานคืออะไร พลังงานนั้นเป็นปริมาณที่ไม่สามารถมองเห็นหรือจับต้องได้ แต่สามารถรับรู้จากผลของพลังงานนั้นได้
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/potentialenergy1'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P3.png?alt=media&token=79020c1b-f699-43e2-915a-6cc84b66c9c2"
          alt="potentialenergy1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Contained Energy
          </Typography>
          <Typography variant="body2" color="text.primary">
          พลังงานศักย์ (Potential Energy) คือพลังงานที่สะสมไว้ในวัตถุและพร้อมที่จะนำมาใช้
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/potentialenergy2'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp2%2FEp2P4.png?alt=media&token=32a7080f-5823-4506-bddd-2ee296b434c1"
          alt="potentialenergy2"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Springy Trouble
          </Typography>
          <Typography variant="body2" color="text.primary">
          พลังงานศักย์ยืดหยุ่น คือ พลังงานศักย์เนื่องจากแรงยืดหยุ่นจากสปริง/สายธนู
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
            </ul>
            </div>

            <div className='Fragment-Container'>
            <div className='Fragment-Name'><span className='Fragment-Number' style={{backgroundColor: '#FF0035'}}>4</span><h1>Law of conservation of energy</h1></div>
                <div className='Fragment-Sub'>กฏอนุรักษ์พลังงานกล การเปลี่ยนรูปพลังงาน การเพิ่ม/ลดพลังงานในระบบด้วยแรงภายนอก</div>
            <ul className='Fragment-List'>
            <li id = 'CourseCard'><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/lawofconservationofenergy1'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FEp1%2FEp1P5.png?alt=media&token=44b39353-448b-4eb0-8655-3277af1ecc80"
          alt="LOCE1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <div className='Fragment-Name'>Energy Transformed<span className='Fragment-Number' style={{backgroundColor: '#44CF6C'}}>↑</span></div>
          </Typography>
          <Typography variant="body2" color="text.primary">
          จะสังเกตได้ว่าทั้งงาน พลังงานจลน์ พลังงานศักย์ และพลังงานรูปแบบต่างๆ ต่างก็มีหน่วยจูล (J) ทั้งสิ้น เราพบว่าพลังงานในรูปหนึ่งสามารถเปลี่ยนเป็นรูปอื่นๆได้
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/lawofconservationofenergy2'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P2.png?alt=media&token=083fce3c-34b0-4b0e-a184-d794e115e6b3"
          alt="LOCE2"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Force into Play
          </Typography>
          <Typography variant="body2" color="text.primary">
            เพิ่มพลังงานเข้าระบบด้วยการออกงาน และ สูญเสียพลังงานให้สิ่งแวดล้อมจากงานต้าน
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    <li><Card sx={{ maxWidth: 345 , height: 275 }}>
      <CardActionArea href='/courses/work_energy/final_exam'>
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/keep-curious.appspot.com/o/Work%26Energy%2FLOCE2%2FLOCE2P4.png?alt=media&token=39df6c01-8285-4631-a72b-af9736fd5873"
          alt="Final Exam"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Final Exam
          </Typography>
          <Typography variant="body2" color="text.primary">
          ตะลุยโจทย์ งาน,กำลัง และ พลังงาน เสริมประสบการณ์ทำโจทย์
            (มีการเก็บ Bayes's Score)
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></li>
    
    
            </ul>
            </div>
        </div>
    )
}
