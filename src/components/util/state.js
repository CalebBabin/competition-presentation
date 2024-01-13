'use client';

import { useEffect, useState } from "react";

const stateMap = new Map();

let changes_to_save = false;
function saveToLocalStorage() {
	if (!changes_to_save) return;
	changes_to_save = false;
	const items = Array.from(stateMap, ([key, value]) => value);
	const output = [];
	for (let index = 0; index < items.length; index++) {
		output.push(items[index].data);
	}
	window.localStorage.setItem('stateMap', JSON.stringify(output));
}
setInterval(saveToLocalStorage, 1000);

function restoreFromLocalStorage() {
	try {
		const input = window.localStorage.getItem('stateMap');
		if (input) {
			const data = JSON.parse(input);
			for (let index = 0; index < data.length; index++) {
				new Item(data[index]);
			}
		}
	} catch (e) {
		console.error('Failed to restore competition from localstorage');
		console.error(e);
		console.log(window.localStorage.getItem('stateMap'));
	}
}
window.addEventListener('load', () => {
	restoreFromLocalStorage();
})

const categoryMap = new Map();
function initCategories() {
	const categoryNames = ['yes', 'no', 'maybe', 'graveyard'];
	for (let index = 0; index < categoryNames.length; index++) {
		categoryMap.set(categoryNames[index], new Array());
	}
}
initCategories();

function removeFromCategory(item = new Item(), category = 'maybe') {
	categoryMap.set(
		category,
		categoryMap.get(category).filter(value => value.key !== item.key)
	);
	triggerStateEvent("category_" + category + "_deleteitem", item);
	changes_to_save = true;
}
function addToCategory(item = new Item(), category = 'maybe') {
	if (!categoryMap.has(category)) return;

	item.update({ category });
	categoryMap.get(category).push(item);
	triggerStateEvent("category_" + category + "_newitem", item);
	changes_to_save = true;
}

let keyIndex = 0;
class Item {
	/**
	 * 
	 * @param {Object} data 
	 * @param {String} category 
	 */
	constructor(data = {}) {
		this.key = keyIndex++;
		this.data = data;
		this.listeners = [];
		stateMap.set(keyIndex, this);
		addToCategory(this, data.category);
		changes_to_save = true;
	}

	update(new_data) {
		for (const key in new_data) {
			if (Object.hasOwnProperty.call(new_data, key)) {
				const value = new_data[key];
				this.data[key] = value;
			}
		}
		this.emit(new_data);
	}

	switchCategory(new_category = "maybe") {
		if (typeof this.data.category === 'string') removeFromCategory(this, this.data.category);
		addToCategory(this, new_category);
	}

	emit(new_data = this.data) {
		for (let index = 0; index < this.listeners.length; index++) {
			this.listeners[index](new_data);
		}
	}

	attach(callback) {
		this.listeners.push(callback);
	}
	detach(callback) {
		for (let i = this.listeners.length; i >= 0; i--) {
			if (this.listeners[i] === callback) {
				this.listeners.splice(i, 1);
				break;
			}
		}
	}
}

export function triggerStateEvent(name, data) {
	window.dispatchEvent(new CustomEvent(name, { detail: data }));
}

export function addItem(data, category = "maybe") {
	new Item(data, category);
}

export function clearState() {
	stateMap.forEach((value, key) => stateMap.delete(key));
	initCategories();
	changes_to_save = true;
	saveToLocalStorage();
}


// Hooks
export function useAllItems() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		setItems(Array.from(stateMap, ([key, value]) => value));
		const timeout = setTimeout(() => {
			setItems(Array.from(stateMap, ([key, value]) => value));
		}, 1000);
		return () => {
			try {
				clearTimeout(timeout);
			} catch (e) { }
		}
	}, []);
	return items;
}

export function useCategory(category) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		// setItems([...(categoryMap.has(category) ? categoryMap.get(category) : [])]);
		const timeout = setTimeout(() => {
			setItems([...(categoryMap.has(category) ? categoryMap.get(category) : [])]);
		}, 1000);
		return () => {
			try {
				clearTimeout(timeout);
			} catch (e) { }
		}
	}, [category]);

	useEffect(() => {
		const addListener = (event) => {
			const item = event.detail;
			setItems([...items, item]);
		}
		const removeListener = (event) => {
			const delete_item = event.detail;
			setItems(items.filter(item => item.key !== delete_item.key));
		}
		window.addEventListener('category_' + category + "_newitem", addListener);
		window.addEventListener('category_' + category + "_deleteitem", removeListener);
		return () => {
			window.addEventListener('category_' + category + "_newitem", addListener);
			window.addEventListener('category_' + category + "_deleteitem", removeListener);
		}
	}, [category, items]);

	return items;
}

export function useCategoryCount(category) {
	const [count, setCount] = useState(0);
	useEffect(() => {
		setCount(categoryMap.get(category).length);
	}, [category]);
	useEffect(() => {
		const addListener = () => {
			setCount(count + 1)
		}
		const removeListener = () => {
			setCount(count - 1)
		}
		window.addEventListener('category_' + category + "_newitem", addListener);
		window.addEventListener('category_' + category + "_deleteitem", removeListener);
		return () => {
			window.addEventListener('category_' + category + "_newitem", addListener);
			window.addEventListener('category_' + category + "_deleteitem", removeListener);
		}
	}, [category, count]);
	return count;
}

export function useItemData(item) {
	const [data, setData] = useState(item.data);

	useEffect(() => {
		const listener = () => {
			setData({ ...item.data });
		}
		listener();
		item.attach(listener);
		return () => {
			item.detach(listener);
		}
	}, [item.key]);

	return data;
}