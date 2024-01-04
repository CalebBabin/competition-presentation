import { Button } from "../components/Button"
import PageLayoutWrapper from "../components/PageLayoutWrapper"

function Home() {
	return (
		<PageLayoutWrapper>
			<div className="flex flex-col gap-4 justify-stretch">
				<Button to='/setup' icon="add">
					Setup New Competition
				</Button>
				<Button to='/competition' icon="refresh">
					Resume saved
				</Button>
			</div>


		</PageLayoutWrapper>
	)
}

export default Home
