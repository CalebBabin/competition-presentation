'use client';
import { preloadPopup, triggerPopup } from "./BigViewPopup";

export function ItemPreview({ item, inactive = false }) {
	let embed;
	//<iframe src="https://drive.google.com/file/d/1e4qTkRBJhM7QS7W4IYtyjNcFl2EHZEUW/preview" width="640" height="480" allow="autoplay"></iframe>
	//https://drive.google.com/open?id=1e4qTkRBJhM7QS7W4IYtyjNcFl2EHZEUW
	if (item.data.content.startsWith('https://drive.google.com/open')) {
		const url = new URL(item.data.content);
		const file_id = url.searchParams.get('id');
		embed = <iframe
			src={inactive ? '' : `https://drive.google.com/file/d/${file_id}/preview`}
			className="aspect-video w-full h-auto"
			width={1920}
			height={1080}
			crossOrigin="anonymous"
		/>
	} else {
		embed = <img src={item.data.content} crossOrigin="anonymous" className="w-full h-auto aspect-video object-contain" />
	}

	return <div
		className="w-full bg-slate-700 rounded flex gap-4 items-center"
	// onMouseEnter={() => { preloadPopup(item) }}
	>
		<div className="w-4/12">
			{embed}
		</div>
		<div className="w-8/12">
			{item.data.title && <h1
				title={item.data.title}
				className="leading-none whitespace-pre text-ellipsis overflow-hidden w-full z-10 text-4xl">
				{item.data.title}
			</h1>}
			{item.data.author && <h3
				title={item.data.author}
				className="whitespace-pre text-ellipsis overflow-hidden w-full text-xl">
				{item.data.author}
			</h3>}

			<span
				onClick={() => { triggerPopup(item) }}
				className="material-symbols-outlined"
			>
				open_in_full
			</span>
		</div>
	</div>
}

export function ImageEmbed({ item }) {
	let embed;
	if (item.data.content.startsWith('https://drive.google.com/open')) {
		const url = new URL(item.data.content);
		const file_id = url.searchParams.get('id');
		embed = <iframe
			src={`https://drive.google.com/file/d/${file_id}/preview`}
			className="aspect-video w-full h-auto"
			width={1920}
			height={1080}
			crossOrigin="anonymous"
		/>
	} else {
		embed = <img src={item.data.content} crossOrigin="anonymous" className="w-full h-auto aspect-video object-contain" />
	}

	return embed;
}