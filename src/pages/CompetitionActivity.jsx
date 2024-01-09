import { useEffect, useState } from "react";
import { useBackground } from "../util/setPageBackground"
import BigViewPopup from "../components/BigViewPopup";
import { useParams } from "react-router-dom";
import NotFound from "../components/error/NotFound";


function CompetitionActivity() {
	useBackground('#000000');

	const [child, setChild] = useState();
	const params = useParams();

	useEffect(() => {
		const activity = params.activity;
		import('./methods/' + activity + '.jsx').then(Component => {
			setChild(<Component.default />);
		}).catch(setChild(<NotFound />))
	}, [params])

	return (<>
		<BigViewPopup />
		{child}
	</>)
}

export default CompetitionActivity
