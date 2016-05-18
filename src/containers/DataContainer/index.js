import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageDisplay from '../MessageDisplay';
import ChannelData from '../ChannelData';
import LineGraph from '../LineGraph';

// reference to socket.io connection
const io = window.io;

class DataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: {
        message: '',
        user: '',
        emotes: null,
      },
    };
  }

  componentWillMount() {
    this.socket = io();
    this.socket.on('message', data => {
      this.setState({ msg: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected === this.props.selected) return;
    // emit unsubscribe message
    if (this.props.selected) {
      this.socket.emit('channel:unsubscribe', this.props.selected);
    }
    // emit subscribe message
    if (nextProps.selected) {
      this.socket.emit('channel:subscribe', nextProps.selected);
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div key={this.props.selected}>
        <MessageDisplay msg={this.state.msg} channel={this.props.selected} />
        <LineGraph />
        <ChannelData message={this.state.msg.msg} />
      </div>
    );
  }
}

DataContainer.propTypes = {
  selected: React.PropTypes.string,
};

function mapStateToProps({ channels }) {
  return { selected: channels.selected };
}

export default connect(mapStateToProps)(DataContainer);
