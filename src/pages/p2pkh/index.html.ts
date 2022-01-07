// metadata
export const version = "0.1.0"
export const title = "P2PKH"
export const description = "Pay to Public Key Hash (P2PKH) in sCrypt"

const html = `<p>Pay-to-PubKey-Hash (<a href="https://learnmeabitcoin.com/guide/p2pkh">P2PKH</a>) contract is used to send bitcoins to a bitcoin address. It is the most common contract on the Bitcoin network. Such contracts are unlocked by the public key and a signature created by the corresponding private key.</p>
<pre><code class="language-javascript">contract <span class="hljs-variable constant_">P2PKH</span> {
    <span class="hljs-title class_">Ripemd160</span> pubKeyHash;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">unlock</span>(<span class="hljs-params">Sig sig, PubKey pubKey</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash160</span>(pubKey) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">pubKeyHash</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sig, pubKey));
    }
}
</code></pre>
`

export default html
