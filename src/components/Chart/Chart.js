import React, { useRef } from 'react';
import LineChart from './LineChart';
import AreaChart from './AreaChart';
import CandlestickChart from './CandlestickChart';
import BarChart from './BarChart';
import HistogramChart from './HistogramChart';

const Chart = ({ data, chartToShow }) => {
  const ref = useRef();

  let content = null;
  switch (chartToShow) {
    case 'line-chart':
      content = <LineChart ref={ref} data={data} />;
      break;
    case 'bar-chart':
      content = <BarChart ref={ref} data={data} />;
      break;
    case 'candlestick-chart':
      content = <CandlestickChart ref={ref} data={data} />;
      break;
    case 'area-chart':
      content = <AreaChart ref={ref} data={data} />;
      break;
    case 'histogram-chart':
      content = <HistogramChart ref={ref} data={data} />;
      break;
    default:
      content = <LineChart ref={ref} data={data} />;
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
