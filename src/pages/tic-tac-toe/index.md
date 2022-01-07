---
title: Tic-Tac-Toe
version: 0.1.0
description: Tic-Tac-Toe in sCrypt
---

To initiate a game, Alice and Bob each lock up X amount of bitcoins into a contract UTXO. They take turns to play the game by sending signed transactions interacting with the [stateful contract](https://by-example.scrypt.io/stateful-contract/). If one of them wins, the winner claims the 2X bitcoins. If there is a draw, they take back their bitcoins. 

```javascript
import "arrayUtil.scrypt";


contract TicTacToe {

    PubKey alice;
    PubKey bob;

    @state
    bool is_alice_turn;

    @state
    bytes board;


    static const int TURNLEN = 1;
    static const int BOARDLEN = 9;
    static const bytes EMPTY = b'00';
    static const bytes ALICE = b'01';
    static const bytes BOB = b'02';

    public function move(int n, Sig sig, int amount, SigHashPreimage txPreimage) {
        require(Tx.checkPreimage(txPreimage));
        require(n >= 0 && n < BOARDLEN);

        bytes play = this.is_alice_turn ? ALICE : BOB;
        PubKey player = this.is_alice_turn ? this.alice : this.bob;

        // ensure it's player's turn
        require(checkSig(sig, player));
        // make the move
        this.board = ArrayUtil.setElemAt(this.board, n, play);
        this.is_alice_turn = !this.is_alice_turn;


        bytes outputs = b'';
        if (this.won(this.board, play)) {
            // winner takes all
            bytes outputScript = Utils.buildPublicKeyHashScript(hash160(player));
            bytes output = Utils.buildOutput(outputScript, amount);
            outputs = output;
        }
        else if (this.full(this.board)) {
            // draw: equally split, i.e., both outputs have the same amount
            bytes aliceScript = Utils.buildPublicKeyHashScript(hash160(this.alice));
            bytes aliceOutput = Utils.buildOutput(aliceScript, amount);

            bytes bobScript = Utils.buildPublicKeyHashScript(hash160(this.bob));
            bytes bobOutput = Utils.buildOutput(bobScript, amount);

            outputs = aliceOutput + bobOutput;
        }
        else {
            // update state
            bytes scriptCode_ = this.getStateScript();
            bytes output = Utils.buildOutput(scriptCode_, amount);
            outputs = output;
        }

        require(hash256(outputs) == SigHash.hashOutputs(txPreimage));
    }

    // does play win after current move?
    function won(bytes board, bytes play) : bool {
        // three in a row, a column, or a diagnoal
        int[8][3] lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        bool anyLine = false;
        loop (8) : i {
            bool line = true;
            loop (3) : j {
                line = line && ArrayUtil.getElemAt(board, lines[i][j]) == play;
            }

            anyLine = anyLine || line;
        }

        return anyLine;
    }

    // is board full?
    function full(bytes board) : bool {
        bool full = true;

        loop (BOARDLEN) : i {
            full = full && ArrayUtil.getElemAt(board, i) != EMPTY;
        }

        return full;
    }
}
```
