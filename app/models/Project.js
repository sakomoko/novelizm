// @flow
import { Record, List } from 'immutable';

const ProjectRecord = Record({
  directoryPath: '',
  files: List()
});

export default class Project extends ProjectRecord {
  changeFile(fileName: string): Project {
    const index: number = this.files.findIndex((item) => item.get('fileName') === fileName);
    return this.set('files', this.files.update(index, (item) => item.parse()));
  }
}
