// @flow
import React, { Component, PropTypes } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
