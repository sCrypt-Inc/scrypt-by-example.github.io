// metadata
export const version = "0.1.0"
export const title = "Type Inference"
export const description = "Type inference in sCrypt"

const html = `<p>The <code>auto</code> keyword specifies that the type of the variable, of basic type, declared will be automatically deducted from its initializer.</p>
<pre><code class="language-javascript">auto a1 = b<span class="hljs-string">&#x27;36&#x27;</span>;      <span class="hljs-comment">// bytes</span>
auto a2 = <span class="hljs-number">1</span> + <span class="hljs-number">5</span> * <span class="hljs-number">3</span>;  <span class="hljs-comment">// int</span>
</code></pre>
`

export default html
