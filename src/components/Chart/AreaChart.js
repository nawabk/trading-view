import React, { useState, useEffect, Fragment } from 'react';
import { createChart } from 'lightweight-charts';

const AreaChart = React.forwardRef((props, ref) => {
  const { data, updatedData } = props;
  const [draw, setDraw] = useState(false);
  const [areaSeriesData, setAreaSeriesData] = useState([]);
  const [areaSeries, setAreaSeries] = useState(null);

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
      setAreaSeries(areaSeries);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, areaSeriesData, draw]);

  useEffect(() => {
    if ((updatedData, areaSeries)) {
      areaSeries.update({
        time: updatedData.k.t,
        value: +updatedData.k.c
      });
    }
  }, [updatedData, areaSeries]);

  return <Fragment />;
});

export default AreaChart;
