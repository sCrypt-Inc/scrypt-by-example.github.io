import component_access_modifiers from "./pages/access-modifiers"
import component_array_types from "./pages/array-types"
import component_auction from "./pages/auction"
import component_basic_types from "./pages/basic-types"
import component_code_seperator from "./pages/code-seperator"
import component_cointoss from "./pages/cointoss"
import component_const_variables from "./pages/const-variables"
import component_constructor from "./pages/constructor"
import component_contract_private_functions from "./pages/contract-private-functions"
import component_ecdsa_oracles from "./pages/ecdsa-oracles"
import component_exit from "./pages/exit"
import component_generics from "./pages/generics"
import component_gol from "./pages/gol"
import component_hello_world from "./pages/hello-world"
import component_if_else from "./pages/if-else"
import component_import from "./pages/import"
import component_inline_assembly from "./pages/inline-assembly"
import component_library from "./pages/library"
import component_loop from "./pages/loop"
import component_multiparty_hash_puzzles from "./pages/multiparty-hash-puzzles"
import component_operators from "./pages/operators"
import component_p2pkh from "./pages/p2pkh"
import component_public_function from "./pages/public-function"
import component_r_puzzle from "./pages/r-puzzle"
import component_rabin_signature from "./pages/rabin-signature"
import component_require from "./pages/require"
import component_rule110 from "./pages/rule110"
import component_schnoor_signature from "./pages/schnoor-signature"
import component_scoping from "./pages/scoping"
import component_stateful_contract from "./pages/stateful-contract"
import component_static from "./pages/static"
import component_struct_types from "./pages/struct-types"
import component_tic_tac_toe from "./pages/tic-tac-toe"
import component_turing_machine from "./pages/turing-machine"
import component_type_aliases from "./pages/type-aliases"
import component_type_inference from "./pages/type-inference"
import component_vanity_address from "./pages/vanity-address"
import component_ from "./pages"

interface Route {
  path: string
  component: () => JSX.Element
  breakingChanges?: boolean
}

const routes: Route[] = [
    {
        path: "/access-modifiers",
        component: component_access_modifiers
    },
    {
        path: "/array-types",
        component: component_array_types
    },
    {
        path: "/auction",
        component: component_auction
    },
    {
        path: "/basic-types",
        component: component_basic_types
    },
    {
        path: "/code-seperator",
        component: component_code_seperator
    },
    {
        path: "/cointoss",
        component: component_cointoss
    },
    {
        path: "/const-variables",
        component: component_const_variables
    },
    {
        path: "/constructor",
        component: component_constructor
    },
    {
        path: "/contract-private-functions",
        component: component_contract_private_functions
    },
    {
        path: "/ecdsa-oracles",
        component: component_ecdsa_oracles
    },
    {
        path: "/exit",
        component: component_exit
    },
    {
        path: "/generics",
        component: component_generics
    },
    {
        path: "/gol",
        component: component_gol
    },
    {
        path: "/hello-world",
        component: component_hello_world
    },
    {
        path: "/if-else",
        component: component_if_else
    },
    {
        path: "/import",
        component: component_import
    },
    {
        path: "/inline-assembly",
        component: component_inline_assembly
    },
    {
        path: "/library",
        component: component_library
    },
    {
        path: "/loop",
        component: component_loop
    },
    {
        path: "/multiparty-hash-puzzles",
        component: component_multiparty_hash_puzzles
    },
    {
        path: "/operators",
        component: component_operators
    },
    {
        path: "/p2pkh",
        component: component_p2pkh
    },
    {
        path: "/public-function",
        component: component_public_function
    },
    {
        path: "/r-puzzle",
        component: component_r_puzzle
    },
    {
        path: "/rabin-signature",
        component: component_rabin_signature
    },
    {
        path: "/require",
        component: component_require
    },
    {
        path: "/rule110",
        component: component_rule110
    },
    {
        path: "/schnoor-signature",
        component: component_schnoor_signature
    },
    {
        path: "/scoping",
        component: component_scoping
    },
    {
        path: "/stateful-contract",
        component: component_stateful_contract
    },
    {
        path: "/static",
        component: component_static
    },
    {
        path: "/struct-types",
        component: component_struct_types
    },
    {
        path: "/tic-tac-toe",
        component: component_tic_tac_toe
    },
    {
        path: "/turing-machine",
        component: component_turing_machine
    },
    {
        path: "/type-aliases",
        component: component_type_aliases
    },
    {
        path: "/type-inference",
        component: component_type_inference
    },
    {
        path: "/vanity-address",
        component: component_vanity_address
    },
    {
        path: "",
        component: component_
    },
]

export default routes