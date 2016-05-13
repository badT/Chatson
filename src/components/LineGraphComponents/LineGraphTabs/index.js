import React, { Component } from 'react';
/* component styles */
import { styles } from './styles.scss';

export default class LineGraphTabs extends Component {
  render() {
    return (
      <div className={`${styles}`}>
        <section className="row">
          <div className="col-xs-12 graph-tab-holder">
            <h2
              className={`graph-tab ${this.props.activeGraph === 'emotion' ? 'tab-active' : ''}`}
              onClick={() => this.props.toggleGraph('emotion')}
            >
              Channel Emotions
            </h2>
            <h2
              className={`graph-tab ${this.props.activeGraph === 'social' ? 'tab-active' : ''}`}
              onClick={() => this.props.toggleGraph('social')}
            >
              Social Attributes
            </h2>
          </div>
        </section>
      </div>
    );
  }
}

LineGraphTabs.propTypes = {
  activeGraph: React.PropTypes.string,
  toggleGraph: React.PropTypes.func,
};
