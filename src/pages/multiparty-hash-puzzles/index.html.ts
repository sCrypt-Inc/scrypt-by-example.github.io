// metadata
export const version = "0.1.0"
export const title = "Multiparty Hash Puzzles"
export const description = "Multiparty hash puzzles in sCrypt"

const html = `<p>In a hash puzzle contract, the spender has to provide a preimage <code>x</code> that hashes to a predefined value <code>y</code> to unlock a UTXO. It can be
extended to multiple parties so that multiple preimages have to be provided such that <code>y1 = H(x1)</code>, <code>y2 = H(x2)</code>, ..., <code>yN = H(xN)</code>. Below shows an examples of three parties.</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">MultiPartyHashPuzzles</span> {
    <span class="hljs-title class_">Sha256</span> hash1;   <span class="hljs-comment">// hash1 = b&#x27;136523B9FEA2B7321817B28E254A81A683D319D715CEE2360D051360A272DD4C&#x27;</span>
    <span class="hljs-title class_">Sha256</span> hash2;   <span class="hljs-comment">// hash2 = b&#x27;E222E30CF5C982E5F6251D755B0B16F608ACE631EB3BA9BDAF624FF1651ABF98&#x27;</span>
    <span class="hljs-title class_">Sha256</span> hash3;   <span class="hljs-comment">// hash3 = b&#x27;2A79F5D9F8B3770A59F91E0E9B4C379F7C7A32353AA6450065E43A8616EF5722&#x27;</span>
    
    <span class="hljs-comment">// preimage1: e.g., "bsv" -&gt; b&#x27;627376&#x27;</span>
    <span class="hljs-comment">// preimage2: e.g., "sCrypt" -&gt; b&#x27;734372797074&#x27;</span>
    <span class="hljs-comment">// preimage3: e.g., "IDE" -&gt; b&#x27;494445&#x27;</span>
    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">unlock</span>(<span class="hljs-params">bytes preimage1, bytes preimage2, bytes preimage3</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">sha256</span>(preimage1) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">hash1</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">sha256</span>(preimage2) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">hash2</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">sha256</span>(preimage3) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">hash3</span>);
    }
}
</code></pre>
<p>The above solution is problematic when <code>N</code> is large since all <code>N</code> hashes have to be included in the locking script, bloating the transaction. 
Instead, we can combine all <code>y</code>&#39;s into a single y such that <code>y = H(H(y1 || y2) || y3)</code> as shown below.</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">MultiPartyHashPuzzlesCompact</span> {
    <span class="hljs-comment">// only 1 hash needs to go into the locking script, saving space</span>
    <span class="hljs-title class_">Sha256</span> combinedHash; <span class="hljs-comment">// combinedHash = b&#x27;C9392767AB23CEFF09D207B9223C0C26F01A7F81F8C187A821A4266F8020064D&#x27;</span>

    <span class="hljs-comment">// preimage1: e.g., "bsv" -&gt; b&#x27;627376&#x27;</span>
    <span class="hljs-comment">// preimage2: e.g., "sCrypt" -&gt; b&#x27;734372797074&#x27;</span>
    <span class="hljs-comment">// preimage3: e.g., "IDE" -&gt; b&#x27;494445&#x27;</span>
    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">unlock</span>(<span class="hljs-params">bytes preimage1, bytes preimage2, bytes preimage3</span>) {
        <span class="hljs-title class_">Sha256</span> hash1 = <span class="hljs-title function_">sha256</span>(preimage1);
        <span class="hljs-title class_">Sha256</span> hash2 = <span class="hljs-title function_">sha256</span>(preimage2);
        <span class="hljs-title class_">Sha256</span> hash3 = <span class="hljs-title function_">sha256</span>(preimage3);
        <span class="hljs-title class_">Sha256</span> hash12 = <span class="hljs-title function_">sha256</span>(hash1 + hash2);
        <span class="hljs-title class_">Sha256</span> hash123 = <span class="hljs-title function_">sha256</span>(hash12 + hash3);

        <span class="hljs-built_in">require</span>(hash123 == <span class="hljs-variable language_">this</span>.<span class="hljs-property">combinedHash</span>);
    }
}
</code></pre>
`

export default html
