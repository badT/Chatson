import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLongTermTone } from '../../actions/index';
import { styles } from './styles.scss';
import { emoXCoords, delays, emoColors, months } from './variables';
import { addCommas, animateBars } from './helpers';
import { capitalizeFirstLetter } from '../../components/LineGraphComponents/helpers';
import { splotchDesc, splotchDescLT25, splotchDescLT50, splotchDescGT75 } from '../../components/LineGraphComponents/descriptions';

class TopChannels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: '',
      attr: '',
      message: '',
    };
  }

  componentWillMount() {
    this.props.getLongTermTone();
  }

  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.longTermTone) && nextProps.longTermTone.length) {
      animateBars(emoColors, delays);
    }
  }

  handleMouseEnter(channel, attr, message) {
    this.setState({
      channel,
      attr,
      message,
    });
  }

  handleMouseLeave() {
    this.setState({
      channel: '',
      attr: '',
      message: '',
    });
  }

  renderGraph(dataObj) {
    const channel = dataObj.channel.substr(1);
    const emos = dataObj.emos;
    const date = dataObj.createdAt.split('T')[0].split('-');
    const dateStr = `${months[parseInt(date[1], 10) - 1]} ${parseInt(date[2], 10)}, ${date[0]}`;
    const rectangles = [];
    let count = dataObj.messageCount * 200;

    if (count > 999) {
      count = addCommas(count);
    }

    Object.keys(emos).forEach(emo => {
      const height = emos[emo];
      const avg = Math.round(height) / 100;
      const yCoord = 100 - height;
      const startXCoord = emoXCoords[emo];
      const color = emoColors[emo];

      let explanation = '';
      if (height > 75) {
        explanation = splotchDescGT75[emo];
      } else if (height < 25 && splotchDescLT25[emo] !== '') {
        explanation = splotchDescLT25[emo];
      } else if (height < 50 && splotchDescLT50[emo] !== '') {
        explanation = splotchDescLT50[emo];
      } else {
        explanation = 'This value does not indicate a strong tendency';
      }

      const msg = <span>Average {capitalizeFirstLetter(emo)} score: <b>{avg}</b><br /><i className="reading-explanation">{explanation}</i></span>;

      rectangles.push(
        <rect
          key={emo}
          onMouseEnter={() => this.handleMouseEnter(channel, emo, msg)}
          onMouseLeave={() => this.handleMouseLeave()}
          className={`${emo}-bar chart-bar`}
          x={startXCoord}
          y={yCoord}
          width="10"
          height={height}
          fill={color}
        />
      );
    });

    return (
      <div key={channel} className="col-xs-12 col-sm-6">
        <section className="channel-data">
          <h2>{channel}</h2>
          <h4>{count} messages since {dateStr}</h4>
          <div className={`chart-container ${this.state.channel === channel ? 'active' : ''}`}>
            <div className="chart-msg">
              {this.state.channel === channel ? this.state.message : ''}
            </div>
            <svg width="125" heigth="100" viewBox="0 0 125 100" preserveAspectRatio="none">
              <g>
                {rectangles}
              </g>
            </svg>
            {this.renderLabels(Object.keys(emoXCoords))}
          </div>
        </section>
      </div>
    );
  }

  renderLabels(keys) {
    return keys.map(key => <span key={key} className={`label label-${key} ${this.state.attr === key ? 'active' : ''}`}>{capitalizeFirstLetter(key)}</span>);
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
  if (!longTermTone.longTermTone) return {};
  return { longTermTone: longTermTone.longTermTone };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopChannels);
