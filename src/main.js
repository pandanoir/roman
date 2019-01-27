const isAlphabet = char => char !== '' && 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ,:(){}.・!&%'.includes(char);

// romanTableには通常の規則性で対応できない文字のみを入れている。
const romanTable = {
    'を': ['wo'],
    'うぁ': ['uxa','wha'],'うぃ': ['wi','uxi','whi'],'うぇ': ['we','uxe','whe'],'うぉ': ['uxo','who'],
    'ゔぁ': ['va','vuxa'],'ゔぃ': ['vi','vuxi'],'ゔ': ['vu'],'ゔぇ': ['ve','vuxe'],'ゔぉ': ['vo','vuxo'], 'ゔゅ': ['vyu'],
    'くぁ': ['kwa','kuxa'], 'くぃ': ['kwi','kuxi'], 'くぅ': ['kwu','kuxu'], 'くぇ': ['kwe','kuxe'], 'くぉ': ['kwo','kuxo'],
    'ぐぁ': ['gwa','guxa'],'ぐぃ': ['gwi','guxi'],'ぐぅ': ['gwu','guxu'],'ぐぇ': ['gwe','guxe'],'ぐぉ': ['gwo','guxo'],
    'しゃ': ['sya','sha','sixya','shixya'],'しぃ': ['syi', 'sixi', 'shixi'],'しゅ': ['syu','shu','sixyu','shixyu'],'しぇ': ['sye','she','sixe','shixe'],'しょ': ['syo','sho','sixyo','shixyo'],
    'じゃ': ['ja','jya','zya','jixya','zixya'],'じゅ': ['ju','jyu','zyu','jixyu','zixyu'],'じぇ': ['je','jye','zye','jixe','zixe'],'じょ': ['jo','jyo','zyo','jixyo','zixyo'],
    'ちゃ': ['tya','cha','tixya','chixya'],'ちぃ': ['tyi','tixi','chixi'],'ちゅ': ['tyu','chu','tixyu','chixyu'],'ちぇ': ['tye','che','tixe','chixe'],'ちょ': ['tyo','cho','tixyo','chixyo'],
    'つぁ': ['tsa','tuxa','tsuxa'],'つぃ': ['tsi','tuxi','tsuxi'],'つぇ': ['tse','tuxe','tsuxe'],'つぉ': ['tso','tuxo','tsuxo'],
    'でぃ': ['dhi','dexi'],'でゅ': ['dhu','dexyu'],'どぅ': ['dwu','doxu'],
    'てぃ': ['thi','texi'],'てぇ': ['the','texe'],'てゅ': ['thu','texyu'],
    'とぁ': ['twa','toxa'],'とぃ': ['twi','toxi'],'とぅ': ['twu','toxu'],'とぇ': ['twe','toxe'],'とぉ': ['two','toxo'],
    'ふぁ': ['fa','fuxa','huxa'],'ふぃ': ['fi','fuxi','huxi'],'ふぇ': ['fe','fuxe','huxe'],'ふぉ': ['fo','fuxo','huxo'], 'ふゅ': ['fyu','fuxyu','huxyu'],
    'ゐ': ['wyi'],'ゑ': ['wye'],'ー': ['-'],'。': ['.']
};

romanTable['ヴぁ'] = romanTable['ゔぁ']; romanTable['ヴぃ'] = romanTable['ゔぃ'];
romanTable['ヴ'] = romanTable['ゔ']; romanTable['ヴぇ'] = romanTable['ゔぇ'];
romanTable['ヴぉ'] = romanTable['ゔぉ'];

const consonant = { 'し': 's,sh', 'ち': 't,ch', 'つ': 't,ts', 'ふ': 'h,f', 'じ': 'z,j', };

// 基本的なローマ字表を構築する
for (const [hiraganas, cons] of [
    ['あいうえお', ''], ['かきくけこ', 'k'],
    ['さしすせそ', 's'], ['たちつてと', 't'],
    ['なにぬねの', 'n'], ['はひふへほ', 'h'],
    ['まみむめも', 'm'], ['やゆよ', 'y'],
    ['らりるれろ', 'r'], ['わ', 'w'],
    ['がぎぐげご', 'g'], ['ざじずぜぞ', 'z'],
    ['だぢづでど', 'd'], ['ばびぶべぼ', 'b'],
    ['ぱぴぷぺぽ', 'p']]) {
    for (let i = 0, _i = hiraganas.length; i < _i; i++) {
        if (!consonant[hiraganas[i]])
            consonant[hiraganas[i]] = cons;
        romanTable[hiraganas[i]] = consonant[hiraganas[i]].split(',').map(cons => cons + 'aiueo'[i]);
    }
}
romanTable['ゆ'] = ['yu']; romanTable['よ'] = ['yo'];

