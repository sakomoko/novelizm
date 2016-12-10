// @flow
import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ProjectRecord from '../models/Project';
import FolderOpen from 'material-ui/svg-icons/file/folder-open';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import BackIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { Link } from 'react-router';

export default class Navigation extends Component {
  static propTypes = {
    project: PropTypes.instanceOf(ProjectRecord).isRequired,
    openDirectory: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { project, openDirectory } = this.props;
    let RightButton;
    const iconColor = 'rgb(254, 254, 255)';

    if (this.props.location.pathname == '/setting') {
      RightButton = (<Link to='/'><IconButton><BackIcon color={iconColor} /></IconButton></Link>);
    } else {
      RightButton = (<Link to='/setting'><IconButton><SettingIcon color={iconColor} /></IconButton></Link>);
    }

    return (
      <AppBar
        title={<Link to='/'>{project.getDirectoryName() || 'novelizm'}</Link>}
        titleStyle={{fontSize: '24px'}}
        iconElementLeft={<IconButton onClick={openDirectory}><FolderOpen /></IconButton>}
       iconElementRight={RightButton}
       />
    );
  }
}
