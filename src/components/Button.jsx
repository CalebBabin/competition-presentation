
const buttonBaseClass = 'px-4 py-1 rounded transition-all duration-100 font-bold'
export function Button(props) {
	return <button
		disabled={props.disabled}
		onClick={() => {
			if (!props.disabled) props.onClick();
		}}
		className={buttonBaseClass + " border border-sky-500 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed " + props.className}
	>
		{props.children}
	</button>
}