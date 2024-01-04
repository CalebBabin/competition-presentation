import { useEffect, useRef } from "react"

export default function PageLayoutWrapper(props) {
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

	return <div ref={ref} className="transition-background duration-1000 w-full min-h-screen flex flex-col gap-4 justify-center items-center">
		{props.children}
	</div>
}