---
title: If / Else
version: 0.1.0
description: If / else statement in sCrypt
---

An `if` statement can take a value of `bool`, `ìnt` or `bytes`. An `int` value is interpreted to be `false` if and only if it equals `0`. A `bytes` value is interpreted as `false` if and only if every byte of its value equals `b'00'`. That includes empty `bytes` (`b''`).

```javascript
// Can be either:
bool cond = true;
// or:
bytes cond = b'01';
// or:
int cond = 1;

if (cond) {
    ...
} else {
    ...
}
```


