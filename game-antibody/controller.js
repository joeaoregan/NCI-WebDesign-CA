//Only show the controller for mobile device
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	var controller = document.getElementById("controller-section");//Get the div containing the controller
	controller.style.display="none";// Hide controller if not a mobile device
	console.log('not mobile');
}
