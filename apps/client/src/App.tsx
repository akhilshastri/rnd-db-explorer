// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import "ag-grid-enterprise";

import { MantineProvider } from "@mantine/core";
import "./App.css";
import { theme } from "./theme.ts";
import { Layout } from "./components/layout/Layout.tsx";


export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Layout />
    </MantineProvider>
  );
}
