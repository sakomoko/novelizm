import assert from 'power-assert';
import TextFileRecord from '../../app/models/TextFile';
import path from 'path';

describe('TextFileRecord', () => {
  describe('#constructor', () => {
    let file;
    beforeEach(() => {
      file = new TextFileRecord({
        directoryPath: path.resolve(__dirname, '..', 'fixtures'),
        fileName: 'test1.txt'
      }).parse();
    });

    it('正常にインスタンス化される', () => {
      assert(file instanceof TextFileRecord);
    });
    it('更新日時を文字列で取得できる', () => {
      assert(file.updateDate === '2016-12-07T03:30:51+09:00');
    });
  });
});
