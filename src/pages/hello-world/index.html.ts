// metadata
export const version = "0.1.0"
export const title = "Hello World"
export const description = "Hello world in sCrypt"

const html = `<p>The following is a simple contract written in sCrypt. It takes an integer <code>x</code> as a parameter for the constructor.
It exposes a single public function <code>equals</code>, which checks if the passed parameter is equal to <code>x</code>.
On a lower level this means, that we need to include an integer <code>y</code> in the unlocking script, that unlocks the output containing our smart contract (which stores <code>x</code>).</p>
<pre><code class="language-javascript">contract <span class="hljs-title class_">HelloWorld</span> {
    int x;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">equals</span>(<span class="hljs-params">int y</span>) {
        <span class="hljs-built_in">require</span>(y == <span class="hljs-variable language_">this</span>.<span class="hljs-property">x</span>);
    }
}
</code></pre>
`

export default html
