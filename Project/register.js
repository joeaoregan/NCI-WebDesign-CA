/*
register.js
J O'Regan
15/11/2019
*/

var surveyArr = [];

//Form field attributes
const formJSON = [
	// Required fields
	{ "label": "Username", "type": "text", "name": "username", "placeholder": "Enter username (required)", "id": "usernameInput", "required": true },
	{ "label": "Password", "type": "password", "name": "password1", "placeholder": "Enter password (required)", "id": "password1Input", "required": true },//type password
	{ "label": "Confirm Password", "type": "password", "name": "password2", "placeholder": "Confirm password (required)", "id": "password2Input", "required": true },//type password
	{ "label": "First Name", "type": "text", "name": "firstname", "placeholder": "Enter first name (required)", "id": "fnameInput", "required": true },
	{ "label": "Last Name", "type": "text", "name": "lastname", "placeholder": "Enter last name (required)", "id": "lnameInput", "required": true },
	{ "label": "Email", "type": "email", "name": "email", "placeholder": "Enter email (required)", "id": "emailInput", "required": "true" },//type email
	// Optional address
	{ "label": "Street", "type": "text", "name": "street", "placeholder": "Enter street", "id": "steetInput", "required": false },
	{ "label": "Area", "type": "text", "name": "area", "placeholder": "Enter area", "id": "areaInput", "required": false },
	{ "label": "Town/City", "type": "text", "name": "city", "placeholder": "Enter town/city", "id": "cityInput", "required": false },
	{ "label": "County", "type": "text", "name": "county", "placeholder": "Enter county", "id": "countyInput", "required": false },
	{ "label": "Postcode", "type": "text", "name": "postcode", "placeholder": "Enter postcode", "id": "postcodeInput", "required": false }
];

function submitForm() {
	// Store the survey data as JSON object
	var surveyJSON = {
		"username": "",
		"password": "",
		"firstname": "",
		"lastname": "",
		"email": "",
		"street": "",
		"area": "",
		"city": "",
		"county": "",
		"postcode": "",
		"amount": "",
		"favourite": "",
		"newsletter": ""
	};

	// Set the attributes of the JSON
	surveyJSON.username = document.getElementById("usernameInput").value;
	surveyJSON.password = document.getElementById("password1Input").value;
	surveyJSON.firstname = document.getElementById("fnameInput").value;
	surveyJSON.lastname = document.getElementById("lnameInput").value;
	surveyJSON.email = document.getElementById("emailInput").value;
	surveyJSON.street = document.getElementById("steetInput").value;
	surveyJSON.area = document.getElementById("areaInput").value;
	surveyJSON.city = document.getElementById("cityInput").value;
	surveyJSON.county = document.getElementById("countyInput").value;
	surveyJSON.postcode = document.getElementById("postcodeInput").value;
	surveyJSON.amount = document.querySelector('input[type=radio]:checked').value;
	surveyJSON.favourite = document.getElementById("favouriteInput").value;
	surveyJSON.newsletter = (document.getElementById("newsletterInput").checked) ? "Yes" : "No";

	/* alert(JSON.stringify(surveyJSON,'',4)); */

	surveyArr.push(surveyJSON);

	/* console.log(JSON.stringify(surveyJSON,'',4)); */

	console.log(JSON.stringify(surveyArr, '', 4));

	// Create the table template to display surveys
	document.getElementById("formdiv").innerHTML = `
		<table>
			<thead>
				<tr>
					<th colspan="2">New User Registration</th>
				</tr>
			</thead>	
			<tr>				
				<th colspan="2">New User Added</th>
			</tr>
			
			<tr id="add"></tr>
								
			<tfoot>
				<tr><td colspan="2"><input type="submit" class="btn" value="Add New" onclick="resetForm()"/></td><tr>
			</tfoot>
		</table>`;

	// Add individually stored surveys to be displayed
	var surveyData = "";

	for (var fs in surveyArr) {
		surveyData += `<tr><th colspan="2">Survey: ${parseInt(fs) + 1}</th></tr>`;

		// Display variable name and value
		for (var i in surveyJSON) {
			surveyData += `<tr>
					<td class="lbl"><label><b>`+ i + `:</b></label></td>
					<td>` + surveyJSON[i] + `</td>
				</tr>`;
		}

		surveyData += `<tr>&nbsp;</tr>`;
	}

	document.getElementById("add").outerHTML = surveyData;//display the survey data at the specified id
}

// Make sure both passwords match
function validatePassword() {
	//console.log('password1 '+document.getElementById('password1Input').value + ' password2 '+document.getElementById('password2Input').value)
	document.getElementById('password1Input').setCustomValidity('');

	if (document.getElementById('password1Input').value != document.getElementById('password2Input').value) {
		document.getElementById('password2Input').setCustomValidity('Passwords must match.');
	} else {
		document.getElementById('password2Input').setCustomValidity('');
	}
}

// This function creates the form HTML in a table
function resetForm() {
	var formFields = `<form onsubmit="submitForm()">
	<h1>New User Registration</h1>
	<h2>Please Complete This Form</h2>
		<table>
			<thead>
				<th colspan="3">Enter Your Details</th>
			</thead>`;

	//Concatenate each form field
	for (i in formJSON) {
		var star = (formJSON[i].required) ? ' * ' : '';//If it is a required field show an asterix

		formFields += `<tr>
			<td class="lbl"><label>`+ formJSON[i].label + star + `</label></td>
			<td><input type="`+ formJSON[i].type + `" name="` + formJSON[i].name + `" placeholder="` + formJSON[i].placeholder + `" id="` + formJSON[i].id + `" /></td>
			<td></td>
		</tr>`;
	}

	formFields += `<tr>
				<td class="lbl"><label>How many of our games have you played?</label></td>
				<td>
					<input type="radio" name="number" value="0" />0<br/>
					<input type="radio" name="number" value="1" />1<br/>
					<input type="radio" name="number" value="2" />2<br/>
					<input type="radio" name="number" value="3" />More than 2<br/>
				</td>
				<td></td>
			</tr>
			<tr>
				<td class="lbl"><label>My favourite game</label></td>
				<td>
					<select name="games" size="4" id="favouriteInput">
						<option value="game1">Game 1</option>
						<option value="game2">Game 2</option>
						<option value="game3">Game 3</option>
						<option value="game4">Game 4</option>
					</select>
				</td>
				<td></td>
			</tr>
			<tr>
				<td class="lbl"><label>Would you like us to email you our newsletter?</label></td>
				<td><input type="checkbox" id="newsletterInput" /><br/></td>
				<td></td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td><input name="submit"  class="btn" type="submit" value="Submit" /></td>
				<td></td>
			</tr>
		</table>
	</form>`;

	document.getElementById("formdiv").innerHTML = formFields;
	document.getElementsByName("submit")[0].onclick = validatePassword;//needs to be here for password validation to work

	//Set required fields
	for (i in formJSON) {
		document.getElementById(formJSON[i].id).required = formJSON[i].required;//Find field by id, and set required form field or not
	}
}
