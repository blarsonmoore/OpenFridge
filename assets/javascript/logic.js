$(document).ready(function () {

    // Creating a variable that holds an array of all of the search items


    var itemSearch = [""];

    // EDAMAM API ajax call 
    function recipeGainer(itemSearch) {
        console.log("itemsearch is : " + itemSearch)

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
                console.log(itemSearch + "ITEMSEARCH")
                if (response.hits.length <= 0) {
                    $("#badIngredients").modal('show');
                } else {
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

                    };
                }

            })
    };

    function removeItem() {
        // on click function that removes row when x is clicked inside the fridge items table
    }

    var itemArray = [];

    // $(document).on('click', '.buttonClass, .buttonSelected', function (e) {
    //     $(this).toggleClass('buttonClass buttonSelected');
    //     var value = $(this).val();
    //     console.log(value);
    //     itemArray.push(value);
    //     console.log(itemArray);
    // });


    // Newly added Javascript for fridge content buttons
    $(document).on('click', '.btn-outline-dark', function () {
        $(this).removeClass('btn-outline-dark').addClass('btn-warning');
        var value = $(this).val();
        console.log(value);
        itemArray.push(value);
        console.log(itemArray);
    });

    $(document).on('click', '.btn-warning', function () {
        $(this).removeClass('btn-warning').addClass('btn-outline-dark');
        var rmValue = $(this).val();
        console.log(rmValue);
        var idx = itemArray.indexOf(rmValue);
        console.log(idx);
        console.log(itemArray);
        if (idx != -1) itemArray.splice(idx, 1);
        console.log(itemArray);
    });

    $("#recipe-search").on("click", function (e) {
        e.preventDefault();
        recipeGainer(itemArray);
    });
});



