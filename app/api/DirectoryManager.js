// @flow
import { List } from 'immutable'
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import TextFile from '../models/TextFile';
import Project from '../models/Project';

type EventType = 'change' | 'add' | 'remove';

export default class DirectoryManager {
  directoryPath: string;
  fileNames: Array<string>;
  files: Array<TextFile>;
  listener: Object;
  project: Project;

  constructor(directoryPath: string) {
    this.directoryPath = directoryPath;
    this.files = [];
    this.listener = {};
    this.fileNames = this.searchFiles();
    this.fileNames.forEach((fileName) => {
      const file = new TextFile({
        directoryPath: this.directoryPath,
        fileName: fileName
      });
      this.files.push(file.parse())
    })
    this.project = new Project({
      directoryPath: this.directoryPath,
      files: List(this.getFileRecords())
    });
    this.watchFiles();
  }

  searchFiles(): Array<string> {
    const files: Array<string> = fs.readdirSync(this.directoryPath);
    return files.filter((file) => path.extname(file) === '.txt');
  }

  changeFile(filePath: string): void {
    const project: Project = this.getProjectRecord();
    this.project = project.changeFile(path.basename(filePath));
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
