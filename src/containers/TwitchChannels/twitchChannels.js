import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getChannels } from '../../actions/index';

class ChannelDropdown extends Component {

  componentWillMount() {
    this.props.getChannels();
  }

  renderChannels() {

  }

  render{
    return(
      <div class="btn-group">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Action
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </div>

    );
  }
}

function mapStateToProps({ channels }) {
  return { channels };
}

export default connect(mapStateToProps)(ChannelDropdown);
