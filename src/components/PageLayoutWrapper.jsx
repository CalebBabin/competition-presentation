
export default function PageLayoutWrapper(props) {
	return <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
		{props.children}
	</div>
}