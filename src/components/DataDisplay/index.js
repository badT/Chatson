import React, { Component } from 'react';

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
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <h2>
                {this.state.message}
              </h2>
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
