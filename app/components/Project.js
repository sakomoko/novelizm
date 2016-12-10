// @flow
import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import File from './File';
import ProjectRecord from '../models/Project';
import styles from './Project.css';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.instanceOf(ProjectRecord).isRequired,
  }

  render() {
    const { project } = this.props;
    return (
      <div>
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
