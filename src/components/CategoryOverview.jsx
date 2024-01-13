'use client';
import { useEffect, useRef, useState } from "react";
import { ItemPreview } from "@/components/ItemPreview";
import { useCategory, useCategoryCount } from "@/components/util/state";

export default function CategoryOverview({ category }) {
	const count = useCategoryCount(category);
	const items = useCategory(category);

	const [expand, setExpand] = useState(false);

	const ref = useRef();
	useEffect(() => {
		if (!ref.current || !window) return;
		let targetHeight = 0;
		const resizeListener = () => {
			targetHeight = ref.current.children[0].offsetHeight;

			if (expand && ref.current.style.height !== targetHeight + 'px') {
				ref.current.style.height = targetHeight + 'px';
			} else if (!expand && ref.current.style.height !== '0px') {
				ref.current.style.height = '0px';
			}
		}
		resizeListener();

		window.addEventListener('resize', resizeListener);
		return () => {
			window.removeEventListener('resize', resizeListener);
		}
	}, [ref.current, expand]);

	return <div className="bg-slate-600 p-2 rounded cursor-default max-w-full w-[700px]">
		<h3 className="text-lg mb-4">
			{category} - {count}
			<span
				onClick={() => setExpand(!expand)}
				className={(expand ? 'rotate-180' : 'rotate-0') + " transition-transform duration-200 material-symbols-outlined inline-block align-bottom ml-1 px-1 rounded hover:bg-slate-500"}
			>
				expand_more
			</span>
		</h3>
		<div ref={ref} className="overflow-hidden transition-all duration-500">
			<div className="w-full flex flex-col gap-4">
				{items.map(item => <ItemPreview key={item.key} item={item} inactive={!expand} />)}
			</div>
		</div>
	</div >
}
