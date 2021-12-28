// metadata
export const version = "0.1.0"
export const title = "Access Modifiers"
export const description = "Access modifiers in sCrypt"

const html = `<p>There are three types of access modifiers available to help restrict the scope of properties and functions of a contract:</p>
<ul>
<li>Default: no keyword required</li>
<li>Private</li>
<li>Public: only applies to functions</li>
</ul>
<p>Only public functions can be called externally by Bitcoin transactions.</p>
<table>
<thead>
<tr>
<th></th>
<th><strong>default</strong></th>
<th><strong>private</strong></th>
<th><strong>public</strong></th>
</tr>
</thead>
<tbody><tr>
<td>Same contract</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Other conract</td>
<td>Yes</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Externally</td>
<td>No</td>
<td>No</td>
<td>Yes</td>
</tr>
</tbody></table>
`

export default html
