import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ChannelData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msgCount: 0,
      msgPerMin: 0,
      charCount: 0,
      avgLength: 0,
      lastMsg: '',
      time: new Date(),
    };
  }

  componentWillReceiveProps(props) {
    let newCount;
    let newAvgLength;
    let newCharCount;
    const elapsedMinutes = (Math.abs(new Date() - this.state.time)) / 60000;

    if (this.state.lastMsg !== props.message) {
      newCount = this.state.msgCount + 1;
      newCharCount = this.state.charCount + props.message.length;
      newAvgLength = newCharCount / newCount;
    } else {
      newCount = this.state.msgCount;
      newCharCount = this.state.charCount;
      newAvgLength = this.state.avgLength;
    }
    const newMsgPerMin = newCount / elapsedMinutes;

    this.setState({
      msgCount: newCount,
      msgPerMin: newMsgPerMin,
      charCount: newCharCount,
      avgLength: newAvgLength,
      lastMsg: props.message,
    });
  }

  render() {
    return (
      <div>
        <ul>
          <li>Channel: {this.props.channel}</li>
          <li>Messages per minute: {this.state.msgPerMin}</li>
          <li>Average message length: {this.state.avgLength}</li>
          <li>Total Messages since arrival: {this.state.msgCount}</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ message }) {
  if (message.user) {
    return {
      channel: message.channel,
      message: message.msg,
      user: message.user.username,
      emotes: message.user.emotes,
    };
  }
  return { noMessage: message };
}

export default connect(mapStateToProps)(ChannelData);
