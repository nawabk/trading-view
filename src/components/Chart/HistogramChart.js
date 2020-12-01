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
  const { data, updatedData } = props;
  const [draw, setDraw] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [histogramSeries, setHistogramSeries] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      setChartData(
        data.map(d => ({
          time: d[0],
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
      setHistogramSeries(histogramSeries);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, chartData, draw]);

  useEffect(() => {
    if (updatedData && histogramSeries) {
      histogramSeries.update({
        time: updatedData.k.t,
        value: +updatedData.k.c
      });
    }
  }, [histogramSeries, updatedData]);

  return <Fragment />;
});

export default HistogramChart;
