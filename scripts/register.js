/*
register.js
J O'Regan
15/11/2019

User innerhtml to create a form from a JSON object specifying the fields and their properties

https://www.w3schools.com/html/html_forms.asp
https://www.w3schools.com/jsref/prop_html_innerhtml.asp
*/

var users = [];

//Form field attributes
const formJSON = [
	// Required fields
	{ "label": "Username", "value": "", "type": "text", "id": "username", "required": true },//username
	{ "label": "Password", "value": "", "type": "password", "id": "password1", "required": true },//password
	{ "label": "Confirm Password", "value": "", "type": "password", "id": "password2", "required": true },//confirm password
	{ "label": "First Name", "value": "", "type": "text", "id": "firstname", "required": true },//firstname
	{ "label": "Last Name", "value": "", "type": "text", "id": "lastname", "required": true },//lastname
	{ "label": "Email", "value": "", "type": "email", "id": "email", "required": true },//email
	// Optional address, has default
	{ "label": "Street", "value": "", "type": "text", "id": "street", "required": false, "default": "" },
	{ "label": "Area", "value": "", "type": "text", "id": "area", "required": false, "default": "" },
	{ "label": "Town/City", "value": "", "type": "text", "id": "city", "required": false, "default": "" },
	{ "label": "County", "value": "", "type": "text", "id": "county", "required": false, "default": "" },
	{ "label": "Postcode", "value": "", "type": "text", "id": "postcode", "required": false, "default": "" },
	//Check, added in function, has default
	{
		"label": "How many of our games have you played?", "type": "radio", "id": "amount", "required": false, "multiple": true,
		"options": [{ "value": 0, "label": "0" }, { "value": 1, "label": "1" }, { "value": 2, "label": "2" }, { "value": 3, "label": "More Than 2" }], "default": 0
	},
	{
		"label": "My favourite game", "type": "select", "id": "favourite", "multiple": true, "required": false, "default": 0,
		"options": [{ "value": "none", "label": "N/A", "selected": true }, { "value": "Antibody", "label": "Antibody", "selected": false },
		{ "value": "Flappy Bird", "label": "Flappy Bird", "selected": false }, { "value": "Space Invaders", "label": "Space Invaders", "selected": false }],
	},
	{
		"label": "Would you like us to email you our newsletter?", "type": "checkbox", "id": "newsletter", "multiple": false, "required": false, "default": "No"
	}
];

function createNewUser() {
	var newUser = {
		"username": "",
		"password": "",
		"firstname": "",
		"lastname": "",
		"email": "",
		"address": { "street": "", "area": "", "city": "", "county": "", "postcode": "" },
		"survey": { "gamesPlayed": "", "favourite": "", "newsletter": "" }
	};

	for (var i in formJSON) {
		if (formJSON[i].id == "username") {
			newUser.username = formJSON[i].value;
		} else if (formJSON[i].id == "password1") {
			newUser.password = formJSON[i].value;
		} else if (formJSON[i].id == "firstname") {
			newUser.firstname = formJSON[i].value;
		} else if (formJSON[i].id == "lastname") {
			newUser.lastname = formJSON[i].value;
		} else if (formJSON[i].id == "email") {
			newUser.email = formJSON[i].value;
		} else if (formJSON[i].id == "street") {
			newUser.address.street = formJSON[i].value;
		} else if (formJSON[i].id == "area") {
			newUser.address.area = formJSON[i].value;
		} else if (formJSON[i].id == "city") {
			newUser.address.city = formJSON[i].value;
		} else if (formJSON[i].id == "county") {
			newUser.address.county = formJSON[i].value;
		} else if (formJSON[i].id == "postcode") {
			newUser.address.postcode = formJSON[i].value;
		} else if (formJSON[i].id == "amount") {
			newUser.survey.gamesPlayed = formJSON[i].value;
		} else if (formJSON[i].id == "favourite") {
			newUser.survey.favourite = formJSON[i].value;
		} else if (formJSON[i].id == "newsletter") {
			newUser.survey.newsletter = formJSON[i].value;
		}
	}
	//console.log(newUser);
	//console.log(JSON.stringify(newUser, '', 4));

	return newUser;
}

