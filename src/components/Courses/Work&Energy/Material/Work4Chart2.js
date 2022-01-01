import {Line} from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'
const state = {
  labels: ['0m','1m', '2m', '3m','4m','5m','6m','7m','8m','9m','10m'],
  datasets: [
    {
      label: 'Force',
      fill: true,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,200)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
              }
            }}
          />
        
      );
    }