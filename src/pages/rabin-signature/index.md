---
title: Rabin Signatures
version: 0.1.0
description: Rabin signatures in sCrypt
---

A [Rabin signature](https://en.wikipedia.org/wiki/Rabin_signature_algorithm) is an alternative form of digital signature to ECDSA used in Bitcoin. It allows for efficient on-chain signature verification and is often used for signing and verifying oracle data.


```javascript
contract RabinSignature {

    public function verifySig(int sig, bytes msg, bytes padding, int n) {
        int h = this.fromLEUnsigned(this.hash(msg + padding));
        require((sig * sig) % n == h % n);
    }

    function hash(bytes x): bytes {
        // expand into 512 bit hash
        bytes hx = sha256(x);
        int idx = len(hx) / 2;
        return sha256(hx[:idx]) + sha256(hx[idx:]);
    }

    function fromLEUnsigned(bytes b): int {
        // append positive sign byte. This does not hurt even when sign bit is already positive
        return unpack(b + b'00');
    }

}
```

