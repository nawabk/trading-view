import React, { useState, useEffect, Fragment } from 'react';
import { createChart } from 'lightweight-charts';

const AreaChart = React.forwardRef((props, ref) => {
  const { data, updatedData, range, setRange } = props;
  const [draw, setDraw] = useState(false);
  const [areaSeriesData, setAreaSeriesData] = useState([]);
  const [areaSeries, setAreaSeries] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      setAreaSeriesData(
        data.map(d => ({
          time: d[0] / 1000,
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
      setChart(chart);
      setRange({
        from: new Date(chart.timeScale().getVisibleRange().from * 1000),
        to: new Date(chart.timeScale().getVisibleRange().to * 1000)
      });
      setAreaSeries(areaSeries);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, areaSeriesData, draw, setRange]);

  useEffect(() => {
    if (updatedData && areaSeries) {
      areaSeries.update({
        time: updatedData.k.t,
        value: +updatedData.k.c
      });
    }
  }, [updatedData, areaSeries]);

  useEffect(() => {
    if (chart && range) {
      const { from, to } = range;
      chart.timeScale().setVisibleRange({
        from: from.getTime() / 1000,
        to: to.getTime() / 1000
      });
    }
  }, [range, chart]);

  return <Fragment />;
});

export default AreaChart;
