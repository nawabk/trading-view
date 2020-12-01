import React, { useState, useEffect, useRef } from 'react';

import LineChart from './LineChart';
import AreaChart from './AreaChart';
import CandlestickChart from './CandlestickChart';
import BarChart from './BarChart';
import HistogramChart from './HistogramChart';

const Chart = ({ data, chartToShow }) => {
  const ref = useRef();
  const [updatedData, setUpdatedData] = useState(null);
  useEffect(() => {
    const socket = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@kline_1h'
    );
    socket.onmessage = function(event) {
      const parsedData = JSON.parse(event.data);
      setUpdatedData(parsedData);
    };
  }, []);

  let content = null;
  switch (chartToShow) {
    case 'line-chart':
      content = <LineChart ref={ref} data={data} updatedData={updatedData} />;
      break;
    case 'bar-chart':
      content = <BarChart ref={ref} data={data} updatedData={updatedData} />;
      break;
    case 'candlestick-chart':
      content = (
        <CandlestickChart ref={ref} data={data} updatedData={updatedData} />
      );
      break;
    case 'area-chart':
      content = <AreaChart ref={ref} data={data} updatedData={updatedData} />;
      break;
    case 'histogram-chart':
      content = (
        <HistogramChart ref={ref} data={data} updatedData={updatedData} />
      );
      break;
    default:
      content = <LineChart ref={ref} data={data} updatedData={updatedData} />;
      break;
  }
  return (
    <>
      <div ref={ref} className='chart' />
      {content}
    </>
  );
};

export default Chart;
