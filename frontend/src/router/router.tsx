import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import {URL} from "../constants/url/url.ts";

const Intro = lazy(() => import("../pages/Intro/intro"));
const Schedule = lazy(() => import("../pages/schdule/schedule.tsx"));
const App = lazy(() => import("../App"));
const Login = lazy(()=>import("../pages/Auth/login/login"))
const router = createBrowserRouter([
	{
		path: URL.home,
		element: (
			<Suspense fallback={<div>로딩중..</div>}>
				<App/>
			</Suspense>
		),
		children: [
			{
				index: true,
				element: <Intro/>,
			},
			{
				path: URL.schedule,
				element: <Schedule/>,
			},
			{
				path: URL.login,
				element: <Login/>,
			},
		],
	},
]);

export default router;