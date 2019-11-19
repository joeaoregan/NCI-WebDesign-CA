// JSON object with page names and links
var menuNames = [
	{
		"name": "Home",
		"url": "../index.html"
	},
	{
		"name": "Info",
		"url": "../info.html"
	},
	{
		"name": "Register",
		"url": "../register.html"
	},
	{
		"name": "Contact Us",
		"url": "../contact.html"
	},
	{
		"name": "About",
		"url": "../about.html"
	},
	{
		"name": "Antibody JS",
		"url": "antibody.html"
	}
];

createMenu(menuNames);

// Function to create menu and highlight the current page
function createMenu(arr) {
	var out = "";
	var i;
	var titleTxt = document.title;//The title of the current page
	var classTxt = "";//Set the class for highlighted menu item

	out += "<div class=\"center\"><ul>"; // start of unordered list

	for (i = 0; i < arr.length; i++) {
		if (titleTxt === arr[i].name) {
			classTxt = "highlighted";
		} else {
			classTxt = "";
		}

		out += '<li class=' + classTxt + '><a href="' + arr[i].url + '">' + arr[i].name + '</a></li>'; // add each as list item
	}

	out += "</ul></div>"; // end of unordered list

	document.getElementById("menu").innerHTML = out;
}