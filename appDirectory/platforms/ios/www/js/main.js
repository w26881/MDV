/*Kevin Tresemer
	  AVF 1310*/

document.addEventListener("deviceready", deviceReady, false);

function deviceReady(){

}
	  
$('#getInstagram').on('click', function() {
  var url = "https://api.instagram.com/v1/media/popular?callback=?&amp;client_id=6204a71b952a4411a5a448039fe4b23d&amp";
  $.getJSON(url, instaOutput);
});

var instaOutput = function(info) {
    
    alert("instaOutput");
    console.log(info);
    
    $.each(info.data, function(index, photo) {
           var picture = "<li align=center><img src='" + photo.images.standard_resolution.url + "' alt='" + photo.user.full_name + "' /></li>";
           $("#instagramOutput").append(picture);
           });
};


$('#getWeather').on('click', function() {
    $.ajax({
           url : "http://api.wunderground.com/api/a345a5ccd8789cad/conditions/q/OR/Medford.json",
           dataType : "jsonp",
           success : function(weatherInfo) {
           console.log(weatherInfo);
           
           var weatherImage = weatherInfo.current_observation.image.url;
           var city = weatherInfo.current_observation.display_location.city;
           var state = weatherInfo.current_observation.display_location.state;
           var temp = weatherInfo.current_observation.temp_f;

           
           $("#weatherOutput")
           .append("<li align=center>" + "<p>" + "<img src='" + weatherImage + "'/><br/>" + "<h1>" + city + ", " + state + "</h1>" + "Temperature: " + temp + "°F" + "<br/>" + "</p>" + "</li>");
           
           }
           });
    
                    })