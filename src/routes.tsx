import component_access_modifiers from "./pages/access-modifiers"
import component_array_types from "./pages/array-types"
import component_basic_types from "./pages/basic-types"
import component_code_seperator from "./pages/code-seperator"
import component_const_variables from "./pages/const-variables"
import component_constructor from "./pages/constructor"
import component_contract_private_functions from "./pages/contract-private-functions"
import component_exit from "./pages/exit"
import component_generics from "./pages/generics"
import component_hello_world from "./pages/hello-world"
import component_import from "./pages/import"
import component_library from "./pages/library"
import component_loop from "./pages/loop"
import component_operators from "./pages/operators"
import component_public_function from "./pages/public-function"
import component_require from "./pages/require"
import component_scoping from "./pages/scoping"
import component_statefull_contract from "./pages/statefull-contract"
import component_static from "./pages/static"
import component_struct_types from "./pages/struct-types"
import component_type_aliases from "./pages/type-aliases"
import component_type_inference from "./pages/type-inference"
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
        path: "/basic-types",
        component: component_basic_types
    },
    {
        path: "/code-seperator",
        component: component_code_seperator
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
        path: "/exit",
        component: component_exit
    },
    {
        path: "/generics",
        component: component_generics
    },
    {
        path: "/hello-world",
        component: component_hello_world
    },
    {
        path: "/import",
        component: component_import
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
        path: "/operators",
        component: component_operators
    },
    {
        path: "/public-function",
        component: component_public_function
    },
    {
        path: "/require",
        component: component_require
    },
    {
        path: "/scoping",
        component: component_scoping
    },
    {
        path: "/statefull-contract",
        component: component_statefull_contract
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
        path: "/type-aliases",
        component: component_type_aliases
    },
    {
        path: "/type-inference",
        component: component_type_inference
    },
    {
        path: "",
        component: component_
    },
]

export default routes