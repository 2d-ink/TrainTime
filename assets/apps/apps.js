

var config = {
    apiKey: "AIzaSyBYi6c5AIAIUx7b4hCEFDSsDOW9sV4Biqo",
    authDomain: "home-work-21435.firebaseapp.com",
    databaseURL: "https://home-work-21435.firebaseio.com",
    projectId: "home-work-21435",
    storageBucket: "home-work-21435.appspot.com",
    messagingSenderId: "853626502050"
};
firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();


// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text boxes
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,


    });
    // clears input forms
    $("name-input").val("");
    $("destination-input").val("");
    $("time-input").val("");
    $("frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {

    
    // Log everything that's coming out of snapshot
    console.log("Name from database: " + childSnapshot.val().name);
    console.log("Role from database: " + childSnapshot.val().destination);
    console.log("date from database: " + childSnapshot.val().time);
    console.log("rate from database: " + childSnapshot.val().frequency);
    console.log("---------------------------");
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;
    frequency= parseInt(frequency)
    time = parseInt(time)

    var diffTime = moment().diff(moment.unix(time), "minutes");
    var timeRemainder = moment().diff(moment.unix(time), "minutes") % frequency;
    var minutes = frequency - timeRemainder; 

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
   
    
    $(".table").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + time + "</td><td>" + frequency + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
 
});
