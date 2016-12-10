// @flow
export const UPDATE_SETTING = 'UPDATE_SETTING';

export function updateSetting(key: string, value: boolean) {
  return {
    type: UPDATE_SETTING,
    payload: {
      key,
      value
    }
  };
}
