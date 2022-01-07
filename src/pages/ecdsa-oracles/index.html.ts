// metadata
export const version = "0.1.0"
export const title = "ECDSA-based Oracles"
export const description = "ECDSA-based oracles in sCrypt"

const html = `<p><strong>P</strong> and <strong>p</strong> denote an oracle’s public and private key, respectively. We first hash the data to be signed. The result is added with <strong>p</strong>, yielding a new private key <strong>p’</strong>.</p>
<blockquote>
<p>x = sha256(data)
p’ = p + x</p>
</blockquote>
<p>The corresponding public key, <strong>P’</strong>, can be derived as follows:</p>
<blockquote>
<p>P’ = p’ * G = (p + x) * G = P + x * G</p>
</blockquote>
<p>The oracle uses the derived private key <strong>p’</strong> to sign, instead of the original <strong>p</strong>. Since only the oracle knows <strong>p</strong>, only he knows <strong>p’</strong> and can use it to sign against <strong>P’</strong>. To calculate <strong>P’</strong> in a contract, we need to calculate <strong>X = x * G</strong> and then add the result with <strong>P</strong>.</p>
<p>In order to verify the correct public key sum efficiently, we also pass <strong>lambda</strong>, which is the gradient between <strong>P</strong> and <strong>X</strong>:</p>
<blockquote>
<p>n - secp256k1 curve order (often also denoted as p)</p>
</blockquote>
<blockquote>
<p>lambda = ((Xy - Py) / (Xx - Px)) % n</p>
</blockquote>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">"ec.scrypt"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"util.scrypt"</span>;


library <span class="hljs-title class_">Oracle</span> {

    <span class="hljs-comment">// Verify data is signed by the oracle with given public key.</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">verifyData</span>(<span class="hljs-params">bytes data, 
                               Sig sig,
                               PubKey P,
                               PubKey derP,
                               PubKey X,
                               int lambda,
                               SigHashPreimage txPreimage</span>) : bool {
        <span class="hljs-comment">// sha256 data</span>
        bytes hash = <span class="hljs-title function_">sha256</span>(data);

        <span class="hljs-title class_">PrivKey</span> x = <span class="hljs-title class_">PrivKey</span>(<span class="hljs-title class_">Util</span>.<span class="hljs-title function_">fromLEUnsigned</span>(hash));

        <span class="hljs-comment">// verify X = x * G?</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimageAdvanced</span>(txPreimage, x, X, <span class="hljs-title class_">Util</span>.<span class="hljs-property">invK</span>, <span class="hljs-title class_">Util</span>.<span class="hljs-property">r</span>, <span class="hljs-title class_">Util</span>.<span class="hljs-property">rBigEndian</span>, <span class="hljs-title class_">SigHashType</span>(<span class="hljs-title class_">SigHash</span>.<span class="hljs-property">ALL</span> | <span class="hljs-title class_">SigHash</span>.<span class="hljs-property">FORKID</span>)));

        <span class="hljs-comment">// verify P&#x27; = P + X</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-variable constant_">EC</span>.<span class="hljs-title function_">isPubKeySum</span>(P, X, lambda, derP));

        <span class="hljs-comment">// verify signature is from oracle, who knows p&#x27; = p + x</span>
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">checkSig</span>(sig, derP);

    }

}
</code></pre>
`

export default html
