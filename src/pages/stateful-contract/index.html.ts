// metadata
export const version = "0.1.0"
export const title = "Stateful Contract"
export const description = "Stateful contracts in sCrypt"

const html = `<p>Declare any property that is part of the state with <code>@state</code> decorator. The state property can be used the same way as a regular property.</p>
<p>In order to presist the state, we need to enforce it in the output of the transaction, that will spend our contract in the future. To achieve that, the spending transaction must pass it&#39;s transaction preimage.</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">Counter</span> {
    @state
    int counter;

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params">int counter</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">counter</span> = counter;
    }

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">increment</span>(<span class="hljs-params">SigHashPreimage txPreimage, int amount</span>) {
        <span class="hljs-comment">// Ensure that the passed preimage is correct for this TX.</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimage</span>(txPreimage));

        <span class="hljs-comment">// Mutate state.</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">counter</span>++;

        <span class="hljs-comment">// Get this TXs output.</span>
        bytes outputScript = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getStateScript</span>();

        <span class="hljs-comment">// Construct an output from its locking script and satoshi amount.</span>
        bytes output = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(outputScript, amount);

        <span class="hljs-comment">// Ensure that the TX actually contains this exact output.</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-title function_">hash256</span>(output) == <span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">hashOutputs</span>(txPreimage));
    }
}
</code></pre>
`

export default html
