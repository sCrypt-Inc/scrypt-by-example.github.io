// metadata
export const version = "0.1.0"
export const title = "Static Properties and Functions"
export const description = "Static properties and functions in sCrypt"

const html = `<p>A static property/function can be referenced with contract name as prefix without an instantiated contract, similar to a static function/property in Javascript or C++. A static property/function can also be referenced without the contract prefix, but only in the contract it is defined in.</p>
<pre><code class="language-javascript">library <span class="hljs-title class_">Foo</span> {
    <span class="hljs-keyword">static</span> int N = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">incByN</span>(<span class="hljs-params">int a</span>): int {
        <span class="hljs-comment">// N is used with and without Foo prefix</span>
        <span class="hljs-keyword">return</span> a + <span class="hljs-title class_">Foo</span>.<span class="hljs-property">N</span> + N;
    }

    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">double</span>(<span class="hljs-params">int x</span>): int {
        <span class="hljs-comment">// incByN() is called with prefix and without</span>
        <span class="hljs-keyword">return</span> <span class="hljs-title class_">Foo</span>.<span class="hljs-title function_">incByN</span>(x) + <span class="hljs-title function_">incByN</span>(x);
    }
}

contract <span class="hljs-title class_">Bar</span> {
    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">unlock</span>(<span class="hljs-params">int y</span>) {
        <span class="hljs-built_in">require</span>(y == <span class="hljs-title class_">Foo</span>.<span class="hljs-title function_">double</span>(<span class="hljs-number">2</span>));
        <span class="hljs-built_in">require</span>(y == <span class="hljs-title class_">Foo</span>.<span class="hljs-property">N</span>);
        <span class="hljs-comment">// N cannot be referenced without Foo prefix</span>
        <span class="hljs-comment">// require(y == N);</span>
    }
}
</code></pre>
`

export default html
