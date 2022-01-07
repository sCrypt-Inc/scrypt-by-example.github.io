// metadata
export const version = "0.1.0"
export const title = "Tic-Tac-Toe"
export const description = "Tic-Tac-Toe in sCrypt"

const html = `<p>To initiate a game, Alice and Bob each lock up X amount of bitcoins into a contract UTXO. They take turns to play the game by sending signed transactions interacting with the <a href="https://by-example.scrypt.io/stateful-contract/">stateful contract</a>. If one of them wins, the winner claims the 2X bitcoins. If there is a draw, they take back their bitcoins. </p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">"arrayUtil.scrypt"</span>;


contract <span class="hljs-title class_">TicTacToe</span> {

    <span class="hljs-title class_">PubKey</span> alice;
    <span class="hljs-title class_">PubKey</span> bob;

    @state
    bool is_alice_turn;

    @state
    bytes board;


    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int <span class="hljs-variable constant_">TURNLEN</span> = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int <span class="hljs-variable constant_">BOARDLEN</span> = <span class="hljs-number">9</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> bytes <span class="hljs-variable constant_">EMPTY</span> = b<span class="hljs-string">&#x27;00&#x27;</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> bytes <span class="hljs-variable constant_">ALICE</span> = b<span class="hljs-string">&#x27;01&#x27;</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> bytes <span class="hljs-variable constant_">BOB</span> = b<span class="hljs-string">&#x27;02&#x27;</span>;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">move</span>(<span class="hljs-params">int n, Sig sig, int amount, SigHashPreimage txPreimage</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimage</span>(txPreimage));
        <span class="hljs-built_in">require</span>(n &gt;= <span class="hljs-number">0</span> &amp;&amp; n &lt; <span class="hljs-variable constant_">BOARDLEN</span>);

        bytes play = <span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span> ? <span class="hljs-variable constant_">ALICE</span> : <span class="hljs-variable constant_">BOB</span>;
        <span class="hljs-title class_">PubKey</span> player = <span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span> ? <span class="hljs-variable language_">this</span>.<span class="hljs-property">alice</span> : <span class="hljs-variable language_">this</span>.<span class="hljs-property">bob</span>;

        <span class="hljs-comment">// ensure it&#x27;s player&#x27;s turn</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sig, player));
        <span class="hljs-comment">// make the move</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span> = <span class="hljs-title class_">ArrayUtil</span>.<span class="hljs-title function_">setElemAt</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>, n, play);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span> = !<span class="hljs-variable language_">this</span>.<span class="hljs-property">is_alice_turn</span>;


        bytes outputs = b<span class="hljs-string">&#x27;&#x27;</span>;
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">won</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>, play)) {
            <span class="hljs-comment">// winner takes all</span>
            bytes outputScript = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildPublicKeyHashScript</span>(<span class="hljs-title function_">hash160</span>(player));
            bytes output = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(outputScript, amount);
            outputs = output;
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">full</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>)) {
            <span class="hljs-comment">// draw: equally split, i.e., both outputs have the same amount</span>
            bytes aliceScript = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildPublicKeyHashScript</span>(<span class="hljs-title function_">hash160</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">alice</span>));
            bytes aliceOutput = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(aliceScript, amount);

            bytes bobScript = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildPublicKeyHashScript</span>(<span class="hljs-title function_">hash160</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">bob</span>));
            bytes bobOutput = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(bobScript, amount);

            outputs = aliceOutput + bobOutput;
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// update state</span>
            bytes scriptCode_ = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getStateScript</span>();
            bytes output = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(scriptCode_, amount);
            outputs = output;
        }

        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash256</span>(outputs) == <span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">hashOutputs</span>(txPreimage));
    }

    <span class="hljs-comment">// does play win after current move?</span>
    <span class="hljs-keyword">function</span> <span class="hljs-title function_">won</span>(<span class="hljs-params">bytes board, bytes play</span>) : bool {
        <span class="hljs-comment">// three in a row, a column, or a diagnoal</span>
        int[<span class="hljs-number">8</span>][<span class="hljs-number">3</span>] lines = [[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>], [<span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>]];

        bool anyLine = <span class="hljs-literal">false</span>;
        loop (<span class="hljs-number">8</span>) : i {
            bool line = <span class="hljs-literal">true</span>;
            loop (<span class="hljs-number">3</span>) : j {
                line = line &amp;&amp; <span class="hljs-title class_">ArrayUtil</span>.<span class="hljs-title function_">getElemAt</span>(board, lines[i][j]) == play;
            }

            anyLine = anyLine || line;
        }

        <span class="hljs-keyword">return</span> anyLine;
    }

    <span class="hljs-comment">// is board full?</span>
    <span class="hljs-keyword">function</span> <span class="hljs-title function_">full</span>(<span class="hljs-params">bytes board</span>) : bool {
        bool full = <span class="hljs-literal">true</span>;

        loop (<span class="hljs-variable constant_">BOARDLEN</span>) : i {
            full = full &amp;&amp; <span class="hljs-title class_">ArrayUtil</span>.<span class="hljs-title function_">getElemAt</span>(board, i) != <span class="hljs-variable constant_">EMPTY</span>;
        }

        <span class="hljs-keyword">return</span> full;
    }
}
</code></pre>
`

export default html
