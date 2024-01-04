import { useState } from "react"
import { csvToJson } from "../util/parseCSV";
import PageLayoutWrapper from "../components/PageLayoutWrapper";
import { Button } from "../components/Button";
import TextInput from "../components/Input";

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
		<Button onClick={async () => {
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
		}}>Grab Data</Button>
	</>
}


function Setup() {
	const [data, setData] = useState();
	const [importMethod, setImportMethod] = useState();

	const onComplete = (data) => {
		setData(JSON.stringify(data, null, 4));
	}

	return (
		<PageLayoutWrapper>
			<h1 className="text-4xl">
				Import your data!
			</h1>
			{importMethod ? importMethod : <>
				<Button onClick={() => {
					setImportMethod(<GoogleSheetsImport onComplete={onComplete} />)
				}}>Google Sheets</Button>
			</>}
			<pre className="font-mono whitespace-pre">{data}</pre>
		</PageLayoutWrapper>
	)
}

export default Setup
