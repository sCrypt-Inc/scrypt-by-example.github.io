import React from "react"
import SEO from "../components/SEO"
import styles from "./index.module.css"
import youTube from "../components/youtube.svg"

interface Route {
  path: string
  title: string
}

const SOL_ROUTES: Route[] = [
  {
    path: "hello-world",
    title: "Hello World",
  },
  {
    path: "constructor",
    title: "Constructor",
  },
  {
    path: "require",
    title: "Require",
  },
  {
    path: "basic-types",
    title: "Basic Types",
  },
  {
    path: "array-types",
    title: "Array Types",
  },
  {
    path: "struct-types",
    title: "Struct Types",
  },
  {
    path: "type-inference",
    title: "Type Inference",
  },
  {
    path: "type-aliases",
    title: "Type Aliases",
  },
  {
    path: "generics",
    title: "Generics",
  },
  {
    path: "const-variables",
    title: "Const Variables",
  },
  {
    path: "public-function",
    title: "Public Function",
  },
  {
    path: "contract-private-functions",
    title: "Contract-Private Functions",
  },
  {
    path: "exit",
    title: "Exit",
  },
  {
    path: "code-seperator",
    title: "Code seperator",
  },
  {
    path: "access-modifiers",
    title: "Access Modifiers",
  },
  {
    path: "operators",
    title: "Operators",
  },
  {
    path: "scoping",
    title: "Scoping",
  },
  {
    path: "static",
    title: "Static",
  },
  {
    path: "loop",
    title: "Loop",
  },
  {
    path: "library",
    title: "Library",
  },
  {
    path: "import",
    title: "Import",
  },
  {
    path: "stateful-contract",
    title: "Stateful Contract",
  },
]

const APP_ROUTES: Route[] = []

const HACK_ROUTES: Route[] = []

const DEFI_ROUTES = []

export const ROUTES_BY_CATEGORY = [
  {
    title: "",
    routes: SOL_ROUTES,
  },
  //{
  //  title: "Applications",
  //  routes: APP_ROUTES.map((route) => ({
  //    ...route,
  //    path: `/app/${route.path}`,
  //  })),
  //},
  //{
  //  title: "Hacks",
  //  routes: HACK_ROUTES.map((route) => ({
  //    ...route,
  //    path: `/hacks/${route.path}`,
  //  })),
  //},
  //{
  //  title: "DeFi",
  //  routes: DEFI_ROUTES.map((route) => ({
  //    ...route,
  //    path: `/defi/${route.path}`,
  //  })),
  //},
]

const UPDATES = [
  "",
]

function HomePage() {
  return (
    <div className={styles.component}>
      <SEO
        title="sCrypt by Example"
        description="Learn smart contract programming using sCrypt"
      />
      <h1 className={styles.header}>
        <a href="/">sCrypt by Example</a>
      </h1>
      <div className={styles.subHeader}></div>
      <div className={styles.main}>
        <p>
          an introduction to <a href="https://scrypt.io/">sCrypt</a> with
          simple examples
        </p>

        <div className={styles.youTube}>
          <img src={youTube} alt="logo" className={styles.youTubeLogo} />
          <a
            href="https://www.youtube.com/watch?v=xPfCM6gBl-Y&list=PL0Kn1t30VSpG4Fu2ze81uDptBd1ZML99A"
            target="__blank"
          >
            Learning sCrypt video playlist.
          </a>
        </div>

        <div className={styles.updates}>
          {UPDATES.map((text, i) => (
            <div key={i}>{text}</div>
          ))}
        </div>

        {ROUTES_BY_CATEGORY.map(({ routes, title }, i) => (
          <div key={i}>
            {title && <h3 className={styles.category}>{title}</h3>}

            <ul className={styles.list}>
              {routes.map(({ path, title }) => (
                <li className={styles.listItem} key={path}>
                  <a href={path}>{title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
