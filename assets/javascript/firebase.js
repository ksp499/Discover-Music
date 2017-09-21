  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDt_5o4o1HeWser5mmMbkrf8cetnXSZb7M",
    authDomain: "project-1-d9512.firebaseapp.com",
    databaseURL: "https://project-1-d9512.firebaseio.com",
    projectId: "project-1-d9512",
    storageBucket: "project-1-d9512.appspot.com",
    messagingSenderId: "287742535872"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  // Initial Values
  var band_name = "";
  var count = 0;

  $("#searchBtn").on("click", function(event) {
    event.preventDefault();

    console.log("what");

    band_name = $("#query").val().trim();

    database.ref().push({
      name: band_name
    });

  }); 