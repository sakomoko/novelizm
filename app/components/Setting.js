// @flow
import React, { Component, PropTypes } from 'react';
import SettingRecord from '../models/Setting';
// import { Link } from 'react-router';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import styles from './Setting.css';

export default class Setting extends Component {
  static propTypes = {
    setting: PropTypes.instanceOf(SettingRecord).isRequired,
    updateSetting: PropTypes.func.isRequired
  }

  toggleSetting(key: string, event: Object) {
    this.props.updateSetting(key, event.target.checked);
  }

  render() {
    const { setting } = this.props;
    return (
        <div>
          <Subheader>Setting</Subheader>
          <div className={styles.container}>
            <Toggle
              label="Notification on Change"
              defaultToggled={setting.get('isNotification')}
              onToggle={this.toggleSetting.bind(this, 'isNotification')}
            />
          </div>
        </div>
    );
  }
}
