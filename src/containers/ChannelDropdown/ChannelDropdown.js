import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getChannels, setChannel } from '../../actions/index';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

class ChannelDropdown extends Component {
  componentWillMount() {
    this.props.getChannels();
    console.log('DROPDOWN PROPS: ', this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channels.selected === this.props.channels.selected) return;
    // emit unsubscribe message
    if (this.props.channels.selected) {
      this.props.socket.emit('channel:unsubscribe', this.props.channels.selected);
    }

    // emit subscribe message
    if (nextProps.channels.selected) {
      this.props.socket.emit('channel:subscribe', nextProps.channels.selected);
    }
  }

  renderChannels(channelData) {
    const name = channelData.channel.name;
    return (
      <li key={name} className="dropdown-menu-item" onClick={() => this.props.setChannel(name)}>
        <Link className="dropdown-menu-link" to="/chat">{name}</Link>
      </li>
    );
  }

  render() {
    return (
      <div className={`${styles}`}>
        <div className="btn-group">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Top Channels <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {this.props.channels.list.map(this.renderChannels, this)}
          </ul>
        </div>
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