romanTable['ぁ'] = ['xa']; romanTable['ぃ'] = ['xi'];
romanTable['ぅ'] = ['xu']; romanTable['ぇ'] = ['xe'];
romanTable['ぉ'] = ['xo'];
romanTable['ゃ'] = ['xya']; romanTable['ゅ'] = ['xyu']; romanTable['ょ'] = ['xyo'];
romanTable['ヵ'] = romanTable['ゕ'] = ['xka'];
romanTable['ヶ'] = romanTable['ゖ'] = ['xke'];
romanTable['ゎ'] = romanTable['ヮ'] = ['xwa'];

const xaToLa = romanArr => romanArr.filter(item => /x(?:[aiueo]|y[auo]|k[ae]|wa)/.test(item))
        .map(roman => roman.replace(/x([aiueo]|y[auo]|k[ae]|wa)/g, 'l$1'));
const createSubRomanTable = option => {
    const subRomanTable = {};
    if (!option) return {};
    if (option.romanTable)
        Object.assign(subRomanTable, option.romanTable);
    if (option.enableCya)
        Object.assign(subRomanTable, {
            'ちゃ': romanTable['ちゃ'].concat('cya'), 'ちぃ': romanTable['ちぃ'].concat('cyi'),
            'ちゅ': romanTable['ちゅ'].concat('cyu'), 'ちぇ': romanTable['ちぇ'].concat('cye'),
            'ちょ': romanTable['ちょ'].concat('cyo'),
        });
    if (option.enableHwa)
        Object.assign(subRomanTable, {
            'ふぁ': romanTable['ふぁ'].concat('hwa'), 'ふぃ': romanTable['ふぃ'].concat('hwi'),
            'ふぇ': romanTable['ふぇ'].concat('hwe'), 'ふぉ': romanTable['ふぉ'].concat('hwo'),
            'ふゅ': romanTable['ふゅ'].concat('hwyu'),
        });
    if (option.enableQa)
        Object.assign(subRomanTable, {
            'くぁ': romanTable['くぁ'].concat('qa'), 'くぃ': romanTable['くぃ'].concat('qi'),
            'くぇ': romanTable['くぇ'].concat('qe'), 'くぉ': romanTable['くぉ'].concat('qo'),
        });
    if (option.enableLa)
        Object.assign(subRomanTable, {
            'ぁ': romanTable['ぁ'].concat(['la']),
            'ぃ': romanTable['ぃ'].concat(['li']),
            'ぅ': romanTable['ぅ'].concat(['lu']),
            'ぇ': romanTable['ぇ'].concat(['le']),
            'ぉ': romanTable['ぉ'].concat(['lo']),
            'ゃ': romanTable['ゃ'].concat(['lya']),
            'ゅ': romanTable['ゅ'].concat(['lyu']),
            'ょ': romanTable['ょ'].concat(['lyo']),
            'ヵ': romanTable['ヵ'].concat(['lka']),
            'ゕ': romanTable['ヵ'].concat(['lka']),
            'ヶ': romanTable['ヶ'].concat(['lke']),
            'ゖ': romanTable['ヶ'].concat(['lke']),
            'ゎ':romanTable['ヮ'].concat(['lwa']),
            'ヮ': romanTable['ヮ'].concat(['lwa']),
        });
    if (option.useApostrophe) {
        Object.assign(subRomanTable, {
            'てぃ': romanTable['てぃ'].concat([`t'i`]),
            'でぃ': romanTable['でぃ'].concat([`d'i`]),
            'てゅ': romanTable['てゅ'].concat([`t'yu`]),
            'でゅ': romanTable['でゅ'].concat([`d'yu`]),
            'とぅ': romanTable['とぅ'].concat([`t'u`]),
            'どぅ': romanTable['どぅ'].concat([`d'u`]),
        });
    }
    return subRomanTable;
}

