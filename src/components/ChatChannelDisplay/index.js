import React, { Component } from 'react';
import DataContainer from '../../containers/DataContainer';

/* component styles */
import { styles } from './styles.scss';

export class ChatChannelDisplay extends Component {
  render() {
    return (
      <div className={`${styles}`}>
        <DataContainer />
      </div>
    );
  }
}
