import { firstCharToRoman } from '../src/main';

describe('firstCharToRoman', () => {
  describe('special cases', () => {
    test(`ぁ,ぃ,ゃ`, () => {
      expect(firstCharToRoman('ぁ')).toEqual([['xa'], 1]);
      expect(firstCharToRoman('ぃ')).toEqual([['xi'], 1]);
      expect(firstCharToRoman('ゅ')).toEqual([['xyu'], 1]);
    });
    test(`うぁ,しゃ,じぃ`, () => {
      expect(firstCharToRoman('うぁ')).toEqual([['uxa', 'wha'], 2]);
      expect(firstCharToRoman('しゃ')).toEqual([
        ['sya', 'sha', 'sixya', 'shixya'],
        2,
      ]);
      expect(firstCharToRoman('じぃ')).toEqual([
        ['zyi', 'zixi', 'jyi', 'jixi'],
        2,
      ]);
    });
  });
  it(`returns n when "ん" isn't followed by "な" or "や".`, () => {
    expect(firstCharToRoman('んか')).toEqual([['n'], 1]);
    expect(firstCharToRoman('んちゃ')).toEqual([['n'], 1]);
    expect(firstCharToRoman('ん100%')).toEqual([['n'], 1]);
    expect(firstCharToRoman('んa')).toEqual([['n'], 1]);
    expect(firstCharToRoman('ん.')).toEqual([['n'], 1]);
    expect(firstCharToRoman('ん!')).toEqual([['n'], 1]);
  });
  it(`returns nn when "ん" is followed by "な" or "や".`, () => {
    expect(firstCharToRoman('んな')).toEqual([['nn'], 1]);
    expect(firstCharToRoman('んや')).toEqual([['nn'], 1]);
    expect(firstCharToRoman('んい')).toEqual([['nn'], 1]);
    expect(firstCharToRoman('ん')).toEqual([['nn'], 1]);
  });
  it(`returns [xtu, xtsu] if 'っ' is followed by no char or alphabet.`, () => {
    expect(firstCharToRoman('っ')).toEqual([['xtu', 'xtsu'], 1]);
    expect(firstCharToRoman('っ2')).toEqual([['xtu', 'xtsu'], 1]);
  });
  it(`adds consonant if 'っ' is followed by hiragana.`, () => {
    expect(firstCharToRoman('っぷ')).toEqual([['ppu', 'xtupu', 'xtsupu'], 2]);
    expect(firstCharToRoman('っちゃ')).toEqual([
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
  it(`throws error if unknown character is given.`, () => {
    expect(() => {
      firstCharToRoman('🍣');
    }).toThrowError('unknown character was given');
    expect(() => {
      firstCharToRoman('漢字非対応');
    }).toThrowError('unknown character was given');
  });
  it(`accepts option.romanTable if unknown character is given.`, () => {
    expect(
      firstCharToRoman('ふぁ', {
        romanTable: { ふぁ: ['fa', 'fuxa', 'hwa', 'huxa'] },
      })
    ).toEqual([['fa', 'fuxa', 'hwa', 'huxa'], 2]);
    expect(firstCharToRoman('🍣', { romanTable: { '🍣': ['sushi'] } })).toEqual([
      ['sushi'],
      1,
    ]);
  });
  describe('enableLa', () => {
    it(`returns [xtu, xtsu, ltu, ltsu] if 'っ' is followed by no char or alphabet.`, () => {
      expect(firstCharToRoman('っ', { enableLa: true })).toEqual([
        ['xtu', 'xtsu', 'ltu', 'ltsu'],
        1,
      ]);
      expect(firstCharToRoman('っ2', { enableLa: true })).toEqual([
        ['xtu', 'xtsu', 'ltu', 'ltsu'],
        1,
      ]);
    });
    it(`adds consonant if 'っ' is followed by hiragana.`, () => {
      expect(firstCharToRoman('っぷ', { enableLa: true })).toEqual([
        ['ppu', 'xtupu', 'xtsupu', 'ltupu', 'ltsupu'],
        2,
      ]);
      expect(firstCharToRoman('っちゃ', { enableLa: true })).toEqual([
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
    it(`returns decided value when received "ぁ" or "ゃ".`, () => {
      expect(firstCharToRoman('ぁ', { enableLa: true })).toEqual([
        ['xa', 'la'],
        1,
      ]);
      expect(firstCharToRoman('ぃ', { enableLa: true })).toEqual([
        ['xi', 'li'],
        1,
      ]);
      expect(firstCharToRoman('ゅ', { enableLa: true })).toEqual([
        ['xyu', 'lyu'],
        1,
      ]);
    });
    it(`returns cached result if romanTable has the answer.`, () => {
      expect(firstCharToRoman('うぁ', { enableLa: true })).toEqual([
        ['uxa', 'wha', 'ula'],
        2,
      ]);
      expect(firstCharToRoman('しゃ', { enableLa: true })).toEqual([
        ['sya', 'sha', 'sixya', 'shixya', 'silya', 'shilya'],
        2,
      ]);
    });
    it(`calculates result if romanTable has no answer.`, () => {
      expect(firstCharToRoman('じぃ', { enableLa: true })).toEqual([
        ['zyi', 'zixi', 'jyi', 'jixi', 'zili', 'jili'],
        2,
      ]);
    });
    it(`accepts option.romanTable if unknown character is given.`, () => {
      expect(
        firstCharToRoman('ふぁ', {
          romanTable: { ふぁ: ['fa', 'fuxa', 'hwa', 'huxa'] },
          enableLa: true,
        })
      ).toEqual([['fa', 'fuxa', 'hwa', 'huxa', 'fula', 'hula'], 2]);
    });
  });
  describe('enableCya', () => {
    it(`returns cached result if romanTable has the answer.`, () => {
      expect(firstCharToRoman('ちゃ', { enableCya: true })).toEqual([
        ['tya', 'cha', 'tixya', 'chixya', 'cya'],
        2,
      ]);
    });
  });
  describe('enableHwa', () => {
    it(`returns cached result if romanTable has the answer.`, () => {
      expect(firstCharToRoman('ふぁ', { enableHwa: true })).toEqual([
        ['fa', 'fuxa', 'huxa', 'hwa'],
        2,
      ]);
    });
  });
  describe('enableQa', () => {
    it(`returns cached result if romanTable has the answer.`, () => {
      expect(firstCharToRoman('くぁ', { enableQa: true })).toEqual([
        ['kwa', 'kuxa', 'qa'],
        2,
      ]);
    });
  });
});
