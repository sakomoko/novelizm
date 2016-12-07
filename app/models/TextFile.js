// @flow
import { Record } from 'immutable';
import fs from 'fs';
import TextParser from '../utils/TextParser';
import moment from 'moment';

const TextFileRecord = Record({
  directoryPath: '',
  fileName: '',
  page: 0,
  overLine: 0,
  length: 0,
  charAt: 0,
  differencePage: 0,
  differenceLength: 0,
  isChange: false,
  updateDate: ''
});

export default class TextFile extends TextFileRecord {
  parse(): TextFile {
    const stat = fs.statSync(this.directoryPath + '/' + this.fileName);
    const updateDate: Date = stat.mtime;
    const body: string = fs.readFileSync(this.directoryPath + '/' + this.fileName, 'utf-8');
    const parsedText: TextParser = new TextParser(body);
    const result: Object = parsedText.toObject();
    return this.withMutations(map => {
      let newRecord = map;
      if (this.isChange()) {
        newRecord = map.set('differencePage', this.calculateDifferencePage(result.page))
        .set('differenceLength', this.calculateDifferenceLength(result.length))
        .set('isChange', true);
      }
      newRecord.set('page', result.page)
      .set('overLine', result.line)
      .set('charAt', result.charAt)
      .set('length', result.length)
      .set('updateDate', moment(updateDate).format());
    })
  }

  isChange(): boolean {
    return (this.get('length') > 0)
  }

  calculateDifferencePage(newPage: number): number {
    const currentPage: number = this.get('page');
    if (currentPage > newPage) {
      return -(currentPage - newPage);
    } else {
      return newPage - currentPage;
    }
  }

  calculateDifferenceLength(newLength: number): number {
    const currentLength: number = this.get('length')
    if (currentLength > newLength) {
      return -(currentLength - newLength);
    } else {
      return newLength - currentLength;
    }
  }

  getDifferencePageString(): string {
    const page = this.get('differencePage');
    if (page === 0) {
      return '';
    } else if (page > 0) {
      return ` (+${page}) `;
    } else {
      return ` (${page}) `;
    }
  }

  getDifferenceLengthString(): string {
    const number = this.get('differenceLength');
    if (number === 0) {
      return '';
    } else if (number > 0) {
      return ` (+${number}) `;
    } else {
      return ` (${number}) `;
    }
  }
}
