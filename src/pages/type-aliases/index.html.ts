// metadata
export const version = "0.1.0"
export const title = "Type Aliases"
export const description = "Type aliases in sCrypt"

const html = `<p>Type aliases create a new name for a type. It does not actually create a new type, it merely creates a new name to refer to that type.</p>
<pre><code class="language-javascript">type <span class="hljs-title class_">Age</span> = int;
type <span class="hljs-title class_">Coordinate</span> = int[<span class="hljs-number">2</span>];
</code></pre>
<p>They can also be used for struct types.</p>
<p>Struct definition:</p>
<pre><code class="language-javascript">struct <span class="hljs-title class_">Point</span> {
  int x;
  int y;
}
</code></pre>
<p>Creating an alias for the defined struct:</p>
<pre><code class="language-javascript">type <span class="hljs-title class_">Coordinate</span> = <span class="hljs-title class_">Point</span>;
</code></pre>
`

export default html
