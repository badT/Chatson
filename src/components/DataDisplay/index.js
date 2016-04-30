import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/* component styles */
import { styles } from './styles.scss';

export class DataDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      message: null,
      user: null
    };
  }

  componentWillMount() {
    this.socket = io();
    this.socket.on('message', this.handleMessage.bind(this));
  }

  handleMessage(msgObj) {
    console.log('msg received');
    this.setState({ 
      message: msgObj.message,
      user: msgObj.user
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
                    {this.state.message}
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
