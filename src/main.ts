import { romanTable, consonant as consonantDict } from './romanTable'; // romanTableには通常の規則性で対応できない文字のみを入れている。
const isAlphabet = (char: string) =>
  char !== '' &&
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ,:(){}.・!&%'.includes(
    char
  );

const xaToLa = (romanArr: readonly string[]) =>
  romanArr
    .filter(item => /x(?:[aiueo]|y[auo]|k[ae]|wa)/.test(item))
    .map(roman => roman.replace(/x([aiueo]|y[auo]|k[ae]|wa)/g, 'l$1'));
const isUndefined = (a: unknown): a is undefined => typeof a === 'undefined';

type Option = {
  romanTable?: Record<string, string[]>;
  enableCya?: boolean;
  enableHwa?: boolean;
  enableQa?: boolean;
  enableLa?: boolean;
  useApostrophe?: boolean;
};
const createSubRomanTable = (option: Option = {}) => {
  const subRomanTable = {};
  if (!option) return {};
  if (option.romanTable) Object.assign(subRomanTable, option.romanTable);
  if (option.enableCya)
    Object.assign(subRomanTable, {
      ちゃ: [...romanTable['ちゃ'], 'cya'] as const,
      ちぃ: [...romanTable['ちぃ'], 'cyi'] as const,
      ちゅ: [...romanTable['ちゅ'], 'cyu'] as const,
      ちぇ: [...romanTable['ちぇ'], 'cye'] as const,
      ちょ: [...romanTable['ちょ'], 'cyo'] as const,
    });
  if (option.enableHwa)
    Object.assign(subRomanTable, {
      ふぁ: [...romanTable['ふぁ'], 'hwa'] as const,
      ふぃ: [...romanTable['ふぃ'], 'hwi'] as const,
      ふぇ: [...romanTable['ふぇ'], 'hwe'] as const,
      ふぉ: [...romanTable['ふぉ'], 'hwo'] as const,
      ふゅ: [...romanTable['ふゅ'], 'hwyu'] as const,
    });
  if (option.enableQa)
    Object.assign(subRomanTable, {
      くぁ: [...romanTable['くぁ'], 'qa'] as const,
      くぃ: [...romanTable['くぃ'], 'qi'] as const,
      くぇ: [...romanTable['くぇ'], 'qe'] as const,
      くぉ: [...romanTable['くぉ'], 'qo'] as const,
    });
  if (option.enableLa)
    Object.assign(subRomanTable, {
      ぁ: [...romanTable['ぁ'], 'la'] as const,
      ぃ: [...romanTable['ぃ'], 'li'] as const,
      ぅ: [...romanTable['ぅ'], 'lu'] as const,
      ぇ: [...romanTable['ぇ'], 'le'] as const,
      ぉ: [...romanTable['ぉ'], 'lo'] as const,
      ゃ: [...romanTable['ゃ'], 'lya'] as const,
      ゅ: [...romanTable['ゅ'], 'lyu'] as const,
      ょ: [...romanTable['ょ'], 'lyo'] as const,
      ヵ: [...romanTable['ヵ'], 'lka'] as const,
      ゕ: [...romanTable['ヵ'], 'lka'] as const,
      ヶ: [...romanTable['ヶ'], 'lke'] as const,
      ゖ: [...romanTable['ヶ'], 'lke'] as const,
      ゎ: [...romanTable['ヮ'], 'lwa'] as const,
      ヮ: [...romanTable['ヮ'], 'lwa'] as const,
    });
  if (option.useApostrophe) {
    Object.assign(subRomanTable, {
      てぃ: [...romanTable['てぃ'], `t'i`] as const,
      でぃ: [...romanTable['でぃ'], `d'i`] as const,
      てゅ: [...romanTable['てゅ'], `t'yu`] as const,
      でゅ: [...romanTable['でゅ'], `d'yu`] as const,
      とぅ: [...romanTable['とぅ'], `t'u`] as const,
      どぅ: [...romanTable['どぅ'], `d'u`] as const,
    });
  }
  return subRomanTable;
};

