const floatingHeader = (() => {
	const header = document.querySelector("header");

	// Builds "More by Ethan"
	const addMoreByEthan = () => {
		const div = document.createElement('div');
		div.setAttribute('id', 'moreByEthan');
		div.style.marginLeft = 'auto';
		div.innerHTML = `<a href="https://www.ethanzitting.com" target="_blank">More by Ethan</a>`
		header.appendChild(div);
	}
	
	// Builds functionality for floatingHeader.load()
	const load = () => {
		header.setAttribute('id', 'floating-header');

		addMoreByEthan();
	}

	const addDiv = (divId, divText) => {
		// Create Div
		const div = document.createElement('div');
		div.setAttribute('id', divId);
		div.setAttribute('class', 'headerTab');
		div.innerText = divText;

		// Put Div Just Before More By Ethan
		const moreByEthan = document.querySelector("#moreByEthan");
		header.insertBefore(div, moreByEthan);
	}

	const removeDiv = (divId) => {
		const div = document.querySelector(divId);
		div.parentNode.removeChild(div);
	}

	// Add Method to Remove all Nodes besides "More by Ethan"
		// Should look like floatingHeader.removeAll();
	const removeAll = () => {
		while (header.firstChild) {
			header.removeChild(header.firstChild);
		}
		addMoreByEthan();
	}

	return {
		load: load,
		addDiv: addDiv,
		removeDiv: removeDiv,
		removeAll: removeAll
	}
})();


export {
	floatingHeader
}
