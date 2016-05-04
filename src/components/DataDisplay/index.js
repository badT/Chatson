import React, { Component } from 'react';

import MessageDisplay from '../../containers/Message/message';
import ChannelData from '../../containers/ChannelData/channelData';

/* component styles */
import { styles } from './styles.scss';

export class DataDisplay extends Component {
  render() {
    return (
      <div>
        <MessageDisplay socket={this.props.socket}/>
        <ChannelData socket={this.props.socket}/>
      </div>
    );
  }
}
