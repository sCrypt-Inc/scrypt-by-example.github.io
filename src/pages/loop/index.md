---
title: Loops
version: 0.1.0
description: Loops in sCrypt
---

sCrypt allows looping by repeating the loop body a specified number of times. For example, the loop

```javascript
loop (10) {
    x = x * 2;
}
```

gets unrolled to

```javascript
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
x = x * 2;
```

Because loop unrolling is done at compile time, the loop count must be a compile time constant.


We can also access the loop index by defining an induction variable:
```javascript
// int[3][4] matrix;
loop (3) : i {
    loop (4) : j {
        matrix[i][j] = i + j;
    }
}
```

Loops in sCrypt do not support a break statement, but we can simulate one using conditionals:
```javascript
bool done = false;
loop (3) {
    if (!done) {
        x = x * 2;
        if (x >= 8) {
            done = true;
        }
    }
}
```

