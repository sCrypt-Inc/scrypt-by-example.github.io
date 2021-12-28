---
title: Basic Types
version: 0.1.0
description: Basic types in sCrypt
---

sCrypt supports the following basic types:

- `bool` - a boolean value `true` or `false`,
- `int` - a signed integer of arbitrary length, whose literals are in decimal or hexadecimal format:
```javascript
int a1 = 42;
int a2 = -4242424242424242;
int a3 = 55066263022277343669578718895168534326250603453777594175500187360389116729240;
int a4 = 0xFF8C;
int a5 = 0xff8c;
```
- `bytes` -  a variable length array of bytes, whose literals are in quoted hexadecimal format prefixed by `b`:
```javascript
bytes b1 = b'ffee1234';
bytes b2 = b'414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00';
bytes b3 = b'1122' + b'eeff'; // b3 is b'1122eeff'
```

## Domain subtypes

sCrypt has several subtypes, specific to the Bitcoin context, used to further improve type safety.

### Subtypes of `bytes`

- `PubKey` - an EC public key in compressed format (33 bytes):
```javascript
PubKey pubKey = PubKey(b'0200112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100');
```

- `Sig` - an EC signature in DER format with SIGHASH flag appended at the end (0x41 - in the below example, which means `SIGHASH_ALL | SIGHASH_FORKID`):
```javascript
Sig sig = Sig(b'3045022100b71be3f1dc001e0a1ad65ed84e7a5a0bfe48325f2146ca1d677cf15e96e8b80302206d74605e8234eae3d4980fcd7b2fdc1c5b9374f0ce71dea38707fccdbd28cf7e41');
```

- `Ripemd160` - a RIPEMD-160 hash type:
```javascript
Ripemd160 r = Ripemd160(b'0011223344556677889999887766554433221100');
```

- `Sha1` - a SHA-1 hash type:
```javascript
Sha1 s = Sha1(b'0011223344556677889999887766554433221100');
```

- `Sha256` - a SHA-256 hash type:
```javascript
Sha256 s = Sha256(b'00112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100');
```

- `SigHashType` - a sighash type / flag.
```javascript
SigHashType s = SigHashType(b'01');
SigHashType s = SigHash.ALL | SigHash.ANYONECANPAY;
```

- `SigHashPreimage` - a sighash preimage.
```javascript
SigHashType s = SigHashType(b'01');
SigHashType s = SigHash.ALL | SigHash.ANYONECANPAY;
```

### Subtypes of `int`

- `PrivKey` - an EC private key.
```javascript
SigHashType s = SigHashType(b'01');
SigHashType s = SigHash.ALL | SigHash.ANYONECANPAY;
```
