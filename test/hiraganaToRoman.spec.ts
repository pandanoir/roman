import { hiraganaToRoman } from '../src/main';

describe('hiraganaToRoman', () => {
  it(`should return n when "ん" isn't followed by "な" or "や".`, () => {
    expect(hiraganaToRoman('んか')).toEqual([['n'], 1]);
    expect(hiraganaToRoman('んちゃ')).toEqual([['n'], 1]);
  });
  it(`should return nn when "ん" is followed by "な" or "や".`, () => {
    expect(hiraganaToRoman('んな')).toEqual([['nn'], 1]);
    expect(hiraganaToRoman('んや')).toEqual([['nn'], 1]);
    expect(hiraganaToRoman('んい')).toEqual([['nn'], 1]);
    expect(hiraganaToRoman('ん')).toEqual([['nn'], 1]);
  });
  it(`should return n when "ん" is followed by alphabet or symbol.`, () => {
    expect(hiraganaToRoman('ん100%')).toEqual([['n'], 1]);
    expect(hiraganaToRoman('んa')).toEqual([['n'], 1]);
    expect(hiraganaToRoman('ん.')).toEqual([['n'], 1]);
    expect(hiraganaToRoman('ん!')).toEqual([['n'], 1]);
  });
  it(`should return decided value when received "ぁ" or "ゃ".`, () => {
    expect(hiraganaToRoman('ぁ')).toEqual([['xa'], 1]);
    expect(hiraganaToRoman('ぃ')).toEqual([['xi'], 1]);
    expect(hiraganaToRoman('ゅ')).toEqual([['xyu'], 1]);
  });
  it(`should return cached result if romanTable has the answer.`, () => {
    expect(hiraganaToRoman('うぁ')).toEqual([['uxa', 'wha'], 2]);
    expect(hiraganaToRoman('しゃ')).toEqual([
      ['sya', 'sha', 'sixya', 'shixya'],
      2,
    ]);
  });
  it(`should calculate result if romanTable has no answer.`, () => {
    expect(hiraganaToRoman('じぃ')).toEqual([
      ['zyi', 'zixi', 'jyi', 'jixi'],
      2,
    ]);
  });
  it(`should return [xtu, xtsu] if 'っ' is followed by no char or alphabet.`, () => {
    expect(hiraganaToRoman('っ')).toEqual([['xtu', 'xtsu'], 1]);
    expect(hiraganaToRoman('っ2')).toEqual([['xtu', 'xtsu'], 1]);
  });
  it(`should add consonant if 'っ' is followed by hiragana.`, () => {
    expect(hiraganaToRoman('っぷ')).toEqual([['ppu', 'xtupu', 'xtsupu'], 2]);
    expect(hiraganaToRoman('っちゃ')).toEqual([
      [
        'ttya',
        'ccha',
        'ttixya',
        'cchixya',
        'xtutya',
        'xtucha',
        'xtutixya',
        'xtuchixya',
        'xtsutya',
        'xtsucha',
        'xtsutixya',
        'xtsuchixya',
      ],
      3,
    ]);
  });
  it(`should throw error if unknown character is given.`, () => {
    expect(() => {
      hiraganaToRoman('🍣');
    }).toThrowError('unknown character was given');
    expect(() => {
      hiraganaToRoman('漢字非対応');
    }).toThrowError('unknown character was given');
  });
  it(`should accept option.romanTable if unknown character is given.`, () => {
    expect(
      hiraganaToRoman('ふぁ', {
        romanTable: { ふぁ: ['fa', 'fuxa', 'hwa', 'huxa'] },
      })
    ).toEqual([['fa', 'fuxa', 'hwa', 'huxa'], 2]);
    expect(hiraganaToRoman('🍣', { romanTable: { '🍣': ['sushi'] } })).toEqual([
      ['sushi'],
      1,
    ]);
  });
  describe('enableLa', () => {
    it(`should return [xtu, xtsu, ltu, ltsu] if 'っ' is followed by no char or alphabet.`, () => {
      expect(hiraganaToRoman('っ', { enableLa: true })).toEqual([
        ['xtu', 'xtsu', 'ltu', 'ltsu'],
        1,
      ]);
      expect(hiraganaToRoman('っ2', { enableLa: true })).toEqual([
        ['xtu', 'xtsu', 'ltu', 'ltsu'],
        1,
      ]);
    });
    it(`should add consonant if 'っ' is followed by hiragana.`, () => {
      expect(hiraganaToRoman('っぷ', { enableLa: true })).toEqual([
        ['ppu', 'xtupu', 'xtsupu', 'ltupu', 'ltsupu'],
        2,
      ]);
      expect(hiraganaToRoman('っちゃ', { enableLa: true })).toEqual([
        [
          'ttya',
          'ccha',
          'ttixya',
          'cchixya',
          'ttilya',
          'cchilya',
          'xtutya',
          'xtucha',
          'xtutixya',
          'xtuchixya',
          'xtutilya',
          'xtuchilya',
          'xtsutya',
          'xtsucha',
          'xtsutixya',
          'xtsuchixya',
          'xtsutilya',
          'xtsuchilya',
          'ltutya',
          'ltucha',
          'ltutixya',
          'ltuchixya',
          'ltutilya',
          'ltuchilya',
          'ltsutya',
          'ltsucha',
          'ltsutixya',
          'ltsuchixya',
          'ltsutilya',
          'ltsuchilya',
        ],
        3,
      ]);
    });
    it(`should return decided value when received "ぁ" or "ゃ".`, () => {
      expect(hiraganaToRoman('ぁ', { enableLa: true })).toEqual([
        ['xa', 'la'],
        1,
      ]);
      expect(hiraganaToRoman('ぃ', { enableLa: true })).toEqual([
        ['xi', 'li'],
        1,
      ]);
      expect(hiraganaToRoman('ゅ', { enableLa: true })).toEqual([
        ['xyu', 'lyu'],
        1,
      ]);
    });
    it(`should return cached result if romanTable has the answer.`, () => {
      expect(hiraganaToRoman('うぁ', { enableLa: true })).toEqual([
        ['uxa', 'wha', 'ula'],
        2,
      ]);
      expect(hiraganaToRoman('しゃ', { enableLa: true })).toEqual([
        ['sya', 'sha', 'sixya', 'shixya', 'silya', 'shilya'],
        2,
      ]);
    });
    it(`should calculate result if romanTable has no answer.`, () => {
      expect(hiraganaToRoman('じぃ', { enableLa: true })).toEqual([
        ['zyi', 'zixi', 'jyi', 'jixi', 'zili', 'jili'],
        2,
      ]);
    });
    it(`should accept option.romanTable if unknown character is given.`, () => {
      expect(
        hiraganaToRoman('ふぁ', {
          romanTable: { ふぁ: ['fa', 'fuxa', 'hwa', 'huxa'] },
          enableLa: true,
        })
      ).toEqual([['fa', 'fuxa', 'hwa', 'huxa', 'fula', 'hula'], 2]);
    });
  });
  describe('enableCya', () => {
    it(`should return cached result if romanTable has the answer.`, () => {
      expect(hiraganaToRoman('ちゃ', { enableCya: true })).toEqual([
        ['tya', 'cha', 'tixya', 'chixya', 'cya'],
        2,
      ]);
    });
  });
  describe('enableHwa', () => {
    it(`should return cached result if romanTable has the answer.`, () => {
      expect(hiraganaToRoman('ふぁ', { enableHwa: true })).toEqual([
        ['fa', 'fuxa', 'huxa', 'hwa'],
        2,
      ]);
    });
  });
  describe('enableQa', () => {
    it(`should return cached result if romanTable has the answer.`, () => {
      expect(hiraganaToRoman('くぁ', { enableQa: true })).toEqual([
        ['kwa', 'kuxa', 'qa'],
        2,
      ]);
    });
  });
});
