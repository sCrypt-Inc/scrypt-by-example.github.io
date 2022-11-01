---
title: Stateful Contract
version: 0.1.0
description: Stateful contracts in sCrypt
---

Declare any property that is part of the state with `@state` decorator. The state property can be used the same way as a regular property.

In order to presist the state, we need to enforce it in the output of the transaction, that will spend our contract in the future. To achieve that, the spending transaction must pass it's transaction preimage and call `this.updateState(txPreimage, amount)` to maintain the state.

```javascript
contract Counter {

    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        // Increment counter value.
        this.counter++;

        // Ensure next output contains script with updated counter value.
        require(this.updateState(txPreimage, amount));
    }
}
```

