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


const loadPage = (() => {

	// Loads Header
	const loadHeader = () => {
		makeElement("div", "header", "header-home", `<h1><a href="">To-Do App</a></h1>`);
		makeElement("div", "header", "header-more", `<h1><a href="https://www.ethanzitting.com/">More by Ethan</a></h1>`);
	};
	loadHeader();


	// Loads Footer
	const loadFooter = () => {
		makeElement("div", "footer", "footer-github", `<h3><a href="">GitHub</a></h3>`);
		makeElement("div", "footer", "footer-linkedin", `<h3><a href="">LinkedIn</a></h3>`);
		makeElement("div", "footer", "footer-copywrite", `<h3><a href="">© 2020</a></h3>`);
	};
	loadFooter();


	// Loads Body
	const loadProjectPanel =  () => {
		
		// Builds Cosmetic Project Title Bar
		makeElement("div", "main", "title-bar", `<h1>Projects</h1>`);
	
		// Builds project container div.
		makeElement("section", "main", "projectContainer");
	
		// Builds addProject button.
		makeElement("div", "#projectContainer", "add-project-button", "&#65291 Add Project");
	}
	loadProjectPanel();
});



// CONCATENATED MODULE: ./src/module-aggregator.js
;
// import {  loadProjects  } from './load-projects';


// CONCATENATED MODULE: ./src/script.js
// Import Modules
 ;


// Adds header, footer, and starting elements of body 
loadPage();


// Establishes editing functionality and loads projects from DB.
// loadProjects();
/******/ })()
;