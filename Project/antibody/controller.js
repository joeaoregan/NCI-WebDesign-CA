//Only show the controller for mobile device
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	var controller = document.getElementById("controller");
	controller.style.display="none";
	console.log('not mobile');
}