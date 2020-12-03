// Import Modules
 import {  
	loadPage,
	loadTabPanel,
	tabArray,
	tabFactory
} from './module-aggregator.js';


loadPage();





// Loads Tab Panel and readies it for addTab()
loadTabPanel();

console.log(tabArray);
const bar = tabFactory(2);
const bas = bar.taskFactory(bar.tabId);
bas.taskText = "Run a mile.";
console.log(bas.taskText);
