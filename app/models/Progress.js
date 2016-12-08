// @flow
import { Record, List } from 'immutable';
import type Project from './Project';
import type TextFile from './TextFile';

const fields = {
  files: List()
};

export type FileDetail = {
  fileName: string,
  history: List<History>
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
    const detail: FileDetail = {
      fileName: item.fileName,
      history: List(item.get('history'))
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
