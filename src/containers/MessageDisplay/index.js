import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export default class MessageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blurClass: 'row blurred',
      blurBtn: 'Show Chat',
      blurMsg: 'Twitch channel chats can be scary places. Unblur at your own risk!',
    };
  }

  toggleBlur() {
    if (this.state.blurClass === 'row') {
      this.setState({
        blurClass: 'row blurred',
        blurBtn: 'Show Chat',
        blurMsg: 'Twitch channel chats can be scary places. Unblur at your own risk!',
      });
    } else {
      this.setState({
        blurClass: 'row',
        blurBtn: 'Blur Chat',
        blurMsg: '',
      });
    }
  }

  parseMessage(msg, emotes) {
    let splitText;

    if (emotes) {
      splitText = msg.split('');
      Object.keys(emotes).forEach(i => {
        const e = emotes[i];
        Object.keys(e).forEach(j => {
        // for (let j in e) {
          let mote = e[j];
          if (typeof mote === 'string') {
            mote = mote.split('-');
            mote = [parseInt(mote[0], 10), parseInt(mote[1], 10)];
            const length = mote[1] - mote[0];
            const empty = Array.apply(null, new Array(length + 1)).map(() => '');
            splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
            splitText.splice(mote[0], 1, parseInt(i, 10));
          }
        });
      });
      return splitText.reduce((msgArr, char) => {
        if (typeof char === 'number') {
          msgArr.push(parseInt(char, 10));
        } else {
          if (typeof msgArr[msgArr.length - 1] === 'number') {
            msgArr.push(char);
          } else {
            const newEntry = msgArr[msgArr.length - 1] + char;
            return msgArr.slice(0, msgArr.length - 1).concat([newEntry]);
          }
        }
        return msgArr;
      }, ['']);
    }
    return [msg];
  }

  mapMessage(msg) {
    if (!msg) return false;
    return msg.map((chunk) => {
      const rand = parseInt(Math.random() * 1000000, 10);
      if (typeof chunk === 'number') {
        return (
          <img className="emoticon" key={rand} src={`http://static-cdn.jtvnw.net/emoticons/v1/${chunk}/3.0`} alt="Emoticon" />
        );
      }
      return (
        <span key={rand}>{chunk}</span>
      );
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
        <div className="row message-top-row">
          <div className="col-sm-4">
            <h2 className="channel-name">{this.props.channel}</h2>
          </div>
          <div className="col-sm-8 text-right">
            <span>{this.state.blurMsg}&nbsp;&nbsp;</span>
            <button className="btn btn-danger" onClick={() => this.toggleBlur()}>{this.state.blurBtn}</button>
          </div>
        </div>
        <div className={`row ${this.state.blurClass}`}>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="message-ticker-user">
              <div className="ticker-user">
                {this.renderUser(this.props.msg.user.username)}
              </div>
            </div>
            <div className="message-ticker-message">
              <div className="ticker-message">
                {this.renderMessage(this.props.user, this.mapMessage(this.parseMessage(this.props.msg.msg, this.props.msg.user.emotes)))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

MessageDisplay.propTypes = {
  channel: React.PropTypes.string,
  msg: React.PropTypes.object,
  user: React.PropTypes.string,
};