function submitForm() {
	//Set the values passed in from the form
	for (var i in formJSON) {
		if (formJSON[i].required) {
			formJSON[i].value = document.getElementById(formJSON[i].id).value;
		}
		if (!formJSON[i].required && !formJSON[i].multiple) {
			formJSON[i].value = document.getElementById(formJSON[i].id).value || formJSON[i].default;
		}
		if (formJSON[i].id == "amount") {
			formJSON[i].value = document.querySelector('input[type=radio]:checked') != null ? document.querySelector('input[type=radio]:checked').value : formJSON[i].default;
		} else if (formJSON[i].id == "favourite") {
			formJSON[i].value = document.getElementById(formJSON[i].id) != null ? document.getElementById(formJSON[i].id).value : formJSON[i].default;
		} else if (formJSON[i].id == "newsletter") {
			formJSON[i].value = document.getElementById(formJSON[i].id) != null ? (document.getElementById(formJSON[i].id).checked) ? "Yes" : "No" : formJSON[i].default;
		}
	}

	/* Confirm Form Details Table */
	document.getElementById("formdiv").innerHTML = `
		<div class="center confirm-form">
			<table>
				<thead>
					<tr><th colspan="2"><h2>User Registration Confirmation</h2></th></tr>
				</thead>
				<tr id="add"></tr>
				<tfoot>
					<tr><td colspan="2">
						<div class="center">
							<input type="submit" class="btn" value="Confirm" onclick="confirmPressed()"/>
							<input type="submit" class="btn" value="Edit" onclick="resetForm(true)"/>
							<input type="submit" class="btn cancelbtn" value="Cancel" onclick="resetForm()"/>
						</div>
					</td><tr>
				</tfoot>
			</table>
		</div>`;

	// Add individually stored surveys to be displayed
	var dataEntered = "";
	for (var i in formJSON) {
		dataEntered += `<tr><td class="lbl"><label><b>` + formJSON[i].label + `:</b></label></td><td colspan>` + formJSON[i].value + `</td></tr>`;
	}
	dataEntered += `<tr>&nbsp;</tr>`;
	document.getElementById("add").outerHTML = dataEntered;//display the survey data at the specified id
}

function confirmPressed() {
	console.log('User Registered')
	
	var userdb =  JSON.parse(localStorage.getItem('user-db')) || users;
	//console.log(JSON.stringify(users, '', 4));
	var newUser = createNewUser();
	userdb.push(newUser);

	localStorage.setItem('user-db',JSON.stringify(userdb));

	console.log('\nNumber of users: ' + userdb.length);

/*
	var newuserdb=JSON.parse(localStorage.getItem('user-db')) || users;
	console.log(JSON.stringify(newuserdb,' ', 4));

	var count = 0;
	for (var i in userdb) {
		count++;
	}
	console.log('COUNT: '+count);
*/
	resetForm();//Reset the form
}

// Make sure both passwords match
function validatePassword() {
	//console.log('password1 ' + document.getElementById('password1Input').value + ' password2 ' + document.getElementById('password2Input').value)

	document.getElementById('password1').setCustomValidity('');

	if (document.getElementById('password1').value != document.getElementById('password2').value) {
		document.getElementById('password2').setCustomValidity('Passwords must match.');
	} else {
		document.getElementById('password2').setCustomValidity('');
	}
}

function validateUsername() {
	var storedUserDB=JSON.parse(localStorage.getItem('user-db')) || users;

	document.getElementById('username').setCustomValidity('');

	for (var i in storedUserDB) {
		if (storedUserDB[i].username == document.getElementById('username').value) {
			console.log('Username: ' + storedUserDB[i].username + ' is already taken!');
			document.getElementById('username').setCustomValidity('The Username Is Already taken');
		} else {
			document.getElementById('username').setCustomValidity('');
		}
	}
}

