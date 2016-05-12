import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className={`${styles}`}>
        <div className="outer-container">
          <div className="inner-container">
            <div className="section">
              <div className="face"></div>
              <div className="face"></div>
            </div>
            <div className="section">
              <div className="face">
                <div className="face2"></div>
              </div>
            </div>
            <div className="section">
              <div className="face">
                <div className="face2"></div>
              </div>
              <div className="face"></div>
              <div className="face"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}