import { useEffect, useMemo, useRef, useState } from "react";
import { useAllItems, useCategory, useCategoryCount, useItemData } from "../../util/state";
import { ImageEmbed } from "../../components/ItemPreview";

let index = 0;
let indexMax = 0;
const indexListeners = new Array();
function advanceIndex(count = 1) {
	index += count;
	if (index < 0) index += indexMax;
	if (index >= indexMax) index -= indexMax;

	for (let i = 0; i < indexListeners.length; i++) {
		indexListeners[i](index);
	}
}
function setIndex(newIndex = 0) {
	index = newIndex;
	for (let i = 0; i < indexListeners.length; i++) {
		indexListeners[i](index);
	}
}


function ItemRenderer(props) {
	const [liveIndex, setLiveIndex] = useState(index);
	const data = useItemData(props.item);

	useEffect(() => {
		const listener = (index) => { setLiveIndex(index) };

		indexListeners.push(listener);
		return () => {
			for (let index = 0; index < indexListeners.length; index++) {
				if (indexListeners[index] === listener) {
					indexListeners.splice(index, 1);
					break;
				}
			}
		}
	}, [props.index]);

	if (Math.abs(props.index - liveIndex) > 3) return null;

	return <div
		className="absolute inset-0 flex flex-col justify-center items-center transition-transform duration-1000"
		style={{
			transform: `translateX(${(props.index - liveIndex) * 100}%)`
		}}
	>
		<div className="w-full h-24 bg-slate-700">{data.title}</div>
		<div className="aspect-video bg-slate-500 w-full max-w-[calc(100vh*1.7777777778-18rem)]">
			<ImageEmbed item={props.item} />
			</div>
		<div className="w-full h-24 bg-slate-700">{data.author}</div>
	</div>
}

export default function TinderMethod() {
	const allItems = useAllItems();
	const remainingCount = useCategoryCount('maybe');

	useEffect(() => {
		const interval = setInterval(advanceIndex, 1250);
		return () => {
			clearInterval(interval);
		}
	}, [])

	const output = useMemo(() => {
		const array = [];

		for (let index = 0; index < allItems.length; index++) {
			const element = allItems[index];
			if (element.data.category === "graveyard") continue;
			array.push(<ItemRenderer key={index} index={index} item={element} />)
		}

		indexMax = array.length;

		return array;
	}, [allItems]);


	return <div className="absolute inset-0">
		<h1 className="text-2xl h-24 text-right px-2">{remainingCount} submissions left to sort</h1>
		<div className="absolute inset-0 top-24">
			{output}
		</div>
	</div>
}