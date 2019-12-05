/*
footer.js

This file uses document.write to add a footer that can be re-used across multiple pages.
This keeps the code modular and allows the code to be edited once but used in many pages.

 Using backticks (`) allows the code to be spread across multiple lines and keep the formatting
 This would not be allowed with double or single quotes
*/
function createFooter(className) {
    // The first part of the footer on the left shows text links to each page of the website
    document.write(`
        <footer class="`+className+`">
            <div>
                <div style="float: left; width: 33%;">
                    <a href="index.html" title="Return To Homepage">Home</a> |
                    <a href="antibody.html" title="Play Antibody">Antibody</a> |
                    <a href="flappybird.html" title="Play Flappy Bird">Flappy Bird</a> |
                    <a href="spaceinvaders.html" title="Play Space Invaders">Space Invaders</a> |
                    <a href="register.html" title="Register With Us">Register</a> |
                    <a href="contact.html" title="Contact Us">Contact Us</a> |
                    <a href="about.html" title="About J.I.M. Games">About</a> |
                    <a href="login.html" title="Login And Reset User Details">Login</a>
                </div>
    `);
    
    //Shows the social media icons on the right of the footer
    document.write(`
                <div style="float: right; width: 33%;">
                    <a href="https://www.facebook.com/JIM-107782680690362/" class="fa fa-facebook" target="_blank"
                        title="Follow Us On Facebook"></a>
                    <a href="https://twitter.com/JIMGames6" class="fa fa-twitter" target="_blank" title="Follow Us On Twitter"></a>
                    <a href="https://www.linkedin.com/" class="fa fa-linkedin" target="_blank" title="Follow Us On LinkedIn"></a>
                    <a href="https://youtu.be/HQiAlmhXLqA" class="fa fa-youtube" target="_blank" title="View Our YouTube Channel"></a>
                    <a href="https://github.com/joeaoregan/NCI-WebDesign-CA" class="fa fa-github target="_blank" title="View The GitHub Repository"></a>
                </div>
            </div>
    `);

    //Shows the Space Invader alien logo and copyright symbol in the center of the footer
    document.write(`
            <div>
                <a href="index.html">
                    <img src="img/alien-grey.svg" alt="Space Invader Image" class="space-invader-grey" title="Return To Home Page" />
                </a>
            </div>

            <div class="copyright">&copy;2019 Joe, Ian, Martin</div>
        </footer>`
    );
}