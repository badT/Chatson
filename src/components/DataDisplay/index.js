import React, { Component } from 'react';

import MessageDisplay from '../../containers/Message/message';
import ChannelData from '../../containers/ChannelData/channelData';
import EmotionDisplay from '../../containers/WatsonEmotion/emotionData';
import SocialDisplay from '../../containers/WatsonSocial/socialData';

/* component styles */
import { styles } from './styles.scss';

export class DataDisplay extends Component {
  render() {
    return (
      <div>
        <MessageDisplay socket={this.props.socket} />
        <section>
          <div className="row">
            <div className="col-md-6">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Emotional Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <EmotionDisplay socket={this.props.socket} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Social Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <SocialDisplay />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <ChannelData socket={this.props.socket} />
      </div>
    );
  }
}
