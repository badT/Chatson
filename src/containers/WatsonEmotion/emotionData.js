import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-d3-basic';
import gsap from 'gsap';

import chartSettings from './emotionChartSettings';
/* component styles */
import { styles } from './styles.scss';

class EmotionDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionData: [],
      lastAnger: 0,
      xCoord: 400,
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
        xCoord: this.state.xCoord + 40,
      });

      TweenMax.to('#line-container', 3, { x: '-=40', ease: Power0.easeNone });
    }
  }

  renderLines(emotionData, xCoord) {
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

    const paths = {};

    for (let emo in emos) {
      if (emos.hasOwnProperty(emo)) {
        paths[emo] = emos[emo].reduceRight((res, reading, i, coll) => {
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
          return res;
        }, { path: 'M', x: xCoord });
      }
    }

    console.log(paths);

    return (
      <g>
        <path stroke="#FF0000" fill="none" d={paths.anger.path}></path>
        <path stroke="#A52A2A" fill="none" d={paths.disgust.path}></path>
        <path stroke="#FF8000" fill="none" d={paths.fear.path}></path>
        <path stroke="#800080" fill="none" d={paths.joy.path}></path>
        <path stroke="#0000FF" fill="none" d={paths.sadness.path}></path>
      </g>
    );
  }

  render() {
    return (
      <div className={`${styles}`}>
        <div className="row">
          <div className="col-lg-12 line-graph-container">
            <svg width="100%" height="400" viewBox="0 0 400 103" preserveAspectRatio="none">
              <g id="line-container">
                {this.renderLines(this.state.emotionData, this.state.xCoord)}
              </g>
              <path stroke="#000" fill="none" d="M 0.5 0 l 0 100 z"></path>
              <path stroke="#000" fill="none" d="M 0.5 103 l 0 -3 l 399 0 l 0 3"></path>
            </svg>
            <span className="x-axis-label start">30 Sec<br/>Ago</span>
            <span className="x-axis-label end">Now</span>
          </div>
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