export const hiraganaToRoman = (() => {
    const baseRomanTable = romanTable;
    return (hiragana, option) => {
        // hiraganaToRoman('しゃ') == [['sya', 'sha', 'sixya', 'shixya'], 2]
        // hiraganaToRoman('っぷ') == [['ppu', 'xtupu', 'xtsupu'], 2]

        const romanTable = Object.assign({}, baseRomanTable, createSubRomanTable(option));

        if (hiragana === '') return [[''], 0];

        const first = [...hiragana][0] || '',
              second =  [...hiragana][1] || '';

        if (second !== '' && 'ぁぃぅぇぉゃゅょ'.includes(second)) {
            if (romanTable[first+second]) {
                if (option && option.enableLa)
                    return [romanTable[first+second].concat(xaToLa(romanTable[first+second])), 2];
                return [romanTable[first+second].concat(), 2];
            }
            // キャッシュがない場合の処理

            const romanOfSmallChar = {
                'ぁ': ['ya', 'ixa'],
                'ぅ': ['yu', 'ixu'],
                'ぉ': ['yo', 'ixo'],

                'ぃ': ['yi', 'ixi'],
                'ぇ': ['ye', 'ixe'],
                'ゃ': ['ya', 'ixya'],
                'ゅ': ['yu', 'ixyu'],
                'ょ': ['yo', 'ixyo']
            }[second];

            const romans = [];
            for (const cons of consonant[first].split(','))
                romans.push(...romanOfSmallChar.map(roman => `${cons}${roman}`));
            romanTable[first+second] = romans.concat(); // キャッシュする
            if (option && option.enableLa)
                return [romans.concat(xaToLa(romans)), 2];
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
            if ('ny'.includes(consonant[second])) // consonant[second] === ''も含む
                return [['nn'], 1]; // 「んな」「んや」「んあ」のとき
            return [['n'], 1];
        }
        if (first === 'っ') {
            // 「女神さまっ」や「女神さまっ2」のように、後ろが存在しないか記号のケース
            if (second === '' || isAlphabet(second)) {
                if (option && option.enableLa)
                    return [['xtu', 'xtsu', 'ltu', 'ltsu'], 1];
                return [['xtu', 'xtsu'], 1];
            }
            const [nextCharRoman, count] = hiraganaToRoman(hiragana.slice(1), option);
            if (option && option.enableLa)
                return [
                    [ ...nextCharRoman.map(item => `${item.charAt(0)}${item}`), // 「マップ」の'ppu'に相当
                      ...nextCharRoman.map(roman => `xtu${roman}`),
                      ...nextCharRoman.map(roman => `xtsu${roman}`),
                      ...nextCharRoman.map(roman => `ltu${roman}`),
                      ...nextCharRoman.map(roman => `ltsu${roman}`),
                    ],
                    count + 1];
            return [
                [ ...nextCharRoman.map(item => `${item.charAt(0)}${item}`), // 「マップ」の'ppu'に相当
                  ...nextCharRoman.map(roman => `xtu${roman}`),
                  ...nextCharRoman.map(roman => `xtsu${roman}`) ],
                count + 1];
        }

        if (romanTable[first] == null) throw new Error('unknown character was given');
        return [romanTable[first].concat(), 1]; // 普通のとき
    };
})();
export const getRoman = (furigana, targetPos, option) => {
    // ローマ字の取得
    // furiganaのtargetPosの位置を取得
    // 結果は配列の形式で返す
    // [[ローマ字], 変換対象となる文字数]
    const nowChar = furigana.charAt(targetPos);

    if (furigana === '') return [[''], 0];
    if (isAlphabet(nowChar)) return [[nowChar], 1];
    if (targetPos < 0 || targetPos >= furigana.length)
        throw new Error('range out of the string selected')

    const [roman, targetHiraganaLength] = hiraganaToRoman(furigana.slice(targetPos), option);

    // 「あんこ」をankoでもannkoでも打てるようにする処理
    // 「こが'ko'でも'nko'でも良い」と解釈している
    if (furigana.charAt(targetPos - 1) === 'ん' && !'ny'.includes(consonant[nowChar]))
        return [roman.concat(roman.map(roman => `n${roman}`)), targetHiraganaLength];

    return [roman, targetHiraganaLength];
};
export const toRoman = (furigana, option) => {
    let index = 0;
    const romans = [];
    while (furigana.length > index) {
        const [roman, targetHiraganaLength] = getRoman(furigana, index, option);
        index += targetHiraganaLength;
        romans.push(roman);
    }
    return romans;
}
