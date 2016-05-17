import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import { getLongTermTone } from '../../actions/index';
import { styles } from './styles.scss';
import { capitalizeFirstLetter } from '../../components/LineGraphComponents/helpers';


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

const delays = {
  anger: 0,
  sadness: 0.15,
  disgust: 0.30,
  fear: 0.45,
  joy: 0.60,
  openness: 0.75,
  conscientiousness: 0.9,
  extraversion: 1.05,
  agreeableness: 1.20,
  neuroticism: 1.35,
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

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
      Object.keys(emoColors).forEach(emo => {
        setTimeout(() => {
          TweenMax.fromTo(`.${emo}-bar`, 2, { opacity: 0, y: 100 }, { opacity: 1, y: 0, delay: delays[emo], ease: Power3.easeInOut });
        }, 250);
      });
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
      count = count.toString().split('').reverse()
      .map((digit, i) => {
        let newDigit = digit;
        if (i && i % 3 === 0) newDigit += ',';
        return newDigit;
      })
      .reverse()
      .join('');
    }

    Object.keys(emos).forEach(emo => {
      const height = emos[emo];
      const yCoord = 100 - height;
      const startXCoord = emoXCoords[emo];
      const color = emoColors[emo];
      const msg = `${height}`

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
            <div className="chart-msg">{this.state.channel === channel ? this.state.message : ''}</div>
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
