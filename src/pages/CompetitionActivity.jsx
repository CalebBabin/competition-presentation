import { lazy, useEffect, useState } from "react";
import { useBackground } from "../util/setPageBackground"
import BigViewPopup from "../components/BigViewPopup";
import { useParams } from "react-router-dom";
import NotFound from "../components/error/NotFound";


const Methods = {
	TinderMethod: lazy(() => import('./methods/TinderMethod')),
}

function CompetitionActivity() {
	useBackground('#000000');

	const [child, setChild] = useState();
	const params = useParams();

	useEffect(() => {
		const activity = params.activity;
		if (activity in Methods) {
			const Component = Methods[activity];
			setChild(<Component />);
		} else {
			setChild(<NotFound />);
		}
	}, [params])

	return (<>
		<BigViewPopup />
		{child}
	</>)
}

export default CompetitionActivity
