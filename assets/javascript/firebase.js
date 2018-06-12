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

    const fridgeContent = ("wine");
    var foodArray = [];

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

        const promise = auth.signInWithEmailAndPassword(email, password).then(function (userData) {
            var userData = firebase.auth().currentUser;
        })
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
        const fridgeContent = $("#foodList");

        const promise = firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: displayName
            }).then(function () {
                // Update successful.
            }, function (error) {
                // An error happened.
            });
            writeUserData(displayName, displayName, email, fridgeContent);
        });
    });

    // hide create account modal on click
    $("#newAccount").on("click", function () {
        $("#createAccount").modal('hide');
    });


    // Add food elements to firebase

    // function updateUserData(fridgeContent) {
    //     const items = $("#foodList").val().trim();
    //     firebase.database().ref('users/' + user).set({
    //         fridgeContent: items
    //     });
    // }

    var items = ("wine")

    function updateUserData(user, fridgeContent) {
        firebase.database().ref().child('users/' + user).update({
            fridgeContent: items
        });
    }

    // Get a database reference to our blog
    $("#addFridgeBtn").on("click", function () {
        updateUserData();
    });

    var user = firebase.auth().currentUser;

    function writeUserData(user, createName, createEmail, fridgeContent) {
        firebase.database().ref('users/' + user).set({
            username: createName,
            email: createEmail,
            fridgeContent: fridgeContent
        });
    }

    $("#signOutBtn").on("click", function () {
        firebase.auth().signOut();
    });


});

