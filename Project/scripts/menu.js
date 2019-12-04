/*
menu.js

This file uses a JSON object containing the name, url, and title of each page to add each menu item
as a list item in an unordered list using a for loop and places the menu at the top of each page using
document.getElementById() and setting the innerHTML at the DIV with ID menu at the top of each page
*/

// JSON object with page names and links
var menuItems = [
	{
		"name": "Home",//Name of the page
		"url": "index.html",//Url the menu item links to
		"title": "Return To Homepage"//Title to display when the mouse cursor hovers over the menu item
	},
	{
		"name": "Antibody JS",
		"url": "antibody.html",
		"title": "Play Antibody"
	},
	{
		"name": "Flappy Bird JS",
		"url": "flappybird.html",
		"title": "Play Flappy Bird"
	},
	{
		"name": "Space Invaders JS",
		"url": "spaceinvaders.html",
		"title": "Play Space Invaders"
	},
	{
		"name": "Register",
		"url": "register.html",
		"title": "Register With Us"
	},
	{
		"name": "Contact Us",
		"url": "contact.html",
		"title": "Contact Us"
	},
	{
		"name": "About",
		"url": "about.html",
		"title": "About J.I.M. Games"
	},
	{
		"name": "Login",
		"url": "login.html",
		"title": "User Login"
	}
];

createMenu(menuItems);

// Function to create menu and highlight the current page
function createMenu(arr) {
	var out = "";//Output html
	var titleTxt = document.title;//The title of the current page
	var classTxt = "";//Set the class for highlighted menu item

	out += "<ul>"; // start of unordered list

	//Loop through menu items in the menuItems array JSON object
	//Add as line to unordered list used by the menu
	for (var i = 0; i < arr.length; i++) {
		if (titleTxt === arr[i].name) {//If the name of the object matches the title of the current page
			classTxt = "highlighted";//Add highlighted to the class so the current page is highlighted in the menu
		} else {
			classTxt = "";//Otherwise the page does not need to be highlighted
		}

		out += '<li class=' + classTxt + '><a href="' + arr[i].url + '" title="' + arr[i].title + '">' + arr[i].name + '</a></li>'; // add each object as list item
	}

	out += "</ul>"; // end of unordered list

	document.getElementById("menu").innerHTML = out;//Add the menu to the menu ID at the top of each page
}