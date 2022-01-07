// metadata
export const version = "0.1.0"
export const title = "Auction"
export const description = "Auction in sCrypt"

const html = `<p>The auction contract implements two public functions:</p>
<ul>
<li><code>bid</code> - If a higher bid is found, the current winner is updated and the previous highest bidder is refunded.</li>
<li><code>close</code> - The auctioneer can close the auction after it expires and take the offer.</li>
</ul>
<pre><code class="language-javascript"><span class="hljs-comment">// Auction: highest bid before deadline wins</span>
contract <span class="hljs-title class_">Auction</span> {
    @state
    <span class="hljs-title class_">Ripemd160</span> bidder;

    <span class="hljs-title class_">PubKey</span> auctioner;
    int auctionDeadline;

    <span class="hljs-comment">// bid with a higher offer</span>
    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">bid</span>(<span class="hljs-params">Ripemd160 bidder, int bid, int changeSats, SigHashPreimage txPreimage</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimage</span>(txPreimage));

        int highestBid = <span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">value</span>(txPreimage);
        <span class="hljs-built_in">require</span>(bid &gt; highestBid);

        <span class="hljs-title class_">Ripemd160</span> highestBidder = <span class="hljs-variable language_">this</span>.<span class="hljs-property">bidder</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">bidder</span> = bidder;

        <span class="hljs-comment">// auction continues with a higher bidder</span>
        bytes stateScript = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getStateScript</span>();
        bytes auctionOutput = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(stateScript, bid);

        <span class="hljs-comment">// refund previous highest bidder</span>
        bytes refundScript = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildPublicKeyHashScript</span>(highestBidder);
        bytes refundOutput = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(refundScript, highestBid);

        bytes changeScript = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildPublicKeyHashScript</span>(bidder);
        bytes changeOutput = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(changeScript, changeSats);

        bytes output = auctionOutput + refundOutput + changeOutput;

        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash256</span>(output) == <span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">hashOutputs</span>(txPreimage));
    }

    <span class="hljs-comment">// withdraw after bidding is over</span>
    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">close</span>(<span class="hljs-params">Sig sig, SigHashPreimage txPreimage</span>) {
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimage</span>(txPreimage));
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">nLocktime</span>(txPreimage) &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">auctionDeadline</span>);
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">checkSig</span>(sig, <span class="hljs-variable language_">this</span>.<span class="hljs-property">auctioner</span>));
    }
}
</code></pre>
`

export default html
