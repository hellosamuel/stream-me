import { useEffect } from "react"

import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"

import { themeDark, themeLight } from "lib/theme"

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById("jss-server-side")
    if (jssStyles?.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
