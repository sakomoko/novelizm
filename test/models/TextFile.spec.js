import assert from 'power-assert';
import TextFileRecord from '../../app/models/TextFile';
import path from 'path';

describe('TextFileRecord', () => {
  let file;
  beforeEach(() => {
    file = new TextFileRecord({
      directoryPath: path.resolve(__dirname, '..', 'fixtures'),
      fileName: 'test2.txt'
    }).parse();
  });

  describe('#constructor', () => {
    it('正常にインスタンス化される', () => {
      assert(file instanceof TextFileRecord);
    });
    it('更新日時を文字列で取得できる', () => {
      assert(typeof(file.updateDate) === 'string');
    });
  });

  describe('getDifferenceNumber', () => {
    it('ページ数の差分を計算できること', () => {
      assert(file.calculateDifferencePage(40) === 14);
    });
    it('現在より少ないページなら負符合をつけて返すこと', () => {
      assert(file.calculateDifferencePage(20) === -6);
    });
  });

  describe('getDifferenceString', () => {
    it('0なら空文字を返す', () => {
      file = file.set('differencePage', 0);
      assert(file.getDifferencePageString() === '');
    });
    it('0より大きければ+を付けた文字列を返す', () => {
      file = file.set('differencePage', 10);
      assert(file.getDifferencePageString() === ' (+10) ');
    });
    it('0より小さければカッコをつけて返す', () => {
      file = file.set('differencePage', -10);
      assert(file.getDifferencePageString() === ' (-10) ');
    });
  });
});
