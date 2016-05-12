import React, { Component } from 'react';
import { Link } from 'react-router';
import ChannelDropdown from '../../containers/ChannelDropdown';

/* component styles */
import { styles } from './styles.scss';

export class Header extends Component {
  render() {
    return (
      <header className={`${styles}`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <ChannelDropdown />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
