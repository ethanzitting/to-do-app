/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// CONCATENATED MODULE: ./src/make-element.js
const makeElement = (elementType, parentId, childId, htmlToUse, referenceChild) => {
	const parent = document.querySelector(`${parentId}`);
	const child = document.createElement(`${elementType}`);
	child.setAttribute("id", `${childId}`);
	htmlToUse = htmlToUse || "";
	child.innerHTML = htmlToUse;

	// Default is put it last, otherwise, put it after the included child's ID
	referenceChild = referenceChild || "after";
	if (referenceChild == "after") {
		parent.appendChild(child);
	} else {
		referenceChild = document.querySelector(referenceChild);
		parent.insertBefore(child, referenceChild);
	}	
}


// CONCATENATED MODULE: ./src/load-page.js
;


// Load Header Elements

const loadPage = (() => {

	const loadHeader = () => {
		makeElement("div", "header", "header-home", `<h1><a href="">To-Do App</a></h1>`);
		makeElement("div", "header", "header-more", `<h1><a href="https://www.ethanzitting.com/">More by Ethan</a></h1>`);
	};

	loadHeader();

	const loadFooter = () => {
		makeElement("div", "footer", "footer-github", `<h3><a href="">GitHub</a></h3>`);
		makeElement("div", "footer", "footer-linkedin", `<h3><a href="">LinkedIn</a></h3>`);
		makeElement("div", "footer", "footer-copywrite", `<h3><a href="">© 2020</a></h3>`);
	};

	loadFooter();
});




// Load Base Body Elements


// Load Footer Elements


// CONCATENATED MODULE: ./src/load-tab-panel.js
// One of the tabs will have a favorite status, and will load first.
// The client will be able to change this at will.

// I'll try to build this first with an array of tab items where each item in
// the array contains another array of task items.


// When the user clicks on the Add Tab button, he won't need to input any info.
// It'll be once the tab is created, where he can put in a tab title/description.



;


// Starting empty tabArray and zero newTabId to be used.
const tabArray = [];
let newTabId = 0;



// Sets up Tab environment
const loadTabPanel =  () => {
	console.log("Inside loadTabPanel()");

	// Builds Cosmetic Project Title Bar
	makeElement("div", "main", "title-bar", `<h1>Projects</h1>`);

	// Builds tab container div.
	makeElement("section", "main", "tabContainer");

	// Populates tab container with tabs.
	loadTabs(tabArray);
}

// Adds tabs in array to DOM
const loadTabs = (tabArray) => {
	console.log("Inside loadTabs()");
	console.log(`  tabArray.length: ${tabArray.length}`);

	// Load addTabButton
	makeElement("div", "#tabContainer", "addTabButton", "&#65291 Add Project");
	const addTabButton = document.querySelector("#addTabButton");
	addTabButton.addEventListener('click', () => {
		addTab();
	});

	// If tabArray holds anything, load it...
	if (tabArray.length > 0) {
		for (let i = 0; i < tabArray.length; i++) {
			addTabToDOM(tabArray[i]);
		}
	}
}

// Constructs the tab in the DOM
const addTabToDOM = (tabObject) => {
	console.log("Inside addTabToDOM");
	// Builds tab card
	makeElement("div", "#tabContainer", `${tabObject.tabId}`, "", "#addTabButton");
	makeElement("div", `#${tabObject.tabId}`, `${tabObject.tabId}Title`, "<h1>Project Title</h1>");
	const titleDiv = document.querySelector(`#${tabObject.tabId}Title`);
	titleDiv.setAttribute("class", "tabTitleDiv");
	
	makeElement("div", `#${tabObject.tabId}`, `${tabObject.tabId}Description`, "<p>Project Description</p>");
	makeElement("div", `#${tabObject.tabId}`, `${tabObject.tabId}TaskContainer`);

	// Builds addTaskButton
	makeElement("div", `#${tabObject.tabId}`, `${tabObject.tabId}addTaskButton`, "&#65291 Add Task");
	const addTaskButton = document.querySelector(`#${tabObject.tabId}addTaskButton`);
	addTaskButton.setAttribute("class", "addTaskButton");
	addTaskButton.addEventListener('click', () => {
		addTask(tabObject);
	});

	document.getElementById(tabObject.tabId).setAttribute('class', 'tabDiv');

}

const addTasksToDOM = (tabObject) => {
	console.log(tabObject);
}

const addTask = (tabObject) => {
	console.log("Adding Task...");
	makeElement("div", `#${tabObject.tabId}TaskContainer`, `${tabObject.tabId}TaskContainer`, `<form><input type="checkbox" id="${tabObject.tabId}Task1" name="${tabObject.tabId}Task1" value="complete"><label for="${tabObject.tabId}Task1">Task1</label><br>`);
}


// So this is the factory. I don't think the means for using the factory should
// be inside the factory. See addTab()
const tabFactory = (newTabId) => {
	// Activated when a new tab needs to be created.
	const tabId = `tab${newTabId}`;
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


	return {  tabId, title, description, taskArray, taskFactory  };
}


const addTab = () => {
	let newTab = tabFactory(newTabId);
	newTabId++
	tabArray.push(newTab);
	console.log(tabArray);
	addTabToDOM(newTab);
}





// CONCATENATED MODULE: ./src/module-aggregator.js
;



// CONCATENATED MODULE: ./src/script.js
// Import Modules
 ;


loadPage();





// Loads Tab Panel and readies it for addTab()
loadTabPanel();

console.log(tabArray);
const bar = tabFactory(2);
const bas = bar.taskFactory(bar.tabId);
bas.taskText = "Run a mile.";
console.log(bas.taskText);

/******/ })()
;