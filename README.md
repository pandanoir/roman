This library converts Hiragana to roman. All Roman scripts corresponding to the given japanese string will be written out.

# Example

```javascript
getRoman('あんこう', 0) // [['a'], 1];
getRoman('あんこう', 1) // [['n'], 1];
getRoman('あんこう', 2) // [['ko', 'nko'], 1];
getRoman('あんこう', 3) // [['u'], 1];

getRoman('がっちゃまん', 1) // [['ttya', 'ccha', 'ttixya', 'cchixya', 'xtutya', 'xtucha', 'xtutixya', 'xtuchixya', 'xtsutya', 'xtsucha', 'xtsutixya', 'xtsuchixya'], 3]
```
