
export default function PageLayoutWrapper(props) {
	return <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-center">
		{props.children}
	</div>
}