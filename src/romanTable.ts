const Va = ['va', 'vuxa'],
  Vi = ['vi', 'vuxi'],
  Vu = ['vu'],
  Ve = ['ve', 'vuxe'],
  Vo = ['vo', 'vuxo'];

const specialRomansTable = {
  を: ['wo'],
  うぁ: ['uxa', 'wha'],
  うぃ: ['wi', 'uxi', 'whi'],
  うぇ: ['we', 'uxe', 'whe'],
  うぉ: ['uxo', 'who'],
  ゔぁ: Va,
  ゔぃ: Vi,
  ゔ: ['vu'],
  ゔぇ: ['ve', 'vuxe'],
  ゔぉ: ['vo', 'vuxo'],
  ゔゅ: ['vyu'],
  ヴぁ: Va,
  ヴぃ: Vi,
  ヴ: Vu,
  ヴぇ: Ve,
  ヴぉ: Vo,

  くぁ: ['kwa', 'kuxa'],
  くぃ: ['kwi', 'kuxi'],
  くぅ: ['kwu', 'kuxu'],
  くぇ: ['kwe', 'kuxe'],
  くぉ: ['kwo', 'kuxo'],
  ぐぁ: ['gwa', 'guxa'],
  ぐぃ: ['gwi', 'guxi'],
  ぐぅ: ['gwu', 'guxu'],
  ぐぇ: ['gwe', 'guxe'],
  ぐぉ: ['gwo', 'guxo'],
  しゃ: ['sya', 'sha', 'sixya', 'shixya'],
  しぃ: ['syi', 'sixi', 'shixi'],
  しゅ: ['syu', 'shu', 'sixyu', 'shixyu'],
  しぇ: ['sye', 'she', 'sixe', 'shixe'],
  しょ: ['syo', 'sho', 'sixyo', 'shixyo'],
  じゃ: ['ja', 'jya', 'zya', 'jixya', 'zixya'],
  じゅ: ['ju', 'jyu', 'zyu', 'jixyu', 'zixyu'],
  じぇ: ['je', 'jye', 'zye', 'jixe', 'zixe'],
  じょ: ['jo', 'jyo', 'zyo', 'jixyo', 'zixyo'],
  ちゃ: ['tya', 'cha', 'tixya', 'chixya'],
  ちぃ: ['tyi', 'tixi', 'chixi'],
  ちゅ: ['tyu', 'chu', 'tixyu', 'chixyu'],
  ちぇ: ['tye', 'che', 'tixe', 'chixe'],
  ちょ: ['tyo', 'cho', 'tixyo', 'chixyo'],
  つぁ: ['tsa', 'tuxa', 'tsuxa'],
  つぃ: ['tsi', 'tuxi', 'tsuxi'],
  つぇ: ['tse', 'tuxe', 'tsuxe'],
  つぉ: ['tso', 'tuxo', 'tsuxo'],
  でぃ: ['dhi', 'dexi'],
  でゅ: ['dhu', 'dexyu'],
  どぅ: ['dwu', 'doxu'],
  てぃ: ['thi', 'texi'],
  てぇ: ['the', 'texe'],
  てゅ: ['thu', 'texyu'],
  とぁ: ['twa', 'toxa'],
  とぃ: ['twi', 'toxi'],
  とぅ: ['twu', 'toxu'],
  とぇ: ['twe', 'toxe'],
  とぉ: ['two', 'toxo'],
  ふぁ: ['fa', 'fuxa', 'huxa'],
  ふぃ: ['fi', 'fuxi', 'huxi'],
  ふぇ: ['fe', 'fuxe', 'huxe'],
  ふぉ: ['fo', 'fuxo', 'huxo'],
  ふゅ: ['fyu', 'fuxyu', 'huxyu'],
  ゐ: ['wyi'],
  ゑ: ['wye'],
  ー: ['-'],
  '。': ['.'],
} as const;

export const consonant: Record<string, string | undefined> = {
  し: 's,sh',
  ち: 't,ch',
  つ: 't,ts',
  ふ: 'h,f',
  じ: 'z,j',
};

export const romanTable: typeof specialRomansTable &
  Record<string, readonly string[]> = { ...specialRomansTable };
// 基本的なローマ字表を構築する
for (const [hiraganas, consonants] of [
  ['あいうえお', ''],
  ['かきくけこ', 'k'],
  ['さしすせそ', 's'],
  ['たちつてと', 't'],
  ['なにぬねの', 'n'],
  ['はひふへほ', 'h'],
  ['まみむめも', 'm'],
  ['やゆよ', 'y'],
  ['らりるれろ', 'r'],
  ['わ', 'w'],
  ['がぎぐげご', 'g'],
  ['ざじずぜぞ', 'z'],
  ['だぢづでど', 'd'],
  ['ばびぶべぼ', 'b'],
  ['ぱぴぷぺぽ', 'p'],
]) {
  for (let i = 0, _i = hiraganas.length; i < _i; i++) {
    if (!consonant[hiraganas[i]]) {
      consonant[hiraganas[i]] = consonants;
    }
    romanTable[hiraganas[i]] = (consonant[hiraganas[i]] || consonants)
      .split(',')
      .map((consonant) => consonant + 'aiueo'[i]);
  }
}

romanTable['ゆ'] = ['yu'];
romanTable['よ'] = ['yo'];

romanTable['ぁ'] = ['xa'];
romanTable['ぃ'] = ['xi'];
romanTable['ぅ'] = ['xu'];
romanTable['ぇ'] = ['xe'];
romanTable['ぉ'] = ['xo'];
romanTable['ゃ'] = ['xya'];
romanTable['ゅ'] = ['xyu'];
romanTable['ょ'] = ['xyo'];
romanTable['ヵ'] = romanTable['ゕ'] = ['xka'];
romanTable['ヶ'] = romanTable['ゖ'] = ['xke'];
romanTable['ゎ'] = romanTable['ヮ'] = ['xwa'];
