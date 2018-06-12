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

    const createName = $("#newAccName");
    const createEmail = $("#newAccEmail");
    const createPassword = $("#newAccPassword");

    const signInEmail = $("#signInEmail");
    const signInPassword = $("#signInPassword");

    var connectionsRef = database.ref("/connections");
    var connectedRef = database.ref(".info/connected");

    
    var foodArray = [];
    console.log(foodArray);

    var user = firebase.auth().currentUser;
    console.log(user);

    // Check if user is signed in

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            $("#signOutBtn").removeClass("d-none");
            $("#signedIn").addClass("d-none");
            $("#createNewAccount").addClass("d-none");
            // $("#greet-user").empty().text(displayName).addClass("bg-success").removeClass("bg-info");
        }
        else {
            console.log("Not Logged In.");
            $("#signOutBtn").addClass("d-none");
            $("#signedIn").removeClass("d-none");
            $("#createNewAccount").removeClass("d-none");
            $("#greet-user").text("Please Sign In").addClass("bg-info").removeClass("bg-success");;
        }
    });

    // Sign In 

    $("#signInBtn").on("click", function (e) {
        e.preventDefault();
        const email = signInEmail.val().trim();
        const password = signInPassword.val().trim();
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password).then(function (user) {
            const displayName = firebase.auth().currentUser.displayName;
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: displayName
            }).then(function () {
                // Update successful.
            }, function (error) {
                // An error happened.
            });
        });
    });

    // hide sign-in modal on click
    $("#signInBtn").on("click", function () {
        $("#signInModal").modal('hide');
    });

    // Create New Account 

    $("#newAccount").on("click", function () {
        const displayName = createName.val().trim();
        const email = createEmail.val().trim();
        const password = createPassword.val().trim();
        const auth = firebase.auth();
        const promise = firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: displayName
            }).then(function () {
                // Update successful.
            }, function (error) {
                // An error happened.
            });
        });
    });

    // hide create account modal on click
    $("#newAccount").on("click", function () {
        $("#createAccount").modal('hide');
    });


    
    
    $("#addFridgeBtn").on("click", function (e) {
        e.preventDefault();

        var foodItem = $("#foodList").val().trim();

        console.log(foodItem);
      foodArray.push(foodItem);
        
        writeUserData();
    });

    var user = firebase.auth().currentUser;

    function writeUserData(username, email, fridgeContent) {
        const currentUser = firebase.auth().currentUser.uid;
        const displayName = firebase.auth().currentUser.displayName;
        const currentEmail = firebase.auth().currentUser.email;
        console.log(displayName);
        console.log(currentEmail);
        console.log(currentUser);
        const auth = firebase.auth();
        firebase.database().ref('users/' + currentUser).set({
            username: displayName,
            email: currentEmail,
            fridgeContent: foodArray
        });
    }


    $("#signOutBtn").on("click", function () {
        firebase.auth().signOut();
    });


});

