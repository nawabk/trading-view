import React, { useState, useEffect, Fragment } from 'react';
import { createChart } from 'lightweight-charts';

const BarChart = React.forwardRef((props, ref) => {
  const { data, updatedData, setRange, range } = props;
  const [draw, setDraw] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [barSeries, setBarSeries] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      setChartData(
        data.map(d => ({
          time: d[0] / 1000,
          open: +d[1],
          high: +d[2],
          low: +d[3],
          close: +d[4]
        }))
      );
      setDraw(true);
    }
  }, [data]);

  useEffect(() => {
    let chart = null;
    if (draw) {
      chart = createChart(ref.current, { width: 800, height: 400 });
      const barSeries = chart.addBarSeries({
        thinBars: false
      });
      barSeries.setData(chartData);
      setChart(chart);
      setRange({
        from: new Date(chart.timeScale().getVisibleRange().from * 1000),
        to: new Date(chart.timeScale().getVisibleRange().to * 1000)
      });
      setBarSeries(barSeries);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, chartData, draw, setRange]);

  useEffect(() => {
    if (updatedData && barSeries) {
      barSeries.update({
        time: updatedData.k.t,
        open: +updatedData.k.o,
        high: +updatedData.k.h,
        low: +updatedData.k.l,
        close: +updatedData.k.c
      });
    }
  }, [updatedData, barSeries]);

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

export default BarChart;
