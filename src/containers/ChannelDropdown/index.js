import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getChannels, setChannel, unsetChannel } from '../../actions/index';
import { Link } from 'react-router';
import TweenMax from 'gsap/src/minified/TweenMax.min';
import TimelineMax from 'gsap/src/minified/TimelineMax.min';

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

  componentDidMount() {
    this.logoAnimate();
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


  logoAnimate() {
    const logo = new TimelineMax;
    const hatson = new TimelineMax;

    logo.to('#mouth', 2, { delay: 2, rotation: 270, x: 5, y: -4, transformOrigin: '10px 5px' })
        .to('#left_eye', 2, { rotation: 90, x: 40.9, y: -6 }, '-=2')
        .to('#right_eye', 2, { rotation: 90, x: 18, y: 19 }, '-=2')
        .to('#left_ball', 2, { rotation: 90, x: 37, y: -4 }, '-=2')
        .to('#right_ball', 2, { rotation: 90, x: 14, y: 20 }, '-=2')
        .to('#left_ball', 0.75, { opacity: 0, x: 45, y: -20 }, '-=1.15')
        .to('#right_ball', 0.75, { opacity: 0, x: 20, y: 40 }, '-=0.8')
        .duration(4);

    hatson.to('#hhh', 0, { scale: 0.25 })
        .to('#aaa', 0, { scale: 0.25 })
        .to('#ttt', 0, { scale: 0.25 })
        .to('#sss', 0, { scale: 0.25 })
        .to('#ooo', 0, { scale: 0.25 })
        .to('#nnn', 0, { scale: 0.25 })
        .to('#hhh', 0.75, { delay: 2, opacity: 100, scale: 1.8, y: 4 })
        .to('#aaa', 0.75, { opacity: 100, scale: 1.7, x: 12, y: 3 }, '-=0.5')
        .to('#ttt', 0.75, { opacity: 100, scale: 1.7, x: 22, y: -0.65 }, '-=0.5')
        .to('#sss', 0.75, { opacity: 100, scale: 1.7, x: 32, y: 3 }, '-=0.5')
        .to('#ooo', 0.75, { opacity: 100, scale: 1.7, x: 42, y: 3 }, '-=0.5')
        .to('#nnn', 0.75, { opacity: 100, scale: 1.7, x: 54, y: 3 }, '-=0.5')
        .duration(4);
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
          <span className="logo-holder">
            <svg className="logo" width="60" height="60" viewBox="-2 -2 64 74">
              <line id="left_eye" fill="none" stroke="#ffffff" strokeWidth="3" stroke-miterlimit="10" x1="12.5" y1="8.9" x2="24.3" y2="8.9" />
              <line id="right_eye" fill="none" stroke="#ffffff" strokeWidth="3" stroke-miterlimit="10" x1="35.8" y1="8.9" x2="47.7" y2="8.9" />
              <path
                id="left_ball" fill="#FF1D25" stroke="#FF1D25" strokeWidth="1.35" stroke-miterlimit="10" d="M14.9,10.3c0,1.9,1.4,3.5,3,3.8
                c1.9,0.3,4.1-1.4,4.1-3.8"
              />
              <path
                id="right_ball" fill="#FF1D25" stroke="#FF1D25" strokeWidth="1.35" stroke-miterlimit="10" d="M38.1,10.3c0,1.9,1.4,3.5,3,3.8
               c1.9,0.3,4.1-1.4,4.1-3.8"
              />
              <path
                id="mouth" fill="none" stroke="#ffffff" strokeWidth="5" stroke-miterlimit="10" d="M46.1,47.6c0.3-1.3,1.2-5.4-0.7-9.9
                c-1.7-4.2-4.9-6.4-5.8-7.1c-0.6-0.4-1.7-1.2-3.6-1.9c-0.7-0.3-3.6-1.3-7.4-1c-1.3,0.1-4.6,0.4-8,2.5c-1,0.6-3.2,2-4.9,4.6
                c-1.6,2.3-1.9,4.5-2.2,5.7c-0.6,3-0.3,5.7,0.1,7.2"
              />
            </svg>
            <span>
              <svg className="hatson" width="124.5" height="60" viewBox="0 0 200 100">
                <g className="letters">
                  <path
                    id="hhh"
                    opacity="0"
                    fill="none" stroke="#FF1D25" strokeWidth="2" stroke-miterlimit="10" d="M12.7,26.6c0.3-0.5,0.7-1.2,1.5-1.8
                    c0.8-0.6,1.5-0.9,2.1-1c1.2-0.3,2.1-0.3,2.6-0.3c0.6,0,1.5,0.1,2.5,0.6c0.4,0.2,1.1,0.5,1.7,1.2c0.2,0.2,0.7,0.8,1,1.7
                    c0.2,0.6,0.3,1.1,0.3,1.4c0.1,0.4,0.1,0.8,0.1,1.1c0,0.2,0,0.4,0,1.1c0,0.4,0,0.6,0,1c0,0.1,0,0.3,0,0.6c0,0.4,0,0.7,0,0.9
                    c0,0.6,0,0.8,0,1.5c0,0.7,0,1.2,0,1.6c0,0.8,0,2,0,4"
                  />
                  <path
                    id="aaa"
                    opacity="0"
                    fill="#FF1D25" stroke="#FF1D25"
                    d="M42.2,36.9c0,0.6,0,1.3,0.1,2c0.1,0.7,0.1,1.3,0.2,1.8h-0.8c0-0.2-0.1-0.5-0.1-0.9c0-0.4-0.1-0.7-0.1-1.1
                    c0-0.4-0.1-0.8-0.1-1.1c0-0.4,0-0.7,0-0.9h-0.1c-0.5,1.5-1.3,2.7-2.5,3.4c-1.2,0.7-2.5,1.1-3.9,1.1c-0.7,0-1.4-0.1-2-0.3
                    c-0.7-0.2-1.3-0.5-1.8-0.9c-0.5-0.4-1-0.9-1.3-1.5c-0.3-0.6-0.5-1.3-0.5-2.2c0-1.2,0.3-2.2,0.9-2.9c0.6-0.7,1.4-1.3,2.3-1.7
                    c0.9-0.4,1.9-0.7,3-0.8c1.1-0.1,2-0.2,2.9-0.2h3v-1.4c0-1.9-0.5-3.3-1.5-4.1c-1-0.9-2.3-1.3-3.9-1.3c-1,0-2,0.2-2.8,0.6
                    c-0.9,0.4-1.7,0.9-2.3,1.5l-0.4-0.6c0.8-0.7,1.7-1.2,2.7-1.6c1-0.4,2-0.5,2.9-0.5c1.9,0,3.5,0.5,4.6,1.5c1.1,1,1.7,2.6,1.7,4.7
                    V36.9z M41.4,31.5h-2.6c-0.9,0-1.9,0.1-3,0.2c-1,0.1-2,0.3-2.8,0.7c-0.9,0.3-1.6,0.8-2.1,1.5c-0.6,0.6-0.8,1.5-0.8,2.6
                    c0,0.8,0.2,1.4,0.5,2c0.3,0.5,0.7,1,1.2,1.3c0.5,0.3,1,0.6,1.6,0.7c0.6,0.1,1.1,0.2,1.6,0.2c1.3,0,2.3-0.2,3.1-0.7
                    c0.8-0.5,1.5-1.1,2-1.8c0.5-0.7,0.9-1.5,1.1-2.4c0.2-0.9,0.3-1.7,0.3-2.6V31.5z"
                  />
                  <path
                    id="ttt"
                    opacity="0"
                    fill="#FF1D25" stroke="#FF1D25"
                    d="M54.6,41c-0.4,0.1-0.8,0.1-1.1,0.1c-1.3,0-2.3-0.4-2.8-1.1c-0.6-0.7-0.8-1.7-0.8-2.8V24.5h-3.7v-0.7h3.7v-5h0.8v5h5v0.7
                    h-5v12.8c0,1.2,0.3,2,0.8,2.5c0.6,0.5,1.3,0.8,2.3,0.8c0.7,0,1.3-0.1,1.9-0.3l0.1,0.6C55.3,40.9,55,41,54.6,41z"
                  />
                  <path
                    id="sss"
                    opacity="0"
                    fill="#FF1D25" stroke="#FF1D25"
                    d="M69.9,36.3c0,0.8-0.1,1.4-0.4,2c-0.3,0.6-0.7,1.1-1.2,1.5c-0.5,0.4-1.1,0.7-1.8,1c-0.7,0.2-1.4,0.3-2.1,0.3
                    c-1.3,0-2.4-0.2-3.4-0.7c-1-0.5-1.9-1.2-2.5-2.1l0.7-0.4c1.2,1.7,3,2.6,5.3,2.6c0.5,0,1.1-0.1,1.6-0.3c0.6-0.2,1.1-0.4,1.5-0.8
                    c0.5-0.3,0.8-0.8,1.1-1.3c0.3-0.5,0.4-1.1,0.4-1.8c0-0.8-0.2-1.4-0.5-1.9c-0.4-0.5-0.8-0.9-1.3-1.2c-0.5-0.3-1.1-0.5-1.8-0.7
                    c-0.7-0.2-1.3-0.4-1.8-0.5c-0.6-0.2-1.2-0.4-1.7-0.6c-0.5-0.2-1-0.5-1.4-0.8c-0.4-0.3-0.7-0.7-1-1.2c-0.2-0.5-0.4-1.1-0.4-1.8
                    s0.1-1.4,0.4-1.9c0.3-0.5,0.7-1,1.2-1.3c0.5-0.4,1.1-0.6,1.7-0.8c0.6-0.2,1.3-0.3,1.9-0.3c2.3,0,4,0.8,5.2,2.5l-0.7,0.4
                    c-0.6-0.7-1.2-1.3-1.9-1.6c-0.7-0.4-1.6-0.5-2.6-0.5c-0.5,0-1,0.1-1.5,0.2c-0.5,0.1-1,0.3-1.4,0.6c-0.4,0.3-0.8,0.7-1.1,1.1
                    c-0.3,0.5-0.4,1-0.4,1.7c0,0.7,0.1,1.3,0.4,1.8c0.2,0.4,0.6,0.8,1,1.1c0.4,0.3,0.9,0.5,1.5,0.7c0.6,0.2,1.2,0.4,2,0.5
                    c0.7,0.2,1.3,0.4,1.9,0.6c0.6,0.2,1.2,0.5,1.7,0.9c0.5,0.3,0.9,0.8,1.1,1.3C69.7,34.9,69.9,35.5,69.9,36.3z"
                  />
                  <path
                    id="ooo"
                    opacity="0"
                    fill="#FF1D25" stroke="#FF1D25"
                    d="M91.9,32.2c0,1.3-0.2,2.5-0.6,3.6c-0.4,1.1-1,2.1-1.8,2.9c-0.8,0.8-1.7,1.4-2.8,1.9c-1.1,0.4-2.3,0.7-3.6,0.7
                    c-1.3,0-2.5-0.2-3.6-0.7c-1.1-0.4-2-1.1-2.8-1.9c-0.8-0.8-1.4-1.8-1.8-2.9c-0.4-1.1-0.6-2.3-0.6-3.6s0.2-2.5,0.6-3.6
                    c0.4-1.1,1-2,1.8-2.8c0.8-0.8,1.7-1.4,2.8-1.8c1.1-0.4,2.3-0.7,3.6-0.7c1.3,0,2.5,0.2,3.6,0.7c1.1,0.4,2,1.1,2.8,1.8
                    c0.8,0.8,1.4,1.7,1.8,2.8C91.7,29.7,91.9,30.9,91.9,32.2z M91.1,32.2c0-1.1-0.2-2.2-0.6-3.2c-0.4-1-0.9-1.9-1.6-2.6
                    c-0.7-0.7-1.6-1.3-2.5-1.8c-1-0.4-2.1-0.6-3.4-0.6c-1.3,0-2.4,0.2-3.4,0.6c-1,0.4-1.8,1-2.5,1.8c-0.7,0.7-1.2,1.6-1.6,2.6
                    c-0.4,1-0.6,2.1-0.6,3.2c0,1.2,0.2,2.2,0.6,3.2c0.4,1,0.9,1.9,1.6,2.6c0.7,0.7,1.5,1.3,2.5,1.8c1,0.4,2.1,0.7,3.4,0.7
                    c1.3,0,2.4-0.2,3.4-0.7c1-0.4,1.8-1,2.5-1.8c0.7-0.7,1.2-1.6,1.6-2.6C90.9,34.4,91.1,33.3,91.1,32.2z"
                  />
                  <path
                    id="nnn"
                    opacity="0"
                    fill="#FF1D25" stroke="#FF1D25"
                    d="M100,26.1c0.5-0.6,1-1.1,1.6-1.6c0.6-0.4,1.2-0.8,1.9-1c0.7-0.2,1.4-0.3,2.1-0.3c1.2,0,2.2,0.2,3,0.6
                    c0.8,0.4,1.4,1,1.9,1.7c0.5,0.7,0.8,1.5,1,2.3c0.2,0.9,0.3,1.7,0.3,2.6v10.2h-0.8V30.5c0-0.7-0.1-1.4-0.2-2.2
                    c-0.1-0.8-0.4-1.5-0.8-2.1c-0.4-0.6-1-1.2-1.6-1.6c-0.7-0.4-1.6-0.6-2.6-0.6c-0.9,0-1.8,0.2-2.6,0.6c-0.8,0.4-1.5,0.9-2.1,1.6
                    c-0.6,0.7-1.1,1.6-1.4,2.6c-0.4,1-0.5,2.2-0.5,3.5v8.5h-0.8V28c0-0.3,0-0.6,0-1c0-0.4,0-0.8,0-1.2c0-0.4,0-0.8-0.1-1.2
                    c0-0.4,0-0.7-0.1-0.9h0.8c0,0.2,0,0.6,0.1,0.9c0,0.4,0,0.8,0,1.2c0,0.4,0,0.8,0,1.3c0,0.4,0,0.8,0,1.1h0.1
                    C99.2,27.4,99.5,26.7,100,26.1z"
                  />
                </g>
              </svg>
            </span>
          </span>
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
