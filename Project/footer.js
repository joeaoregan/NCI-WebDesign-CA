/*
footer.js

This file uses document.write to add a footer that can be re-used across multiple pages.
This keeps the code modular and allows the code to be edited once but used in many pages.

 Using backticks (`) allows the code to be spread across multiple lines and keep the formatting
 This would not be allowed with double or single quotes
*/
function createFooter(className) {
    document.write(`
        <footer class="`+className+`">
            <div>
                <div style="float: left; width: 33%;">
                    <a href="index.html">Home</a> |
                    <a href="antibody.html">Antibody</a> |
                    <a href="flappybird.html">Flappy Bird</a> |
                    <a href="spaceinvaders.html">Space Invaders</a> |
                    <a href="register.html">Register</a> |
                    <a href="contact.html">Contact Us</a> |
                    <a href="about.html">About</a> |
                    <a href="login.html">Login</a>
                </div>


                <div style="float: right; width: 33%;">
                    <a href="https://www.facebook.com/JIM-107782680690362/" class="fa fa-facebook" target="_blank"
                        title="Follow Us On Facebook"></a>
                    <a href="https://twitter.com/JIMGames6" class="fa fa-twitter" target="_blank"></a>
                    <a href="https://www.linkedin.com/" class="fa fa-linkedin" target="_blank"></a>
                    <a href="https://youtu.be/HQiAlmhXLqA" class="fa fa-youtube" target="_blank"></a>
                </div>
            </div>

            <div>
                <a href="index.html">
                    <img src="img/alien-grey.svg" alt="Space Invader Image" class="space-invader-grey" title="Return To Home Page" />
                </a>
            </div>

            <div class="copyright">&copy;2019 Joe, Ian, Martin</div>
        </footer>`
    );
}