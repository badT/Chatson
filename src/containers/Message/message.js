import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/* component styles */
import { styles } from './styles.scss';

export class DataDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      user: null,
      emotes: null
    };
  }

  componentWillMount() {
    this.socket = io();
    this.socket.on('message', this.handleMessage.bind(this));
  }

  handleMessage(msgObj) {
    this.setState({
      message: msgObj.msg,
      user: msgObj.user.username,
      emotes: msgObj.user.emotes
    });
  }

  parseMessage(msg, emotes) {
    let splitText;

    if (emotes) {
      splitText = msg.split('');
      for(let i in emotes) {
        let e = emotes[i];
        for(let j in e) {
          let mote = e[j];
          if(typeof mote === 'string') {
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
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="message-ticker-user">
                <ReactCSSTransitionGroup className="ticker-user" transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={0}>
                  <h4 key={this.state.message}>
                    {this.state.user}
                  </h4>
                </ReactCSSTransitionGroup>
              </div>
              <div className="message-ticker-message">
                <ReactCSSTransitionGroup className="ticker-message" transitionName="carousel" transitionEnterTimeout={300} transitionLeaveTimeout={200}>
                  <h4 key={this.state.user}>
                    {this.renderMessage(this.parseMessage(this.state.message, this.state.emotes))}
                  </h4>
                </ReactCSSTransitionGroup>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Insert Graph Here</h2>
            </div>
          </div>

        </div>
      </section>
    );
  }
}
