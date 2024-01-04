
const buttonBaseClass = 'px-4 py-1 rounded transition-all duration-100 font-bold'
export function Button(props) {
	return <button
		onClick={props.onClick}
		className={buttonBaseClass + " border border-sky-500 hover:bg-sky-500 " + props.className}
	>
		{props.children}
	</button>
}