import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getChannels, setChannel } from '../../actions/index';

class ChannelDropdown extends Component {
  componentWillMount() {
    this.props.getChannels();
  }

  renderChannels(channelData) {
    const name = channelData.channel.name;
    return (
      <li key={name} onClick={() => this.props.setChannel(name)}>{name}</li>
    );
  }

  render() {
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Top Channels <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {this.props.channels.list.map(this.renderChannels, this)}
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getChannels, setChannel }, dispatch);
}

function mapStateToProps({ channels }) {
  return { channels };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDropdown);
