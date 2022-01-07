// metadata
export const version = "0.1.0"
export const title = "Rabin Signatures"
export const description = "Rabin signatures in sCrypt"

const html = `<p>A <a href="https://en.wikipedia.org/wiki/Rabin_signature_algorithm">Rabin signature</a> is an alternative form of digital signature to ECDSA used in Bitcoin. It allows for efficient on-chain signature verification and is often used for signing and verifying oracle data.</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">RabinSignature</span> {

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">verifySig</span>(<span class="hljs-params">int sig, bytes msg, bytes padding, int n</span>) {
        int h = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">fromLEUnsigned</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">hash</span>(msg + padding));
        <span class="hljs-built_in">require</span>((sig * sig) % n == h % n);
    }

    <span class="hljs-keyword">function</span> <span class="hljs-title function_">hash</span>(<span class="hljs-params">bytes x</span>): bytes {
        <span class="hljs-comment">// expand into 512 bit hash</span>
        bytes hx = <span class="hljs-title function_">sha256</span>(x);
        int idx = <span class="hljs-title function_">len</span>(hx) / <span class="hljs-number">2</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">sha256</span>(hx[:idx]) + <span class="hljs-title function_">sha256</span>(hx[<span class="hljs-attr">idx</span>:]);
    }

    <span class="hljs-keyword">function</span> <span class="hljs-title function_">fromLEUnsigned</span>(<span class="hljs-params">bytes b</span>): int {
        <span class="hljs-comment">// append positive sign byte. This does not hurt even when sign bit is already positive</span>
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">unpack</span>(b + b<span class="hljs-string">&#x27;00&#x27;</span>);
    }

}
</code></pre>
`

export default html
