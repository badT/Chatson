import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../../components/Chart/index';

export class ChannelData extends Component {

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
    };
  }

  componentDidMount() {
    setInterval(() => { this.msgRateEveryMinute(); }, 60000);
    setInterval(() => { this.msgRateEverySecond(); }, 1000);
  }

  componentWillReceiveProps(props) {
    this.calculateAverages(props);
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
    const elapsedMinutes = (Math.abs(new Date() - this.state.time)) / 60000;
    const elapsedSeconds = (Math.abs(new Date() - this.state.time)) / 1000;

    if (this.state.lastMsg !== props.message) {
      newCount = this.state.currentMsgCount + 1;
      newCharCount = this.state.charCount + props.message.length;
      newAvgLength = newCharCount / newCount;
    } else {
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
    });
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="col-md-4 col-md-push-8">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Average message length: {Math.round(this.state.avgLength)}</th>
                </tr>
                <tr>
                  <th>Last message length: {this.state.lastMsg.length}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Chart data={this.state.msgLengthArray} color="blue" limit={200} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Average Messages per Second: {(this.state.avgMsgPerSec).toFixed(2)}</th>
                </tr>
                <tr>
                  <th>Last second's total: {this.state.lastSecTotal}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Chart data={this.state.msgPerSecArray} color="green" limit={60} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4 col-md-pull-8">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Average Messages per Minute: {Math.round(this.state.avgMsgPerMin)}</th>
                </tr>
                <tr>
                  <th>Last minute's total: {this.state.lastMinTotal}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Chart data={this.state.msgPerMinArray} color="red" limit={60} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <ul>
            <li>Channel: {this.props.selectedChannel}</li>
            <li>Total Messages since arrival: {this.state.currentMsgCount}</li>
          </ul>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ message, channels }) {
  if (message.user) {
    return {
      message: message.msg,
      user: message.user.username,
      emotes: message.user.emotes,
      selectedChannel: channels.selected,
    };
  }
  return { noMessage: message };
}

export default connect(mapStateToProps)(ChannelData);
