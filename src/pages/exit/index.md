---
title: Exit Function
version: 0.1.0
description: Exit function in sCrypt
---

`exit(bool status)` terminates contract execution. If status is `true`, the contract succeeds; otherwise, it fails.

```javascript
contract TestPositiveEqual {
    int x;

    constructor(int x) {
        this.x = x;
    }

    public function equal(int y) {
        if (y <= 0) {
          exit(true);
        }
        require(y == this.x);
    }
}
```

