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
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
      }
    ]
  }
  
  export function MyChart() {
      return (
        <div>
          <Line
            data={state}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
      );
    }