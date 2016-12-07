import assert from 'power-assert';
import Progress from '../../app/models/Progress';
import Project from '../../app/models/Project';
import TextFileRecord from '../../app/models/TextFile';
import { List } from 'immutable';
import path from 'path';

const jsonString = require('../fixtures/progress.json');

describe('Progress', function(){
    let project;
    beforeEach(function(){
      const directoryPath = path.resolve('test', 'fixtures');
        project = new Project({
          directoryPath: directoryPath,
          files: List([
            new TextFileRecord({
              directoryPath: directoryPath,
              fileName: 'test1.txt'
            }).parse(),
            new TextFileRecord({
              directoryPath: directoryPath,
              fileName: 'test2.txt'
            }).parse()
          ])
        });
    });
    describe('#constructor', function(){
        it('インスタンス化が正常に行われること', function(){
          const progress = new Progress(project);
          assert.ok(progress instanceof Progress);
        });
    });
    describe('#files', () => {
        it('List要素であること', () =>{
          const progress = new Progress(project);
          assert.ok(progress.files instanceof List);
        });
        it('二つのファイルを取得していること', () =>{
          const progress = new Progress(project);
          assert.ok(progress.files.size === 2);
        });
        it('ファイルの各要素にアクセスできること', () =>{
          const progress = new Progress(project);
          assert.ok(progress.files.get(0).fileName === 'test1.txt');
          assert.ok(progress.files.get(1).today.page === 26);
          assert.ok(progress.files.get(1).previous.get(0).page === 26);
        });
    });
    describe('toJSONString', () => {
      it('#json形式の文字列に変換できること', () => {
        const progress = new Progress(project);
        assert.deepStrictEqual(JSON.parse(progress.toJSONString()), jsonString);
      });
    });
});