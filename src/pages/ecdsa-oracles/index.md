---
title: ECDSA-based Oracles
version: 0.1.0
description: ECDSA-based oracles in sCrypt
---

**P** and **p** denote an oracle’s public and private key, respectively. We first hash the data to be signed. The result is added with **p**, yielding a new private key **p’**.

> x = sha256(data)
> p’ = p + x

The corresponding public key, **P’**, can be derived as follows:

> P’ = p’ * G = (p + x) * G = P + x * G

The oracle uses the derived private key **p’** to sign, instead of the original **p**. Since only the oracle knows **p**, only he knows **p’** and can use it to sign against **P’**. To calculate **P’** in a contract, we need to calculate **X = x * G** and then add the result with **P**.

In order to verify the correct public key sum efficiently, we also pass **lambda**, which is the gradient between **P** and **X**:

> n - secp256k1 curve order (often also denoted as p)

> lambda = ((Xy - Py) / (Xx - Px)) % n


```javascript
import "ec.scrypt";
import "util.scrypt";


library Oracle {

    // Verify data is signed by the oracle with given public key.
    static function verifyData(bytes data, 
                               Sig sig,
                               PubKey P,
                               PubKey derP,
                               PubKey X,
                               int lambda,
                               SigHashPreimage txPreimage) : bool {
        // sha256 data
        bytes hash = sha256(data);

        PrivKey x = PrivKey(Util.fromLEUnsigned(hash));

        // verify X = x * G?
        require(Tx.checkPreimageAdvanced(txPreimage, x, X, Util.invK, Util.r, Util.rBigEndian, SigHashType(SigHash.ALL | SigHash.FORKID)));

        // verify P' = P + X
        require(EC.isPubKeySum(P, X, lambda, derP));

        // verify signature is from oracle, who knows p' = p + x
        return checkSig(sig, derP);

    }

}
```

