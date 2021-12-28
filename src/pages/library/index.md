---
title: Library
version: 0.1.0
description: Libraries in sCrypt
---

A library is the same with a contract, except it does not contain any public function. It is only intended to be imported by a contract or other libraries. It thus cannot be independently deployed and called. It is frequently used to group related constants and static functions.

```javascript
library Util {
    // number of bytes to denote some numeric value
    static const int DataLen = 1;
    // number of bytes to denote length serialized state, including varint prefix (1 byte) + length (2 bytes), change length to 4 when you need PushData4
    static const int StateLen = 3;

    // convert signed integer "n" to unsigned integer of "l" bytes, in little endian
    static function toLEUnsigned(int n, int l): bytes {
        // one extra byte to accommodate possible negative sign byte
        bytes m = num2bin(n, l + 1);
        // remove sign byte
        return m[0 : len(m) - 1];
    }
}
```

