import {Line} from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'
const state = {
  labels: ['0m','2.5m', '5m', '7.5m','10m','12.5m','15m','17.5m','20m'],
  datasets: [
    {
      label: 'Force',
      fill: true,
      lineTension: 0.35,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [20, 22.5, 20, 17.5, 20, 22.5, 20, 17.5, 20]
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
                  grid: {
                    color: 'red',
                    borderColor: 'grey',
                    tickColor: 'grey'
                  },
                    suggestedMin: 0,
                    suggestedMax: 22.5
                    
                }}
            }}
          />
        
      );
    }