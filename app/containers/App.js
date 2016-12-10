// @flow
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/project';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Navigation from '../components/Navigation';
import ProjectRecord from '../models/Project';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    project: PropTypes.instanceOf(ProjectRecord).isRequired,
    openDirectory: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const { project, openDirectory } = this.props;
    return (
      <div>
        <Navigation project={project} location={this.props.location} openDirectory={openDirectory} />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
