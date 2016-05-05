import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BarChart } from 'react-d3-basic';

import { getTone } from '../../actions/index';
import chartSetup from './ChartSetUp';
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

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2>Neuroticism: {this.props.social.neuroticism_big5}</h2>
          <BarChart
            title={chartSetup.title}
            data={this.state.socialData}
            width={chartSetup.width}
            height={chartSetup.height}
            margins={chartSetup.margins}
            chartSeries={chartSetup.chartSeries}
            x={chartSetup.x}
            xScale={chartSetup.xScale}
            y={chartSetup.y}
            yTicks={chartSetup.yTicks} />
        </div>
      </div>
    );
  }
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

export default connect(mapStateToProps)(SocialDisplay);
