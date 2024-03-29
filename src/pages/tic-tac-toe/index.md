---
title: Tic-Tac-Toe
version: 0.1.0
description: Tic-Tac-Toe in sCrypt
---

To initiate a game, Alice and Bob each lock up X amount of bitcoins into a contract UTXO. They take turns to play the game by sending signed transactions interacting with the [stateful contract](https://by-example.scrypt.io/stateful-contract/). If one of them wins, the winner claims the 2X bitcoins. If there is a draw, they take back their bitcoins. 

```javascript
contract TicTacToe {
    PubKey alice;
    PubKey bob;

    //Represents whether it is alice's turn to play chess
    @state
    bool is_alice_turn;

    //Represents the position of the chessboard. For example, a chess piece with alice in the first row 
    //and first column is expressed as [1,0,0,0,0,0,0,0,0]
    @state
    int[9] board;

    static const int TURNLEN = 1;
    static const int BOARDLEN = 9;
    static const int EMPTY = 0;
    static const int ALICE = 1;
    static const int BOB = 2;

    public function move(int n, Sig sig, int amount, SigHashPreimage txPreimage) {
        require(n >= 0 && n < BOARDLEN);

        // not filled
        require(this.board[n] == EMPTY);

        int play = this.is_alice_turn ? ALICE : BOB;
        PubKey player = this.is_alice_turn ? this.alice : this.bob;

        // ensure it's player's turn
        require(checkSig(sig, player));
        // make the move
        this.board[n] = play;
        this.is_alice_turn = !this.is_alice_turn;

        bytes outputs = b'';
        if (this.won(play)) {
            bytes outputScript = Utils.buildPublicKeyHashScript(hash160(player));
            bytes output = Utils.buildOutput(outputScript, amount);
            outputs = output;
        }
        else if (this.full()) {
            bytes aliceScript = Utils.buildPublicKeyHashScript(hash160(this.alice));
            bytes aliceOutput = Utils.buildOutput(aliceScript, amount);

            bytes bobScript = Utils.buildPublicKeyHashScript(hash160(this.bob));
            bytes bobOutput = Utils.buildOutput(bobScript, amount);

            outputs = aliceOutput + bobOutput;
        }
        else {
            bytes scriptCode_ = this.getStateScript();
            bytes output = Utils.buildOutput(scriptCode_, amount);
            outputs = output;
        }

        require(this.propagateState(txPreimage, outputs));
    }

    function won(int play) : bool {

        int[8][3] lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        bool anyLine = false;
        loop (8) : i {
            bool line = true;
            loop (3) : j {
                line = line && this.board[lines[i][j]] == play;
            }

            anyLine = anyLine || line;
        }

        return anyLine;
    }

    function full() : bool {
        bool full = true;

        loop (BOARDLEN) : i {
            full = full && this.board[i] != TicTacToe.EMPTY;
        }

        return full;
    }

    function propagateState(SigHashPreimage txPreimage, bytes outputs) : bool {
        require(Tx.checkPreimage(txPreimage));
        return (hash256(outputs) == SigHash.hashOutputs(txPreimage));
    }
}
```
