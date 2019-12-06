/*
login.js

handle user login
https://www.w3schools.com/html/html5_svg.asp
*/

var user = [];

function userLogin() {
    console.log("User Login Function");

    var storedUserDB = JSON.parse(localStorage.getItem('user-db')) || users;//Get the user database

    document.getElementById('username').setCustomValidity('');
    var success = false;

    for (var i in storedUserDB) {
        console.log('Username: ' + storedUserDB[i].username + ' Password: ' + storedUserDB[i].password);

        if (storedUserDB[i].username == document.getElementById('username').value && storedUserDB[i].password == document.getElementById('password').value) {
            //console.log('Username: ' + storedUserDB[i].username + ' is already taken!');
            //document.getElementById('username').setCustomValidity('The Username Is Already taken');
            // welcome-personalise

            document.getElementById('username').setCustomValidity('');//Reset validity message before

            if(document.title!="Home") window.location.href = "index.html#topofpage";
            if(document.title=="Home") {
                document.getElementById('loginID').style.display = 'none';
                document.getElementById('welcome-personalise').innerHTML = "Welcome Back To J.I.M. Games " + storedUserDB[i].firstname;
                document.getElementById('menu-login').innerHTML = 'Logout';
                document.getElementById("menu-login").style.color = 'green';
            }
            //storedUserDB[i].loggedin = true;//not important
            success = true;
            console.log('success');
            break;
        }
    }
    if (!success) {
        console.log('nope');
        document.getElementById('username').setCustomValidity('There is a problem with the details you entered');//Set validity message
    }
}


function userLogin2() {
    //console.log("User Login Function");
    var storedUserDB = JSON.parse(localStorage.getItem('user-db')) || users;//Get the user database

    document.getElementById('username').setCustomValidity('');
    var success = false;

    for (var i in storedUserDB) {
        //console.log('Username: ' + storedUserDB[i].username + ' Password: ' + storedUserDB[i].password);

        if (storedUserDB[i].username == document.getElementById('username').value && storedUserDB[i].password == document.getElementById('password').value) {
            console.log("success");

            // document.getElementById('welcome-personalise').innerHTML = "Welcome Back To J.I.M. Games " + storedUserDB[i].firstname;
            //document.getElementById('username').setCustomValidity('');//Reset validity message
            // document.getElementById('loginID').style.display = 'none';
            // document.getElementById('menu-login').innerHTML = 'Logout';
            // document.getElementById("menu-login").style.color='green';

            // storedUserDB[i].loggedin=true;
            success = true;
            break;
        }
    }
    window.location.href = "about.html";

    if (!success) {
        console.log("nope");
        document.getElementById('username').setCustomValidity('There is a problem with the details you entered');//Set validity message
    } else {
        console.log("change");
    }
}