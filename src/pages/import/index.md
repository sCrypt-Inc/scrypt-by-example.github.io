---
title: Import
version: 0.1.0
description: Import statement in sCrypt
---

If we don't wan't to store multiple contracts, properties or libraries in the same file, we can split them up into many and use the `import` statement.

*hashPuzzle.scrypt*:
```javascript
contract HashPuzzle {
    Ripemd160 hash;

    public function spend(bytes preimage) {
        require(hash160(preimage) == this.hash);
    }
}
```


*p2pk.scrypt*:
```javascript
contract Pay2PubKey {
    PubKey pubKey;

    public function spend(Sig sig) {
        require(checkSig(sig, this.pubKey));
    }
}
```

*p2pkh.scrypt*:
```javascript
import "./hashPuzzle.scrypt";
import "./p2pk.scrypt";

contract Pay2PubKeyHash {
    Ripemd160 pubKeyHash;

    public function spend(Sig sig, PubKey pubKey) {
        HashPuzzle hp = new HashPuzzle(this.pubKeyHash);
        require(hp.spend(pubKey));

        Pay2PubKey p2pk = new Pay2PubKey(pubKey);
        require(p2pk.spend(sig));
    }
}
```

[Standard libraries](https://scryptdoc.readthedocs.io/en/latest/contracts.html?highlight=import#id1) don't need to be imported explicitly.
