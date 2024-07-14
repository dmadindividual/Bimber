import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { CoinContext } from '../../Context/CoinContext';

const LineChart = ({ historicalData }) => {
  const { Currency } = useContext(CoinContext);
  const [data, setData] = useState([['Date', 'Price']]);
  
  // Ensure Currency is defined before using its properties
  if (!Currency) {
    return <div>Loading...</div>; // Or handle loading state as needed
  }

  const chartOptions = {
    title: 'Price History',
    curveType: 'function',
    legend: { position: 'bottom', textStyle: { color: '#333' } }, // Legend text color
    backgroundColor: '#0A1223', // Dark background color
    hAxis: {
      title: 'Date',
      titleTextStyle: { color: '#DDD' }, // Axis title color
      textStyle: { color: '#DDD' }, // Axis label text color
      gridlines: { color: '#333' } // Gridline color
    },
    vAxis: {
      title: `Price (${Currency.symbol})`,
      titleTextStyle: { color: '#DDD' }, // Axis title color
      textStyle: { color: '#DDD' }, // Axis label text color
      gridlines: { color: '#333' }, // Gridline color
      format: 'currency'
    },
    colors: ['#4CAF50'], // Line color for the chart (green)
    chartArea: {
      width: '80%', // Adjust the width of the chart area
      height: '70%' // Adjust the height of the chart area
    }
  };

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const formattedData = [['Date', 'Price']];
      historicalData.prices.forEach(item => {
        formattedData.push([new Date(item[0]).toLocaleDateString(), item[1]]);
      });
      setData(formattedData);
    }
  }, [historicalData]);

  return (
    <div className='p-4 bg-[#0A1223] rounded mt-3'>
      <Chart
        chartType="LineChart"
        data={data}
        options={chartOptions}
        width={'100%'}
        height={'400px'}
        legendToggle
      />
    </div>
  );
};

export default LineChart;
