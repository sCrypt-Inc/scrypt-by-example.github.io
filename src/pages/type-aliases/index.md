---
title: Type Aliases
version: 0.1.0
description: Type aliases in sCrypt
---

Type aliases create a new name for a type. It does not actually create a new type, it merely creates a new name to refer to that type.

```javascript
type Age = int;
type Coordinate = int[2];
```

They can also be used for struct types.

```javascript
struct Point {
  int x;
  int y;
}
```
```javascript
type Coordinate = Point;
```

