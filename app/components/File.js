// @flow
import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { Card, CardHeader } from 'material-ui/Card';
import Description from 'material-ui/svg-icons/action/description';
import TextFileRecord from '../models/TextFile';
import styles from './Project.css';

import {
  blue300, cyanA700
} from 'material-ui/styles/colors';

type State = {
  animated: boolean
};

type Props = {
  item: TextFileRecord
};

export default class Project extends Component {
  elem: Element;
  state: State = {animated: false};

  static propTypes = {
    item: PropTypes.instanceOf(TextFileRecord).isRequired
  }

  componentWillReceiveProps(nextProps: Props) {
    const { item } = nextProps;
    if (item.get('isChange')) {
      this.setState({animated: true});
    }
  }

  componentDidMount() {
    this.elem.addEventListener('animationend', () => {
      this.setState({animated: false});
    });
  }

  getChangedClass(): string {
    if (this.state.animated) {
      return 'animated flash';
    }
    return '';
  }

  render() {
    const { item } = this.props;
    return (
      <li ref={(elm) => {this.elem = elm}} className={`${styles.list} ${this.getChangedClass()}`}>
        <Card>
          <CardHeader
            avatar={<Avatar icon={<Description />} backgroundColor={blue300} />}
            title={item.get('fileName')}
            subtitle={<span><span style={{color: cyanA700}}>{item.get('page')}</span><span>{item.getDifferencePageOfToday()}</span>{` pages, ${item.get('overLine')} line; Total ${item.get('length').toLocaleString()}${item.getDifferenceLengthOfToday()} char.`}</span>}
            titleStyle={{fontSize: '18px', marginBottom: '8px'}}
          />
        </Card>
      </li>
    );
  }
}
