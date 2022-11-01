// metadata
export const version = "0.1.0"
export const title = "Stateful Contract"
export const description = "Stateful contracts in sCrypt"

const html = `<p>Declare any property that is part of the state with <code>@state</code> decorator. The state property can be used the same way as a regular property.</p>
<p>In order to presist the state, we need to enforce it in the output of the transaction, that will spend our contract in the future. To achieve that, the spending transaction must pass it&#39;s transaction preimage and call <code>this.updateState(txPreimage, amount)</code> to maintain the state.</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">Counter</span> {

    @state
    int counter;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">increment</span>(<span class="hljs-params">SigHashPreimage txPreimage, int amount</span>) {
        <span class="hljs-comment">// Increment counter value.</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">counter</span>++;

        <span class="hljs-comment">// Ensure next output contains script with updated counter value.</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateState</span>(txPreimage, amount));
    }
}
</code></pre>
`

export default html
