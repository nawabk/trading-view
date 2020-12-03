import React, { useState, useEffect, Fragment } from 'react';
import { createChart } from 'lightweight-charts';

const colors = [
  '#e8e8e8',
  '#f05454',
  '#30475e',
  '#222831',
  '#34626c',
  '#839b97',
  '#cfd3ce',
  '#c6b497',
  '#707070',
  '#92817a',
  '#8db596',
  '#bedbbb',
  '#534e52',
  '#965d62'
];

const getRandomColor = () => {
  const idx = Math.floor(Math.random() * (colors.length + 1));
  return colors[idx];
};

const HistogramChart = React.forwardRef((props, ref) => {
  const { data, updatedData, range, setRange } = props;
  const [draw, setDraw] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [histogramSeries, setHistogramSeries] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      setChartData(
        data.map(d => ({
          time: d[0] / 1000,
          value: +d[4],
          color: getRandomColor()
        }))
      );
      setDraw(true);
    }
  }, [data]);

  useEffect(() => {
    let chart = null;
    if (draw) {
      chart = createChart(ref.current, { width: 800, height: 400 });
      const histogramSeries = chart.addHistogramSeries({
        base: 0
      });
      histogramSeries.setData(chartData);
      setChart(chart);
      setRange({
        from: new Date(chart.timeScale().getVisibleRange().from * 1000),
        to: new Date(chart.timeScale().getVisibleRange().to * 1000)
      });
      setHistogramSeries(histogramSeries);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, chartData, draw, setRange]);

  useEffect(() => {
    if (updatedData && histogramSeries) {
      histogramSeries.update({
        time: updatedData.k.t,
        value: +updatedData.k.c
      });
    }
  }, [histogramSeries, updatedData]);

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

export default HistogramChart;
