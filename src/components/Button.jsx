'use client';
import styled from "@emotion/styled";
import Link from "next/link";

const StyledButton = styled.button`
	&:hover > .material-symbols-outlined {
		transform: rotate(360deg);
	}
`

export function Button(props) {
	const style = {};

	if (props.icon) style.paddingLeft = '2.75rem';

	let themeClass = '';
	switch (props.theme) {
		case 'red':
			themeClass = 'text-white font-bold bg-rose-500 hover:bg-rose-600';
			break;
		case 'teal':
			themeClass = 'text-white font-bold bg-cyan-500 hover:bg-cyan-600';
			break;
		default:
			themeClass = 'text-white font-bold bg-blue-500 hover:bg-blue-600';
			break;
	}

	return <StyledButton
		disabled={props.disabled}
		onClick={() => {
			if (!props.disabled && props.onClick) props.onClick();
		}}
		className={"relative px-4 py-2 h-12 rounded-[1.5rem] overflow-hidden transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed " + themeClass + " " + props.className}
		style={style}
	>
		{props.to ? <Link href={props.to} className="absolute inset-0" /> : null}
		{props.href ? <a href={props.href} target="_blank" className="absolute inset-0" /> : null}
		{props.icon ? <span className="material-symbols-outlined transition-all duration-500 text-[2rem] w-8 h-8 absolute left-[.5rem] top-[0.5rem]">{props.icon}</span> : null}
		{props.children}
	</StyledButton>
}