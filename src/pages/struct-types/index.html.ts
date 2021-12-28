// metadata
export const version = "0.1.0"
export const title = "Struct Types"
export const description = "Struct types in sCrypt"

const html = `<p>A struct is a collection of variable under a single name.</p>
<p>Structs can be defined like the following:</p>
<pre><code class="language-javascript">struct <span class="hljs-title class_">Point</span> {
  int x;
  int y;
}

struct <span class="hljs-title class_">Line</span> {
  <span class="hljs-title class_">Point</span> start;
  <span class="hljs-title class_">Point</span> end;
}
</code></pre>
<p>Usage:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Point</span> p = {<span class="hljs-number">10</span>, -<span class="hljs-number">10</span>};
int x = p.<span class="hljs-property">x</span>;
p.<span class="hljs-property">y</span> = <span class="hljs-number">20</span>;

<span class="hljs-comment">// Define a variable q of type Point, and set members to the same values as those of p</span>
<span class="hljs-title class_">Point</span> q = p;
<span class="hljs-built_in">require</span>(p == q); <span class="hljs-comment">// true</span>

<span class="hljs-title class_">Line</span> l = {p, q};
l.<span class="hljs-property">start</span>.<span class="hljs-property">x</span> = l.<span class="hljs-property">end</span>.<span class="hljs-property">y</span> + <span class="hljs-number">1</span>;
</code></pre>
`

export default html
