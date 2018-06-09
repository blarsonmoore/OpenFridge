$(document).ready(function () {

    console.log("I'm Working");

    // secondary tag navigation / hides/displays cards based on navigation clicking
    function hideDisplay(tab) {
        $(".work-box-card").hide()
        $(tab).show();
    }
    $(".recipe-tab").on("click", function () { hideDisplay("#recipe-card") });

    $(".shopping-list-tab").on("click", function () { hideDisplay("#shopping-list-card") });

    // Creating a variable that holds an array of all of the search items

    var itemSearch = [""];

    // EDAMAM API ajax call 
    function recipeGainer(itemSearch) {

        var queryURL = "https://api.edamam.com/search?q=" + itemSearch + "&app_id=7b4b7801&app_key=0c479e95104d8a17f3457161abbb98bf&from=0&to=1"

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: 'json'
        })
            .then(function (response) {
                console.log(queryURL);


                console.log(response);
            })
    };
    recipeGainer();

    $("#addFridgeBtn").on("click", function () {
        event.preventDefault();
        console.log("The addFridgeBtn is working")
        itemSearch = $("#foodList").val();
        console.log(itemSearch);
        recipeGainer(itemSearch);
    })


});