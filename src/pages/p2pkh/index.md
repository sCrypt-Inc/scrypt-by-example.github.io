---
title: P2PKH
version: 0.1.0
description: Pay to Public Key Hash (P2PKH) in sCrypt
---

Pay-to-PubKey-Hash ([P2PKH](https://learnmeabitcoin.com/guide/p2pkh)) contract is used to send bitcoins to a bitcoin address. It is the most common contract on the Bitcoin network. Such contracts are unlocked by the public key and a signature created by the corresponding private key.

```javascript
contract P2PKH {
    Ripemd160 pubKeyHash;

    public function unlock(Sig sig, PubKey pubKey) {
        require(hash160(pubKey) == this.pubKeyHash);
        require(checkSig(sig, pubKey));
    }
}
```

