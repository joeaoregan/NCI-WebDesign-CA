/*
gallery.js
J O'Regan
06/12/2019

Change the picture in the gallery by selecting a polaroid below it on the index page
Use regular expressions to extract filename from path, and remove file extension
Use the filename as a caption for the photo (Yes, I could have just passed in a String)
*/
function changePic(imgID, newSrc, caption) {
    console.log(imgID + ' ' + newSrc)
    document.getElementById(imgID).src = newSrc;//Change the image
    filename = newSrc.replace(/^.*[\\\/]/, '');//Get filename from path
    //filename.split('.').slice(0, -1).join('.');
    //filename.replace(/\.[^/.]+$/, "");
    filename = filename.replace(/\.[^/\\.]+$/, "");//Remove file extension
    filename = capitalize(filename)
    document.getElementById(caption).innerHTML = filename;//output filename
}

// https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
const capitalize = (s) => {
    s=s.toLowerCase();//Convert string to lower case
    if (typeof s !== 'string') {//If it's not a string
        return ''//return an empty string
    }

    return s.charAt(0).toUpperCase() + s.slice(1)//Convert first letter of string to uppercase
}