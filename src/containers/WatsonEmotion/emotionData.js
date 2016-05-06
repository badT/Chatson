import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-d3-basic';

import chartSettings from './emotionChartSettings';
/* component styles */
// import { styles } from './styles.scss';

export class EmotionDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionData: [],
      lastAnger: 0,
    };
  }

  componentWillReceiveProps(props) {
    const currentAnger = props.emotion.anger;
    if (currentAnger !== this.state.lastAnger) {
      const newEmotionData = this.state.emotionData.concat([props.emotion]);
      if (newEmotionData.length > 30) {
        newEmotionData.shift();
      }
      this.setState({
        emotionData: newEmotionData,
        lastAnger: currentAnger,
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <LineChart
            title={chartSettings.title}
            data={this.state.emotionData}
            width={chartSettings.width}
            height={chartSettings.height}
            margins={chartSettings.margins}
            labelOffset={chartSettings.labelOffset}
            legendPosition={chartSettings.legendPosition}
            chartSeries={chartSettings.chartSeries}
            interpolate={chartSettings.interpolate}
            showLegend={chartSettings.showLegend}
            showXAxis={false}
            showYAxis={chartSettings.howYAxis}
            showXGrid={false}
            showYGrid={false}
            x={(d) => { return this.state.emotionData.indexOf(d); }}
            xDomain={chartSettings.xDomain}
            xRange={chartSettings.xRange}
            xScale={chartSettings.xScale}
            xOrient={chartSettings.xOrient}
            xTickOrient={chartSettings.xTickOrient}
            xLabel={chartSettings.xLabel}
            xLabelPosition={chartSettings.xLabelPosition}
            y={chartSettings.y}
            yOrient={chartSettings.yOrient}
            yDomain={chartSettings.yDomain}
            yRange={chartSettings.yRange}
            yScale={chartSettings.yScale}
            yTickOrient={chartSettings.yTickOrient}
            yLabel={chartSettings.yLabel}
            yLabelPosition={chartSettings.yLabelPosition}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ tone }) {
  if (tone.toneData) {
    return {
      emotion: tone.toneData.emotion,
    };
  }
  return {
    emotion: tone,
  };
}

export default connect(mapStateToProps)(EmotionDisplay);
