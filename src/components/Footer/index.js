import React, { Component } from 'react';
import { styles } from './styles.scss';
const twitchIcon = require('./assets/twitch-logo.png');
const taIcon = require('./assets/ta-icon.svg');
const ghIcon = require('./assets/gh-icon.png');

export class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredIcon: '',
    };
  }

  handleMouseEnter(icon) {
    this.setState({ hoveredIcon: icon });
  }

  handleMouseLeave() {
    this.setState({ hoveredIcon: '' });
  }

  render() {
    return (
      <div className={`${styles}`}>
        <div className="footer-tooltips">
          <div className="container">
            <div className="row">
              <div className="col-xs-4">
                <div className={`footer-tooltip ${this.state.hoveredIcon === 'ta' ? 'active' : ''}`}>
                  Chatson uses IBM Watson&#8482; Tone Analyzer for its analyses
                </div>
              </div>
              <div className="col-xs-4">
                <div className={`footer-tooltip ${this.state.hoveredIcon === 'twitch' ? 'active' : ''}`}>
                  Chatson chat streams come from Twitch chat channels
                </div>
              </div>
              <div className="col-xs-4">
                <div className={`footer-tooltip ${this.state.hoveredIcon === 'gh' ? 'active' : ''}`}>
                  Fork us on GitHub
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-xs-4">
                <a
                  onMouseEnter={() => this.handleMouseEnter('ta')}
                  onMouseLeave={() => this.handleMouseLeave()}
                  href="http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer.html"
                  target="_blank"
                >
                  <img className="footer-icon" src={taIcon} alt="Watson Tone Analyzer Logo" />
                </a>
              </div>
              <div className="col-xs-4">
                <a
                  onMouseEnter={() => this.handleMouseEnter('twitch')}
                  onMouseLeave={() => this.handleMouseLeave()}
                  href="https://www.twitch.tv/"
                  target="_blank"
                >
                  <img className="footer-icon" src={twitchIcon} alt="Twitch Logo" />
                </a>
              </div>
              <div className="col-xs-4">
                <a
                  onMouseEnter={() => this.handleMouseEnter('gh')}
                  onMouseLeave={() => this.handleMouseLeave()}
                  href="https://github.com/badT/twitchBot"
                  target="_blank"
                >
                  <img className="footer-icon" src={ghIcon} alt="GitHub Logo" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
