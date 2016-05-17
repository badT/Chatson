import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import { getChannels, setChannel, unsetChannel } from '../../actions/index';
import Logo from '../../components/Logo/index';
/* component styles */
import { styles } from './styles.scss';

class ChannelDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      animating: false,
    };
  }

  componentWillMount() {
    this.props.getChannels();
  }

  toggleDrawer() {
    if (this.state.animating) return;
    this.setState({ animating: true });

    if (this.state.drawerOpen) {
      this.drawerAnim().close();
      setTimeout(() => {
        this.setState({ animating: false, drawerOpen: false });
      }, 600);
    } else {
      this.setState({ drawerOpen: true });
      this.drawerAnim().open();
      setTimeout(() => {
        this.setState({ animating: false });
      }, 600);
    }
  }

  drawerAnim() {
    const open = () => {
      TweenMax.to('#drawer_overlay', 0.6, { css: { 'background-color': 'rgba(0,0,0,0.6)' } });
      TweenMax.to('#drawer', 0.6, { x: '0%' });
      /* animate hamburger icon */
      TweenMax.to('#brg_top', 0.5, { rotation: 150, y: 4, x: 12 });
      TweenMax.to('#brg_btm', 0.5, { rotation: -150, y: -4, x: 12 });
      TweenMax.to('#brg_mid', 0.5, { rotation: 90, y: -7, x: 0 });
    };

    const close = () => {
      TweenMax.to('#drawer_overlay', 0.6, { css: { 'background-color': 'rgba(0,0,0,0)' } });
      TweenMax.to('#drawer', 0.6, { x: '101%' });
      /* animate hamburger icon */
      TweenMax.to('#brg_top', 0.5, { rotation: 0, y: 0, x: 0 });
      TweenMax.to('#brg_btm', 0.5, { rotation: 0, y: 0, x: 0 });
      TweenMax.to('#brg_mid', 0.5, { rotation: 0, y: 0, x: 0 });
    };

    return { open, close };
  }

  linkClickHandler(name) {
    if (this.props.channels.selected !== name) {
      this.props.setChannel(name);
      this.toggleDrawer();
    }
  }

  logoClickHandler() {
    if (this.state.drawerOpen) this.toggleDrawer();
    this.props.unsetChannel();
  }

  renderChannels(channelData) {
    const name = channelData.channel.name;
    return (
      <Link
        key={name}
        className={`drawer-link ${this.props.channels.selected === name ? 'drawer-link-active' : ''}`}
        to="/chat"
        onClick={() => this.linkClickHandler(name)}
      >
        {name}
      </Link>
    );
  }

  render() {
    return (
      <div className={`${styles}`}>
        {/* Hamburger Icon */}
        <span className="burger-holder" onClick={() => this.toggleDrawer()}>
          <svg className="burger" width="14" height="8" viewBox="-2 -2 18 12">
            <line className="burger-line" id="brg_top" x1="0" y1="0" x2="14" y2="0" />
            <line className="burger-line" id="brg_mid" x1="0" y1="4" x2="14" y2="4" />
            <line className="burger-line" id="brg_btm" x1="0" y1="8" x2="14" y2="8" />
          </svg>
        </span>

        {/* Logo Link */}
        <Link to="/" className="logo" onClick={() => this.logoClickHandler()}>
          {/* Logo component */}
          <Logo />
        </Link>

        {/* Dropdown Menu Overlay BG */}
        <div
          className={`drawer-overlay ${this.state.drawerOpen ? 'drawer-open' : ''}`}
          id="drawer_overlay"
          onClick={() => this.toggleDrawer()}
        ></div>

        {/* Dropdown Menu */}
        <div className="drawer" id="drawer">
          <h4 className="about-link">
            <Link to="/about" onClick={() => this.toggleDrawer()}>About Chatson</Link>
          </h4>
          <h4 className="channel-list-header">Active Chat Channels</h4>
          {this.props.channels.list.map(this.renderChannels, this)}
        </div>
      </div>
    );
  }
}

ChannelDropdown.propTypes = {
  getChannels: React.PropTypes.func,
  setChannel: React.PropTypes.func,
  unsetChannel: React.PropTypes.func,
  channels: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getChannels, setChannel, unsetChannel }, dispatch);
}

function mapStateToProps({ channels }) {
  return { channels };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDropdown);
