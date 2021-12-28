---
title: Contract-Private functions
version: 0.1.0
description: Contract-private functions in sCrypt
---

sCrypt enables developers to define their own functions as exemplified below:

```javascript
function sum(int a, int b): int {
    return a + b;
}
```

They are only visible within the contract, similar to `private` functions in Solidity.

Every function must end with a `return` statement. Recursion is disallowed. A function cannot call itself in its body, either directly or indirectly.
