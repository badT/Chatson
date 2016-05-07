import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BarChart } from 'react-d3-basic';

import { getTone } from '../../actions/index';
import chartSettings from './socialChartSettings';
/* component styles */
// import { styles } from './styles.scss';

export class SocialDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socialData: [],
      lastNerotic: 0,
    };
  }
  
  // componentWillMount() {
  //   this.props.socket.on('tone:update', toneData => {
  //     this.props.getTone(toneData);
  //   });
  // }
  
  componentWillReceiveProps(props) {
    const currentNerotic = props.social.neuroticism_big5;
    if (currentNerotic !== this.state.lastNerotic) {
      const newSocialData = this.state.socialData.concat([props.social]);
      if (newSocialData.length > 12) {
        newSocialData.shift();
      }
      this.setState({
        socialData: newSocialData,
        lastNerotic: currentNerotic,
      });
    }
  }
  
  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <BarChart
            title={chartSettings.title}
            data={this.state.socialData}
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
            x={(d) => { return this.state.socialData.indexOf(d); }}
            xDomain={chartSettings.xDomain}
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
            yTicks={chartSettings.yTicks}
          />
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
      social: tone.toneData.social,
    };
  }
  return {
    social: tone,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialDisplay);
