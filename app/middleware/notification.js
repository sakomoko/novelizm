import { UPDATE_PROJECT } from '../actions/project';
import Notification from '../utils/Notification';

export default store => next => action => {
  const result = next(action);

  const setting = store.getState().setting;
  const latestFile = store.getState().project.getLatestFile();

  switch (action.type) {
    case UPDATE_PROJECT:
      Notification.setup(latestFile, setting);
  }

  return result;
};
