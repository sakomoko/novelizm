// @flow
import { Record, List } from 'immutable';
import type Project from './Project';
import type TextFile from './TextFile';

const fields = {
  files: List()
};

type FileDetail = {
  fileName: string,
  today: History,
  previous: List<History>
};

type History = {
  date: string,
  page: number,
  line: number,
  length: number
};

type FileList = List<FileDetail>;

function initialize(project: Project): FileList {
  let fileList = new List();
  project.files.forEach((item: TextFile) => {
    const history: History = {
      date: item.get('updateDate'),
      page: item.get('page'),
      line: item.get('line'),
      length: item.get('length')
    };
    const detail: FileDetail = {
      fileName: item.fileName,
      today: history,
      previous: List([history])
    };
    fileList = fileList.push(detail);
  });
  return fileList;
}

export default class Progress extends Record(fields){
  constructor(project: Project) {
    const list: FileList = initialize(project);
    super({files: list});
  }

  toJSONString(): string {
    return JSON.stringify(this, null, '    ');
  }
}
