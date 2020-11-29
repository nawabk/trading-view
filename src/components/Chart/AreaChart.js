import React, { useState, useEffect, Fragment } from 'react';
import { createChart } from 'lightweight-charts';

const AreaChart = React.forwardRef((props, ref) => {
  const { data } = props;
  const [draw, setDraw] = useState(false);
  const [areaSeriesData, setAreaSeriesData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setAreaSeriesData(
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
      const areaSeries = chart.addAreaSeries();
      areaSeries.setData(areaSeriesData);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, areaSeriesData, draw]);

  return <Fragment />;
});

export default AreaChart;
