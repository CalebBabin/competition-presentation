import { CodeBlock } from "../components/CodeBlock";
import { ItemPreview } from "../components/ItemPreview";
import { useBackground } from "../util/setPageBackground"
import { useCategory, useCategoryCount } from "../util/state";

function CategoryOverview({ category }) {
	const count = useCategoryCount(category);
	const items = useCategory(category);

	return <div className="bg-slate-600 hover:bg-slate-500 p-2 rounded cursor-default max-w-full w-[700px]">
		<h3>{category} - {count}</h3>
		<div className="w-full flex flex-col gap-4">
			{items.map(item => <ItemPreview key={item.key} item={item} />)}
		</div>
	</div>
}

function Competition() {
	useBackground('#591388');

	return (<>
		<div className="flex flex-col gap-4 justify-stretch">
			Competition start!
		</div>
		<CategoryOverview category="yes" />
		<CategoryOverview category="no" />
		<CategoryOverview category="maybe" />
		<CategoryOverview category="graveyard" />
	</>)
}

export default Competition
