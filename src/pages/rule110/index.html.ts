// metadata
export const version = "0.1.0"
export const title = "Rule 110"
export const description = "Rule 110 in sCrypt"

const html = `<p>The Rule 110 cellular automaton is a 1-dimensional elementary CA, where a linear pattern of 0s and 1s evolves according to a simple set of rules. Whether a point in the pattern will be 0 or 1 in the new generation depends on its current value and on those of its two neighbors. The Rule 110 has the following set of rules:</p>
<table>
<thead>
<tr>
<th>Current pattern</th>
<th>111</th>
<th>110</th>
<th>101</th>
<th>100</th>
<th>011</th>
<th>010</th>
<th>001</th>
<th>000</th>
</tr>
</thead>
<tbody><tr>
<td>New state for center cell</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>0</td>
</tr>
</tbody></table>
<pre><code class="language-javascript">contract rule110 {
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int N = <span class="hljs-number">5</span>; <span class="hljs-comment">//size of board</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int <span class="hljs-variable constant_">N2</span> = <span class="hljs-number">3</span>; <span class="hljs-comment">//size of board</span>
    <span class="hljs-keyword">static</span> bytes <span class="hljs-variable constant_">LIVE</span> = b<span class="hljs-string">&#x27;01&#x27;</span>;
    <span class="hljs-keyword">static</span> bytes <span class="hljs-variable constant_">DEAD</span> = b<span class="hljs-string">&#x27;00&#x27;</span>;

    @state
    bytes board;
    
    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">play</span>(<span class="hljs-params">int amount, SigHashPreimage txPreimage</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">computeNewBoard</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">propagateState</span>(txPreimage, amount));
    }

    <span class="hljs-keyword">function</span> <span class="hljs-title function_">computeNewBoard</span>(<span class="hljs-params">bytes board</span>) : bytes {
        bytes res = b<span class="hljs-string">&#x27;&#x27;</span>;
        res += <span class="hljs-variable constant_">DEAD</span>;
        loop (<span class="hljs-variable constant_">N2</span>) : i {
            res += <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">newState</span>(board[i : i + <span class="hljs-number">3</span>]);
        }
        res += <span class="hljs-variable constant_">DEAD</span>;
        <span class="hljs-keyword">return</span> res;
    }
    
    <span class="hljs-keyword">function</span> <span class="hljs-title function_">newState</span>(<span class="hljs-params">bytes arg</span>) : bytes {
        <span class="hljs-comment">/*
          Current pattern            111    110    101    100    011    010    001    000
          New state for center cell     0     1     1    0     1     1     1     0
        */</span>
        bytes a = arg[<span class="hljs-number">0</span> : <span class="hljs-number">1</span>];
        bytes b = arg[<span class="hljs-number">1</span> : <span class="hljs-number">2</span>];
        bytes c = arg[<span class="hljs-number">2</span> : <span class="hljs-number">3</span>];
        bytes res = <span class="hljs-variable constant_">LIVE</span>;
        <span class="hljs-keyword">if</span> (a == <span class="hljs-variable constant_">LIVE</span> &amp;&amp; b == <span class="hljs-variable constant_">LIVE</span> &amp;&amp; c == <span class="hljs-variable constant_">LIVE</span>) {
            res = <span class="hljs-variable constant_">DEAD</span>;
        }
        <span class="hljs-keyword">if</span> (a == <span class="hljs-variable constant_">LIVE</span> &amp;&amp; b == <span class="hljs-variable constant_">DEAD</span> &amp;&amp; c == <span class="hljs-variable constant_">DEAD</span>) {
            res = <span class="hljs-variable constant_">DEAD</span>;
        }
        <span class="hljs-keyword">if</span> (a == <span class="hljs-variable constant_">DEAD</span> &amp;&amp; b == <span class="hljs-variable constant_">DEAD</span> &amp;&amp; c == <span class="hljs-variable constant_">DEAD</span>) {
            res = <span class="hljs-variable constant_">DEAD</span>;
        }
        <span class="hljs-keyword">return</span> res;
    }

    <span class="hljs-keyword">function</span> <span class="hljs-title function_">propagateState</span>(<span class="hljs-params">SigHashPreimage txPreimage, int value</span>) : bool {
        <span class="hljs-title class_">SigHashType</span> sigHashType = <span class="hljs-title class_">SigHash</span>.<span class="hljs-property">ANYONECANPAY</span> | <span class="hljs-title class_">SigHash</span>.<span class="hljs-property">SINGLE</span> | <span class="hljs-title class_">SigHash</span>.<span class="hljs-property">FORKID</span>;
        <span class="hljs-comment">// this ensures the preimage is for the current tx</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimageSigHashType</span>(txPreimage, sigHashType));
        bytes outputScript = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getStateScript</span>();
        bytes output = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(outputScript, value);
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">hash256</span>(output) == <span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">hashOutputs</span>(txPreimage);
    }
}
</code></pre>
`

export default html
