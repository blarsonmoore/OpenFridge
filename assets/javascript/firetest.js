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

    const preObject = document.getElementById('object');

    const dbRefObject = firebase.database().ref().child('object')

    dbRefObject.on('value', snap => console.log(snap.val()))

});