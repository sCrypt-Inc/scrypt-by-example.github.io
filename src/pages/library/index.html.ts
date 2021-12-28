// metadata
export const version = "0.1.0"
export const title = "Library"
export const description = "Libraries in sCrypt"

const html = `<p>A library is the same with a contract, except it does not contain any public function. It is only intended to be imported by a contract or other libraries. It thus cannot be independently deployed and called. It is frequently used to group related constants and static functions.</p>
<pre><code class="language-javascript">library <span class="hljs-title class_">Util</span> {
    <span class="hljs-comment">// number of bytes to denote some numeric value</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int <span class="hljs-title class_">DataLen</span> = <span class="hljs-number">1</span>;
    <span class="hljs-comment">// number of bytes to denote length serialized state, including varint prefix (1 byte) + length (2 bytes), change length to 4 when you need PushData4</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int <span class="hljs-title class_">StateLen</span> = <span class="hljs-number">3</span>;

    <span class="hljs-comment">// convert signed integer "n" to unsigned integer of "l" bytes, in little endian</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">toLEUnsigned</span>(<span class="hljs-params">int n, int l</span>): bytes {
        <span class="hljs-comment">// one extra byte to accommodate possible negative sign byte</span>
        bytes m = <span class="hljs-title function_">num2bin</span>(n, l + <span class="hljs-number">1</span>);
        <span class="hljs-comment">// remove sign byte</span>
        <span class="hljs-keyword">return</span> m[<span class="hljs-number">0</span> : <span class="hljs-title function_">len</span>(m) - <span class="hljs-number">1</span>];
    }
}
</code></pre>
`

export default html
