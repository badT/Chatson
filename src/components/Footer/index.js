import React from 'react';
import { styles } from './styles.scss';

export function Footer() {
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
