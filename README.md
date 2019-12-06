# NCI-WebDesign-CA

Group project for Web Design module of HDip in Science in Computing (Cyber Security)

* HTML
* CSS
* JavaScript

---

Name | Email | GitHub
--- | --- | ---
Joe O'Regan | x19181051@student.ncirl.ie | [joeaoregan](https://github.com/joeaoregan)
Martin Parsons | x19162031@student.ncirl.ie | [martydotcom](https://github.com/martydotcom)
Ian Fitzpatrick | x19175400@student.ncirl.ie | [ianfitzpatrick52](https://github.com/ianfitzpatrick52)

---

## Features

* **Accordion** - collapsible with panels: [W3Schools collapsibles/accordion](https://www.w3schools.com/howto/howto_js_accordion.asp). [See code example](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/antibody.html#L156-L213).
* **Address**: [W3Schools: HTML address Tag](https://www.w3schools.com/tags/tag_address.asp), used on contact.html page. [See code](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/contact.html#L53-L65).
* **Anchor Name**: Bookmark a section of the page. [W3Schools: HTML a name](https://www.w3schools.com/tags/att_a_name.asp). See code: [Anchor name](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3f97dd3712e9a535f1f36efe04e8f0793c6d4c24/index.html#L36), [corresponding link](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3f97dd3712e9a535f1f36efe04e8f0793c6d4c24/index.html#L274-L277) in same page
* **Animation**: modal login and popover CSS animatons
* **Canvas** (For games): [W3Schools HTML5 Canvas](https://www.w3schools.com/html/html5_canvas.asp). [See code example](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/antibody.html#L71)
* **DOM Manipulation**:
  * Document write(): e.g. footer.js
  * Events: onclick e.g. buttons, addEventListener e.g. audio track ends play next
  * innerHTML: e.g. menu
  * nextElementSibling: e.g. accordion & panel
  * classList: add and remove e.g music player buttons, toggle e.g. accordion
* **Favicon**: Same [logo favicon](https://raw.githubusercontent.com/joeaoregan/NCI-WebDesign-CA/master/favicon.ico) used on each website page, except game pages where a game sprite is used e.g. Antibody: [favicon](https://raw.githubusercontent.com/joeaoregan/NCI-WebDesign-CA/master/game-antibody/favicon.ico), [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/b14101c3ed7215587f47fca7610bfd1610775d36/antibody.html#L19), Space Invaders: [favicon](https://raw.githubusercontent.com/joeaoregan/NCI-WebDesign-CA/master/game-spaceinvaders/favicon.ico), [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/b14101c3ed7215587f47fca7610bfd1610775d36/spaceinvaders.html#L22), Flappy Bird: [favicon](https://raw.githubusercontent.com/joeaoregan/NCI-WebDesign-CA/master/game-flappybird/favicon.ico), [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/b14101c3ed7215587f47fca7610bfd1610775d36/flappybird.html#L18)
* **Footer** (Created in JavaScript with DOM write()): [W3Schools DOM write()](https://www.w3schools.com/jsref/met_doc_write.asp). [See code example](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/footer.js#L10-L52)
* **Forms**: [W3Schools: HTML Forms](https://www.w3schools.com/html/html_forms.asp), [CSS Forms](https://www.w3schools.com/css/css_form.asp) created using DOM innerHTML in JavaScript from a JSON object containing the field names and properties. [See code example here](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/register.js#L12-L186)
* **Google Map**: [Adding a Google Map with a Marker to Your Website](https://developers.google.com/maps/documentation/javascript/adding-a-google-map). [See code](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/map.js#L8-L23)
* **HTML5 Audio**: [W3Schools HTML Audio/Video DOM Reference](https://www.w3schools.com/tags/ref_av_dom.asp). [See code](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L8-L180)
* **IFrame**: YouTube video container on about.html page. [W3Schools: HTML <iframe> tag](https://www.w3schools.com/tags/tag_iframe.asp). [See code](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/730d979a4948ede2e7f042befe31556b5b3edcd5/about.html#L48-L52)
* **JavaScript Games**
  - **Antibody**: Ported from [C++ 3rd-year college project](https://github.com/joeaoregan/LIT-Yr3-Project-Antibody) to JavaScript for this project
    * High Scores saved as JSON in local storage: [W3Schools localStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp), [theshravan.net](https://theshravan.net/blog/
    * Includes mobile controller
    * Original game
    * Original soundtrack (Audio tracks mostly created for previous college game projects)
    * Rotating objects: [W3Schools game rotation](https://www.w3schools.com/graphics/game_rotation.asp)
    * Timer (setInterval()): [W3Schools setInterval()](https://www.w3schools.com/jsref/met_win_setinterval.asp)storing-json-objects-in-html5-local-storage/)
  - **Flappy Bird**: Original version here: and added:
    * Changed resolution to match other games
    * Levels of difficulty (increases/decreases game between pipes)
    * Save and display high scores
  - **Space Invaders**: [Original version by ARTsinn here](http://jsfiddle.net/ARTsinn/GgxjY/), and added:
    * Heads-Up Display: Display level, score, alien count, shooting accuracy using [W3Schools canvas rect (border)](https://www.w3schools.com/tags/canvas_rect.asp), 
    * Increased screen and sprite size
    * Mothership and bonus effect and points
    * Save and display high score
    * Shooting accuracy calculated
    * Sound effects (With on/off toggle button)
* **JSON**: Used to store and load highscores, and create form html. [W3Schools: JavaScript JSON](https://www.w3schools.com/js/js_json.asp), [JSON Objects](https://www.w3schools.com/js/js_json_objects.asp). See code: [menu elements](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/menu.js#L12-L54), [form fields](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/register.js#L15-L29), [displaying high-scores on home page](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/high-scores.js#L7-L22), [Antibody saving player details](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/game-antibody/laser.js#L47), [Antibody get player details](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/game-antibody/game.js#L46)
* **jQuery**:  Fade/flash Gallery Image. [W3Schools: jQuery Effects Fading](https://www.w3schools.com/jquery/jquery_fade.asp). [See Code](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/1a85559d67aefc5612d289de779856940b070d3f/scripts/fade-jquery.js#L8-L26)
* **Mailto**: [W3Schools: HTML address Tag](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_link_mailto). [See code](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/contact.html#L68-L91)
* **Markdown**: This readme. [Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* **Menu/Navigation bar**: [W3Schools CSS navigation bar](https://www.w3schools.com/css/css_navbar.asp), created in JavaScript with [DOM innerHTML Property](https://www.w3schools.com/jsref/prop_html_innerhtml.asp). See Code [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/index.html#L38-L42), [JS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/menu.js#L58-L81)
* **Mobile**:
  - Game Controller: Code:  [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/b14101c3ed7215587f47fca7610bfd1610775d36/antibody.html#L70-L113), [CSS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/b14101c3ed7215587f47fca7610bfd1610775d36/css/controller.css#L8-L99), [JS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/b14101c3ed7215587f47fca7610bfd1610775d36/game-antibody/controller.js#L1-L6) - Show controller if device is a mobile device
  - Vibrations: [Check Compatibility](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/b14101c3ed7215587f47fca7610bfd1610775d36/game-antibody/game.js#L36-L43), [Code Example](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/b14101c3ed7215587f47fca7610bfd1610775d36/game-antibody/ship.js#L139)
* **Modal Login Form**: [W3Schools: Login Form](https://www.w3schools.com/html/html5_svg.asp). See code [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/index.html#L86-L118), [CSS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/css/login.css#L9-L111)
* **Music Player** (On game pages). See code: [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/antibody.html#L123-L134), [JS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L8-L180)
  - Controls:
    * [Play](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L37-L67)/[Pause](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L69-L76)
    * Skip [forwards](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L135-L150)/[backwards](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L153-L166) through an [array of Audio files](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/ab02f2f8c641d4e989ecc350cdfc6c546979870a/scripts/music.js#L8-L20)
    * [Fast forward](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L114-L123)/[rewind](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L125-L133) by adding subtracting from the AudioFiles currentTime
    * [Play random track](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/music.js#L168-L180)
  - Show Current Track Information: [Update every second](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/ab02f2f8c641d4e989ecc350cdfc6c546979870a/scripts/music.js#L96-L99) with window.setInterval()
  - Show Track Time and Duration: Use the audio files duration property to output the [track length](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/ab02f2f8c641d4e989ecc350cdfc6c546979870a/scripts/music.js#L105-L112) in minutes and seconds
* **Polaroid image effect**: [Pen By Wanderson](https://codepen.io/Wandersonsc/pen/RMerRy), [W3Schools tutorial](https://www.w3schools.com/css/css3_images.asp), and [Zurb](https://zurb.com/playground/css3-polaroids). See Code [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/index.html#L131-L154), [CSS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/css/style.css#L587-L686)
* **Popups**: [W3schools tutorial](https://www.w3schools.com/howto/howto_js_popup.asp), [W3Schools CSS animation](https://www.w3schools.com/css/css3_animations.asp). See Code [HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/antibody.html#L54-L70), [CSS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/css/popup.css#L9-L130)
  - Displays at [top](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/antibody.html#L119-L136) and [bottom](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/antibody.html#L54-L70) of info icons (Antibody game page)
* **Responsive Design**: [W3Schools responsive web design](https://www.w3schools.com/css/css_rwd_intro.asp). See Code: [CSS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/css/style.css#L347-L427)
* **Social Media Icons**: [W3Schools: How TO - Social Media Buttons](https://www.w3schools.com/howto/howto_css_social_media_buttons.asp). See Code: [CSS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/css/style.css#L465-L487), [HTML/JS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/footer.js#L28-L39)
* **Scalable Vector Graphics (SVG)** - Space Invader Alien: [W3Schools: HTML5 SVG](https://www.w3schools.com/html/html5_svg.asp). See code: [Footer HTML/JS](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/scripts/footer.js#L41-L52), [Modal Login HTML](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/3d1e4809410300685c4cc9fb748b155917eaa6ae/index.html#L90-L95)
* **Web Fonts**: External fonts used in both games and regular html. 
* **YouTube Videos**: Antibody trailer from third-year project. [W3Schools](https://www.w3schools.com/html/html_youtube.asp). [See Code](https://github.com/joeaoregan/NCI-WebDesign-CA/blob/730d979a4948ede2e7f042befe31556b5b3edcd5/about.html#L48-L52)

---

## Links

* [Live Web Page](http://wdtest2019jim.gearhostpreview.com/index.html) using [GearHost Local Git Deploy](https://www.gearhost.com/documentation/git-deploy-your-application)
* [Project Spec](https://github.com/joeaoregan/NCI-WebDesign-CA/wiki/Project-Spec)