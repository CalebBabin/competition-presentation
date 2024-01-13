'use client';
import { useMemo } from "react"

export function CodeBlock(props) {
	const children = useMemo(() => {
		if (!props.text) return;
		const array = [];
		const textArray = props.text.split('\n');
		for (let index = 0; index < textArray.length; index++) {
			array.push(<div className="hover:bg-slate-700/80 -mx-4 px-4" key={index}>{textArray[index]}</div>);
		}
		return array;
	}, [props.text])
	return <pre className={props.className + " font-mono whitespace-pre bg-slate-800 text-white rounded-lg p-4 border-2 border-white/20 max-w-full overflow-auto"}>
		{children}
	</pre>
}