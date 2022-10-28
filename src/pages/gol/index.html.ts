// metadata
export const version = "0.1.0"
export const title = "Conway's Game of Life"
export const description = "Conway's Game of Life in sCrypt"

const html = `<p>Rules:</p>
<ol>
<li>Any live cell with fewer than two live neighbours dies, as if by needs caused by underpopulation.</li>
<li>Any live cell with more than three live neighbours dies, as if by overcrowding.</li>
<li>Any live cell with two or three live neighbours lives, unchanged, to the next generation.</li>
<li>Any dead cell with exactly three live neighbours cells will come to life.</li>
</ol>
<p>The generation of the game is stored as the <a href="https://by-example.scrypt.io/stateful-contract/">state</a> of the contract.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">"arrayUtil.scrypt"</span>;

<span class="hljs-comment">// Conway Game Of Life on a board of N * N</span>
contract <span class="hljs-title class_">GameOfLife</span> {
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int N = <span class="hljs-number">5</span>;
    <span class="hljs-comment">// effctively we play on a grid of (N+2) * (N+2) without handling boundary cells</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int <span class="hljs-variable constant_">BOARD_SIZE</span> = <span class="hljs-title class_">GameOfLife</span>.<span class="hljs-property">N</span> + <span class="hljs-number">2</span>;
    <span class="hljs-comment">//static const int XY = BOARD_SIZE * BOARD_SIZE;  &lt;- error: invalid array size when run #serializeState</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int <span class="hljs-variable constant_">XY</span> = <span class="hljs-number">49</span>; 
    <span class="hljs-keyword">static</span> int <span class="hljs-variable constant_">LIVE</span> = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">static</span> int <span class="hljs-variable constant_">DEAD</span> = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int <span class="hljs-variable constant_">LOOP_NEIGHBORS</span> = <span class="hljs-number">3</span>;

    @state
    int[<span class="hljs-variable constant_">XY</span>] board;

    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">play</span>(<span class="hljs-params">int amount, SigHashPreimage txPreimage</span>) {
        <span class="hljs-comment">// make the move</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span> = <span class="hljs-title class_">GameOfLife</span>.<span class="hljs-title function_">evolve</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>);

        <span class="hljs-comment">// update state: next turn &amp; next board</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">propagateState</span>(txPreimage, amount));
    }

    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">evolve</span>(<span class="hljs-params">int[XY] oldBoard</span>) : int[<span class="hljs-variable constant_">XY</span>] {
        int[<span class="hljs-variable constant_">XY</span>] newBoard = oldBoard;

        int i = <span class="hljs-number">1</span>;
        loop (<span class="hljs-title class_">GameOfLife</span>.<span class="hljs-property">N</span>) {
            int j = <span class="hljs-number">1</span>;
            loop (<span class="hljs-title class_">GameOfLife</span>.<span class="hljs-property">N</span>) {
                int nextState = <span class="hljs-title class_">GameOfLife</span>.<span class="hljs-title function_">next</span>(oldBoard, i, j);
                newBoard[<span class="hljs-title class_">GameOfLife</span>.<span class="hljs-title function_">index</span>(i, j)] = nextState;
                
                j++;
            }

            i++;
        }

        <span class="hljs-keyword">return</span> newBoard;
    }

    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">next</span>(<span class="hljs-params">int[XY] oldBoard, int row, int col</span>) : int {
        <span class="hljs-comment">// number of neighbors alive</span>
        int alive = <span class="hljs-number">0</span>;

        int i = -<span class="hljs-number">1</span>;
        loop (<span class="hljs-variable constant_">LOOP_NEIGHBORS</span>) {
            int j = -<span class="hljs-number">1</span>;

            loop (<span class="hljs-variable constant_">LOOP_NEIGHBORS</span>) {
                <span class="hljs-keyword">if</span> (!(i == <span class="hljs-number">0</span> &amp;&amp; j == <span class="hljs-number">0</span>)) {
                    <span class="hljs-keyword">if</span> (oldBoard[<span class="hljs-title class_">GameOfLife</span>.<span class="hljs-title function_">index</span>(row + i, col + j)]) {
                        alive++;
                    }
                }
                j++;
            }

            i++;
        }

        int oldState = oldBoard[<span class="hljs-title class_">GameOfLife</span>.<span class="hljs-title function_">index</span>(row, col)];
        <span class="hljs-comment">/* rule
        1. Any live cell with two or three live neighbours survives.
        2. Any dead cell with three live neighbours becomes a live cell.
        3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        */</span>
        <span class="hljs-keyword">return</span> (alive == <span class="hljs-number">3</span> || alive == <span class="hljs-number">2</span> &amp;&amp; oldState == <span class="hljs-variable constant_">LIVE</span>) ? <span class="hljs-variable constant_">LIVE</span> : <span class="hljs-variable constant_">DEAD</span>;
    }

    <span class="hljs-keyword">static</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">index</span>(<span class="hljs-params">int i, int j</span>) : int {
        <span class="hljs-keyword">return</span> i * <span class="hljs-title class_">GameOfLife</span>.<span class="hljs-property">BOARD_SIZE</span> + j;
    }

    <span class="hljs-keyword">function</span> <span class="hljs-title function_">propagateState</span>(<span class="hljs-params">SigHashPreimage txPreimage, int value</span>) : bool {
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimage</span>(txPreimage));
        bytes outputScript = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getStateScript</span>();
        bytes output = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(outputScript, value);
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">hash256</span>(output) == <span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">hashOutputs</span>(txPreimage);
    }
}
</code></pre>
`

export default html
