import component_hello_world from "./pages/hello-world"
import component_constructor from "./pages/constructor"
import component_require from "./pages/require"
import component_basic_types from "./pages/basic-types"
import component_public_function from "./pages/public-function"
import component_array_types from "./pages/array-types"
import component_struct_types from "./pages/struct-types"
import component_type_inference from "./pages/type-inference"
import component_type_aliases from "./pages/type-aliases"
import component_generics from "./pages/generics"
import component_const_variables from "./pages/const-variables"
import component_contract_private_functions from "./pages/contract-private-functions"
import component_exit from "./pages/exit"
import component_code_seperator from "./pages/code-seperator"
import component_accesss_modifiers from "./pages/access-modifiers"
import component_operators from "./pages/operators"
import component_scoping from "./pages/scoping"
import component_static from "./pages/static"
import component_loop from "./pages/loop"
import component_library from "./pages/library"
import component_import from "./pages/import"
import component_statefull_contract from "./pages/statefull-contract"

import component_ from "./pages"

interface Route {
  path: string
  component: () => JSX.Element
  breakingChanges?: boolean
}

const routes: Route[] = [
    {
        path: "/hello-world",
        component: component_hello_world
    },
    {
        path: "/constructor",
        component: component_constructor
    },
    {
        path: "/require",
        component: component_require
    },
    {
        path: "/basic-types",
        component: component_basic_types
    },
    {
        path: "/array-types",
        component: component_array_types
    },
    {
        path: "/struct-types",
        component: component_struct_types
    },
    {
        path: "/type-inference",
        component: component_type_inference
    },
    {
        path: "/type-aliases",
        component: component_type_aliases
    },
    {
        path: "/generics",
        component: component_generics
    },
    {
        path: "/const-variables",
        component: component_const_variables
    },
    {
        path: "/public-function",
        component: component_public_function
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
        path: "/code-seperator",
        component: component_code_seperator
    },
    {
        path: "/access-modifiers",
        component: component_accesss_modifiers
    },
    {
        path: "/operators",
        component: component_operators
    },
    {
        path: "/scoping",
        component: component_scoping
    },
    {
        path: "/static",
        component: component_static
    },
    {
        path: "/loop",
        component: component_loop
    },
    {
        path: "/library",
        component: component_library
    },
    {
        path: "/import",
        component: component_import
    },
    {
        path: "/statefull-contract",
        component: component_statefull_contract
    },
    {
        path: "",
        component: component_
    },
]

export default routes
