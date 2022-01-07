// metadata
export const version = "0.1.0"
export const title = "Schnoor Signatures"
export const description = "Schnoor Signatures in sCrypt"

const html = `<p>The <a href="https://en.wikipedia.org/wiki/Schnorr_signature">Schnorr signature algorithm</a> is an alternative algorithm to the ECDSA algorithm currently used for signatures in Bitcoin. One key advantage is that multiple signatures, either in one input or multiple inputs of the same transaction, can be aggregated into a single signature.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">"ec.scrypt"</span>;


<span class="hljs-comment">// Schnorr signatures verification for secp256k1</span>
contract <span class="hljs-title class_">Schnorr</span> {

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">verify</span>(<span class="hljs-params">Sig sig, PubKey pubKey, bytes msg, int lambda,
        Point R, PointMulAux rAux,
        Point E, PointMulAux eAux,
        Point S, PointMulAux sAux</span>) {

        int r = <span class="hljs-title function_">unpack</span>(sig[ : <span class="hljs-number">32</span>]);
        int s = <span class="hljs-title function_">unpack</span>(sig[<span class="hljs-number">32</span> : <span class="hljs-number">64</span>]);

        <span class="hljs-comment">// R = r * G</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-variable constant_">EC</span>.<span class="hljs-title function_">isMul</span>(<span class="hljs-variable constant_">EC</span>.<span class="hljs-property">G</span>, r, R, rAux));

        <span class="hljs-comment">// e = Hash(r || P || msg)</span>
        int e = <span class="hljs-title function_">unpack</span>(<span class="hljs-title function_">sha256</span>(<span class="hljs-title function_">pack</span>(r) + pubKey + msg));

        <span class="hljs-comment">// E = e * P</span>
        <span class="hljs-title class_">Point</span> P = <span class="hljs-title function_">pubKey2Point</span>(pubKey);
        <span class="hljs-built_in">require</span>(<span class="hljs-variable constant_">EC</span>.<span class="hljs-title function_">isMul</span>(P, e, E, eAux));

        <span class="hljs-comment">// S = s * G</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-variable constant_">EC</span>.<span class="hljs-title function_">isMul</span>(<span class="hljs-variable constant_">EC</span>.<span class="hljs-property">G</span>, s, S, sAux));

        <span class="hljs-comment">// S == R + H?</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-variable constant_">EC</span>.<span class="hljs-title function_">isSum</span>(R, E, lambda, S));
    }

    <span class="hljs-comment">// convert public key to a point, assuming it&#x27;s uncompressed</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">pubKey2Point</span>(<span class="hljs-params">PubKey pubKey</span>) : <span class="hljs-title class_">Point</span> {
        <span class="hljs-built_in">require</span>(pubKey[: <span class="hljs-number">1</span>] == b<span class="hljs-string">&#x27;04&#x27;</span>);
        <span class="hljs-keyword">return</span> { <span class="hljs-title function_">unpack</span>(pubKey[<span class="hljs-number">1</span> : <span class="hljs-number">33</span>]), <span class="hljs-title function_">unpack</span>(pubKey[<span class="hljs-number">33</span> : <span class="hljs-number">65</span>]) };
    }

}
</code></pre>
`

export default html
