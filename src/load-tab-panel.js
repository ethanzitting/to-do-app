// Alright, I'll load one default tab. It'll start out as the favorite.

// Client can add tabs. The tab will be built with a function factory.

// Inside the tab will be other function factories for the tasks.

// One of the tabs will have a favorite status, and will load first.
// The client will be able to change this at will.

// I'll try to build this first with an array of tab items where each item in
// the array contains another array of task items.


// When the user clicks on the Add Tab button, he won't need to input any info.
// It'll be once the tab is created, where he can put in a tab title/description.




// Starting empty tabArray and zero newTabId to be used.
const tabArray = [];
let newTabId = 0;


// Sets up Tab environment
const loadTabPanel =  () => {
	console.log("Inside loadTabPanel()");
	console.log(`tabArray.length: ${tabArray.length}`);

	// Builds tab container div.
	const main = document.querySelector("main");
	const tabContainer = document.createElement('div');
	tabContainer.setAttribute('id', 'tabContainer');
	main.appendChild(tabContainer);

	/* temp */ addTab();

	// Populates tab container with tabs.
	loadTabs(tabArray);
}

// Adds tabs in array to DOM
const loadTabs = (tabArray) => {
	console.log(`tabArray.length: ${tabArray.length}`);

	// If tabArray holds anything, load it...
	if (tabArray.length > 0) {
		for (let i = 0; i < tabArray.length; i++) {
			addTabToDOM(tabArray[i]);
		}
	} else {
		// else, load the first new tab.
		addTab();
	}
}

// Constructs the tab in the DOM
const addTabToDOM = (tabObject) => {
	const tabContainer = document.querySelector('#tabContainer');
	const div = document.createElement('div');
	div.setAttribute('id',`tab${tabObject.tabId}`);
	div.setAttribute('class', 'tabDiv');
	
	tabContainer.appendChild(div);
}


// So this is the factory. I don't think the means for using the factory should
// be inside the factory. See addTab()
const tabFactory = (newTabId) => {
	// Activated when a new tab needs to be created.
	let tabId = newTabId;
	let title = "";
	let description = "";
	let taskArray = [];
	
	const taskFactory = (tabId) => {
		// Activated when a new task is created. Again, a simple click, 
		// no immediate data input from user.
		let taskText = "";
		let taskCompleted = false;
	
		// There has to be DOM manipulation in here for adding, removing, and editing tasks.
	
		return {  taskText, taskCompleted  };
	}

	// There has to be DOM manipulation in here for adding, removing, and editing tabs


	return {  title, description, taskArray, taskFactory  };
}


const addTab = () => {
	let newTab = tabFactory(newTabId);
	newTabId++
	tabArray.push(newTab);
}



export {
	addTab,
	tabFactory,
	loadTabPanel,
	tabArray
}
