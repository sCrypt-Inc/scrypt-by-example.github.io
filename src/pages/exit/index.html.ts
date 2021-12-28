// metadata
export const version = "0.1.0"
export const title = "Exit Function"
export const description = "Exit function in sCrypt"

const html = `<p><code>exit(bool status)</code> terminates contract execution. If status is <code>true</code>, the contract succeeds; otherwise, it fails.</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">TestPositiveEqual</span> {
    int x;

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params">int x</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span> = x;
    }

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">equal</span>(<span class="hljs-params">int y</span>) {
        <span class="hljs-keyword">if</span> (y &lt;= <span class="hljs-number">0</span>) {
          <span class="hljs-title function_">exit</span>(<span class="hljs-literal">true</span>);
        }
        <span class="hljs-built_in">require</span>(y == <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span>);
    }
}
</code></pre>
`

export default html
