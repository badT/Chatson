import React, { Component } from 'react';
import Tooltip from '../../Tooltip';
import { emoColors, socColors, splotchDesc, splotchDescLT25, splotchDescLT50, splotchDescGT75 } from '../descriptions';
import { capitalizeFirstLetter } from '../helpers';
import { styles } from './styles.scss';

export default class LineGraphKey extends Component {
  renderSplotches(colorKey, key) {
    if (!colorKey) return false;
    const splotches = [];
    Object.keys(colorKey).forEach(splotch => {
      splotches.push(
        <div key={splotch} className="block-grid-item splotch-holder">
          <div className="color-splotch-holder">
            <span id={`${splotch}-splotch`} className="color-splotch"></span>
            <Tooltip position="top-center" text={
              `Avg for last 90 seconds: ${this.props[key][splotch].toFixed(2)}\n
              ${this.props[key][splotch].toFixed(2) <= 0.25 ? splotchDescLT25[splotch] : ''}
              ${this.props[key][splotch].toFixed(2) <= 0.5 ? splotchDescLT50[splotch] : ''}
              ${this.props[key][splotch].toFixed(2) >= 0.75 ? splotchDescGT75[splotch] : ''}`
            } />
          </div>
          <span className="splotch-label">
            <span className={`${splotch}-splotch-text`}>{capitalizeFirstLetter(splotch)}</span>
            <Tooltip position="top-side" text={splotchDesc[splotch]} />
          </span>
        </div>
      );
    });
    return (
      <div className="block-grid-md-5 block-grid-sm-3 block-grid-xs-2 splotches-grid">
        {splotches}
      </div>
    );
  }

  render() {
    return (
      <div className={`${styles}`}>
        <section className={`graph-key dom-emo-${this.props.dominantEmo} dom-soc-${this.props.dominantSoc}`}>
          <div className={`row splotch-row ${this.props.activeGraph === 'emotion' ? 'splotch-row-active' : ''}`}>
            {this.renderSplotches(emoColors, 'emotionKey')}
          </div>
          <div className={`row splotch-row ${this.props.activeGraph === 'social' ? 'splotch-row-active' : ''}`}>
            {this.renderSplotches(socColors, 'socialKey')}
          </div>
        </section>
      </div>
    );
  }
}

LineGraphKey.propTypes = {
  activeGraph: React.PropTypes.string,
  dominantEmo: React.PropTypes.string,
  dominantSoc: React.PropTypes.string,
};
