// @flow
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FolderOpen from 'material-ui/svg-icons/file/folder-open';

// import { Link } from 'react-router';
import styles from './Home.css';

export default class Home extends Component {
  static propTypes = {
    openDirectory: PropTypes.func.isRequired
  };

  render() {
    const { openDirectory } = this.props;
    return (
      <div>
        <div className={styles.container}>
          <h2>Novelizm</h2>
          <RaisedButton icon={<FolderOpen />} primary={true} label='Open Project Directory' onClick={openDirectory} />
        </div>
      </div>
    );
  }
}
