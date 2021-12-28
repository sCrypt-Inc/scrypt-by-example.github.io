// metadata
export const version = "0.1.0"
export const title = "Public Function"
export const description = "Public functions in sCrypt"

const html = `<p>A public function is a function, that get&#39;s invoked by an unlocking script. The body of the function corresponds to the locking script of the contract and the functions arguments to the unlocking script. A contract must have at least one public function.</p>
<p>Public functions don&#39;t return any value and must end with a call to <code>require()</code>. If all calls to <code>require()</code> inside the function evaluate as true, then the contract can be redeemed.</p>
<p>A public function can be regarded as a mathematical boolean function. <code>f</code> is the function body and <code>x</code> the function arguments. A contract call succeeds if and only if <code>f(x)</code> returns true.</p>
<h2 id="multiple-public-functions">Multiple Public Functions</h2>
<p>A contract can have multiple public functions, representing different ways to fulfill a contract. Only one of the public functions can be called at a time. In this case, the last operator of  the unlocking script has to be the index of the public function called, starting from <code>0</code>. For example, if public function <code>larger</code> is called, unlocking script of <code>y 2</code> can fulfill the contract below, in which 2 is the public function index.</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">Test</span> {
    int x;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">equal</span>(<span class="hljs-params">int y</span>) {
        <span class="hljs-built_in">require</span>(y == <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span>);
    }

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">smaller</span>(<span class="hljs-params">int y</span>) {
        <span class="hljs-built_in">require</span>(y &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span>);
    }

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">larger</span>(<span class="hljs-params">int y</span>) {
        <span class="hljs-built_in">require</span>(y &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span>);
    }
}
</code></pre>
`

export default html
