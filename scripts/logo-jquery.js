/*
logo-jquery.js
06/12/2019
*/
$(document).ready(function () {
    $(".logo-jq").click(function () {
        var div = $(".logo-jq");//Get the div that holds the logo
        var img = $(".logo");//Get the logo
        var newWidth = $(".testjq").width();//Get the new width to use

        div.animate({ height: '0px', opacity: '1.0' }, "slow", function () {//Shrink the div containing the log image
            var newHeight = $(".testjq").height()//Then get the new height of the top panel
            div.animate({ width: newWidth, opacity: '0.8' }, "slow");//Expand the div containing the logo

            $.when(img.fadeOut("slow")).done(function () {//After the image has faded out
                div.animate({ height: '250px', opacity: '1.0' }, "slow");//Undo the div size
                img.animate({ width: '250px', opacity: '1.0' }, "slow");//Undo the image size
                img.fadeIn("slow");//Fade back in the image
            });
            
            img.animate({ width: newHeight }, "slow");//Expand the image
        });
    });
});