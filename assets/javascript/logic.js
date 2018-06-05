$(document).ready(function () {

    console.log("I'm Working");

    // secondary tag navigation / hides/displays cards based on navigation clicking
    function hideDisplay(tab) {
        $(".work-box-card").hide()
        $(tab).show();
    }
    $(".recipe-tab").on("click", function () { hideDisplay("#recipe-card") });
    // $(".log-in-tab").on("click", function () { hideDisplay("#log-in-card") });
    $(".shopping-list-tab").on("click", function () { hideDisplay("#shopping-list-card") });


});