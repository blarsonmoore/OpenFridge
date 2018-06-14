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

        $("#recipe-display").empty();// empties the div
        var queryURL = "https://api.edamam.com/search?q=" + itemSearch + "&app_id=7b4b7801&app_key=0c479e95104d8a17f3457161abbb98bf&from=0&to=6"
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: 'json'
        })
            .then(function (response) {
                console.log(queryURL);
                console.log("response message" + response)
                if (response.hits.length <= 0) {
                    $("#noResults").modal('show');
                }
                for (i = 0; i < response.hits.length; i++) {


                    $.ajax({
                        url: queryURL,
                        method: "GET",
                        dataType: 'json'
                    })
                        .then(function (response) {
                            console.log(queryURL);
                            for (i = 0; i < response.hits.length; i++) {



                                $("#recipe-display").append(

                                    '<div class="card  mb-3 displayed-recipes">' +
                                    '<img class="card-img" src=' + (response.hits[i].recipe.image) + '>' +
                                    '<div class="card-img-overlay">' +
                                    '<div class="card-header text-center recipe-header"><h5>' +
                                    (response.hits[i].recipe.label) + '</h5>' +
                                    '<a href="' + (response.hits[i].recipe.url) + '" target="_blank" class="recipe-link">' +

                                    '</div>' +


                                    '<button type="button" class="btn btn-success btn-sm recipe-btn">See Recipe</button></a>' +

                                    '</div>'
                                )
                                console.log(response.hits[i].recipe);
                            }
                        })
                }
                ;



                console.log(response.hits[i].recipe);
            }

            )
    }

    ;



    function addNewItem(item, quantity, unit) {
        $("#fridge-table").append('<tr style="text-align: center; overflow-y: auto"><td><div class="checkbox select-ingredient checkbox-success"><input type="checkbox" class="fridge-checkbox" class="styled" value =' + item + '><label></label></div></td><td>'
            + item + '</td><td>'
            + quantity + '</td><td>'
            + unit + '</td><td><button type="button" class="close  remove-item" data-toggle="tooltip" data-placement="right" title="click to delete"><span aria-hidden="true">&times;</span></button> </td></tr>')

    }
    function removeItem() {
        // on click function that removes row when x is clicked inside the fridge items table
    }






    $("#recipe-search").on("click", function (e) {

        e.preventDefault();

        var searchIDs = $("#fridge-table input:checkbox:checked").map(function () {
            return $(this).val();
        }).get(); // <----
        console.log(searchIDs);
        recipeGainer(searchIDs);

    });
});



