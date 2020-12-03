import React, { useState, useEffect, Fragment } from 'react';
import { createChart } from 'lightweight-charts';

const LineChart = React.forwardRef((props, ref) => {
  const { data, updatedData, setRange, range } = props;
  const [draw, setDraw] = useState(false);
  const [lineSeriesData, setLineSeriesData] = useState([]);
  const [lineSeries, setLineSeries] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      setLineSeriesData(
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
      chart = createChart(ref.current, {
        width: 800,
        height: 400
      });
      const lineSeries = chart.addLineSeries();
      lineSeries.setData(lineSeriesData);
      setChart(chart);
      setRange({
        from: new Date(chart.timeScale().getVisibleRange().from * 1000),
        to: new Date(chart.timeScale().getVisibleRange().to * 1000)
      });
      setLineSeries(lineSeries);
    }
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [ref, lineSeriesData, draw, setRange]);

  useEffect(() => {
    if (updatedData && lineSeries) {
      lineSeries.update({
        time: updatedData.k.t,
        value: +updatedData.k.c
      });
    }
  }, [updatedData, lineSeries]);

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

export default LineChart;
