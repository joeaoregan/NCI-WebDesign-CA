/*
fade-jquery.js
06/12/2019
https://www.w3schools.com/jquery/jquery_fade.asp

Fade out and then back in gallery pic
*/
$(document).ready(function () {
    // If a photo is selected in div with class p1, flash gallery1
    $(".p1").click(function () {
        $("#gallery1").fadeOut(0);//Fade out completely
        $("#gallery1").fadeIn();//Fade back in
    });

    // If a photo is selected in div with class p2, flash gallery2
    $(".p2").click(function () {
        $("#gallery2").fadeOut(0);//Fade out completely
        $("#gallery2").fadeIn();//Fade back in
    });
    
    // If a photo is selected in div with class p3, flash gallery3
    $(".p3").click(function () {
        $("#gallery3").fadeOut(0);//Fade out completely
        $("#gallery3").fadeIn();//Fade back in
    });
});