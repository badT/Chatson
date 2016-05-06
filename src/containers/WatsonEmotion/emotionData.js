import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LineChart } from 'react-d3-basic';
import gsap from 'gsap';

import { getTone } from '../../actions/index';
// import chartSettings from './emotionChartSettings';

/* component styles */
import { styles } from './styles.scss';

// const emoColors = {
//   anger: '#C2E812',
//   sadness: '#8B9EB7',
//   disgust: '#745296',
//   fear: '#632A50',
//   joy: '#91F5AD',
// };

const emoColors = {
  anger: '#F42602',
  sadness: '#4B74A3',
  disgust: '#772B49',
  fear: '#F9AEB8',
  joy: '#44A5E5',
};

class EmotionDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionData: [],
      lastAnger: 0,
      xCoord: 440,
      emotionPaths: null,
      emotionKey: {
        anger: 0.3,
        sadness: 0.3,
        disgust: 0.3,
        fear: 0.3,
        joy: 0.3,
      },
    };
  }

  componentWillMount() {
    this.props.socket.on('tone:update', toneData => {
      this.props.getTone(toneData);
    });

    // because the incoming data is continuous, need to disable
    // requestAnimationFrame so that moving to a new window doesn't
    // get the data animation out of whack
    TweenMax.ticker.useRAF(false);
    TweenMax.lagSmoothing(0);
  }

  componentWillReceiveProps(props) {
    const currentAnger = props.emotion.anger;
    if (currentAnger !== this.state.lastAnger) {
      const newEmotionData = this.state.emotionData.concat([props.emotion]);
      
      if (newEmotionData.length > 30) {
        newEmotionData.shift();
      }

      const transformedData = this.transformEmotionData(newEmotionData, this.state.xCoord);

      this.setState({
        emotionData: newEmotionData,
        lastAnger: currentAnger,
        xCoord: this.state.xCoord + 40,
        emotionPaths: transformedData.paths,
        emotionKey: transformedData.avgs,
      });

      console.log(this.state.emotionPaths);

      TweenMax.to('#line-container', 3, { x: '-=40', ease: Power0.easeNone });
      TweenMax.to('#anger-splotch', 0.5, { scale: this.state.emotionKey.anger });
      TweenMax.to('#sadness-splotch', 0.5, { scale: this.state.emotionKey.sadness });
      TweenMax.to('#joy-splotch', 0.5, { scale: this.state.emotionKey.joy });
      TweenMax.to('#fear-splotch', 0.5, { scale: this.state.emotionKey.fear });
      TweenMax.to('#disgust-splotch', 0.5, { scale: this.state.emotionKey.disgust });
    }
  }

  transformEmotionData(emotionData, xCoord) {
    if (emotionData.length === 0) return;

    const emos = Object.keys(emotionData[0]).reduce((list, emo) => {
      list[emo] = [];
      return list;
    }, {});

    emotionData.forEach(datum => {
      for (let emo in datum) {
        if (datum.hasOwnProperty(emo)) {
          emos[emo].push(datum[emo]);
        }
      }
    });

    const transformed = {};
    const paths = {};
    const avgs = {};

    for (let emo in emos) {
      if (emo === 'id') continue;
      if (emos.hasOwnProperty(emo)) {
        transformed[emo] = emos[emo].reduceRight((res, reading, i, coll) => {
          if (i === coll.length - 1) {
            res.path += `${res.x} ${100 - reading}`;
          } else {
            if (reading >= coll[i + 1]) {
              res.path += `C ${res.x + 20} ${100 - (coll[i + 1])} ${res.x + 20} ${100 - (reading)} ${res.x} ${100 - reading}`
            } else {
              res.path += `C ${res.x + 20} ${100 - (coll[i + 1])} ${res.x + 20} ${100 - (reading)} ${res.x} ${100 - reading}`
            }
          }
          res.x -= 40;
          res.avg += (reading / coll.length);
          return res;
        }, { path: 'M', x: xCoord, avg: 0 });
      }
    }

    for (let emo in transformed) {
      if (transformed.hasOwnProperty(emo)) {
        paths[emo] = transformed[emo].path;
        avgs[emo] = transformed[emo].avg;
        avgs[emo] = ((Math.round(avgs[emo] * 100) / 100) * 0.0085) + 0.15;
      }
    }

    return { paths, avgs };
  }

  renderLines(paths) {
    if (!paths) return;
    return (
      <g>
        <path stroke={emoColors.anger} fill="none" d={paths.anger} />
        <path stroke={emoColors.disgust} fill="none" d={paths.disgust} />
        <path stroke={emoColors.fear} fill="none" d={paths.fear} />
        <path stroke={emoColors.joy} fill="none" d={paths.joy} />
        <path stroke={emoColors.sadness} fill="none" d={paths.sadness} />
      </g>
    );
  }

  renderKey(emotionKey) {

  }

  render() {
    return (
      <div className={`${styles}`}>
        <div className="row">
          <div className="block-grid-md-5 block-grid-sm-3 block-grid-xs-2">
            <div className="block-grid-item splotch-holder">
              <span id="anger-splotch" className="color-splotch"></span>
              <span className="splotch-label">Anger</span>
            </div>
            <div className="block-grid-item splotch-holder">
              <span id="sadness-splotch" className="color-splotch"></span>
              <span className="splotch-label">Sadness</span>
            </div>
            <div className="block-grid-item splotch-holder">
              <span id="joy-splotch" className="color-splotch"></span>
              <span className="splotch-label">Joy</span>
            </div>
            <div className="block-grid-item splotch-holder">
              <span id="fear-splotch" className="color-splotch"></span>
              <span className="splotch-label">Fear</span>
            </div>
            <div className="block-grid-item splotch-holder">
              <span id="disgust-splotch" className="color-splotch"></span>
              <span className="splotch-label">Disgust</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 line-graph-container">
            <svg width="100%" height="400" viewBox="0 0 400 103" preserveAspectRatio="none">
              <g id="line-container">
                {this.renderLines(this.state.emotionPaths)}
              </g>
              <path stroke="#ddd" fill="none" d="M 0.5 0 l 0 100 z" />
              <path stroke="#ddd" fill="none" d="M 0.5 103 l 0 -3 l 399 0 l 0 3" />
            </svg>
            <span className="x-axis-label start">30 Sec<br/>Ago</span>
            <span className="x-axis-label end">Now</span>
          </div>
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
