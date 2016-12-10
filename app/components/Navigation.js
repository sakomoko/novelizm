// @flow
import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ProjectRecord from '../models/Project';
import FolderOpen from 'material-ui/svg-icons/file/folder-open';
import SettingIcon from 'material-ui/svg-icons/action/settings';

export default class Navigation extends Component {
  static propTypes = {
    project: PropTypes.instanceOf(ProjectRecord).isRequired,
    openDirectory: PropTypes.func.isRequired
  }

  render() {
    const { project, openDirectory } = this.props;
    return (
      <AppBar
        title={project.getDirectoryName() || 'novelizm'}
        titleStyle={{fontSize: '24px'}}
        iconElementLeft={<IconButton onClick={openDirectory}><FolderOpen /></IconButton>}
        iconElementRight={<IconButton><SettingIcon /></IconButton>}
       />
    );
  }
}
