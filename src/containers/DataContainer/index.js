import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageDisplay from '../MessageDisplay';
import ChannelData from '../ChannelData';
import EmotionDisplay from '../EmotionDisplay';
import SocialDisplay from '../SocialDisplay';

class DataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: {
        message: '',
        user: '',
        emotes: null,
      }
    };
  }

  componentWillMount() {
    this.socket = io();

    this.socket.on('message', data => {
      this.setState({ msg: data });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected === this.props.selected) return;
    // emit unsubscribe message
    if (this.props.selected) {
      console.log('Unsubscribing from: ', this.props.selected);
      this.socket.emit('channel:unsubscribe', this.props.selected);
    }

    // emit subscribe message
    if (nextProps.selected) {
      console.log('Subscribing to: ', nextProps.selected);
      this.socket.emit('channel:subscribe', nextProps.selected);
    }
  }

  render() {
    return (
      <div key={this.props.selected}>
        <MessageDisplay msg={this.state.msg} />
        <section>
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead>
                  <tr>
                    <th><h2>Emotional Attributes</h2></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <EmotionDisplay />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section>
          <div className="row">
            <div className="col-md-6">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Social Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <SocialDisplay />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <ChannelData message={this.state.msg.msg} />
        <div>Selected Channel: {this.props.selected}</div>
      </div>
    );
  }
}

function mapStateToProps({ channels }) {
  return { selected: channels.selected };
}

export default connect(mapStateToProps)(DataContainer);
