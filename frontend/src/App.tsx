// App.tsx
import * as React from "react";
import { Global } from "@emotion/react";
import { GlobalStyles } from "./styles/theme/globalStyle.ts";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme/theme"; // 네가 만든 theme import

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;