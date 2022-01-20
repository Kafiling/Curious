import {Line} from 'react-chartjs-2';

const state = {
    labels:  ['0m','1m', '2m', '3m','4m','5m','6m','7m','8m','9m','10m'],
    datasets: [
      {
        label: 'Force',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(71,59,240,0.7)',
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 2,
        data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      }
    ]
  }
    
    export function Chart5() {
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