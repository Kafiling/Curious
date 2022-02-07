import {Line} from 'react-chartjs-2';

const state = {
  labels: ['0m','2.5m', '5m', '7.5m','10m','12.5m','15m','17.5m','20m'],
  datasets: [
    {
      label: 'Force',
      fill: true,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,200)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [4, 5, 6, 7, 8, 9, 10, 11, 12]
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
                  },
                  suggestedMin: 0,
                  suggestedMax: 12
                }
              }
            }}
          />
        
      );
    }