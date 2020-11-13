// Import Modules
 import {  
	floatingHeader, 
	addTab,
	tabFactory,
	loadTabPanel,
	tabArray
} from './module-aggregator.js';


// Loads Header
floatingHeader.load();
floatingHeader.addDiv("toDo", "To-Do App");


// Loads Tab Panel and readies it for addTab()
loadTabPanel();


console.log(tabArray);



const bar = tabFactory(2);
const bas = bar.taskFactory(bar.tabId);
bas.taskText = "Run a mile.";
console.log(bas.taskText);