function validateEmail() {
	var storedUserDB=JSON.parse(localStorage.getItem('user-db')) || users;

	document.getElementById('email').setCustomValidity('');

	for (var i in storedUserDB) {
		if (storedUserDB[i].email == document.getElementById('email').value) {
			console.log('Email: ' + storedUserDB[i].email + ' is already registered. Try resetting you password!');
			document.getElementById('email').setCustomValidity('Email: ' + storedUserDB[i].email + ' is already registered. Try resetting you password!');
		} else {
			document.getElementById('email').setCustomValidity('');
		}
	}
}

function updateNumberOfUsers() {
	var newuserdb=JSON.parse(localStorage.getItem('user-db')) || users;

	var count = 0;
	for (var i in newuserdb) {
		count++;
	}

	document.getElementById('numUsers').innerHTML="<b>Registered Users:</b> "+count;
}

// This function creates the form HTML in a table
function resetForm(editForm) {
	updateNumberOfUsers();//Update the number of users when the form loads

	var formFields = `<h1>New User Registration</h1>
	<h2>Please Complete This Form</h2><div class="center">
	<form onsubmit="submitForm()">
		<table>
			<thead><th colspan="2"><h2>Enter Your Details</h2></th></thead>`;

	//Concatenate each form field
	for (i in formJSON) {
		var star = (formJSON[i].required) ? ' * ' : '';//If it is a required field show an asterix

		if (formJSON[i].type != "radio" && formJSON[i].type != "select") {
			formFields += `<tr><td class="lbl"><label>` + formJSON[i].label + star + `</label></td>
			<td><input class="reg-form" type="`+ formJSON[i].type + `" placeholder="` + formJSON[i].label + ((formJSON[i].required) ? " (Required Field)" : "") + `" id="` + formJSON[i].id + `" `;

			formFields += (editForm) ? `value="` + formJSON[i].value + `"` : ``;

			if (formJSON[i].required) formFields += ` required`;
			formFields += `/></td></tr>`;
		} else if (formJSON[i].type == "radio") {
			formFields += `<tr><td class="lbl"><label>` + formJSON[i].label + `</label></td><td>`;

			for (var j in formJSON[i].options) {
				formFields += `<input type="` + formJSON[i].type + `" name="` + formJSON[i].id + `" value="` + formJSON[i].options[j].value + `" />` + formJSON[i].options[j].label + `<br/>`;
			}
			formFields += `</td></tr>`;
		} else if (formJSON[i].type == "select") {
			formFields += `<tr><td class="lbl"><label>` + formJSON[i].label + `</label></td>
			<td><select size="`+ formJSON[i].options.length + `" id="` + formJSON[i].id + `">`;

			for (var k in formJSON[i].options) {
				formFields += `<option value="` + formJSON[i].options[k].value;
				formFields += (formJSON[i].options[k].selected) ? `" selected="selected">` : `" >`;
				formFields += formJSON[i].options[k].label + `</option>`;
			}
			formFields += `</select></td></tr>`;
		}
	}

	formFields += `<tfoot>
						<tr>
							<td colspan="2">
								<div class="center">
									<input name="submit" class="btn" type="submit" value="Submit" onclick="submitForm()"/>	
									<input type="submit" class="btn cancelbtn" value="Cancel" onclick="resetForm()"/>
								</div>
							</td>
						</tr>
					</tfoot></table></form></div>`;// close the table

	document.getElementById("formdiv").innerHTML = formFields;
	document.getElementsByName("submit")[0].onclick = validatePassword;//needs to be here for password validation to work
	document.getElementsByName("submit")[0].onclick = validateUsername;
	document.getElementsByName("submit")[0].onclick = validateEmail;
	//console.log(formFields)
}
