export const romanTable = {
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


export const consonant = { 'し': 's,sh', 'ち': 't,ch', 'つ': 't,ts', 'ふ': 'h,f', 'じ': 'z,j', };

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
