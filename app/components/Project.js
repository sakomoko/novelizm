// @flow
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import Navigation from './navigation';
import Subheader from 'material-ui/Subheader';
import File from './File';
import ProjectRecord from '../models/Project';
import styles from './Project.css';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.instanceOf(ProjectRecord).isRequired,
    openDirectory: PropTypes.func.isRequired
  }

  render() {
    const { project, openDirectory } = this.props;
    return (
      <div>
        <Navigation project={project} openDirectory={openDirectory} />
        <div className={styles.container}>
          <Subheader>Project: {project.getDirectoryName()}</Subheader>
          <ul>
            {project.get('files').map(item =>
              <File key={item.get('fileName')} item={item} />
            )}
          </ul>
        </div>
      </div>
    );
  }
}
