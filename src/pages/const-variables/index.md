---
title: Const Variables
version: 0.1.0
description: Const variables in sCrypt
---

Variables declared const cannot be changed once initialized.

```javascript
contract Test {
    const int x;

    constructor(int x) {
        this.x = x; // good, since this is initialization
    }

    public function equal(const int y) {
        y = 1; // <-- error

        const int a = 36;
        a = 11; // <-- error

        require(y == this.x);
    }
}
```
