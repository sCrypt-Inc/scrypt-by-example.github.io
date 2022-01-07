---
title: Fair Coin Toss
version: 0.1.0
description: Fair coin toss in sCrypt
---

Alice and Bob decide to flip a coin, but they have no physical coin or they want to do it over the Internet. They can achieve fair coin tossing by following protocol on Bitcoin.

1. Alice and Bob each locks X bitcoins in a smart contract shown below.
2. They both reveal their secret number, which are XOR’d to determine if the coins lands on head or tail. Alice wins if it is head, otherwise Bob wins. Whoever wins takes all 2X bitcoins.

```javascript
contract CoinToss {

    PubKey alice;
    PubKey bob;
    // commitments
    Sha256 aliceHash;
    Sha256 bobHash;

    public function toss(bytes aliceNonce, bytes bobNonce, Sig sig) {
        // nonce can be of any length, as long as it's resistant from brute-force attack
        // We use 256 bits / 32 bytes as an example here
        require(len(aliceNonce) == 32);
        require(hash256(aliceNonce) == this.aliceHash);
        require(len(bobNonce) == 32);
        require(hash256(bobNonce) == this.bobHash);
        
        // last bit of XOR
        bytes head = (aliceNonce ^ bobNonce) & b'0000000000000000000000000000000000000000000000000000000000000001';

        // head -> Alice wins; tail -> Bob wins
        PubKey winner = head ? this.alice : this.bob;

        // winner takes all
        require(checkSig(sig, winner));
    }

}
```

