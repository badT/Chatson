const width = 1000;
const height = 500;
const marginOther = 70;
const marginLeft = 100;

export default {
  width,
  height,
  margins: { top: marginOther, right: marginOther, bottom: marginOther, left: marginLeft },
  title: 'Social',
  svgClassName: 'test-chart-class',
  titleClassName: 'test-chart-name',
  legendClassName: 'test-legend',
  showLegend: true,
  showXAxis: true,
  showYAxis: true,
  chartSeries: [
    {
      field: 'neuroticism',
      name: 'Neuroticism',
      style: {
        'fill': '#2ca02c',
        'fill-opacity': 0.5,
      },
    },
  ],
  x: (d) => {
    return d.letter;
  },
  xScale: 'ordinal',
  y: (d) => {
    return +d;
  },
  // yTicks: [10, '%'],
  yOrient: 'left',
  yTickOrient: 'left',
  yDomain: [0, 100],
  yRange: [height - marginOther - marginOther, 0],
  yScale: 'linear',
  yAxisClassName: 'y-axis',
  yLabel: 'Social Attributes',
  labelOffset: 60,
  legendPosition: 'right',
  showXGrid: false,
  showYGrid: false,
  xLabelPosition: 'bottom',
  yLabelPosition: 'left',
};
