import React, { useState, useEffect, Fragment } from 'react';
import { createChart } from 'lightweight-charts';

const CandlestickChart = React.forwardRef((props, ref) => {
  const { data, updatedData, range, setRange } = props;
  const [draw, setDraw] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [candlestickSeries, setCandlestickSeries] = useState(null);
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
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(chartData);
      setChart(chart);
      setRange({
        from: new Date(chart.timeScale().getVisibleRange().from * 1000),
        to: new Date(chart.timeScale().getVisibleRange().to * 1000)
      });
      setCandlestickSeries(candlestickSeries);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, chartData, draw, setRange]);

  useEffect(() => {
    if (updatedData && candlestickSeries) {
      candlestickSeries.update({
        time: updatedData.k.t,
        open: +updatedData.k.o,
        high: +updatedData.k.h,
        low: +updatedData.k.l,
        close: +updatedData.k.c
      });
    }
  }, [updatedData, candlestickSeries]);

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

export default CandlestickChart;
