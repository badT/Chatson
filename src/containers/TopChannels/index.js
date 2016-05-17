import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLongTermTone } from '../../actions/index';
import { styles } from './styles.scss';

class TopChannels extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getLongTermTone();
  }

  renderGraph(dataObj) {
    const channel = dataObj.channel.substr(1);
    const count = dataObj.messageCount * 200;
    const emos = dataObj.emos;

    const emoXCoords = {
      anger: 5,
      sadness: 15,
      disgust: 25,
      fear: 35,
      joy: 45,
      openness: 70,
      conscientiousness: 80,
      extraversion: 90,
      agreeableness: 100,
      neuroticism: 110,
    };

    const emoColors = {
      anger: '#FF3F39',
      sadness: '#2B56B2',
      disgust: '#AC35B2',
      fear: '#4ACC68',
      joy: '#FFF348',
      openness: '#FF3F39',
      conscientiousness: '#2B56B2',
      extraversion: '#AC35B2',
      agreeableness: '#4ACC68',
      neuroticism: '#FFF348',
    };

    const rectangles = [];

    Object.keys(emos).forEach(emo => {
      const height = emos[emo];
      const yCoord = 100 - height;
      const startXCoord = emoXCoords[emo];
      const color = emoColors[emo];

      rectangles.push(<rect x={startXCoord} y={yCoord} width="10" height={height} fill={color} />);
    });

    return (
      <div key={channel} className="col-xs-12 col-sm-6">
        <h1>{channel}</h1>
        <h4>{count}</h4>
        <div className="chart-container">
          <svg width="125" heigth="100" viewBox="0 0 125 100" preserveAspectRatio="none">
            <g>
              {rectangles}
            </g>
          </svg>
          {this.renderLabels(Object.keys(emoXCoords))}
        </div>
      </div>
    );
  }

  renderLabels(keys) {
    return keys.map(key => {
      return (
        <span className={`label label-${key}`}>{key}</span>
      );
    });
  }

  render() {
    return (
      <section className={`${styles}`}>
        {this.props.longTermTone.map(this.renderGraph, this)}
      </section>
    );
  }
}

TopChannels.propTypes = {
  getLongTermTone: React.PropTypes.func,
  longTermTone: React.PropTypes.array,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLongTermTone }, dispatch);
}

function mapStateToProps({ longTermTone }) {
  if (!longTermTone.longTermTone) {
    return { longTermTone: [] };
  }
  return { longTermTone: longTermTone.longTermTone };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopChannels);
