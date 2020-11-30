import {  makeElement  } from './make-element.js';


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

	const loadMain = () => {
		makeElement("h1", "main", "title-bar", "Projects");
		makeElement("section", "main", "project-cards", "");
		makeElement("div", "#project-cards", "add-project", "&#65291 Add Project");
	};

	loadMain();

});




// Load Base Body Elements


// Load Footer Elements

export {
	loadPage
}