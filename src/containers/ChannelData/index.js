import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SparklineChart from '../../components/SparklineChart';
import { getTone, unsetTone } from '../../actions/index';

/* component styles */
import { styles } from './styles.scss';

class ChannelData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentMsgCount: 0,
      prevMinMsgCount: 0,
      prevSecMsgCount: 0,
      avgMsgPerMin: 0,
      avgMsgPerSec: 0,
      charCount: 0,
      avgLength: 0,
      lastMsg: '',
      time: new Date(),
      msgPerMinArray: [],
      msgLengthArray: [],
      msgPerSecArray: [],
      lastMinTotal: 0,
      lastSecTotal: 0,
      watsonString: '',
    };
  }

  componentDidMount() {
    this.minuteInt = setInterval(() => { this.msgRateEveryMinute(); }, 60000);
    this.secondInt = setInterval(() => { this.msgRateEverySecond(); }, 1000);
    this.watsonInt = setInterval(() => {
      if (this.state.watsonString.length) {
        const currentWatsonString = this.state.watsonString;
        this.setState({ watsonString: '' });
        this.props.getTone(currentWatsonString);
      } else {
        this.props.unsetTone();
      }
    }, 3000);
  }


  componentWillReceiveProps(props) {
    this.calculateAverages(props);
  }

  componentWillUnmount() {
    clearInterval(this.minuteInt);
    clearInterval(this.secondInt);
    clearInterval(this.watsonInt);
  }

  msgRateEveryMinute() {
    const newCurrentCount = this.state.currentMsgCount;
    const lastMinMsgCount = newCurrentCount - this.state.prevMinMsgCount;
    const newMsgPerMinArray = this.state.msgPerMinArray.concat([lastMinMsgCount]);
    if (newMsgPerMinArray.length > 60) {
      newMsgPerMinArray.shift();
    }
    this.setState({
      prevMinMsgCount: newCurrentCount,
      msgPerMinArray: newMsgPerMinArray,
      lastMinTotal: lastMinMsgCount,
    });
  }

  msgRateEverySecond() {
    const newCurrentCount = this.state.currentMsgCount;
    const lastSecMsgCount = newCurrentCount - this.state.prevSecMsgCount;
    const newMsgPerSecArray = this.state.msgPerSecArray.concat([lastSecMsgCount]);
    if (newMsgPerSecArray.length > 60) {
      newMsgPerSecArray.shift();
    }
    this.setState({
      prevSecMsgCount: newCurrentCount,
      msgPerSecArray: newMsgPerSecArray,
      lastSecTotal: lastSecMsgCount,
    });
  }

  calculateAverages(props) {
    let newCount;
    let newAvgLength;
    let newCharCount;
    let newWatsonString;
    const elapsedMinutes = (Math.abs(new Date() - this.state.time)) / 60000;
    const elapsedSeconds = (Math.abs(new Date() - this.state.time)) / 1000;

    if (this.state.lastMsg !== props.message) {
      newWatsonString = this.state.watsonString.concat(props.message);
      newCount = this.state.currentMsgCount + 1;
      newCharCount = this.state.charCount + props.message.length;
      newAvgLength = newCharCount / newCount;
    } else {
      newWatsonString = this.state.watsonString;
      newCount = this.state.currentMsgCount;
      newCharCount = this.state.charCount;
      newAvgLength = this.state.avgLength;
    }
    const newMsgPerMin = newCount / elapsedMinutes;
    const newMsgPerSec = newCount / elapsedSeconds;
    const newMsgLengthArray = this.state.msgLengthArray.concat([props.message.length]);

    if (newMsgLengthArray.length > 200) {
      newMsgLengthArray.shift();
    }
    this.setState({
      currentMsgCount: newCount,
      avgMsgPerMin: newMsgPerMin,
      avgMsgPerSec: newMsgPerSec,
      charCount: newCharCount,
      avgLength: newAvgLength,
      lastMsg: props.message,
      msgLengthArray: newMsgLengthArray,
      watsonString: newWatsonString,
    });
  }

  render() {
    return (
      <section className={`${styles}`}>
        <div className="row">
          <div className="col-md-4 col-md-push-8">
            <section className="msg-data">
              <h5>Average message length: {Math.round(this.state.avgLength)}</h5>
              <h5>Last message length: {this.state.lastMsg.length}</h5>
              <div className="msg-chart"><SparklineChart data={this.state.msgLengthArray} color="blue" limit={200} /></div>
            </section>
          </div>
          <div className="col-md-4">
            <section className="msg-data">
              <h5>Average Messages per Second: {(this.state.avgMsgPerSec).toFixed(2)}</h5>
              <h5>Last second's total: {this.state.lastSecTotal}</h5>
              <div className="msg-chart"><SparklineChart data={this.state.msgPerSecArray} color="green" limit={60} /></div>
            </section>
          </div>
          <div className="col-md-4 col-md-pull-8">
            <section className="msg-data">
              <h5>Average Messages per Minute: {Math.round(this.state.avgMsgPerMin)}</h5>
              <h5>Last minute's total: {this.state.lastMinTotal}</h5>
              <div className="msg-chart"><SparklineChart data={this.state.msgPerMinArray} color="red" limit={60} /></div>
            </section>
          </div>
        </div>
        <div className="row">
          <span>Total Messages since arrival: {this.state.currentMsgCount}</span>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTone, unsetTone }, dispatch);
}

export default connect(null, mapDispatchToProps)(ChannelData);
