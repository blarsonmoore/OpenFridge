$(document).ready(function () {

    console.log("I'm Working");

    // secondary tag navigation / hides/displays cards based on navigation clicking
    function hideDisplay(tab) {
        $(".work-box-card").hide()
        $(tab).show();
    }
    $(".recipe-tab").on("click", function () { hideDisplay("#recipe-card") });

    $(".shopping-list-tab").on("click", function () { hideDisplay("#shopping-list-card") });
});

// Creating a variable that holds an array of all of the search items

var itemSearch = [""];

// EDAMAM API ajax call 
function recipeGainer(itemSearch) {

    $("#recipe-display").empty();// empties the div
    var queryURL = "https://api.edamam.com/search?q=" + itemSearch + "&app_id=7b4b7801&app_key=0c479e95104d8a17f3457161abbb98bf&from=0&to=4"

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
                    '<div class="card-img-overlay"><h5>' + (response.hits[i].recipe.label) + '</h5>' +
                    '<a href="' + (response.hits[i].recipe.url) + '" target="_blank" class="recipe-link">' +
                    '<button type="button" class="btn btn-primary btn-lg">See Recipe</button></a>)</div>')


                console.log(response.hits[i].recipe);
            }
        })
}
;
// recipeGainer();

function addNewItem(item, quantity, unit) {
    $("#fridge-table").append('<tr style="text-align: center; overflow-y: auto"><td><div class="checkbox select-ingredient checkbox-success"><input type="checkbox" class="fridge-checkbox" class="styled" value =' + item + '><label></label></div></td><td>'
        + item + '</td><td>'
        + quantity + '</td><td>'
        + unit + '</td><td><button type="button" class="close  remove-item" data-toggle="tooltip" data-placement="right" title="click to delete"><span aria-hidden="true">&times;</span></button> </td></tr>')

}

$("#addFridgeBtn").on("click", function () {
    event.preventDefault();
    console.log("The addFridgeBtn is working")
    var itemSearch = $("#foodList").val();
    var quantitySearch = $("#qtyList").val();
    // empties value
    $("#foodList").val("");
    $("#qtyList").val("");
    // var radios = document.getElementsByName('unit-btn');
    addNewItem(itemSearch, quantitySearch, "NA(6/9)")
    // "NA(6/9)" because unit buttons not working yet

})
$("#recipe-search").on("click", function () {

    event.preventDefault();

    var searchIDs = $("#fridge-table input:checkbox:checked").map(function () {
        return $(this).val();
    }).get(); // <----
    console.log(searchIDs);
    recipeGainer(searchIDs);

})



