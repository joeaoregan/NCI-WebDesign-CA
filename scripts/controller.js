/*
controller.js
Displays the hidden game controller on mobile devices
Modifies the viewport so the screen doesn't scale when double tapping buttons/screen area
*/

//Only show the controller for mobile device
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	var controller = document.getElementById("controller-section");//Get the div containing the controller
	controller.style.display = "none";// Hide controller if not a mobile device
	console.log('not mobile');
} else {
	//var viewport = document.querySelector("meta[name=viewport]");	
	// Moved from antibody.html as giving warning in validator
	document.getElementById("viewport-meta").setAttribute("content", "user-scalable=no, initial-scale=0.275, maximum-scale=0.275, minimum-scale=0.275");
}