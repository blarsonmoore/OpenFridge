
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
    console.log("firebase" + firebase);


    var database = firebase.database();

    const createName = $("#newAccName");
    const createEmail = $("#newAccEmail");
    const createPassword = $("#newAccPassword");

    const signInEmail = $("#signInEmail");
    const signInPassword = $("#signInPassword");

    var connectionsRef = database.ref("/connections");
    var connectedRef = database.ref(".info/connected");

    // Check if user is signed in

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {


            $("#signOutBtn").removeClass("d-none");
            $("#signedIn").addClass("d-none");
            $("#createNewAccount").addClass("d-none");
            var user = firebase.auth().currentUser.uid;
            var displayName = firebase.auth().currentUser.displayName;
            greetUser(displayName);
            const preObject = document.getElementById('object');
            const ulList = document.getElementById('list');
            console.log(displayName + "    is logged in");
            const dbRefObject = firebase.database().ref().child('users');
            console.log(dbRefObject);
            const dbRefList = dbRefObject.child(user);
            const dbRefItem = dbRefList.child('item');
            console.log(dbRefItem);
            console.log(dbRefList);



            dbRefList.on('child_added', snap => {
                var key = snap.key;
                console.log(key);
                const button = document.createElement('button');
                button.innerText = snap.val().item;
                button.value = snap.val().item;
                button.className = "btn fridge-btn btn-sm btn-outline-dark";
                // button.id = "newClass";
                button.type = "button";

                ulList.appendChild(button);
            });


            // const liChanged = document.getElementById(snap.key);
            // $("#greet-user").empty().text(displayName).addClass("bg-success").removeClass("bg-info");
        }
        else {
            console.log("Not Logged In.");
            $("#signOutBtn").addClass("d-none");
            $("#signedIn").removeClass("d-none");
            $("#createNewAccount").removeClass("d-none");
            $("#greet-user").text("Please Sign In").addClass("bg-info").removeClass("bg-success");
            goodbyeUser(user)
        }
    });

    function greetUser(displayName) {
        $("#fridge-img").attr("src", "./assets/images/fridge-open.jpg");
        $("#greet-user").text(displayName + " !!");
        $("#welcome-card").removeClass("bg-info").addClass("bg-success");
        $("#foodTrash").show();
    }
    function goodbyeUser(user) {
        $("#fridge-img").attr("src", "./assets/images/fridge-closed.jpg");
        $("#welcome-card").removeClass("bg-success").addClass("bg-info");
        $("#foodTrash").hide();
    }
    // $(document).on("click", "#newClass", function (e){
    //     console.log(e.target)
    //     var value = $("#newClass").val();
    //     console.log(value);
    // var element = $("#newClass");
    // element.removeClass("buttonClass");
    // element.addClass("itemSelected");

    // });

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
                $("#signInModal").modal('hide');
                location.reload();
                // Update successful.
            }, function (error) {
                location.reload();
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
                $("#createAccount").modal('hide');
                location.reload();
            }, function (error) {
                console.log("ERROR" + error.message)
                // An error happened.
                alert("DIDNT WORK")
            });
            // setTimeout(writeUserData, 1000)
        });

    });

    // hide create account modal on click
    $("#newAccount").on("click", function () {
        $("#createAccount").modal('hide');
    });


    $("#addFridgeBtn").on("click", function (e) {
        e.preventDefault();
        if ($("#foodList").val() === "") {
            console.log("Blank");
        } else {
            window.foodItem = $("#foodList").val().trim();
            console.log(window.foodItem);
            updateUserData();
            $("#foodList").val("");
        }
    });


    var user = firebase.auth().currentUser;

    function writeUserData(username, email) {
        const currentUser = firebase.auth().currentUser.uid;
        console.log(currentUser);
        const displayName = firebase.auth().currentUser.displayName;
        const currentEmail = firebase.auth().currentUser.email;
        console.log(displayName);
        console.log(currentEmail);
        console.log(currentUser);
        const auth = firebase.auth();
        firebase.database().ref('users/' + currentUser).set({
            username: displayName,
            email: currentEmail,

        });
    }



    function updateUserData(fridgeContent) {
        const currentUser = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + currentUser).push({
            item: window.foodItem
        });
        console.log(foodItem);
    }



    $("#signOutBtn").on("click", function () {
        firebase.auth().signOut();
        location.reload();
    });

});
