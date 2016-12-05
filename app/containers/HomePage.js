// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as HomeActions from '../actions/home';

class HomePage extends Component {
  render() {
    return (
      <Home {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
