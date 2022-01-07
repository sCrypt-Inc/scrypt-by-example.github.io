// metadata
export const version = "0.1.0"
export const title = "If / Else"
export const description = "If / else statement in sCrypt"

const html = `<p>An <code>if</code> statement can take a value of <code>bool</code>, <code>ìnt</code> or <code>bytes</code>. An <code>int</code> value is interpreted to be <code>false</code> if and only if it equals <code>0</code>. A <code>bytes</code> value is interpreted as <code>false</code> if and only if every byte of its value equals <code>b&#39;00&#39;</code>. That includes empty <code>bytes</code> (<code>b&#39;&#39;</code>).</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Can be either:</span>
bool cond = <span class="hljs-literal">true</span>;
<span class="hljs-comment">// or:</span>
bytes cond = b<span class="hljs-string">&#x27;01&#x27;</span>;
<span class="hljs-comment">// or:</span>
int cond = <span class="hljs-number">1</span>;

<span class="hljs-keyword">if</span> (cond) {
    ...
} <span class="hljs-keyword">else</span> {
    ...
}
</code></pre>
`

export default html
