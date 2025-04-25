import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { URL } from "../constants/url/url.ts";

const Home = lazy(() => import("../pages/home.tsx"));
const Schedule = lazy(() => import("../pages/schdule/schedule.tsx"));
const App = lazy(() => import("../App"));

const router = createBrowserRouter([
	{
		path: URL.home,
		element: (
			<Suspense fallback={<div>로딩중..</div>}>
				<App />
			</Suspense>
		),
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: URL.schedule,
				element: <Schedule />,
			},
		],
	},
]);

export default router;