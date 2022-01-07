// metadata
export const version = "0.1.0"
export const title = "R-Puzzle"
export const description = "R-Puzzle contract in sCrypt"

const html = `<p>In a <a href="https://wiki.bitcoinsv.io/index.php/R-Puzzles">R-Puzzle</a>, an ephemeral key <code>k</code> is never revealed. Instead <code>r</code>, which is the x-coordinate of its corresponding public key, is revealed and from <code>r</code> along with the signature, the knowledge of <code>k</code> can be proven using <code>checkSig()</code>.</p>
<pre><code class="language-javascript">contract RPuzzle {
    <span class="hljs-title class_">Ripemd160</span> rhash;

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params">Ripemd160 rhash</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">rhash</span> = rhash;
    }

    <span class="hljs-keyword">function</span> <span class="hljs-title function_">getSigR</span>(<span class="hljs-params">Sig sigr</span>): bytes {
        bytes lenBytes = sigr[<span class="hljs-number">3</span>:<span class="hljs-number">4</span>];
        int len = <span class="hljs-title function_">unpack</span>(lenBytes);
        bytes r = sigr[<span class="hljs-number">4</span>:<span class="hljs-number">4</span>+len];
        <span class="hljs-keyword">return</span> r;
    }

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">unlock</span>(<span class="hljs-params">Sig sig, PubKey pubKey, Sig sigr</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">rhash</span> == <span class="hljs-title function_">hash160</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getSigR</span>(sigr)));
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sigr, pubKey));
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sig, pubKey));
    }
}
</code></pre>
`

export default html
