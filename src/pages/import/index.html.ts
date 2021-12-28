// metadata
export const version = "0.1.0"
export const title = "Import"
export const description = "Import statement in sCrypt"

const html = `<p>If we don&#39;t wan&#39;t to store multiple contracts, properties or libraries in the same file, we can split them up into many and use the <code>import</code> statement.</p>
<p><em>hashPuzzle.scrypt</em>:</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">HashPuzzle</span> {
    <span class="hljs-title class_">Ripemd160</span> hash;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">spend</span>(<span class="hljs-params">bytes preimage</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash160</span>(preimage) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">hash</span>);
    }
}
</code></pre>
<p><em>p2pk.scrypt</em>:</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">Pay2PubKey</span> {
    <span class="hljs-title class_">PubKey</span> pubKey;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">spend</span>(<span class="hljs-params">Sig sig</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sig, <span class="hljs-variable language_">this</span>.<span class="hljs-property">pubKey</span>));
    }
}
</code></pre>
<p><em>p2pkh.scrypt</em>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">"./hashPuzzle.scrypt"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"./p2pk.scrypt"</span>;

contract <span class="hljs-title class_">Pay2PubKeyHash</span> {
    <span class="hljs-title class_">Ripemd160</span> pubKeyHash;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">spend</span>(<span class="hljs-params">Sig sig, PubKey pubKey</span>) {
        <span class="hljs-title class_">HashPuzzle</span> hp = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashPuzzle</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">pubKeyHash</span>);
        <span class="hljs-built_in">require</span>(hp.<span class="hljs-title function_">spend</span>(pubKey));

        <span class="hljs-title class_">Pay2PubKey</span> p2pk = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Pay2PubKey</span>(pubKey);
        <span class="hljs-built_in">require</span>(p2pk.<span class="hljs-title function_">spend</span>(sig));
    }
}
</code></pre>
<p><a href="https://scryptdoc.readthedocs.io/en/latest/contracts.html?highlight=import#id1">Standard libraries</a> don&#39;t need to be imported explicitly.</p>
`

export default html
