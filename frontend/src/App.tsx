import * as React from "react";
import {GlobalStyles} from "./styles/theme/globalStyle.ts"
import {Outlet} from "react-router-dom";
import { Global } from "@emotion/react";

const App:React.FC=() => {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Outlet/>
    </>
  )
}
export default App;