import { Button } from "../components/Button"
import { useBackground } from "../util/setPageBackground"

function Home() {
	useBackground('#138874');

	return (<>
		<div className="flex flex-col gap-4 justify-stretch">
			<Button to='/setup' icon="add">
				Setup New Competition
			</Button>
			<Button to='/competition' theme="red" icon="refresh">
				Resume Cached
			</Button>
			<Button href='https://github.com/calebbabin/competition-presentation' theme="teal" icon="info">
				Learn More
			</Button>
		</div>
	</>)
}

export default Home
