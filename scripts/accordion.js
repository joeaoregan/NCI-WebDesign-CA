/*
accordion.js

Script to control the accordians on game pages

https://www.w3schools.com/howto/howto_js_accordion.asp
*/
var acc = document.getElementsByClassName("accordion");//Find accordion buttons in the page

for (var i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {//The event listener listens for click events
		this.classList.toggle("active");//If there was a click event, change the class of the clicked accordion button only. This changes the background colour of the button in styles.css
		var panel = this.nextElementSibling;//Get the next element after the accordion button (the panel)

		if (panel.style.display === "block") {//If the panel is showing
			panel.style.display = "none";//Hide the panel
		} else {
			panel.style.display = "block";//Otherwise, show the panel
		}
	});
}