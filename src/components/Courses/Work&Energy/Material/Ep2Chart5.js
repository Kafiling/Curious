import {Line} from 'react-chartjs-2';

const state = {
  labels: ['0m','0.5m', '1m', '1.5m'],
  datasets: [
    {
      label: 'Force',
      fill: true,
      lineTension: 0.35,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [0,40,80,120]
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
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Position'
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Force'
                  },grid: {
                    color: 'red',
                    borderColor: 'grey',
                    tickColor: 'grey'
                  },
                  suggestedMin: 0,
                  suggestedMax: 10
                }
              }
             
            }}
          />
        
      );
    }