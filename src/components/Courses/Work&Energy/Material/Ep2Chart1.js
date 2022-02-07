import {Line} from 'react-chartjs-2';

const state = {
  labels: ['0m','0.1m', '0.2m', '0.3m','0.4m','0.5m','0.6m','0.7m','0.8m','0.9m','1m'],
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
                  suggestedMax: 10
                }
              }
            }}
          />
        
      );
    }