import {Line} from 'react-chartjs-2';

const state = {
  labels: ['0m','10m','20m','30m'],
  datasets: [
    {
      label: 'Force',
      fill: true,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [20, 10 ,0, -10]
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
                    suggestedMin: -10,
                    suggestedMax: 20
                    
                }}
            }}
          />
        
      );
    }