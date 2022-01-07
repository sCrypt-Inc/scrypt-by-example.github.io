// metadata
export const version = "0.1.0"
export const title = "Inline Assembly"
export const description = "Inline assembly in sCrypt"

const html = `<p>Script can be embedded directly into sCrypt source code using assembly representation. An sCrypt function can be written in Script and called like a regular sCrypt function.</p>
<p>For a function to be written in Script, its entire body must be enclosed by an <code>asm</code> block. Function parameters are on top of the stack, in reverse order as declared.</p>
<p>An example that emulates the behaviour of a regular P2PKH is shown below:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">p2pkh</span>(<span class="hljs-params">Sig sig, PubKey pubKey</span>): bool {
    asm {
        op_dup
        op_hash160
        $pkh
        op_equalverify
        op_checksig
    }
}
</code></pre>
`

export default html
