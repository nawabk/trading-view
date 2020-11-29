import React, { useState, useEffect, Fragment } from 'react';
import { createChart } from 'lightweight-charts';

const LineChart = React.forwardRef((props, ref) => {
  const { data } = props;
  const [draw, setDraw] = useState(false);
  const [lineSeriesData, setLineSeriesData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setLineSeriesData(
        data.map(d => ({
          time: d[0],
          value: +d[4]
        }))
      );
      setDraw(true);
    }
  }, [data]);

  useEffect(() => {
    let chart = null;
    if (draw) {
      chart = createChart(ref.current, { width: 800, height: 400 });
      const lineSeries = chart.addLineSeries();
      lineSeries.setData(lineSeriesData);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, lineSeriesData, draw]);

  return <Fragment />;
});

export default LineChart;
