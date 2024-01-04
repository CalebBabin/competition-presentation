import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Setup from './pages/Setup';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/Setup",
		element: <Setup />,
	},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
