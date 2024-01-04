import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Setup from './pages/Setup';
import PageLayoutWrapper from './components/PageLayoutWrapper';
import Competition from './pages/Competition';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/setup",
		element: <Setup />,
	},
	{
		path: "/competition",
		element: <Competition />,
	},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<PageLayoutWrapper>
			<RouterProvider router={router} />
		</PageLayoutWrapper>
	</React.StrictMode>,
)
