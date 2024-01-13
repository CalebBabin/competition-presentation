'use client';

import { useEffect } from "react"

export default function setPageBackground(color) {
	window.dispatchEvent(new CustomEvent('pageBackground', {
		detail: color,
	}))
}

export function useBackground(color) {
	useEffect(() => {
		setPageBackground(color);

		const listener = () => {
			setPageBackground(color);
		};
		window.requestAnimationFrame(listener);
		window.addEventListener('pageBackgroundReady', listener);
		return () => {
			window.removeEventListener('pageBackgroundReady', listener);
		}
	}, [color]);
}