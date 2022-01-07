// metadata
export const version = "0.1.0"
export const title = "Fair Coin Toss"
export const description = "Fair coin toss in sCrypt"

const html = `<p>Alice and Bob decide to flip a coin, but they have no physical coin or they want to do it over the Internet. They can achieve fair coin tossing by following protocol on Bitcoin.</p>
<ol>
<li>Alice and Bob each locks X bitcoins in a smart contract shown below.</li>
<li>They both reveal their secret number, which are XOR’d to determine if the coins lands on head or tail. Alice wins if it is head, otherwise Bob wins. Whoever wins takes all 2X bitcoins.</li>
</ol>
<pre><code class="language-javascript">contract <span class="hljs-title class_">CoinToss</span> {

    <span class="hljs-title class_">PubKey</span> alice;
    <span class="hljs-title class_">PubKey</span> bob;
    <span class="hljs-comment">// commitments</span>
    <span class="hljs-title class_">Sha256</span> aliceHash;
    <span class="hljs-title class_">Sha256</span> bobHash;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">toss</span>(<span class="hljs-params">bytes aliceNonce, bytes bobNonce, Sig sig</span>) {
        <span class="hljs-comment">// nonce can be of any length, as long as it&#x27;s resistant from brute-force attack</span>
        <span class="hljs-comment">// We use 256 bits / 32 bytes as an example here</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">len</span>(aliceNonce) == <span class="hljs-number">32</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash256</span>(aliceNonce) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">aliceHash</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">len</span>(bobNonce) == <span class="hljs-number">32</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash256</span>(bobNonce) == <span class="hljs-variable language_">this</span>.<span class="hljs-property">bobHash</span>);
        
        <span class="hljs-comment">// last bit of XOR</span>
        bytes head = (aliceNonce ^ bobNonce) &amp; b<span class="hljs-string">&#x27;0000000000000000000000000000000000000000000000000000000000000001&#x27;</span>;

        <span class="hljs-comment">// head -&gt; Alice wins; tail -&gt; Bob wins</span>
        <span class="hljs-title class_">PubKey</span> winner = head ? <span class="hljs-variable language_">this</span>.<span class="hljs-property">alice</span> : <span class="hljs-variable language_">this</span>.<span class="hljs-property">bob</span>;

        <span class="hljs-comment">// winner takes all</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sig, winner));
    }

}
</code></pre>
`

export default html
