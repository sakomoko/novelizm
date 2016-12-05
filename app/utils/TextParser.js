// @flow

const lineLength = 20
const pageWidth = 20

const footEx = ["，","、","。","．","・","：","；","？","！","―","…","ー","－","→","←","↑","↓","）","」","』","〕","｝","】","々","ん","ぁ","ぃ","ぅ","ぇ","ぉ","っ","ゃ","ゅ","ょ","ァ","ィ","ゥ","ェ","ォ","ッ","ャ","ュ","ョ"];
const headEx = ["(","「","『","〔","｛","【"];

export default class TextParser {
  body: string;
  page: number;
  line: number;
  charAt: number;
  lineText: Array<string>;

  constructor(text: string) {
    this.body = text;
    this.page = 0;
    this.line = 0;
    this.charAt = 0;
    this.lineText = [];
    this.parseText();
  }

  toObject(): Object {
    return {
      page: this.page,
      line: this.line,
      charAt: this.charAt,
      length: this.body.length
    }
  }

  parseText() {
    const strings = this.body;
    for (let i = 0; i < strings.length; i++) {
      this.lineText.push(strings[i]);
      this.charAt += 1;
      this.lineBreakCheck(i);
    }
  }

  lineBreakCheck(bodyAt: number) {
    if (this.body[bodyAt] === '\n') {
      return this.lineBreak();
    }
    // 指定文字数を超えて改行が決定したとき
    if (this.charAt >= lineLength) {
      // 現在の文字を調べて行末禁止文字なら一つ戻って改行する
      if (this.isHeadEx(this.body[bodyAt])) {
        this.lineBreak();
        this.charAt += 1;
        return;
      }
      // 次の文字を調べて行頭禁止文字ならば改行を見送る。
      if (!this.isFootEx(this.body[bodyAt + 1])) {
        return this.lineBreak();
      }
    }
  }

  lineBreak() {
    this.lineText = [];
    this.line += 1;
    this.charAt = 0;
    if (this.line >= pageWidth) {
      this.line = 0;
      this.charAt = 0;
      this.page += 1;
    }
  }

  isFootEx(char: string) {
    return footEx.includes(char)
  }

  isHeadEx(char: string) {
    return headEx.includes(char)
  }
}
