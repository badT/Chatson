import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTone } from '../../actions/index';

/* component styles */
// import { styles } from './styles.scss';

export class EmotionDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.socket.on('tone:update', toneData => {
      this.props.getTone(toneData);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2>{this.props.tone}</h2>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTone }, dispatch);
}

function mapStateToProps({ tone }) {
  console.log(tone);
  return { tone };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmotionDisplay);
