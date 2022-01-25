import React from 'react'
import {Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export default function Analytics() {
    return (
        <div>
            <div className='CoursePageName'>Analytics</div>
            <div div className="LabInfo">ระบบจะทำการวิเคราห์หา จุดเด่น และ จุดด้อย ของผู้เรียนจากข้อมูลการตอบคำถาม การตอบตัวเลือกลวง เวลาที่ใช้ในการทำโจทย์ Completion Score และ Bayes's Score จากเนื้อหาต่างๆ เพื่อบ่งชี้จุดที่ผู้เรียนสามารถเอาไปใช้ในการพัฒนาตนเอง<br/><br/>
            </div> 
            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item><h2><span className='Fragment-Number' style={{backgroundColor: '#44CF6C'}}>↑</span> Strength</h2>
          <p>คุณยังไม่มีจุดที่คุณถนัด มาฝึกฝนเพิ่มเพื่อพัฒนาความสามารถไปด้วยกันนะ!</p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item><h2><span className='Fragment-Number' style={{backgroundColor: '#FF345C'}}>↓</span>  Weakness</h2>
          <p>คุณยังไม่มีจุดที่ต้องปรับปรุง เก่งมาก!</p>
          </Item>
        </Grid>
      </Grid>
    </Box>
        </div>
    )
}
