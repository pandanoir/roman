import { romanTable, consonant } from './romanTable'; // romanTableには通常の規則性で対応できない文字のみを入れている。
const isAlphabet = char => char !== '' && 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ,:(){}.・!&%'.includes(char);

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

const baseRomanTable = romanTable;
export const hiraganaToRoman = (hiragana, option) => {
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
