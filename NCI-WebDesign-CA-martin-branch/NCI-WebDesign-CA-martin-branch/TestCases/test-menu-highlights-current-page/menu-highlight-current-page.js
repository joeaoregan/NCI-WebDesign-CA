// JSON object with names and links
var myArray = [
	{
		"display": "Page One",
		"url": "page-1.html"
	},
	{
		"display": "Page Two",
		"url": "page-2.html"
	},
	{
		"display": "Page Three",
		"url": "page-3.html"
	}
];

createMenu(myArray);

function createMenu(arr) {
	var out = "";
	var i;
	var titleTxt=document.title;
	var classTxt="";
	
	out+="<ul>"; // start of unordered list

	for(i = 0; i < arr.length; i++) {
		if(titleTxt===arr[i].display){
			classTxt="highlighted";
		}else{
			classTxt="";
		}
		
		out += '<li class='+classTxt+'><a href="' + arr[i].url + '">' + arr[i].display + '</a></li>'; // add each as list item
	}
	
	out+="</ul>"; // end of unordered list
	
	document.getElementById("menu").innerHTML = out;
}