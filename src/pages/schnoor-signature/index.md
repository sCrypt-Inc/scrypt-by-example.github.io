---
title: Schnoor Signatures
version: 0.1.0
description: Schnoor Signatures in sCrypt
---

The [Schnorr signature algorithm](https://en.wikipedia.org/wiki/Schnorr_signature) is an alternative algorithm to the ECDSA algorithm currently used for signatures in Bitcoin. One key advantage is that multiple signatures, either in one input or multiple inputs of the same transaction, can be aggregated into a single signature.


```javascript
import "ec.scrypt";


// Schnorr signatures verification for secp256k1
contract Schnorr {

    public function verify(Sig sig, PubKey pubKey, bytes msg, int lambda,
        Point R, PointMulAux rAux,
        Point E, PointMulAux eAux,
        Point S, PointMulAux sAux) {

        int r = unpack(sig[ : 32]);
        int s = unpack(sig[32 : 64]);

        // R = r * G
        require(EC.isMul(EC.G, r, R, rAux));

        // e = Hash(r || P || msg)
        int e = unpack(sha256(pack(r) + pubKey + msg));

        // E = e * P
        Point P = pubKey2Point(pubKey);
        require(EC.isMul(P, e, E, eAux));

        // S = s * G
        require(EC.isMul(EC.G, s, S, sAux));

        // S == R + H?
        require(EC.isSum(R, E, lambda, S));
    }

    // convert public key to a point, assuming it's uncompressed
    static function pubKey2Point(PubKey pubKey) : Point {
        require(pubKey[: 1] == b'04');
        return { unpack(pubKey[1 : 33]), unpack(pubKey[33 : 65]) };
    }

}
```

