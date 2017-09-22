//collect data for firebase

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
  var checker = false;
  var name_array = [];
  var count_array = [];

  // Populate the most-view table
  database.ref().orderByChild('count').once("value").then(function(snapshot) {
    snapshot.forEach(function(child) {
      name_array.push(child.val().name);
      count_array.push(child.val().count);
      console.log(child.val().name);
    });

    var ind = 1;
    for (var i = name_array.length-1; i >= name_array.length-5; i--)  {
     $('#view_table').append("<div class='row' style='color:black'>"+ind+". "+name_array[i]+"</div>");
     ind++;
    }
  });

  // When the search button was clicked
  $("#searchBtn").on("click", function(event) {
    event.preventDefault();
    
    search();

    $('#view_table').html("");

    band_name = $("#query").val().trim();

    var query = database.ref().orderByKey();
    query.once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().name == band_name) {
          checker = true;
          childSnapshot.ref.update({
            count: parseInt(childSnapshot.val().count) + 1
          });

        }
      });
      if (checker == false) {
        console.log("stop");
        database.ref().push({
          name: band_name,
          count: 1
        });
      } 
    });
    checker = false;

    database.ref().orderByChild('count').once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        name_array.push(child.val().name);
        count_array.push(child.val().count);
        console.log(child.val().name);
      });

      var ind = 1;
      for (var i = name_array.length-1; i >= name_array.length-5; i--)  {
       $('#view_table').append("<div class='row' style='color:black'>"+ind+". "+name_array[i]+"</div>");
       ind++;
      }
    });

  }); 

function search() {
  //clear results
  $('#results').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();
  // run get request on api
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyA4IxfmVK42CAkBnacp1Hqg-sZwJToDkz8'},
      function(data) {
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
          //log data
          console.log(data);

          $.each(data.items, function(i, item) {
            //get output
            var output = getOutput(item);

          //display results:
          $('#results').append(output);
          });

          var buttons = getButtons(prevPageToken, nextPageToken);
          //display buttons
          $('#buttons').append(buttons);


          }
    );
}

//next page function
function nextPage() {
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query');
    //clear results
  $('#results').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();
  // run get request on api
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyA4IxfmVK42CAkBnacp1Hqg-sZwJToDkz8'},
      function(data) {
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
          //log data
          console.log(data);

          $.each(data.items, function(i, item) {
            //get output
            var output = getOutput(item);

          //display results:
          $('#results').append(output);
          });

          var buttons = getButtons(prevPageToken, nextPageToken);
          //display buttons
          $('#buttons').append(buttons);


          }
    );
}

//previous page function
function prevPage() {
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');
    //clear results
  $('#results').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();
  // run get request on api
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyA4IxfmVK42CAkBnacp1Hqg-sZwJToDkz8'},
      function(data) {
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
          //log data
          console.log(data);

          $.each(data.items, function(i, item) {
            //get output
            var output = getOutput(item);

          //display results:
          $('#results').append(output);
          });

          var buttons = getButtons(prevPageToken, nextPageToken);
          //display buttons
          $('#buttons').append(buttons);


          }
    );
}

//build output funciton
function getOutput(item) {
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  //build output string
  var output = '<li>' +
  '<div class = "list-left">' +
  '<img src="'+thumb+'">' +
  '</div>' +
  '<div class="list-right">' +
  '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'" data-lightbox-title="Youtube">'+title+'</a></h3>' +
  '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
  '<p>'+description+'</p>' +
  '</div>' +
  '</li>' +
  '<div class="clearfix"></div>' +
  '';

  return output;

}

//build buttons
function getButtons(prevPageToken, nextPageToken) {
 if (!prevPageToken) {
  var btnoutput = '<div class="button-container">' +
  '<button style="color:white" id="next-button" class = "btn btn-info paging-button" data-token="'+nextPageToken+'" data-query = "'+q+'"' +
  'onclick="nextPage();">Next Page</button></div>';

 } else {
  var btnoutput = '<div class="button-container">' +
  '<button style="color:white; margin-right: 10px" id="prev-button" class = "btn btn-info paging-button" data-token="'+prevPageToken+'" data-query = "'+q+'"' +
  'onclick="prevPage();">Back Page</button>' +

  '<button style="color:white" id="next-button" class = "btn btn-info paging-button" data-token="'+nextPageToken+'" data-query = "'+q+'"' +
  'onclick="nextPage();">Next Page</button></div>';

 }

 return btnoutput;
}