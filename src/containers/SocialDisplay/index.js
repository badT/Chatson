import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* component styles */
// import { styles } from './styles.scss';

export class SocialDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2>Neuroticism: {this.props.social.neuroticism_big5}</h2>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ tone }) {
  if (tone.toneData) {
    return {
      social: tone.toneData.social,
    };
  }
  return {
    social: tone,
  };
}

export default connect(mapStateToProps)(SocialDisplay);
