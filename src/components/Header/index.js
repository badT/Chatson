import React, { Component } from 'react';
import { Link } from 'react-router';

import ChannelDropdown from '../../containers/ChannelDropdown/ChannelDropdown';

/* component styles */
import { styles } from './styles.scss';

export class Header extends Component {
  render() {
    return (
      <header className={`${styles}`}>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <Link to="/" className="logo">
                <h1>Twitch Chat Visualizer</h1>
              </Link>
            </div>

            <div className="col-sm-6 channel-dropdown-container">
              <ChannelDropdown socket={this.props.socket}/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
