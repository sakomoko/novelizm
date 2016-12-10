// @flow
import { UPDATE_SETTING } from '../actions/setting';
import Setting from '../models/Setting';

const defaultSetting = new Setting({});
export default function project(state: Setting = defaultSetting, action: Object) {
  switch (action.type) {
    case UPDATE_SETTING: {
      const {key, value} = action.payload;
      return state.set(key, value);
    }
    default:
      return state;
  }
}
