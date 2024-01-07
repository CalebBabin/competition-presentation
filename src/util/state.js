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
				new Item(data[index], data[index].category);
			}
		}
	} catch (e) {
		console.error('Failed to restore competition from localstorage');
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
	item.category = category;
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
	constructor(data = {}, category = "maybe") {
		this.key = keyIndex++;
		this.data = data;
		this.listeners = [];
		this.listenerIndex = 0;
		stateMap.set(keyIndex, this);
		this.switchCategory(category);
		changes_to_save = true;
	}

	switchCategory(new_category) {
		if (new_category === this.category) return;
		if (typeof this.category === 'string') removeFromCategory(this, this.category);
		if (categoryMap.has(new_category)) addToCategory(this, new_category);
	}

	attach(callback) {
		callback.listenerId = this.listenerIndex++;
		this.listeners.push(callback);
	}
	detach(callback) {
		for (let i = this.listeners.length; i >= 0; i--) {
			if (this.listeners[i].listenerId === callback.listenerId) {
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
export function useCategory(category) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems([...(categoryMap.has(category) ? categoryMap.get(category) : [])]);
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
