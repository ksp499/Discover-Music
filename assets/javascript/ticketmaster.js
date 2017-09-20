$(document).ready(function() {




	// ticketmaster api request
	$('#city-search').on('click', function(event){
		event.preventDefault();
		var city = $('#city-name').val().trim();
		$('#city-name').val('');
		var key = "Od7j5mMr30CGAReRYE4XKAfiULRQvEDW";
		var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=10&apikey="+key+"&city="+city;
		var events_container = [];
		var event = {
			name: "",
			location: "",
			date: ""
		};

		$.ajax({
			url: queryURL,
			method: "GET",
			async:true,
	  		dataType: "json",
		})
		.done(function(response){
			console.log(response);

			for (var i = 0; i < 10; i++) {
				event.name = response._embedded.events[i].name;
				event.location = response._embedded.events[i]._embedded.venues[0].name;
				event.date = response._embedded.events[i].dates.start.localDate+ " " +response._embedded.events[i].dates.start.localTime;
				events_container.push(event);
				console.log(events_container[i]);
				$('#employee-table').append("<div class='row' style='border-bottom: 1px solid #ccc; padding-bottom: 5px; font-weight: bold; color: black'><div class='col-xs-5'>"+event.name+"</div><div class='col-xs-5'>"+event.location+"</div><div class='col-xs-2'>"+event.date+"</div></div>");
			}

		});

	});



/*
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

  $("#search-band").on("click", function(event) {
  	event.preventDefault();

  	band_name = $("#name-input").val().trim();

  	database.ref().push()
  }); 
*/

});