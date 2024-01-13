'use client';

export default function TextInput(props) {
	return <input
		{...props}
		className={props.className + " p-2 border border-sky-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"}
	/>
}

export function TextArea(props) {
	return <textarea
		{...props}
		className={props.className + " p-2 border border-sky-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"}
	/>
}