// metadata
export const version = "0.1.0"
export const title = "Code Seperator"
export const description = "Code seperator in sCrypt"

const html = `<p>Three or more consecutive <code>*</code> in a line insert an <a href="https://wiki.bitcoinsv.io/index.php/OP_CODESEPARATOR">OP_CODESEPARATOR</a>. It is used to exclude what comes before (and including itself) it from being part of the signature.</p>
<pre><code class="language-javascript">contract <span class="hljs-variable constant_">P2PKH_OCS</span> {
    <span class="hljs-title class_">Ripemd160</span> pubKeyHash;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">unlock</span>(<span class="hljs-params">Sig sig, PubKey pubKey</span>) {
        <span class="hljs-comment">// code separator 1</span>
        ***
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash160</span>(pubKey) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">pubKeyHash</span>);
        <span class="hljs-comment">// code separator 2</span>
        *****
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sig, pubKey));
    }
}
</code></pre>
`

export default html
