// metadata
export const version = "0.1.0"
export const title = "Contract-Private functions"
export const description = "Contract-private functions in sCrypt"

const html = `<p>sCrypt enables developers to define their own functions as exemplified below:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">sum</span>(<span class="hljs-params">int a, int b</span>): int {
    <span class="hljs-keyword">return</span> a + b;
}
</code></pre>
<p>They are only visible within the contract, similar to <code>private</code> functions in Solidity.</p>
<p>Every function must end with a <code>return</code> statement. Recursion is disallowed. A function cannot call itself in its body, either directly or indirectly.</p>
`

export default html
