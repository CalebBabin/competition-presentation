
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

	return <div className="w-full bg-slate-700 rounded flex gap-4 items-center">
		<div className="w-4/12">
			{embed}
		</div>
		<div>
			{item.data.title && <h1 className="relative z-10 pointer-events-none text-4xl -mb-8 h-16">{item.data.title}</h1>}
			{item.data.author && <h3 className="text-xl">{item.data.author}</h3>}
		</div>
	</div>
}