const baseRomanTable = romanTable;
export const hiraganaToRoman = (
  hiragana: string,
  option: Option = {}
): [readonly string[], number] => {
  // hiraganaToRoman('しゃ') == [['sya', 'sha', 'sixya', 'shixya'], 2]
  // hiraganaToRoman('っぷ') == [['ppu', 'xtupu', 'xtsupu'], 2]

  const romanTable = Object.assign(
    {},
    baseRomanTable,
    createSubRomanTable(option)
  );

  if (hiragana === '') return [[''], 0];

  const first = Array.from(hiragana)[0] || '',
    second = Array.from(hiragana)[1] || '';

  if (
    second !== '' &&
    ('ぁ' === second ||
      'ぃ' === second ||
      'ぅ' === second ||
      'ぇ' === second ||
      'ぉ' === second ||
      'ゃ' === second ||
      'ゅ' === second ||
      'ょ' === second)
  ) {
    const kana = first + second;
    if ({}.hasOwnProperty.call(romanTable, kana)) {
      if (option && option.enableLa)
        return [[...romanTable[kana], ...xaToLa(romanTable[kana])], 2];
      return [romanTable[kana].concat(), 2];
    }
    // キャッシュがない場合の処理

    const romanOfSmallChar = {
      ぁ: ['ya', 'ixa'],
      ぅ: ['yu', 'ixu'],
      ぉ: ['yo', 'ixo'],

      ぃ: ['yi', 'ixi'],
      ぇ: ['ye', 'ixe'],
      ゃ: ['ya', 'ixya'],
      ゅ: ['yu', 'ixyu'],
      ょ: ['yo', 'ixyo'],
    }[second];

    const romans = [];
    const consonant = consonantDict[first];
    if (
      !{}.hasOwnProperty.call(consonantDict, first) ||
      isUndefined(consonant)
    ) {
      throw new Error(`Unexpected かな文字(${first}) was given. `);
    }
    for (const cons of consonant.split(','))
      romans.push(...romanOfSmallChar.map(roman => `${cons}${roman}`));
    romanTable[first + second] = romans.concat(); // キャッシュする
    if (option && option.enableLa) return [romans.concat(xaToLa(romans)), 2];
    return [romans, 2];
  }
  if (first !== '' && 'ぁぃぅぇぉゃゅょ'.includes(first))
    return [romanTable[first].concat(), 1];
  if (first === 'ん') {
    // 今の文字が「ん」の場合
    // 最低限入力しなければならない文字数のみ返す
    // 余分なもの("あんこ"に対するan'n'ko)は後ろの文字にくっつける(nkoと解釈する)

    if (isAlphabet(second)) return [['n'], 1];
    if (second === '') return [['nn'], 1];
    const consonant = consonantDict[second];
    if (isUndefined(consonant)) {
      throw new Error(`Unexpected かな文字(${second}) was given. `);
    }
    if ('ny'.includes(consonant)) {
      // consonant[second] === ''も含む
      return [['nn'], 1]; // 「んな」「んや」「んあ」のとき
    }
    return [['n'], 1];
  }
  if (first === 'っ') {
    // 「女神さまっ」や「女神さまっ2」のように、後ろが存在しないか記号のケース
    if (second === '' || isAlphabet(second)) {
      if (option && option.enableLa) return [['xtu', 'xtsu', 'ltu', 'ltsu'], 1];
      return [['xtu', 'xtsu'], 1];
    }
    const [nextCharRoman, count] = hiraganaToRoman(hiragana.slice(1), option);
    if (option && option.enableLa)
      return [
        [
          ...nextCharRoman.map(item => `${item.charAt(0)}${item}`), // 「マップ」の'ppu'に相当
          ...nextCharRoman.map(roman => `xtu${roman}`),
          ...nextCharRoman.map(roman => `xtsu${roman}`),
          ...nextCharRoman.map(roman => `ltu${roman}`),
          ...nextCharRoman.map(roman => `ltsu${roman}`),
        ],
        count + 1,
      ];
    return [
      [
        ...nextCharRoman.map(item => `${item.charAt(0)}${item}`), // 「マップ」の'ppu'に相当
        ...nextCharRoman.map(roman => `xtu${roman}`),
        ...nextCharRoman.map(roman => `xtsu${roman}`),
      ],
      count + 1,
    ];
  }

  if (romanTable[first] == null) throw new Error('unknown character was given');
  return [romanTable[first].concat(), 1]; // 普通のとき
};
export const getRoman = (
  furigana: string,
  targetPos: number,
  option: Option = {}
): [readonly string[], number] => {
  // ローマ字の取得
  // furiganaのtargetPosの位置を取得
  // 結果は配列の形式で返す
  // [[ローマ字], 変換対象となる文字数]
  const nowChar = furigana.charAt(targetPos);

  if (furigana === '') return [[''], 0];
  if (isAlphabet(nowChar)) return [[nowChar], 1];
  if (targetPos < 0 || targetPos >= furigana.length)
    throw new Error('range out of the string selected');

  const [roman, targetHiraganaLength] = hiraganaToRoman(
    furigana.slice(targetPos),
    option
  );

  // 「あんこ」をankoでもannkoでも打てるようにする処理
  // 「こが'ko'でも'nko'でも良い」と解釈している
  const consonant = consonantDict[nowChar];
  if (
    furigana.charAt(targetPos - 1) === 'ん' &&
    !isUndefined(consonant) && !'ny'.includes(consonant)
  )
    return [
      roman.concat(roman.map(roman => `n${roman}`)),
      targetHiraganaLength,
    ];

  return [roman, targetHiraganaLength];
};
export const toRoman = (
  furigana: string,
  option: Option = {}
): (readonly string[])[] => {
  let index = 0;
  const romans = [];
  while (furigana.length > index) {
    const [roman, targetHiraganaLength] = getRoman(furigana, index, option);
    index += targetHiraganaLength;
    romans.push(roman);
  }
  return romans;
};
