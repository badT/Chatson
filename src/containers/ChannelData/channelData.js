import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getMessage } from '../../actions/items';

/* component styles */
import { styles } from './styles.scss';

export class ChannelData extends Component {

  componentWillMount() {

  }


  render() {
    return (

    );
  }
}

// any action or action creators to map??
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({  }, dispatch);
// }

function mapStateToProps({ message }) {
  if (message.user) {
    return {
      message: message.msg,
      user: message.user.username,
      emotes: message.user.emotes,
    };
  }
  return { noMessage: message };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelData);
