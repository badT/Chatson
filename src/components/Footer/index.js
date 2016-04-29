import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export class Footer extends Component {

  render() {
    return (
      <footer className={`${styles}`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <a className="github-button" href="https://github.com/badT/twitchBot">
              Check us out on GitHub
            </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
