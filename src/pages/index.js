import React from "react";
import Layout from "@theme/Layout";
import { Home } from "./Home/home";
import { ThemeProvider, lightTheme } from "@avalabs/k2-components";
import { K2ThemeProvider } from "../contexts/K2ThemeProvider";

export default function App() {
  return (
    <Layout title="Homepage" description="Avalanche Dev Docs">
      <K2ThemeProvider>
        <Home />
      </K2ThemeProvider>
    </Layout>
  );
}
