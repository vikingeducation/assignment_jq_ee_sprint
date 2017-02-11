$(document).ready(function() {
    $("ul").on("click", "li", function whichClicked(event) {
        console.log(event.target, "was clicked");
    })
});