import { toRoman } from '../src/main';

describe('toRoman', () => {
  it('should return the all possible roman forms.', () => {
    expect(toRoman('あんこ')).toEqual([['i'], ['n'], ['ko', 'nko']]);
    expect(toRoman('あっこ')).toEqual([['a'], ['kko', 'xtuko', 'xtsuko']]);
    expect(toRoman('ああっめがみさまっ')).toEqual([
      ['a'],
      ['a'],
      ['mme', 'xtume', 'xtsume'],
      ['ga'],
      ['mi'],
      ['sa'],
      ['ma'],
      ['xtu', 'xtsu'],
    ]);
    expect(toRoman('ああっめがみさまっ2')).toEqual([
      ['a'],
      ['a'],
      ['mme', 'xtume', 'xtsume'],
      ['ga'],
      ['mi'],
      ['sa'],
      ['ma'],
      ['xtu', 'xtsu'],
      ['2'],
    ]);
    expect(toRoman('あんな')).toEqual([['a'], ['nn'], ['na']]);
    expect(toRoman('あんやく')).toEqual([['a'], ['nn'], ['ya'], ['ku']]);
    expect(toRoman('こんいん')).toEqual([['ko'], ['nn'], ['i'], ['nn']]);
    expect(toRoman('ふぃっしゃーず')).toEqual([
      ['fi', 'fuxi', 'huxi'],
      [
        'ssya',
        'ssha',
        'ssixya',
        'sshixya',
        'xtusya',
        'xtusha',
        'xtusixya',
        'xtushixya',
        'xtsusya',
        'xtsusha',
        'xtsusixya',
        'xtsushixya',
      ],
      ['-'],
      ['zu'],
    ]);
    expect(toRoman('じゃず')).toEqual([
      ['ja', 'jya', 'zya', 'jixya', 'zixya'],
      ['zu'],
    ]);
  });
});
