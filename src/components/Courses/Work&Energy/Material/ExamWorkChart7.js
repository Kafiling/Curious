import {Line} from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'
const state = {
  labels: ['0m','10m','20m','30m'],
  datasets: [
    {
      label: 'Force(F)',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      data: [0, 5 ,10,10]
    },{
      label: 'Friction(f)',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(255,122,51,1)',
      borderColor: 'rgba(255,122,51,1)',
      borderWidth: 2,
      data: [0, 2 ,4, 4]
    }
  ]
}
  
  export function MyChart() {
      return (
          <Line
            data={state}
            options={{
              title:{
                display:true,
                text:'ความสัมพันธุ์ระหว่างแรงและการกระจัด',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              },
              scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 10
                    
                }}
            }}
          />
        
      );
    }