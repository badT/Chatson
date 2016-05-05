const width = 700;
const height = 300;
const marginOther = 70;
const marginLeft = 100;

export const chartSettings = {
  width,
  height,
  margins: { top: marginOther, right: marginOther, bottom: marginOther, left: marginLeft },
  title: 'Emotions',
  svgClassName: 'test-chart-class',
  titleClassName: 'test-chart-title-class',
  legendClassName: 'test-legend',
  showLegend: true,
  showXAxis: false,
  showYAxis: true,
  chartSeries: [
    {
      field: 'anger',
      name: 'Anger',
      color: '#ff7f0e',
    },
    {
      field: 'disgust',
      name: 'Disgust',
      color: '#2ca02c',
    },
    {
      field: 'fear',
      name: 'Fear',
      color: '#7777ff',
    },
    {
      field: 'joy',
      name: 'Joy',
      color: '#f4ff77',
    },
    {
      field: 'sadness',
      name: 'Sadness',
      color: '#d777ff',
    },
  ],
  interpolate: 'monotone',
  x: (d) => {
    return d;
  },
  xOrient: 'bottom',
  xTickOrient: 'bottom',
  xDomain: [0, 5],
  xRange: [0, width - marginOther - marginOther],
  xScale: 'linear',
  xAxisClassName: 'x-axis',
  xLabel: 'Minutes',
  y: (d) => {
    return d;
  },
  yOrient: 'left',
  yTickOrient: 'left',
  yDomain: [0, 100],
  yRange: [height - marginOther - marginOther, 0],
  yScale: 'linear',
  yAxisClassName: 'y-axis',
  yLabel: 'something',
  labelOffset: 60,
  legendPosition: 'right',
  showXGrid: true,
  showYGrid: true,
  xLabelPosition: 'bottom',
  yLabelPosition: 'left',
};
