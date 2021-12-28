---
title: Struct Types
version: 0.1.0
description: Struct types in sCrypt
---

A struct is a collection of variable under a single name.

Structs can be defined like the following:
```javascript
struct Point {
  int x;
  int y;
}

struct Line {
  Point start;
  Point end;
}
```

Usage:
```javascript
Point p = {10, -10};
int x = p.x;
p.y = 20;

// Define a variable q of type Point, and set members to the same values as those of p
Point q = p;
require(p == q); // true

Line l = {p, q};
l.start.x = l.end.y + 1;
```
