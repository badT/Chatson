import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/* component styles */
import { styles } from './styles.scss';

export default class MessageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blurClass: 'row blurred',
      blurBtn: 'Show Chat',
      blurMsg: 'Twitch channel chats can be scary places. Unblur at your own risk!'
    };
  }

  toggleBlur() {
    if (this.state.blurClass === 'row') {
      this.setState({
        blurClass: 'row blurred',
        blurBtn: 'Show Chat',
        blurMsg: 'Twitch channel chats can be scary places. Unblur at your own risk!'
      });
    } else {
      this.setState({
        blurClass: 'row',
        blurBtn: 'Blur Chat',
        blurMsg: ''
      });
    }
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

  mapMessage(msg) {
    if (!msg) return;
    return msg.map((chunk) => {
      const rand = parseInt(Math.random() * 1000000);
      if (typeof chunk === 'number') {
        return (
          <img className="emoticon" key={rand} src={`http://static-cdn.jtvnw.net/emoticons/v1/${chunk}/3.0`} />
        );
      } else {
        return (
          <span key={rand}>{chunk}</span>
        );
      }
    });
  }

  renderUser(user) {
    return (
      <h4 key={user}>
        {user}
      </h4>
    );
  }

  renderMessage(user, msg) {
    return (
      <h4 key={user}>
        {msg}
      </h4>
    );
  }

  render() {
    return (
      <section className={`${styles}`}>
        <div className="row">
          <div className="col-sm-6">
            <h2 className="channel-name">{this.props.channel}</h2>
          </div>
          <div className="col-sm-6 text-right">
            <span>{this.state.blurMsg}&nbsp;&nbsp;</span><button className="btn btn-danger" onClick={this.toggleBlur.bind(this)}>{this.state.blurBtn}</button>
          </div>
        </div>
        <div className={`row ${this.state.blurClass}`}>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="message-ticker-user">
              <ReactCSSTransitionGroup className="ticker-user" transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={0}>
                {this.renderUser(this.props.msg.user.username)}
              </ReactCSSTransitionGroup>
            </div>
            <div className="message-ticker-message">
              <ReactCSSTransitionGroup className="ticker-message" transitionName="carousel" transitionEnterTimeout={300} transitionLeaveTimeout={200}>
                {this.renderMessage(this.props.user, this.mapMessage(this.parseMessage(this.props.msg.msg, this.props.msg.user.emotes)))}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
