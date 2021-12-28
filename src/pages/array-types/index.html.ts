// metadata
export const version = "0.1.0"
export const title = "Array Types"
export const description = "Array types in sCrypt"

const html = `<p>An array is a fixed-size list of values of the same <em>basic</em> type.</p>
<h3 id="array-literals">Array literals</h3>
<pre><code class="language-javascript">bool[<span class="hljs-number">3</span>] b = [<span class="hljs-literal">false</span>, <span class="hljs-literal">false</span> &amp;&amp; <span class="hljs-literal">true</span> || <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span> || (<span class="hljs-number">1</span> &gt; <span class="hljs-number">2</span>)];
int[<span class="hljs-number">3</span>] c = [<span class="hljs-number">72</span>, -<span class="hljs-number">4</span> - <span class="hljs-number">1</span> - <span class="hljs-number">40</span>, <span class="hljs-number">833</span> * (<span class="hljs-number">99</span> + <span class="hljs-number">9901</span>) + <span class="hljs-number">8888</span>];
bytes[<span class="hljs-number">3</span>] a = [b<span class="hljs-string">&#x27;ffee&#x27;</span>, b<span class="hljs-string">&#x27;11&#x27;</span>, b<span class="hljs-string">&#x27;22&#x27;</span>];
int[<span class="hljs-number">2</span>][<span class="hljs-number">3</span>] d = [[<span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>], [<span class="hljs-number">21</span>, <span class="hljs-number">22</span>, <span class="hljs-number">23</span>]];
</code></pre>
<p>Array dimensions can be ommited, when declared:</p>
<pre><code class="language-javascript">int[] e = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>];
int[][] f = [[<span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>], [<span class="hljs-number">21</span>, <span class="hljs-number">22</span>, <span class="hljs-number">23</span>]];
</code></pre>
<h3 id="repeat-function">Repeat function</h3>
<p>The function <code>T[size] repeat(T e, static const int size)</code> returns an array with all size elements set to <code>e</code>, where <code>T</code> can be any type. Note <code>size</code> must be a compile time constant.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// a == [0, 0, 0]</span>
int[<span class="hljs-number">3</span>] a = <span class="hljs-title function_">repeat</span>(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>);

<span class="hljs-comment">// arr2D == [[0, 0, 0], [0, 0, 0]]</span>
int[<span class="hljs-number">2</span>][<span class="hljs-number">3</span>] arr2D = <span class="hljs-title function_">repeat</span>(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>);

int[<span class="hljs-number">4</span>] flags = [<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>]
flags = <span class="hljs-title function_">repeat</span>(<span class="hljs-literal">false</span>, <span class="hljs-number">4</span>);   <span class="hljs-comment">// set all flags to be false</span>
</code></pre>
<h3 id="index-operator">Index operator</h3>
<p>A variable index is allowed when reading from an array:</p>
<pre><code class="language-javascript">int[<span class="hljs-number">3</span>] a = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>];
int idx = <span class="hljs-number">2</span>;
int val = a[idx];
</code></pre>
<p>An index value, that is out of bounds will cause contract execution to fail immeadiately.</p>
<p>When writing to an array however, the index operator needs to be a compile-time constant:</p>
<pre><code class="language-javascript">a[N] = <span class="hljs-number">3</span>;    <span class="hljs-comment">// N is a CTC</span>
<span class="hljs-comment">// or</span>
a[<span class="hljs-number">1</span>] = <span class="hljs-number">3</span>;
</code></pre>
`

export default html
