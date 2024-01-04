import { useMemo, useState } from "react"
import { csvToJson } from "../util/parseCSV";
import PageLayoutWrapper from "../components/PageLayoutWrapper";
import { Button } from "../components/Button";
import TextInput from "../components/Input";
import { CodeBlock } from "../components/CodeBlock";
import { useBackground } from "../util/setPageBackground";

//import methods
function parseGoogleSheetsURL(originalURL = '') {
	//https://docs.google.com/spreadsheets/d/1OhO81Gy0a7FFhMkQPI4AQ0Dzu61LrYdKFbenrZC9bFo/edit?usp=sharing
	const pathSplit = originalURL.split('?')[0].split('/');
	const id = pathSplit[pathSplit.length - 2];
	return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv`;
}
function GoogleSheetsImport({ onComplete }) {
	const [pending, setPending] = useState(false);
	const [url, setUrl] = useState();

	return <>
		<p>
			Google Sheets import
		</p>
		<TextInput disabled={pending} onChange={(e) => {
			if (!pending) setUrl(e.target.value)
		}} />
		<Button disabled={pending} onClick={async () => {
			if (pending) return;
			setPending(true);
			try {
				const response = await fetch(parseGoogleSheetsURL(url));
				const data = await response.text();
				const json = csvToJson(data);
				onComplete(json);
			} catch (e) {
				console.error(e);
				setPending(false);
			}
		}} icon="start">Grab Data</Button>
	</>
}

function ImportRawData({ nextStep }) {
	const [importMethod, setImportMethod] = useState();

	const onComplete = (data) => {
		nextStep(data);
	}

	return <>
		<h1 className="text-4xl">
			Import your data!
		</h1>
		{importMethod ? importMethod : <>
			<Button onClick={() => {
				setImportMethod(<GoogleSheetsImport onComplete={onComplete} />)
			}} icon="assignment">Google Sheets</Button>
		</>}
	</>
}


function FilterData({ data, nextStep }) {
	const headers = useMemo(() => {
		const array = [];
		const firstElement = data[0];
		for (const key in firstElement) {
			if (Object.hasOwnProperty.call(firstElement, key)) {
				array.push(key);
			}
		}
		return array;
	}, [data]);

	const [titleKey, setTitleKey] = useState(-1);
	const [contentKey, setContentKey] = useState(-1);
	const [authorKey, setAuthorKey] = useState(-1);

	return <>
		<h1 className="text-4xl">
			Pick which fields matter!
		</h1>
		<div className="flex flex-col gap-4">
			<div className="flex justify-between border-b border-dotted border-white/40 pb-1">
				<label htmlFor="title">Title:</label>
				<select onChange={e => setTitleKey(e.target.value)} name="title" className="ml-2">
					<option value={-1}>none</option>
					{headers.map((value, key) => <option key={key} value={key}>{value}</option>)}
				</select>
			</div>
			<div className="flex justify-between border-b border-dotted border-white/40 pb-1">
				<label htmlFor="content">Main Content:</label>
				<select onChange={e => setContentKey(e.target.value)} name="content" className="ml-2">
					<option value={-1}>none</option>
					{headers.map((value, key) => <option key={key} value={key}>{value}</option>)}
				</select>
			</div>
			<div className="flex justify-between border-b border-dotted border-white/40 pb-1">
				<label htmlFor="author">Author:</label>
				<select onChange={e => setAuthorKey(e.target.value)} name="author" className="ml-2">
					<option value={-1}>none</option>
					{headers.map((value, key) => <option key={key} value={key}>{value}</option>)}
				</select>
			</div>
		</div>

		<div className="px-4 w-full">
			<CodeBlock text={JSON.stringify(data[0], null, 4)} />
		</div>

		<Button onClick={() => {
			data.forEach((item, index) => {
				data[index] = {
					title: item[headers[titleKey]],
					author: item[headers[authorKey]],
					content: item[headers[contentKey]],
				}
			})
			nextStep(data)
		}}>Proceed</Button>
	</>
}


const steps = [ImportRawData, FilterData];
function Setup() {
	useBackground('#0f766e');
	const [stepIndex, setStepIndex] = useState(0);
	const [data, setData] = useState({});

	const currentStep = useMemo(() => {
		const Element = steps[stepIndex];

		if (!Element) return <div className="px-4 w-full">
			<CodeBlock text={JSON.stringify(data, null, 4)} />
		</div>

		return <Element
			data={data}
			nextStep={(data) => {
				setStepIndex(stepIndex + 1);
				setData(data);
			}}
		/>;
	}, [stepIndex, data]);

	return (<>
		{currentStep}
	</>)
}

export default Setup
