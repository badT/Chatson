import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageDisplay from '../Message/message';
import ChannelData from '../ChannelData/channelData';
import EmotionDisplay from '../WatsonEmotion/emotionData';
import SocialDisplay from '../WatsonSocial/socialData';

class DataContainer extends Component {
  render() {
    return (
      <div key={this.props.selected}>
        <MessageDisplay socket={this.props.socket}/>
        <section>
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th><h2>Emotional Attributes</h2></th>
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
          </div>
        </section>
        <section>
          <div className="row">
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
        <ChannelData socket={this.props.socket}/>
        <div>Selected Channel: {this.props.selected}</div>
      </div>
    );
  }
}

function mapStateToProps({ channels }) {
  return { selected: channels.selected };
}

export default connect(mapStateToProps)(DataContainer);
