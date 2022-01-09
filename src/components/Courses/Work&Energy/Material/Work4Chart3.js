import {Line} from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'
const state1 = {
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

const state2 = {
  labels: ['0m','1m', '2m', '3m','4m','5m','6m','7m','8m','9m','10m'],
  datasets: [
    {
      label: 'Force',
      fill: true,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,200)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [0, 2, 4, 6, 4, 2, 1, 1, 1, 5, 9]
    }
  ]
}
const state3 = {
  labels: ['0m','1m', '2m', '3m','4m','5m','6m','7m','8m','9m','10m'],
  datasets: [
    {
      label: 'Force',
      fill: true,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,200)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [0, -2, -4, -6, -4, -2, 0, 2, 4, 6, 6]
    }
  ]
}
const state4 = {
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
  
  export function MyChart1() {
      return (
          <Line
            data={state1}
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
   export function MyChart2() {
      return (
          <Line
            data={state2}
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
    export function MyChart3() {
      return (
          <Line
            data={state3}
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
    export function MyChart4() {
      return (
          <Line
            data={state4}
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