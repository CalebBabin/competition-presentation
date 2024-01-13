'use client';

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import { useEffect, useRef } from "react"

export default function RootLayout(props) {
	const ref = useRef();
	useEffect(() => {
		if (!ref.current) return;
		window.dispatchEvent(new Event('pageBackgroundReady'));
		const listener = ({ detail }) => {
			ref.current.style.background = detail;
		}
		window.addEventListener('pageBackground', listener);
		return () => {
			window.removeEventListener('pageBackground', listener);
		}
	}, [ref]);

	return <html lang="en">
		<head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Competition Decider!</title>
		</head>
		<body className={inter.className}>
			<div ref={ref} className="transition-background duration-1000 w-full min-h-screen flex flex-col gap-4 justify-center items-center">
				{props.children}
			</div>
		</body>
	</html>
}