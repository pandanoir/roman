import { getRoman } from '../src/main';

describe('getRoman', () => {
  it('should return empty when empty string was given.', () => {
    expect(getRoman('', 0)).toEqual([[''], 0]);
  });
  it('should throw error when given position is out of range.', () => {
    expect(() => {
      getRoman('あいうえお', 100);
    }).toThrowError('range out of the string selected');

    expect(() => {
      getRoman('あいうえお', -1);
    }).toThrowError('range out of the string selected');
  });
  it('should return n added roman when char is followed by ん.', () => {
    expect(getRoman('あんこ', 0)).toEqual([['a'], 1]);
    expect(getRoman('あんこ', 1)).toEqual([['n'], 1]);
    expect(getRoman('あんこ', 2)).toEqual([['ko', 'nko'], 1]);
  });
  it('should return given character when alphanumeric characters or symbols is given.', () => {
    expect(getRoman('a', 0)).toEqual([['a'], 1]);
    expect(getRoman('1', 0)).toEqual([['1'], 1]);
    expect(getRoman('!', 0)).toEqual([['!'], 1]);
  });
});
