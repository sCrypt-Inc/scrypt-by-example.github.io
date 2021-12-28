import React from "react"
import SEO from "./SEO"
import Html from "./Html"
import styles from "./Example.module.css"

interface Props {
  title: string
  description: string
  version: "0.1.0"
  html: string
}

const Example: React.FC<Props> = ({ title, version, description, html }) => {
  return (
    <div className={styles.component}>
      <SEO
        title={`${title} | sCrypt by Example | ${version}`}
        description={description}
      />
      <div className={styles.content}>
        <h2>{title}</h2>

        <Html html={html} />

      </div>
    </div>
  )
}

export default Example
