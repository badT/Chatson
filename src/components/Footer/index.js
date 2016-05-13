import React from 'react';
import { styles } from './styles.scss';
const twitchIcon = require('./assets/twitch-logo.png');
const taIcon = require('./assets/ta-icon.svg');
const ghIcon = require('./assets/gh-icon.png');

export function Footer() {
  return (
    <footer className={`${styles}`}>
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            <a href="http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer.html" target="_blank">
              <img className="footer-icon" src={taIcon} alt="Watson Tone Analyzer Logo" />
            </a>
          </div>
          <div className="col-xs-4">
            <a href="https://www.twitch.tv/" target="_blank">
              <img className="footer-icon" src={twitchIcon} alt="Twitch Logo" />
            </a>
          </div>
          <div className="col-xs-4">
            <a href="https://github.com/badT/twitchBot" target="_blank">
              <img className="footer-icon" src={ghIcon} alt="GitHub Logo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
