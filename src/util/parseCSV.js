import { parse } from 'csv-parse/browser/esm/sync';

/**
 * Parses a CSV, assuming the first row are column definitions, then returns an array of objects
 * @param {String} csvString 
 */
export function csvToJson(csvString) {
	const data = parse(csvString, {
		columns: true,
		skip_empty_lines: true,
	});
	return data;
}
