// @flow
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import File from './File';
import ProjectRecord from '../models/Project';
import styles from './Project.css';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.instanceOf(ProjectRecord).isRequired
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <div className={styles.container}>
          <h3>Project: {project.get('directoryPath')}</h3>
          <ul>
            {project.get('files').map(item =>
              <File item={item} />
            )}
          </ul>
        </div>
      </div>
    );
  }
}
