import React, { useState } from 'react';
import './App.css';
import Chart from './components/Chart/Chart';
import useFetch from './hooks/useFetch';

function App() {
  const [chartToShow, setChartToShow] = useState('line-chart');

  const { loading, list, error } = useFetch(
    'https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1h'
  );

  let content = null;

  if (!loading) {
    if (error) {
      content = <h2>Error</h2>;
    } else if (list) {
      content = (
        <>
          <Chart data={list} chartToShow={chartToShow} />
        </>
      );
    }
  } else {
    content = <h2>Loading...</h2>;
  }

  return (
    <>
      <div className='header'>
        <h2 className='heading'>Trade Analysis</h2>
        <select
          value={chartToShow}
          onChange={e => setChartToShow(e.target.value)}
          disabled={list.length <= 0}
          className='chart-select'
        >
          <option value='line-chart'>Line Chart</option>
          <option value='bar-chart'>Bar Chart</option>
          <option value='candlestick-chart'>Candlestick Chart</option>
          <option value='area-chart'>Area Chart</option>
          <option value='histogram-chart'>Histogram Chart</option>
        </select>
      </div>
      <div className='chart-container'>{content}</div>
    </>
  );
}

export default App;
