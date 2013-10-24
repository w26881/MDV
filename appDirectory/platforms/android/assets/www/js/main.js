/*Kevin Tresemer
	  AVF 1310*/

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
}
/*Device Info*/
$('#getDeviceInfo').on('click', function() {
                       
                       var model = device.model;
                       var platform = device.platform;
                       var version = device.version;
                       
                       
                       $("#deviceOutput")
                       .append("<li align=center>" + "<p>" + "<h1>" + model + "</h1>" + "<h1>" + platform + "</h1>"  + version + "<br/>" + "</p>" + "</li>");
                       });

/*Camera*/
var picture;
var destination;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    var picture=navigator.camera.PictureSourceType;
    var desination=navigator.camera.DestinationType;
}

function photoSuccess(imageData){
    console.log(imageData);
    var pic = document.getElementById('cameraShot');
    pic.style.display = 'block';
    pic.src = 'data:image/jpeg;base64,' + imageData;
}

function takePicture(){
    navigator.camera.getPicture(photoSuccess, photoFail, { quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL });
}


function photoFail(message){
    alert('Photo failed because: ' + message);
}
$('#getCamera').on('click', function(){
                $('#cameraShot').empty();
                
                });


$('#take').on('click', function(){
              takePicture();
              });

/*Compass*/
$('#getCompass').on('click', function() {
    navigator.compass.getCurrentHeading(onSucceed, onFail);
})

function onSucceed(heading) {
    alert('Heading: ' + heading.magneticHeading);
    var heading = "<h1 align=center>" + "Heading:" + heading.magneticHeading + "</h1>";
    $("#compassOutput").append(heading);
}

function onFail(compassError) {
    alert('Compass Error: ' + compassError.code);
}


/*Instagram*/

$('#getInstagram').on('click', function() {
                      var success = function(position){
                      var lat = position.coords.latitude;
                      var lon = position.coords.longitude;
                      
                      var url = "https://api.instagram.com/v1/media/search?lat=" + lat + "&lng=" + lon + "&callback=?&amp;client_id=6204a71b952a4411a5a448039fe4b23d&amp";
                      $.getJSON(url, instaOutput);
                      }
                      var error = function(error){
                      alert(error.message)
                      }
                      navigator.geolocation.getCurrentPosition(success, error);
                      });

                      var instaOutput = function(info) {
                      
                      alert("instaOutput");
                      console.log(info);
                      
                      $.each(info.data, function(index, photo) {
                             var picture = "<li align=center><img src='" + photo.images.standard_resolution.url + "' alt='" + photo.user.full_name + "' /></li>";
                             $("#instagramOutput").append(picture);
                             });
                      };
                    

/*Weather/Geo*/
$('#weather').on('pageinit', function() {
                        
            var success = function(position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            $.ajax({
                    url : "http://api.wunderground.com/api/a345a5ccd8789cad/geolookup/conditions/q/" + lat + "," + lon + ".json",
                    dataType: 'json',
                    success : function(weatherInfo) {
                    console.log(weatherInfo);
                               
                    var weatherImage = weatherInfo.current_observation.image.url;
                    var city = weatherInfo.current_observation.display_location.city;
                    var state = weatherInfo.current_observation.display_location.state;
                    var temp = weatherInfo.current_observation.temp_f;
                               
                               
                    $("#weatherOutput")
                    .append("<li align=center>" + "<p>" + "<img src='" + weatherImage + "'/><br/>" + "<h1>" + city + ", " + state + "</h1>" + "Temperature: " + temp + "°F" + "<br/>" + "</p>" + "</li>");
                               
                    }
                    })
            }
                    var error = function(error){
                    alert(error.message)
                    }
    navigator.geolocation.getCurrentPosition(success, error);
});
