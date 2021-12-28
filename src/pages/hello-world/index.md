---
title: Hello World
version: 0.1.0
description: Hello world in sCrypt
---

The following is a simple contract written in sCrypt. It takes an integer `x` as a parameter for the constructor.
It exposes a single public function `equals`, which checks if the passed parameter is equal to `x`.
On a lower level this means, that we need to include an integer `y` in the unlocking script, that unlocks the output containing our smart contract (which stores `x`).

```javascript
{{{HelloWorld}}}
```
