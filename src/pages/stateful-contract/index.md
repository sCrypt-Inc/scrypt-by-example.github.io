---
title: Stateful Contract
version: 0.1.0
description: Stateful contracts in sCrypt
---

Declare any property that is part of the state with `@state` decorator. The state property can be used the same way as a regular property.

In order to presist the state, we need to enforce it in the output of the transaction, that will spend our contract in the future. To achieve that, the spending transaction must pass it's transaction preimage.

```javascript
contract Counter {
    @state
    int counter;

    constructor(int counter) {
        this.counter = counter;
    }

    public function increment(SigHashPreimage txPreimage, int amount) {
        // Ensure that the passed preimage is correct for this TX.
        require(Tx.checkPreimage(txPreimage));

        // Mutate state.
        this.counter++;

        // Get this TXs output.
        bytes outputScript = this.getStateScript();

        // Construct an output from its locking script and satoshi amount.
        bytes output = Utils.buildOutput(outputScript, amount);

        // Ensure that the TX actually contains this exact output.
        require(hash256(output) == SigHash.hashOutputs(txPreimage));
    }
}
```

