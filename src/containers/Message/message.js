import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getMessage } from '../../actions/index';

/* component styles */
import { styles } from './styles.scss';

class MessageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { blurClass: 'row blurred' };
  }

  componentWillMount() {
    this.props.socket.on('message', data => {
      this.props.getMessage(data);
    });
  }

  toggleBlur() {
    if (this.state.blurClass === 'row') {
      this.setState({ blurClass: 'row blurred' });
    } else {
      this.setState({ blurClass: 'row' });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedChannel === this.props.selectedChannel) return;
    // emit unsubscribe message
    if (this.props.selectedChannel) {
      this.props.socket.emit('channel:unsubscribe', this.props.selectedChannel);
    }
    // emit subscribe message
    this.props.socket.emit('channel:subscribe', nextProps.selectedChannel);
  }

  parseMessage(msg, emotes) {
    let splitText;

    if (emotes) {
      splitText = msg.split('');
      for (let i in emotes) {
        let e = emotes[i];
        for (let j in e) {
          let mote = e[j];
          if (typeof mote === 'string') {
            mote = mote.split('-');
            mote = [parseInt(mote[0]), parseInt(mote[1])];
            let length =  mote[1] - mote[0];
            let empty = Array.apply(null, new Array(length + 1)).map(function() { return '' });
            splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
            splitText.splice(mote[0], 1, parseInt(i));
          }
        }
      }
      msg = splitText.reduce((msgArr, char, i) => {
        if (typeof char == 'number') {
          msgArr[msgArr.length] = parseInt(char);
        } else {
          if (typeof msgArr[msgArr.length - 1] == 'number') {
            msgArr[msgArr.length] = char;
          } else {
            msgArr[msgArr.length - 1] += char;
          }
        }
        return msgArr;
      }, ['']);
    } else {
      msg = [msg];
    }
    return msg;
  }

  renderMessage(msg) {
    return msg.map((chunk) => {
      if (typeof chunk === 'number') {
        return (
          <img className="emoticon" src={`http://static-cdn.jtvnw.net/emoticons/v1/${chunk}/3.0`} />
        );
      } else {
        return (
          <span>{chunk}</span>
        );
      }
    });
  }

  render() {
    return (
      <section className={`${styles}`}>
        <span>{this.props.selectedChannel}</span>
        <button className="btn btn-danger pull-right" onClick={this.toggleBlur.bind(this)}>Toggle Blur</button>
        <div className={this.state.blurClass}>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="message-ticker-user">
              <ReactCSSTransitionGroup className="ticker-user" transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={0}>
                <h4 key={this.props.message}>
                  {this.props.user}
                </h4>
              </ReactCSSTransitionGroup>
            </div>
            <div className="message-ticker-message">
              <ReactCSSTransitionGroup className="ticker-message" transitionName="carousel" transitionEnterTimeout={300} transitionLeaveTimeout={200}>
                <h4 key={this.props.user}>
                  {this.renderMessage(this.parseMessage(this.props.message, this.props.emotes))}
                </h4>
              </ReactCSSTransitionGroup>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMessage }, dispatch);
}

function mapStateToProps({ message, channels }) {
  if (message.user) {
    return {
      message: message.msg,
      user: message.user.username,
      emotes: message.user.emotes,
      selectedChannel: channels.selected
    };
  }
  return { noMessage: message, selectedChannel: channels.selected };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDisplay);
