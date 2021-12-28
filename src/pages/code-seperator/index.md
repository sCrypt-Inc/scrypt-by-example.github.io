---
title: Code Seperator
version: 0.1.0
description: Code seperator in sCrypt
---

Three or more consecutive `*` in a line insert an [OP_CODESEPARATOR](https://wiki.bitcoinsv.io/index.php/OP_CODESEPARATOR). It is used to exclude what comes before (and including itself) it from being part of the signature.

```javascript
contract P2PKH_OCS {
    Ripemd160 pubKeyHash;

    public function unlock(Sig sig, PubKey pubKey) {
        // code separator 1
        ***
        require(hash160(pubKey) == this.pubKeyHash);
        // code separator 2
        *****
        require(checkSig(sig, pubKey));
    }
}
```
