---
title: Inline Assembly
version: 0.1.0
description: Inline assembly in sCrypt
---
Script can be embedded directly into sCrypt source code using assembly representation. An sCrypt function can be written in Script and called like a regular sCrypt function.


For a function to be written in Script, its entire body must be enclosed by an `asm` block. Function parameters are on top of the stack, in reverse order as declared.

An example that emulates the behaviour of a regular P2PKH is shown below:

```javascript
function p2pkh(Sig sig, PubKey pubKey): bool {
    asm {
        op_dup
        op_hash160
        $pkh
        op_equalverify
        op_checksig
    }
}
```

