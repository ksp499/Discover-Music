$(document).ready(function() {

	// ticketmaster api request
	//$('#city-search').on('click', function(){
		var city = $(this).val().trim();
		var key = "Od7j5mMr30CGAReRYE4XKAfiULRQvEDW";
		var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=5&apikey="+key+"&city=Dallas";
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

			for (var i = 0; i < 5; i++) {
				event.name = response._embedded.events[i].name;
				event.location = response._embedded.events[i]._embedded.venues[0].name;
				event.date = response._embedded.events[i].dates.start.localDate+ " " +response._embedded.events[i].dates.start.localTime;
				events_container.push(event);
				console.log(events_container[i]);
			}

		});

//	});


});