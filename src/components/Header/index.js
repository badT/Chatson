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
            <div className="col-xs-5 col-sm-3 col-md-3 col-lg-3 logo">
              <Link to="/">
                Twitch Chat Visualizer
              </Link>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 hidden-xs text-right">
              <ChannelDropdown socket={this.props.socket}/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
