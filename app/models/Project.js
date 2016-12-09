// @flow
import { Record, List } from 'immutable';
import path from 'path';
import type TextFile from './TextFile';

const ProjectRecord = Record({
  directoryPath: '',
  files: List()
});

export default class Project extends ProjectRecord {

  getDirectoryName(): string {
    return path.basename(this.directoryPath);
  }

  changeFile(fileName: string): Project {
    const index: number = this.files.findIndex((item) => item.get('fileName') === fileName);
    return this.set('files', this.files.update(index, (item) => item.parse()));
  }

  getLatestFile(): TextFile {
    return this.get('files').maxBy(item => item.updateDate);
  }
}
