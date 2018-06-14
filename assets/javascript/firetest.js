$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyDAEf82oHEFPQXLi-L_ESBi8-F-psmb3_o",
        authDomain: "open-fridge-ee2de.firebaseapp.com",
        databaseURL: "https://open-fridge-ee2de.firebaseio.com",
        projectId: "open-fridge-ee2de",
        storageBucket: "open-fridge-ee2de.appspot.com",
        messagingSenderId: "445861391268"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var initialInput;
    var fridgeContent;
    var item;
    var sku = window.foodItem;


    initialInput = createInput(user);

    function submitData() {
        var data = {
            user: {
                fridgeContent: {
                    item: sku
                }
            }
        }
        console.log(data);
        var ref = database.ref('users')
        ref.push(data)
    }

    var ref = database.ref('users');
    ref.on('value', gotData, errData);

    function gotData(data) {
        // var items = data.val();
        // var keys = Object.keys('users');
        console.log(data);
    }

    function errData(err) {
        console.log('Error!');
        console.log(err);
    }


});