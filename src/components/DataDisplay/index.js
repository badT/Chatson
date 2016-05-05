import React, { Component } from 'react';

import DataContainer from '../../containers/DataContainer/DataContainer';

/* component styles */
import { styles } from './styles.scss';

export class DataDisplay extends Component {
  render() {
    return (
      <div className={`${styles}`}>
        <DataContainer socket={this.props.socket}/>
      </div>
    );
  }
}
