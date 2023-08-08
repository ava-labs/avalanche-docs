import React from "react";
import Layout from "@theme/Layout";
import { Home } from "./Home/home";
import { ThemeProvider, lightTheme } from "@avalabs/k2-components";

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Layout title="Homepage" description="Avalanche Dev Docs">
        <Home />
      </Layout>
    </ThemeProvider>
  );
}
