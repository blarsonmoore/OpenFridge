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

    console.log(connectedRef);
    console.log(connectionsRef);

    // Sign In 

    $("#signInBtn").on("click", function (e) {
        e.preventDefault();
        const email = signInEmail.val().trim();
        const password = signInPassword.val().trim();
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, password);

        $("#signInModal").modal('hide');


        console.log(email);

    });

    // New Account 

    $("#newAccount").on("click", function () {
        const displayName = createName.val().trim();
        const email = createEmail.val().trim();
        const password = createPassword.val().trim();

        const auth = firebase.auth();

        console.log(displayName);
        console.log(email);
        console.log(password);

        const promise = firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            // [END createwithemail]
            // callSomeFunction(); Optional
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: displayName
            }).then(function () {
                // Update successful.
            }, function (error) {
                // An error happened.
            });
        });


        $("#signOutBtn").on("click", function () {
            firebase.auth().signOut();
        });

        //Realtime listener

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(firebaseUser);
                $("#signOutBtn").removeClass("d-none");
                $("#signedIn").addClass("d-none");
                $("#createNewAccount").addClass("d-none");
                $("#helloUser").text("Hello  " + displayName);
            }
            else {
                console.log("Not Logged In.");
                $("#signOutBtn").addClass("d-none");
                $("#signedIn").removeClass("d-none");
                $("#createNewAccount").removeClass("d-none");
            }

        });
    });
    $("#newAccount").on("click", function () {
        $("#createAccount").modal('hide');
    });
});


