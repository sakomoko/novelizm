// @flow
import { List } from 'immutable'
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import TextFile from '../models/TextFile';
import Project from '../models/Project';
import Progress from '../models/Progress';
import { ipcRenderer } from 'electron';

type EventType = 'change' | 'add' | 'remove';

function isExistFile(file) {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
}

export default class DirectoryManager {
  directoryPath: string;
  fileNames: Array<string>;
  files: Array<TextFile>;
  listener: Object;
  project: Project;
  tracker: ?Object;

  constructor(directoryPath: string) {
    this.directoryPath = directoryPath;
    this.files = [];
    this.listener = {};
    this.fileNames = this.searchFiles();
    this.tracker = this.getProjectTracker();

    this.fileNames.forEach((fileName) => {
      const progress = this.getFileProgress(fileName);
      const file = new TextFile({
        directoryPath: this.directoryPath,
        fileName: fileName
      });
      this.files.push(file.parse(progress));
    })
    this.project = new Project({
      directoryPath: this.directoryPath,
      files: List(this.getFileRecords())
    });
    this.saveTrackerFile();
    this.watchFiles();
  }

  saveTrackerFile() {
    const tracker = new Progress(this.project);
    fs.writeFileSync(this.directoryPath + '/novelizm.json', tracker.toJSONString());
  }

  getProjectTracker() {
    const filePath = this.directoryPath + '/' + 'novelizm.json';
    if (isExistFile(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return null;
  }

  getFileProgress(fileName: string) {
    if (this.tracker) {
      return this.tracker.files.find((value) => {
        return value.fileName === fileName
      });
    }
    return null;
  }

  searchFiles(): Array<string> {
    const files: Array<string> = fs.readdirSync(this.directoryPath);
    return files.filter((file) => path.extname(file) === '.txt');
  }

  changeFile(filePath: string): void {
    const project: Project = this.getProjectRecord();
    this.project = project.changeFile(path.basename(filePath));
    const latest = project.getLatestFile();
    const notify = new window.Notification(`${latest.get('fileName')} has changed.`, {
      body: `${latest.page} ${latest.getDifferencePageOfToday()} page / ${latest.length} ${latest.getDifferenceLengthOfToday()} char.`,
      silent: true
    });
    setTimeout(notify.close.bind(notify), 4000);
    ipcRenderer.send('change-file',
      `${latest.get('page')}/${latest.get('length').toLocaleString()}`);
    this.saveTrackerFile();
    this.listener['change'](this.project);
  }

  getFileRecords(): Array<TextFile> {
    return this.files;
  }

  getProjectRecord(): Project {
    return this.project;
  }

  on(event: EventType, callback: Function): void {
    this.listener[event] = callback;
  }

  watchFiles(): void {
    const watcher = chokidar.watch(this.fileNames, {
      persistent: true,
      cwd: this.directoryPath
    });
    watcher.on('change', filePath => this.changeFile(filePath));
  }
}
