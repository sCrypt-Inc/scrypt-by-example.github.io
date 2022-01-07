// metadata
export const version = "0.1.0"
export const title = "Outsourcing Vanity Address Generation"
export const description = "Outsourcing vanity address generation in sCrypt"

const html = `<p>In order to outsource the generation of a desired vanity address, say with the prefix <code>1Love</code>, we generate a key pair <strong>p</strong>, <strong>P</strong>.
We then share <strong>P</strong> with the seller, who will find the public key of our final vanity address. He will then go through many values of a partial private key <strong>x</strong>, until <strong>P + x*G</strong> yields a public key <strong>P&#39;</strong>, the address of which will contain our desired prefix. He then shares this key <em>x</em>, so we can assemble the private key of <strong>P&#39;</strong>, by calculating <strong>k = (p + x) * G</strong>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">"ec.scrypt"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"util.scrypt"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"base58.scrypt"</span>;


contract <span class="hljs-title class_">VanityAddr</span> {

    <span class="hljs-title class_">PubKey</span> P;
    bytes pattern;
    <span class="hljs-title class_">Ripemd160</span> cancelPubKeyHash;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">cancel</span>(<span class="hljs-params">Sig sig, PubKey pubKey</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash160</span>(pubKey) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">cancelPubKeyHash</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sig, pubKey));
    }

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">offerVanityAddr</span>(<span class="hljs-params">PrivKey x,
                                    PubKey X,
                                    PubKey derP,
                                    int lambda,
                                    SigHashPreimage txPreimage</span>) {
        <span class="hljs-comment">// Check if x is private key of X.</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimageAdvanced</span>(txPreimage, x, X, <span class="hljs-title class_">Tx</span>.<span class="hljs-property">invK</span>, <span class="hljs-title class_">Tx</span>.<span class="hljs-property">r</span>, <span class="hljs-title class_">Tx</span>.<span class="hljs-property">rBigEndian</span>, <span class="hljs-title class_">SigHashType</span>(<span class="hljs-title class_">SigHash</span>.<span class="hljs-property">ALL</span> | <span class="hljs-title class_">SigHash</span>.<span class="hljs-property">FORKID</span>)));

        <span class="hljs-comment">// Check if P&#x27; = P + X.</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-variable constant_">EC</span>.<span class="hljs-title function_">isPubKeySum</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">P</span>, X, lambda, derivedPubKey));

        <span class="hljs-comment">// Check if P&#x27; produces desired address.</span>
        <span class="hljs-title class_">PubKey</span> derivedPubKeyCompressed = <span class="hljs-title function_">compressPubKey</span>(derivedPubKey);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">matchPattern</span>(derivedPubKeyCompressed, <span class="hljs-variable language_">this</span>.<span class="hljs-property">pattern</span>));
    }

    <span class="hljs-comment">// Check if public key&#x27;s address matches the given pattern.</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">matchPattern</span>(<span class="hljs-params">PubKey pubKey, bytes pattern</span>) : bool {
        <span class="hljs-comment">// Derive the address.</span>
        bytes addr = <span class="hljs-title function_">hash160</span>(pubKey);

        <span class="hljs-comment">// Encode to base58check.</span>
        bytes addrB58 = <span class="hljs-title class_">Base58</span>.<span class="hljs-title function_">base58EncodeCheckAddr</span>(addr, <span class="hljs-title class_">Base58</span>.<span class="hljs-property">P2PKH_verbyte_mainnet</span>);

        <span class="hljs-comment">// Prefix match.</span>
        int l = <span class="hljs-title function_">len</span>(pattern);
        <span class="hljs-keyword">return</span> addrB58[:l] == pattern;
    }

    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">compressPubKey</span>(<span class="hljs-params">PubKey pk</span>) : <span class="hljs-title class_">PubKey</span> {
        <span class="hljs-comment">// Check if y-coord is even or odd</span>
        bool isEven = (pk[<span class="hljs-number">63</span>:<span class="hljs-number">64</span>] &amp; b<span class="hljs-string">&#x27;01&#x27;</span>) != b<span class="hljs-string">&#x27;01&#x27;</span>;

        bytes prefix = isEven ? b<span class="hljs-string">&#x27;02&#x27;</span> : b<span class="hljs-string">&#x27;03&#x27;</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-title class_">PubKey</span>(prefix + pk[<span class="hljs-number">1</span>:<span class="hljs-number">33</span>]);
    }
}
</code></pre>
`

export default html
