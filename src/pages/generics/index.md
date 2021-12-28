---
title: Generic Types
version: 0.1.0
description: Generic types in sCrypt
---

A generic type is a parameterized type. It allows a library to work over a variety of types rather than a single one. Users can consume these libraries and use their own concrete types.

Generic types can only be declared at library level and used within the library’s scope.

```javascript
library HashedMap<K, V> {

  function set(K k, V v, int idx) {
    ...
  }

}
```

Usage:
```javascript
HashedMap<bytes, int> map = new HashedMap();
map.set(b'01', 1, 0);
```
