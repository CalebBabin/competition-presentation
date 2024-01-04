import { Link } from "react-router-dom";

export function Button(props) {
	const style = {};

	if (props.icon) style.paddingLeft = '2.75rem';
	return <button
		disabled={props.disabled}
		onClick={() => {
			if (!props.disabled && props.onClick) props.onClick();
		}}
		className={"relative px-4 py-2 h-12 rounded-[1.5rem] overflow-hidden transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed border text-white font-bold border-sky-500 hover:bg-sky-500 " + props.className}
		style={style}
	>
		{props.to ? <Link to={props.to} className="absolute inset-0" /> : null}
		{props.icon ? <span className="material-symbols-outlined text-[2.5rem] w-10 h-10 absolute left-[.25rem] top-[0.25rem]">{props.icon}</span> : null}
		{props.children}
	</button>
}