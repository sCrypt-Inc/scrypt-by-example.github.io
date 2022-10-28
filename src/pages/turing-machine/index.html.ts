// metadata
export const version = "0.1.0"
export const title = "Turing Machine"
export const description = "Turing Machine in sCrypt"

const html = `<p>In the example below, we implement a Turing machine for <a href="https://math.stackexchange.com/questions/503853/how-do-you-argue-or-prove-that-a-certain-turing-machine-accepts-a-language">checking balanced parentheses</a>. Its initial state is A and it contains one accepted state. The transition function says, for instance, if the machine is at state A and its head reads symbol “)”, it should write “X” in that cell and move left, transitioning to state B.</p>
<p>Structs can be defined like the following:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">"serializer.scrypt"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">"arrayUtil.scrypt"</span>;

<span class="hljs-comment">// Turing machine state</span>
type <span class="hljs-title class_">State</span> = bytes;
<span class="hljs-comment">// alphabet symbol in each cell, 1 byte long each</span>
type <span class="hljs-title class_">Symbol</span> = bytes;

<span class="hljs-comment">// contract state as a struct</span>
struct <span class="hljs-title class_">StateStruct</span> {
    int headPos;
    bytes tape;
    <span class="hljs-comment">// current machine state</span>
    <span class="hljs-title class_">State</span> curState;
}

struct <span class="hljs-title class_">Input</span> {
    <span class="hljs-title class_">State</span> oldState;
    <span class="hljs-title class_">Symbol</span> read;
}

struct <span class="hljs-title class_">Output</span> {
    <span class="hljs-title class_">State</span> newState;
    <span class="hljs-title class_">Symbol</span> write;
    <span class="hljs-comment">// move left or right</span>
    bool moveLeft;
}

<span class="hljs-comment">// transition function entry: input -&gt; output</span>
struct <span class="hljs-title class_">TransitionFuncEntry</span> {
    <span class="hljs-title class_">Input</span> input;
    <span class="hljs-title class_">Output</span> output;
}

<span class="hljs-comment">/*
 * A Turing Machine checking balanced parentheses
 */</span>
contract <span class="hljs-title class_">TuringMachine</span> {

    @state
    <span class="hljs-title class_">StateStruct</span> states;
    <span class="hljs-comment">// states</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">State</span> <span class="hljs-variable constant_">STATE_A</span> = b<span class="hljs-string">&#x27;00&#x27;</span>; <span class="hljs-comment">// initial state</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">State</span> <span class="hljs-variable constant_">STATE_B</span> = b<span class="hljs-string">&#x27;01&#x27;</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">State</span> <span class="hljs-variable constant_">STATE_C</span> = b<span class="hljs-string">&#x27;02&#x27;</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">State</span> <span class="hljs-variable constant_">STATE_ACCEPT</span> = b<span class="hljs-string">&#x27;03&#x27;</span>;

    <span class="hljs-comment">// symbols</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Symbol</span> <span class="hljs-variable constant_">BLANK</span> = b<span class="hljs-string">&#x27;00&#x27;</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Symbol</span> <span class="hljs-variable constant_">OPEN</span> = b<span class="hljs-string">&#x27;01&#x27;</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Symbol</span> <span class="hljs-variable constant_">CLOSE</span> = b<span class="hljs-string">&#x27;02&#x27;</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Symbol</span> X = b<span class="hljs-string">&#x27;03&#x27;</span>;

    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> bool <span class="hljs-variable constant_">LEFT</span> = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> bool <span class="hljs-variable constant_">RIGHT</span> = <span class="hljs-literal">false</span>;

    <span class="hljs-comment">// number of rules in the transition function</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> int N = <span class="hljs-number">8</span>;
    <span class="hljs-comment">// transition function table</span>
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">TransitionFuncEntry</span>[N] transitionFuncTable = [
        ,
        ,
        ,
        ,
        
        ,
        ,

        ,
        
    ];
    
    public <span class="hljs-keyword">function</span> <span class="hljs-title function_">transit</span>(<span class="hljs-params">SigHashPreimage txPreimage</span>) {
        <span class="hljs-comment">// transition</span>
        <span class="hljs-title class_">Symbol</span> head = <span class="hljs-title class_">ArrayUtil</span>.<span class="hljs-title function_">getElemAt</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">tape</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">headPos</span>);
        <span class="hljs-comment">// look up in transition table</span>
        bool found = <span class="hljs-literal">false</span>;
        loop (N) : i {
            <span class="hljs-keyword">if</span> (!found) {
                auto entry = transitionFuncTable[i];
                <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">input</span> == { <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">curState</span>, head }) {
                    auto output = entry.<span class="hljs-property">output</span>;
                    <span class="hljs-comment">// update state</span>
                    <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">curState</span> = output.<span class="hljs-property">newState</span>;
                    <span class="hljs-comment">// write tape head</span>
                    <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">tape</span> = <span class="hljs-title class_">ArrayUtil</span>.<span class="hljs-title function_">setElemAt</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">tape</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">headPos</span>, output.<span class="hljs-property">write</span>);
                    <span class="hljs-comment">// move head</span>
                    <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">headPos</span> += output.<span class="hljs-property">moveLeft</span> ? -<span class="hljs-number">1</span> : <span class="hljs-number">1</span>;
                    <span class="hljs-comment">// extend tape if out of bound</span>
                    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">headPos</span> &lt; <span class="hljs-number">0</span>) {
                        <span class="hljs-comment">// add 1 blank cell to the left</span>
                        <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">tape</span> = <span class="hljs-variable constant_">BLANK</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">tape</span>;
                        <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">headPos</span> = <span class="hljs-number">0</span>;
                    }
                    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">headPos</span> &gt;= <span class="hljs-title function_">len</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">tape</span>)) {
                        <span class="hljs-comment">// add 1 blank cell to the right</span>
                        <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">tape</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">tape</span> + <span class="hljs-variable constant_">BLANK</span>;
                    }

                    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">states</span>.<span class="hljs-property">curState</span> == <span class="hljs-variable constant_">STATE_ACCEPT</span>) {
                        <span class="hljs-comment">// accept</span>
                        <span class="hljs-title function_">exit</span>(<span class="hljs-literal">true</span>);
                    }

                    found = <span class="hljs-literal">true</span>;
                }
            }
        }
        <span class="hljs-comment">// reject if no transition rule found</span>
        <span class="hljs-built_in">require</span>(found);

        <span class="hljs-comment">// otherwise machine goes to the next step</span>
        <span class="hljs-built_in">require</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">propagateState</span>(txPreimage, <span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">value</span>(txPreimage)));
    }

    <span class="hljs-keyword">function</span> <span class="hljs-title function_">propagateState</span>(<span class="hljs-params">SigHashPreimage txPreimage, int value</span>) : bool {
        <span class="hljs-title class_">SigHashType</span> sigHashType = <span class="hljs-title class_">SigHash</span>.<span class="hljs-property">ANYONECANPAY</span> | <span class="hljs-title class_">SigHash</span>.<span class="hljs-property">SINGLE</span> | <span class="hljs-title class_">SigHash</span>.<span class="hljs-property">FORKID</span>;
        <span class="hljs-built_in">require</span>(<span class="hljs-title class_">Tx</span>.<span class="hljs-title function_">checkPreimageSigHashType</span>(txPreimage, sigHashType));
        bytes outputScript = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getStateScript</span>();
        bytes output = <span class="hljs-title class_">Utils</span>.<span class="hljs-title function_">buildOutput</span>(outputScript, value);
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">hash256</span>(output) == <span class="hljs-title class_">SigHash</span>.<span class="hljs-title function_">hashOutputs</span>(txPreimage);
    }
}
</code></pre>
`

export default html
