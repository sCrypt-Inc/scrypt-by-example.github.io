// metadata
export const version = "0.1.0"
export const title = "Constructor"
export const description = "Constructors in sCrypt"

const html = `<p>We can define a constructor in order to store variables in a contract (locking script).</p>
<p>The constructor can be defined implicitly:</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">Test</span> {
    int x1;
    bytes x2;
    bool x3;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">equal</span>(<span class="hljs-params">int y</span>) {...}
}
</code></pre>
<p>or explicitly:</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">Test</span> {
    int x1;
    bytes x2;
    bool x3;

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params">int x1, bytes x2, bool x3</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">x1</span> = x1;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">x2</span> = x2;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">x3</span> = x3;
    }

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">equal</span>(<span class="hljs-params">int y</span>) {...}
}
</code></pre>
<p>Both examples are functionally equivalent.</p>
`

export default html
