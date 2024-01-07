import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export function triggerPopup(item) {
	window.dispatchEvent(new CustomEvent('itemPreviewPopup', { detail: item }));
}

function PopupContents() {
	const [item, setItem] = useState();
	const ref = useRef();
	useEffect(() => {
		const listener = (event) => {
			setItem(event.detail);

			if (!event.detail) {
				ref.current.style.transform = 'scale(0,0) rotate(45deg)';
				ref.current.style.opacity = '0';
			} else {
				ref.current.style.transform = 'scale(1,1) rotate(0deg)';
				ref.current.style.opacity = '1';
			}
		};
		window.addEventListener('switchPopupEmbed', listener);
		return () => {
			window.addEventListener('switchPopupEmbed', listener);
		}
	}, [ref.current]);


	let embed;
	if (typeof item !== 'object') {
		embed = <></>;
	} else if (item.data.content.startsWith('https://drive.google.com/open')) {
		const url = new URL(item.data.content);
		const file_id = url.searchParams.get('id');
		embed = <iframe
			src={`https://drive.google.com/file/d/${file_id}/preview`}
			className="w-full h-full"
			width={1920}
			height={1080}
			crossOrigin="anonymous"
		/>
	} else {
		embed = <img src={item.data.content} crossOrigin="anonymous" className="w-full h-full object-contain" />
	}

	return <>
		<div className="h-20 w-full text-center flex justify-center items-center">
			{item?.data?.title && <h1 className="text-2xl">{item.data.title}</h1>}
		</div>
		<div ref={ref} className="w-full h-[calc(100%-10rem)] transition-all duration-[2s]">
			{embed}
		</div>
		<div className="h-20 w-full text-center flex justify-center items-center">
			{item?.data?.author && <h3 className="text-2xl">created by: {item.data.author}</h3>}
		</div>
	</>
}
export default function BigViewPopup() {
	const ref = useRef();

	useEffect(() => {
		if (!ref.current) return;
		const activate_listener = (event) => {
			window.dispatchEvent(new CustomEvent('switchPopupEmbed', { detail: event.detail }));
			// setTimeout(() => {
			ref.current.style.opacity = 1;
			ref.current.style.pointerEvents = 'all';
			// }, 500);
		};
		const deactivate_listener = (event) => {
			ref.current.style.opacity = 0;
			ref.current.style.pointerEvents = 'none';
			window.dispatchEvent(new CustomEvent('switchPopupEmbed', { detail: false }));
		};
		window.addEventListener('itemPreviewPopup', activate_listener);
		window.addEventListener('deactivatePopup', deactivate_listener);
		return () => {
			window.removeEventListener('itemPreviewPopup', activate_listener);
			window.removeEventListener('deactivatePopup', deactivate_listener);
		}
	}, [ref.current]);

	return <div style={{
		opacity: 0,
	}} ref={ref} className="transition-all duration-500 fixed inset-0 z-[100] pointer-events-none bg-black/50">
		<PopupContents />
		<div className="absolute top-4 right-4">
			<Button onClick={() => {
				window.dispatchEvent(new Event('deactivatePopup'));
			}}>close</Button>
		</div>
	</div>
}