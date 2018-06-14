console.log("TEST")

var foodSearch = [];
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://trackapi.nutritionix.com/v2/search/instant?query=cheese",
    "method": "GET",
    "headers": {
      "x-app-key": "1d07da98cfc1746cbbbf2f301a4ca900",
      "x-app-id": "9beb2ceb",
      "Cache-Control": "no-cache",
      "Postman-Token": "36850c71-13e6-4bd9-97bd-e470293f1f6d"
    }
  }
  $("#foodList").on('keyup', function (event) {
    event.preventDefault();
        console.log($(this).val());
        var food = $(this).val();
        settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://trackapi.nutritionix.com/v2/search/instant?query=${food}`,
            "method": "GET",
            "headers": {
              "x-app-key": "1d07da98cfc1746cbbbf2f301a4ca900",
              "x-app-id": "9beb2ceb",
              "Cache-Control": "no-cache",
              "Postman-Token": "36850c71-13e6-4bd9-97bd-e470293f1f6d"
            }
          }
      $.ajax(settings).done(function (response) {
        console.log(response);
    
        for (var i = 0; i < response.common.length; i++){
            console.log(response.common[i].food_name)
            foodSearch.push(response.common[i].food_name);
    
        }
        console.log(foodSearch)
      });
      
  })

var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
   
      // an array that will be populated with substring matches
      matches = [];
   
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
   
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: str });
        }
      });
   
      cb(matches);
    };
  };
   
  
   
  $('#the-basics .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'foodList',
    displayKey: 'value',
    source: substringMatcher(foodSearch)
  });