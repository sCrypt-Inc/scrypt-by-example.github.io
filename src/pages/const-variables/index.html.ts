// metadata
export const version = "0.1.0"
export const title = "Const Variables"
export const description = "Const variables in sCrypt"

const html = `<p>Variables declared const cannot be changed once initialized.</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">Test</span> {
    <span class="hljs-keyword">const</span> int x;

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params">int x</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span> = x; <span class="hljs-comment">// good, since this is initialization</span>
    }

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">equal</span>(<span class="hljs-params"><span class="hljs-keyword">const</span> int y</span>) {
        y = <span class="hljs-number">1</span>; <span class="hljs-comment">// &lt;-- error</span>

        <span class="hljs-keyword">const</span> int a = <span class="hljs-number">36</span>;
        a = <span class="hljs-number">11</span>; <span class="hljs-comment">// &lt;-- error</span>

        <span class="hljs-built_in">require</span>(y == <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span>);
    }
}
</code></pre>
`

export default html
