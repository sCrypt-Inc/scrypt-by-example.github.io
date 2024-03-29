---
title: Rule 110
version: 0.1.0
description: Rule 110 in sCrypt
---

The Rule 110 cellular automaton is a 1-dimensional elementary CA, where a linear pattern of 0s and 1s evolves according to a simple set of rules. Whether a point in the pattern will be 0 or 1 in the new generation depends on its current value and on those of its two neighbors. The Rule 110 has the following set of rules:

| Current pattern | 111 | 110 | 101 | 100 | 011 | 010 | 001 | 000 |
|---|---|---|---|---|---|---|---|---|
| New state for center cell | 0 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |


```javascript
contract rule110 {
    static const int N = 5; //size of board
    static const int N2 = 3; //size of board
    static bytes LIVE = b'01';
    static bytes DEAD = b'00';

    @state
    bytes board;
    
    public function play(int amount, SigHashPreimage txPreimage) {
        this.board = this.computeNewBoard(this.board);
        require(this.propagateState(txPreimage, amount));
    }

    function computeNewBoard(bytes board) : bytes {
        bytes res = b'';
        res += DEAD;
        loop (N2) : i {
            res += this.newState(board[i : i + 3]);
        }
        res += DEAD;
        return res;
    }
    
    function newState(bytes arg) : bytes {
        /*
          Current pattern	        111	110	101	100	011	010	001	000
          New state for center cell	 0	 1	 1	0	 1	 1	 1	 0
        */
        bytes a = arg[0 : 1];
        bytes b = arg[1 : 2];
        bytes c = arg[2 : 3];
        bytes res = LIVE;
        if (a == LIVE && b == LIVE && c == LIVE) {
            res = DEAD;
        }
        if (a == LIVE && b == DEAD && c == DEAD) {
            res = DEAD;
        }
        if (a == DEAD && b == DEAD && c == DEAD) {
            res = DEAD;
        }
        return res;
    }

    function propagateState(SigHashPreimage txPreimage, int value) : bool {
        SigHashType sigHashType = SigHash.ANYONECANPAY | SigHash.SINGLE | SigHash.FORKID;
        // this ensures the preimage is for the current tx
        require(Tx.checkPreimageSigHashType(txPreimage, sigHashType));
        bytes outputScript = this.getStateScript();
        bytes output = Utils.buildOutput(outputScript, value);
        return hash256(output) == SigHash.hashOutputs(txPreimage);
    }
}
```

