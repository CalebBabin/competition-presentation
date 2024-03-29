'use client';
import { ExpandIcon } from "lucide-react";
import { preloadPopup, triggerPopup } from "./BigViewPopup";

export function ItemPreview({ item, inactive = false }) {
	let embed;
	if (item.data.content.startsWith('https://drive.google.com/open')) {
		const url = new URL(item.data.content);
		const file_id = url.searchParams.get('id');
		embed = <img
			src={`/api/google-drive-thumbnail?id=${file_id}`}
			width={1920}
			height={1080}
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
			>
				<ExpandIcon />
			</span>
		</div>
	</div>
}

export function ImageEmbed({ item }) {
	let embed;
	if (item.data.content.startsWith('https://drive.google.com/open')) {
		const url = new URL(item.data.content);
		const file_id = url.searchParams.get('id');
		embed = <img
			src={`/api/google-drive-thumbnail?id=${file_id}`}
			crossOrigin="anonymous"
			className="w-full h-auto aspect-video object-contain"
		/>
	} else {
		embed = <img src={item.data.content} crossOrigin="anonymous" className="w-full h-auto aspect-video object-contain" />
	}

	return embed;
}