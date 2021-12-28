---
title: Public Function
version: 0.1.0
description: Public functions in sCrypt
---

A public function is a function, that get's invoked by an unlocking script. The body of the function corresponds to the locking script of the contract and the functions arguments to the unlocking script. A contract must have at least one public function.

Public functions don't return any value and must end with a call to `require()`. If all calls to `require()` inside the function evaluate as true, then the contract can be redeemed.

A public function can be regarded as a mathematical boolean function. `f` is the function body and `x` the function arguments. A contract call succeeds if and only if `f(x)` returns true.

## Multiple Public Functions

A contract can have multiple public functions, representing different ways to fulfill a contract. Only one of the public functions can be called at a time. In this case, the last operator of  the unlocking script has to be the index of the public function called, starting from `0`. For example, if public function `larger` is called, unlocking script of `y 2` can fulfill the contract below, in which 2 is the public function index.

```javascript
contract Test {
    int x;

    public function equal(int y) {
        require(y == this.x);
    }

    public function smaller(int y) {
        require(y < this.x);
    }

    public function larger(int y) {
        require(y > this.x);
    }
}
```

