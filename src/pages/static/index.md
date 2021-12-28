---
title: Static Properties and Functions
version: 0.1.0
description: Static properties and functions in sCrypt
---

A static property/function can be referenced with contract name as prefix without an instantiated contract, similar to a static function/property in Javascript or C++. A static property/function can also be referenced without the contract prefix, but only in the contract it is defined in.

```javascript
library Foo {
    static int N = 0;

    static function incByN(int a): int {
        // N is used with and without Foo prefix
        return a + Foo.N + N;
    }

    static function double(int x): int {
        // incByN() is called with prefix and without
        return Foo.incByN(x) + incByN(x);
    }
}

contract Bar {
    public function unlock(int y) {
        require(y == Foo.double(2));
        require(y == Foo.N);
        // N cannot be referenced without Foo prefix
        // require(y == N);
    }
}
```

