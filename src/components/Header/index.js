import React from 'react';
import ChannelDropdown from '../../containers/ChannelDropdown';
import { styles } from './styles.scss';

export function Header() {
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
