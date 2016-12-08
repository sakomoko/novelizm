// @flow
import { Record, List } from 'immutable';
import fs from 'fs';
import TextParser from '../utils/TextParser';
import moment from 'moment';
import type FileDetail from './Progress';

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
  updateDate: '',
  history: List()
});

function getDifferenceString(number: number): string {
  if (number === 0) {
    return '';
  } else if (number > 0) {
    return ` (+${number}) `;
  } else {
    return ` (${number}) `;
  }
}

function getDifferenceNumber(currentNumber: number, newNumber: number): number {
  if (currentNumber > newNumber) {
    return -(currentNumber - newNumber);
  } else {
    return newNumber - currentNumber;
  }
}

export default class TextFile extends TextFileRecord {
  parse(progress: ?FileDetail): TextFile {
    const stat = fs.statSync(this.directoryPath + '/' + this.fileName);
    const updateDate: Date = stat.mtime;
    const body: string = fs.readFileSync(this.directoryPath + '/' + this.fileName, 'utf-8');
    const parsedText: TextParser = new TextParser(body);
    const result: Object = parsedText.toObject();
    return this.withMutations(map => {
      let newRecord = map;
      if (progress != null) {
        newRecord = newRecord.set('history', List(progress.history));
      } else if(!this.isChange()) {
        newRecord = newRecord.set('history', List([{
          date: moment(updateDate).format(),
          page: result.page,
          line: result.line,
          length: result.length
        }]));
      }

      if (this.isChange()) {
        if (this.isCreateNewHistory(updateDate, this.get('history'))) {
          newRecord = newRecord.set('history', this.get('history').unshift({
            date: this.get('updateDate'),
            page: this.get('page'),
            line: this.get('overLine'),
            length: this.get('length')
          }));
        }
        newRecord = newRecord.set('differencePage', this.calculateDifferencePage(result.page))
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

  isCreateNewHistory(updateDate: Date, history: List<Object>): boolean {
    const current = moment(updateDate);
    const previous = moment(history.first().date);
    return current.isAfter(previous, 'day');
  }

  calculateDifferencePage(newPage: number): number {
    return getDifferenceNumber(this.get('page'), newPage);
  }

  calculateDifferenceLength(newLength: number): number {
    return getDifferenceNumber(this.get('length'), newLength);
  }

  getDifferencePageString(): string {
    return getDifferenceString(this.get('differencePage'));

  }

  getDifferenceLengthString(): string {
    return getDifferenceString(this.get('differenceLength'));
  }

  getDifferencePageOfToday(): string {
    return getDifferenceString(getDifferenceNumber(this.get('history').first().page, this.get('page')));
  }

  getDifferenceLengthOfToday(): string {
    return getDifferenceString(getDifferenceNumber(this.get('history').first().length, this.get('length')));
  }
}
