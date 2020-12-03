import React, { useState, useEffect, useRef } from 'react';

import LineChart from './LineChart';
import AreaChart from './AreaChart';
import CandlestickChart from './CandlestickChart';
import BarChart from './BarChart';
import HistogramChart from './HistogramChart';
import Range from './Range';

const Chart = ({ data, chartToShow }) => {
  const ref = useRef();
  const [updatedData, setUpdatedData] = useState(null);
  const [range, setRange] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@kline_1h'
    );
    socket.onmessage = function(event) {
      const parsedData = JSON.parse(event.data);
      setUpdatedData(parsedData);
    };
  }, []);

  const applyTimeRange = (from, to) => {
    const parsedFrom = Date.parse(
      `${from.date} ${from.hrs}:${from.min}:${from.sec}`
    );
    const parsedTo = Date.parse(`${to.date} ${to.hrs}:${to.min}:${to.sec}`);
    setRange({
      from: new Date(parsedFrom),
      to: new Date(parsedTo)
    });
  };

  let content = null;
  switch (chartToShow) {
    case 'line-chart':
      content = (
        <LineChart
          ref={ref}
          data={data}
          updatedData={updatedData}
          setRange={setRange}
          range={range}
        />
      );
      break;
    case 'bar-chart':
      content = (
        <BarChart
          ref={ref}
          data={data}
          updatedData={updatedData}
          range={range}
          setRange={setRange}
        />
      );
      break;
    case 'candlestick-chart':
      content = (
        <CandlestickChart
          ref={ref}
          data={data}
          updatedData={updatedData}
          setRange={setRange}
          range={range}
        />
      );
      break;
    case 'area-chart':
      content = (
        <AreaChart
          ref={ref}
          data={data}
          updatedData={updatedData}
          setRange={setRange}
          range={range}
        />
      );
      break;
    case 'histogram-chart':
      content = (
        <HistogramChart
          ref={ref}
          data={data}
          updatedData={updatedData}
          setRange={setRange}
          range={range}
        />
      );
      break;
    default:
      content = (
        <LineChart
          ref={ref}
          data={data}
          updatedData={updatedData}
          setRange={setRange}
          range={range}
        />
      );
      break;
  }
  return (
    <>
      <Range range={range} applyTimeRange={applyTimeRange} />
      <div ref={ref} className='chart' />
      {content}
    </>
  );
};

export default Chart;
