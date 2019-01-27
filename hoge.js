const romanTable = {
    'うぁ': ['uxa','wha'],'うぃ': ['wi','uxi','whi'],'うぇ': ['we','uxe','whe'],'うぉ': ['uxo','who'],
    'ゔぁ': ['va','vuxa'],'ゔぃ': ['vi','vuxi'],'ゔ': ['vu'],'ゔぇ': ['ve','vuxe'],'ゔぉ': ['vo','vuxo'],
    'くぁ': ['kwa','kuxa'], 'くぃ': ['kwi','kuxi'], 'くぅ': ['kwu','kuxu'], 'くぇ': ['kwe','kuxe'], 'くぉ': ['kwo','kuxo'],
    'ぐぁ': ['gwa','guxa'],'ぐぃ': ['gwi','guxi'],'ぐぅ': ['gwu','guxu'],'ぐぇ': ['gwe','guxe'],'ぐぉ': ['gwo','guxo'],
    'しゃ': ['sya','sha','sixya','shixya'],'しぃ': ['syi', 'sixi', 'shixi'],'しゅ': ['syu','shu','sixyu','shixyu'],'しぇ': ['sye','she','sixe','shixe'],'しょ': ['syo','sho','sixyo','shixyo'],
    'じゃ': ['ja','jya','zya','jixya','zixya'],'じゅ': ['ju','jyu','zyu','jixyu','zixyu'],'じぇ': ['je','jye','zye','jixe','zixe'],'じょ': ['jo','jyo','zyo','jixyo','zixyo'],
    'ちゃ': ['tya','cha','tixya','chixya'],'ちぃ': ['tyi','tixi','chixi'],'ちゅ': ['tyu','chu','tixyu','chixyu'],'ちぇ': ['tye','che','tixe','chixe'],'ちょ': ['tyo','cho','tixyo','chixyo'],
    'つぁ': ['tsa','tuxa','tsuxa'],'つぃ': ['tsi','tuxi','tsuxi'],'つぇ': ['tse','tuxe','tsuxe'],'つぉ': ['tso','tuxo','tsuxo'],
    'でぃ': ['dhi','dexi'],'でゅ': ['dhu','dexyu'],'どぅ': ['dwu','doxu'],
    'てぃ': ['thi','texi'],'てぇ': ['the','texe'],
    'とぁ': ['twa','toxa'],'とぃ': ['twi','toxi'],'とぅ': ['twu','toxu'],'とぇ': ['twe','toxe'],'とぉ': ['two','toxo'],
    'ふぁ': ['fa','fuxa','huxa'],'ふぃ': ['fi','fuxi','huxi'],'ふぇ': ['fe','fuxe','huxe'],'ふぉ': ['fo','fuxo','huxo'],
};

const {hiraganaToRoman} = require('./dist/roman.js');

for (const key of Object.keys(romanTable)) {
    console.log(key);
    const a = JSON.stringify(romanTable[key].sort());
    const b = JSON.stringify(hiraganaToRoman(key)[0].sort());
    if (a !== b) console.log(key, `romanTable: ${a}, calculate: ${b}`);
}
