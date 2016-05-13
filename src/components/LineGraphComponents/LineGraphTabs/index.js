import React from 'react';
import { styles } from './styles.scss';

export default function LineGraphTabs(props) {
  return (
    <div className={`${styles}`}>
      <section className="row">
        <div className="col-xs-12 graph-tab-holder">
          <h2
            className={`graph-tab ${props.activeGraph === 'emotion' ? 'tab-active' : ''}`}
            onClick={() => props.toggleGraph('emotion')}
          >
            Channel Emotions
          </h2>
          <h2
            className={`graph-tab ${props.activeGraph === 'social' ? 'tab-active' : ''}`}
            onClick={() => props.toggleGraph('social')}
          >
            Social Attributes
          </h2>
        </div>
      </section>
    </div>
  );
}

LineGraphTabs.propTypes = {
  activeGraph: React.PropTypes.string,
  toggleGraph: React.PropTypes.func,
};
