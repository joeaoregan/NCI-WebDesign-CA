/*
login.js

handle user login
https://www.w3schools.com/html/html5_svg.asp
*/

function userLogin() {
    console.log("User Login Function");

    var storedUserDB = JSON.parse(localStorage.getItem('user-db')) || users;//Get the user database

    document.getElementById('username').setCustomValidity('');

    for (var i in storedUserDB) {
        console.log('Username: ' + storedUserDB[i].username + ' Password: ' + storedUserDB[i].password);

        if (storedUserDB[i].username == document.getElementById('username').value && storedUserDB[i].password == document.getElementById('password').value) {
            //console.log('Username: ' + storedUserDB[i].username + ' is already taken!');
            //document.getElementById('username').setCustomValidity('The Username Is Already taken');
            // welcome-personalise

            document.getElementById('welcome-personalise').innerHTML = "Welcome Back To J.I.M. Games " + storedUserDB[i].firstname;
            document.getElementById('username').setCustomValidity('');//Reset validity message
            document.getElementById('loginID').style.display = 'none';
            document.getElementById('menu-login').innerHTML = 'Logout';
            document.getElementById("menu-login").style.color='green';

            storedUserDB[i].loggedin=true;

            console.log('success');
            return;
        }
    }
    console.log('nope');

    document.getElementById('username').setCustomValidity('There is a problem with the details you entered');//Set validity message
}