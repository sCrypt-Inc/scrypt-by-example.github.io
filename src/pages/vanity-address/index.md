---
title: Outsourcing Vanity Address Generation
version: 0.1.0
description: Outsourcing vanity address generation in sCrypt
---

In order to outsource the generation of a desired vanity address, say with the prefix `1Love`, we generate a key pair **p**, **P**.
We then share **P** with the seller, who will find the public key of our final vanity address. He will then go through many values of a partial private key **x**, until **P + x*G** yields a public key **P'**, the address of which will contain our desired prefix. He then shares this key *x*, so we can assemble the private key of **P'**, by calculating **k = (p + x) * G**.


```javascript
import "ec.scrypt";
import "util.scrypt";
import "base58.scrypt";


contract VanityAddr {

    PubKey P;
    bytes pattern;
    Ripemd160 cancelPubKeyHash;

    public function cancel(Sig sig, PubKey pubKey) {
        require(hash160(pubKey) == this.cancelPubKeyHash);
        require(checkSig(sig, pubKey));
    }

    public function offerVanityAddr(PrivKey x,
                                    PubKey X,
                                    PubKey derP,
                                    int lambda,
                                    SigHashPreimage txPreimage) {
        // Check if x is private key of X.
        require(Tx.checkPreimageAdvanced(txPreimage, x, X, Tx.invK, Tx.r, Tx.rBigEndian, SigHashType(SigHash.ALL | SigHash.FORKID)));

        // Check if P' = P + X.
        require(EC.isPubKeySum(this.P, X, lambda, derivedPubKey));

        // Check if P' produces desired address.
        PubKey derivedPubKeyCompressed = compressPubKey(derivedPubKey);
        require(matchPattern(derivedPubKeyCompressed, this.pattern));
    }

    // Check if public key's address matches the given pattern.
    static function matchPattern(PubKey pubKey, bytes pattern) : bool {
        // Derive the address.
        bytes addr = hash160(pubKey);

        // Encode to base58check.
        bytes addrB58 = Base58.base58EncodeCheckAddr(addr, Base58.P2PKH_verbyte_mainnet);

        // Prefix match.
        int l = len(pattern);
        return addrB58[:l] == pattern;
    }

    static function compressPubKey(PubKey pk) : PubKey {
        // Check if y-coord is even or odd
        bool isEven = (pk[63:64] & b'01') != b'01';

        bytes prefix = isEven ? b'02' : b'03';
        return PubKey(prefix + pk[1:33]);
    }
}
```

