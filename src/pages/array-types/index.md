---
title: Array Types
version: 0.1.0
description: Array types in sCrypt
---

An array is a fixed-size list of values of the same *basic* type.


### Array literals

```javascript
bool[3] b = [false, false && true || false, true || (1 > 2)];
int[3] c = [72, -4 - 1 - 40, 833 * (99 + 9901) + 8888];
bytes[3] a = [b'ffee', b'11', b'22'];
int[2][3] d = [[11, 12, 13], [21, 22, 23]];
```

Array dimensions can be ommited, when declared:
```javascript
int[] e = [1, 4, 2];
int[][] f = [[11, 12, 13], [21, 22, 23]];
```

### Repeat function

The function `T[size] repeat(T e, static const int size)` returns an array with all size elements set to `e`, where `T` can be any type. Note `size` must be a compile time constant.

```javascript
// a == [0, 0, 0]
int[3] a = repeat(0, 3);

// arr2D == [[0, 0, 0], [0, 0, 0]]
int[2][3] arr2D = repeat(0, 2);

int[4] flags = [false, true, false, true]
flags = repeat(false, 4);   // set all flags to be false
```


### Index operator

A variable index is allowed when reading from an array:
```javascript
int[3] a = [1, 4, 2];
int idx = 2;
int val = a[idx];
```

An index value, that is out of bounds will cause contract execution to fail immeadiately.


When writing to an array however, the index operator needs to be a compile-time constant:
```javascript
a[N] = 3;    // N is a CTC
// or
a[1] = 3;
```

