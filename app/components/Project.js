// @flow
import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { Card, CardHeader } from 'material-ui/Card';
import Description from 'material-ui/svg-icons/action/description';
// import { Link } from 'react-router';
import ProjectRecord from '../models/Project';
import TextFileRecord from '../models/TextFile';
import styles from './Project.css';

import {
  blue300, cyanA700
} from 'material-ui/styles/colors';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.instanceOf(ProjectRecord).isRequired
  }

  getChangedClass(item: TextFileRecord): string {
    if (item.get('isChange')) {
      return 'animated pulse';
    }
    return '';
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <div className={styles.container}>
          <h3>Project: {project.get('directoryPath')}</h3>
          <ul>
            {project.get('files').map(item =>
              <li className={styles.list} key={item.get('fileName')}>
                <Card className={this.getChangedClass(item)}>
                  <CardHeader
                    avatar={<Avatar icon={<Description />} backgroundColor={blue300} />}
                    title={item.get('fileName')}
                    subtitle={<span><span style={{color: cyanA700}}>{item.get('page')}</span><span>{item.getDifferencePageString()}</span>{` pages, ${item.get('overLine')} line; Total ${item.get('length').toLocaleString()}${item.getDifferenceLengthString()} char.`}</span>}
                    titleStyle={{fontSize: '18px', marginBottom: '8px'}}
                   />
                </Card>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
