$(document).ready(function() {

	// ticketmaster api request
	$('#city-search').on('click', function(){
		var city = $(this).val().trim();
		var key = "Od7j5mMr30CGAReRYE4XKAfiULRQvEDW";
		var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=1&apikey="+key+"&city="+city;
		$.ajax({
			url: queryURL,
			method: "GET",
			async:true,
	  		dataType: "json",
		})
		.done(function(response){
			console.log(response);
		});

	});


});