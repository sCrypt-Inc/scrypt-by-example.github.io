---
title: R-Puzzle
version: 0.1.0
description: R-Puzzle contract in sCrypt
---

In a [R-Puzzle](https://wiki.bitcoinsv.io/index.php/R-Puzzles), an ephemeral key `k` is never revealed. Instead `r`, which is the x-coordinate of its corresponding public key, is revealed and from `r` along with the signature, the knowledge of `k` can be proven using `checkSig()`.

```javascript
contract RPuzzle {
    Ripemd160 rhash;

    constructor(Ripemd160 rhash) {
        this.rhash = rhash;
    }

    function getSigR(Sig sigr): bytes {
        bytes lenBytes = sigr[3:4];
        int len = unpack(lenBytes);
        bytes r = sigr[4:4+len];
        return r;
    }

    public function unlock(Sig sig, PubKey pubKey, Sig sigr) {
        require(this.rhash == hash160(this.getSigR(sigr)));
        require(checkSig(sigr, pubKey));
        require(checkSig(sig, pubKey));
    }
}
```

