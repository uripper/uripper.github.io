document.addEventListener('DOMContentLoaded', (event) => {
    var button = document.querySelector("button");
    var h1 = document.querySelector("h1");
    var color3 = "rgba(226, 182, 143, 1)";
    var color10 = "rgba(193, 221, 198, 1)";
    var color2 = "rgba(255, 255, 255, 1)";
    var color4 = "rgba(0, 0, 0, 1)";
    var current_website = window.location.href;

    button.addEventListener("mouseover", function( event ) {   
        h1.style.color = color10;
        h1.style.textShadow = "5px 5px 2px rgba(226, 182, 143, 1)";
        h1.style.opacity = "0.7";
    });

    button.addEventListener("mouseout", function( event ) {   
        h1.style.color = color3;
        h1.style.textShadow = "5px 5px 2px rgba(193, 221, 198, 1)";
        h1.style.opacity = "1";
    });
    button.addEventListener("mousedown", function( event ) {
        colors = randomColor();
        
        console.log(colors);
        h1.style.color = colors[0];
        h1.style.textShadow = "5px 5px 2px " + colors[1];
        h1.style.opacity = ".2";
    });
    button.addEventListener("mouseup", function( event ) {
        button.style.opacity = "0";
        h1.style.opacity = "0";
        var fadeToBlack = document.querySelector("#fade-to-black");
        fadeToBlack.style.zIndex = "9999";
        fadeToBlack.style.opacity = "100%";
        setTimeout(function() {
            open(current_website + "/home", "_self");
        }, 1000); // Delay the page navigation by 3 seconds
    });
function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var invert_red = 255 - red;
    var invert_green = 255 - green;
    var invert_blue = 255 - blue;

    color = "rgb(" + red + "," + green + "," + blue + ")";
    invert_color = "rgb(" + invert_red + "," + invert_green + "," + invert_blue + ")";
    return [color, invert_color];
}
});