import type Setting from '../models/Setting';
import type FileRecord from '../models/TextFile';
import { ipcRenderer } from 'electron';

export default {
  setup(latestFile: ?FileRecord, setting: Setting): void {

    if (!latestFile) return;

    this.raiseMenuBarNotification(latestFile);

    if (setting.isNotification) {
      this.raiseNativeNotification(latestFile);
    }

  },

  raiseNativeNotification(latest: FileRecord): void {
    const notify = new Notification(`${latest.get('fileName')} has changed.`, {
      body: `${latest.page} ${latest.getDifferencePageOfToday()} page / ${latest.length} ${latest.getDifferenceLengthOfToday()} char.`,
      silent: true
    });
    setTimeout(notify.close.bind(notify), 4000);
  },

  raiseMenuBarNotification(latest: FileRecord): void {
    ipcRenderer.send('change-file',
      `${latest.get('page')}/${latest.get('length').toLocaleString()}`);
  }
}
