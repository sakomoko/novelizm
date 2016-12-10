// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Setting from '../components/Setting';
import * as SettingActions from '../actions/project';

class SettingPage extends Component {
  render() {
    return (
      <Setting {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    setting: state.setting
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
