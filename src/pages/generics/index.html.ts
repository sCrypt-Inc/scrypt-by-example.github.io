// metadata
export const version = "0.1.0"
export const title = "Generic Types"
export const description = "Generic types in sCrypt"

const html = `<p>A generic type is a parameterized type. It allows a library to work over a variety of types rather than a single one. Users can consume these libraries and use their own concrete types.</p>
<p>Generic types can only be declared at library level and used within the library’s scope.</p>
<pre><code class="language-javascript">library <span class="hljs-title class_">HashedMap</span>&lt;K, V&gt; {

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">set</span>(<span class="hljs-params">K k, V v, int idx</span>) {
    ...
  }

}
</code></pre>
<p>Usage:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">HashedMap</span>&lt;bytes, int&gt; map = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashedMap</span>();
map.<span class="hljs-title function_">set</span>(b<span class="hljs-string">&#x27;01&#x27;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>);
</code></pre>
`

export default html
