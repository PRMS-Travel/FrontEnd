import * as React from "react";
import { Global } from "@emotion/react";
import { GlobalStyles } from "./styles/theme/globalStyle";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;