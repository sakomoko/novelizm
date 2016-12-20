// @flow
import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { Card, CardHeader } from 'material-ui/Card';
import Description from 'material-ui/svg-icons/action/description';
import TextFileRecord from '../models/TextFile';

import styles from './File.css';

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
      <li ref={(elm) => {this.elem = elm}} className={`${this.getChangedClass()}`}>
        <Card>
          <CardHeader
            style={{width:'100%'}}
            avatar={<Avatar icon={<Description />} backgroundColor={blue300} />}
            title={<div><span>{item.get('fileName')}</span></div>}
            subtitle={<Detail item={item} />}
            titleStyle={{width:'100%', fontSize: '18px', marginBottom: '8px'}}
          />
        </Card>
      </li>
    );
  }
}

const Detail = ({ item }) => (
  <div className={styles.detail}>
    <div>
      <span style={{color: cyanA700}}>{item.get('page')}</span>
      <span>{item.getDifferencePageOfToday()}</span>
      {` page, ${item.get('overLine')} line; ${item.get('length').toLocaleString()}${item.getDifferenceLengthOfToday()} char.`}
    </div>
  </div>
);
Detail.propTypes = {
  item: PropTypes.instanceOf(TextFileRecord).isRequired
};
