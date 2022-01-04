// metadata
export const version = "0.1.0"
export const title = "Operators"
export const description = "Operators in sCrypt"

const html = `<table>
<thead>
<tr>
<th><strong>Precedence</strong></th>
<th><strong>Operators</strong></th>
<th><strong>Associativity</strong></th>
</tr>
</thead>
<tbody><tr>
<td>1</td>
<td><code>- ! ~</code></td>
<td>right</td>
</tr>
<tr>
<td>2</td>
<td><code>* / %</code></td>
<td>left</td>
</tr>
<tr>
<td>3</td>
<td><code>+ -</code></td>
<td>left</td>
</tr>
<tr>
<td>4</td>
<td><code>&lt;&lt; &gt;&gt;</code></td>
<td>left</td>
</tr>
<tr>
<td>5</td>
<td><code>&lt; &lt;= &gt; &gt;=</code></td>
<td>left</td>
</tr>
<tr>
<td>6</td>
<td><code>== !=</code></td>
<td>left</td>
</tr>
<tr>
<td>7</td>
<td><code>&amp;</code></td>
<td>left</td>
</tr>
<tr>
<td>8</td>
<td><code>^</code></td>
<td>left</td>
</tr>
<tr>
<td>9</td>
<td><code>|</code></td>
<td>left</td>
</tr>
<tr>
<td>10</td>
<td><code>&amp;&amp;</code></td>
<td>left</td>
</tr>
<tr>
<td>11</td>
<td><code>||</code></td>
<td>left</td>
</tr>
<tr>
<td>12</td>
<td><code>? :</code></td>
<td>right</td>
</tr>
</tbody></table>
<p>Operators <code>&amp;&amp;</code>, <code>||</code>, and <code>? :</code> use <a href="https://en.wikipedia.org/wiki/Short-circuit_evaluation">short-circuit evaluation</a>.</p>
`

export default html
