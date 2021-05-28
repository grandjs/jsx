/*!
 * grandjs/jsx
 *
 * Copyright(c) 2021 Imed Jaberi
 * MIT Licensed
 */

'use-strict'

/**
 * Module dependencies.
 */
import jsx, { Props } from "jsx-template-engine/dist/index"
import path from "path"

/**
 * Main JsxView handler
 */
class View {
  private viewsDir

  constructor(basePath?: string) {
    this.viewsDir = basePath || 'views'
  }

  public importComponent (filePath: string) {
    return jsx.importComponent(path.join(this.viewsDir, filePath))
  }

  public async renderToString (
    component: string,
    props: Props,
    filePath?: string
  ) {
    const html = await jsx.jsxEngine(component, props, filePath)
    return html
  }
}

/**
 * Expose `View`.
 */
export default View
