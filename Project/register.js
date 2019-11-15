/*
register.js
J O'Regan
15/11/2019
*/

var surveyArr = [];
			
function submitForm() {
	// Store the survey data as JSON object
	var surveyJSON = {
		"username": "",
		"password": "",
		"firstname": "",
		"lastname":"",
		"email":"",
		"amount":"",
		"favourite":"",
		"newsletter":""
	};

	/* var surveyArr = []; */

	// Set the attributes of the JSON
	surveyJSON.username = document.getElementById("usernameInput").value;
	surveyJSON.password = document.getElementById("password1Input").value;
	surveyJSON.firstname = document.getElementById("fnameInput").value;
	surveyJSON.lastname = document.getElementById("lnameInput").value;
	surveyJSON.email = document.getElementById("emailInput").value;
	surveyJSON.amount = document.querySelector('input[type=radio]:checked').value;	
	surveyJSON.favourite = document.getElementById("favouriteInput").value;
	surveyJSON.newsletter = (document.getElementById("newsletterInput").checked) ? "Yes" : "No";

	/* alert(JSON.stringify(surveyJSON,'',4)); */

	surveyArr.push(surveyJSON);

	/* console.log(JSON.stringify(surveyJSON,'',4)); */

	console.log(JSON.stringify(surveyArr,'',4));
	
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
			<tr><td colspan="2"><input type="submit" value="Add New" onclick="resetForm()"/></td><tr>
		</tfoot>
	</table>`;

	// Add individually stored surveys to be displayed
	for (var fs in surveyArr) {
		document.getElementById("add").outerHTML += `
			<tr><th colspan="2">Survey: ${parseInt(fs) + 1}</th></tr>
			<tr>
				<td class="lbl"><label><b>Username:</b></label></td>
				<td>${surveyArr[fs].username}</td>
			</tr>
			<tr>
				<td class="lbl"><label><b>Password:</b></label></td>
				<td>${surveyArr[fs].password}</td>
			</tr>
			<tr>
				<td class="lbl"><label><b>First Name:</b></label></td>
				<td>${surveyArr[fs].firstname}</td>
			</tr>
			<tr>
				<td class="lbl"><label><b>Last Name:</b></label></td>
				<td>${surveyArr[fs].lastname}</td>
			</tr>
			<tr>
				<td class="lbl"><label><b>Email:</b></label></td>
				<td>${surveyArr[fs].email}</td>
			</tr>
			<tr>
				<td class="lbl"><label><b>How many of our games have you played?</b></label></td>
				<td>${surveyArr[fs].amount}</td>
			</tr>
			<tr>
				<td class="lbl"><label><b>My favourite game:</b></label></td>
				<td>${surveyArr[fs].favourite}</td>
			</tr>
			<tr>
				<td class="lbl"><label><b>Would you like us to email you our newsletter?</b></label></td>
				<td>${surveyArr[fs].newsletter}</td>
			</tr>
			<tr>&nbsp;</tr>
		`
	}
}

// This function creates the form HTML
function resetForm() {
document.getElementById("formdiv").innerHTML = `
	<form onsubmit="submitForm()">
		<table>
			<thead>
				<th colspan="3">New User Registration</th>
			</thead>
			<tr>				
				<th colspan="3">Please complete the following information</th>
			</tr>
			<tr>
				<td class="lbl"><label>Username</label></td>
				<td><input type="text" name="name" placeholder="Enter username" id="usernameInput" /></td>
				<td></td>
			</tr>
			<tr>
				<td class="lbl"><label>Password</label></td>
				<td><input type="text" name="name" placeholder="Enter password" id="password1Input" /></td>
				<td></td>
			</tr>
			<tr>
				<td class="lbl"><label>Confirm Password</label></td>
				<td><input type="text" name="name" placeholder="Confirm password" id="password2Input" /></td>
				<td></td>
			</tr>
			<tr>
				<td class="lbl"><label>First Name</label></td>
				<td><input type="text" name="name" placeholder="Enter first name" id="fnameInput" /></td>
				<td></td>
			</tr>
			<tr>
				<td class="lbl"><label>Last Name</label></td>
				<td><input type="text" name="address" placeholder="Enter last name" id="lnameInput" /></td>
				<td></td>
			</tr>
			<tr>
				<td class="lbl"><label>Email</label></td>
				<td><input type="text" name="email" placeholder="Enter email" id="emailInput" /></td>
				<td></td>
			</tr>
			<tr>
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
				<td><input type="submit" value="Submit" /></td>
				<td></td>
			</tr>
		</table>
	</form>`;
}