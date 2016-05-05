import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Chart } from 'react-d3-core';

import { getTone } from '../../actions/index';
import LineGraph from '../../components/LineGraph/index';
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

  componentWillMount() {
    this.props.socket.on('tone:update', toneData => {
      this.props.getTone(toneData);
    });
  }

  componentWillReceiveProps(props) {
    const currentAnger = props.emotions.anger;
    if (currentAnger !== this.state.lastAnger) {
      const newEmotionData = this.state.emotionData.concat([props.emotions]);
      if (newEmotionData.length > 100) {
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
          <Chart
            title={chartSettings.title}
            id={chartSettings.id}
            width={chartSettings.width}
            height={chartSettings.height}
            margins={chartSettings.margins}
            chartSeries={chartSettings.chartSeries}
          >
            <LineGraph
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
              showXAxis={chartSettings.showXAxis}
              showYAxis={chartSettings.howYAxis}
              showXGrid={chartSettings.howXGrid}
              showYGrid={chartSettings.howYGrid}
              x={chartSettings.x}
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
          </Chart>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTone }, dispatch);
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

export default connect(mapStateToProps, mapDispatchToProps)(EmotionDisplay);
