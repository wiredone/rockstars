var GigMap = function(coords, zoom) {
  
  // var styles = [{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"hue":149},{"saturation":-78},{"lightness":0}]},{"featureType":"road.highway","stylers":[{"hue":-31},{"saturation":-40},{"lightness":2.8}]},{"featureType":"poi","elementType":"label","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"hue":163},{"saturation":-26},{"lightness":-1.1}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"hue":3},{"saturation":-24.24},{"lightness":-38.57}]}]

  var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},{"featureType":"landscape","elementType":"all","stylers":[{"lightness":20},{"color":"#efe9e4"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#19a0d8"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]}]






  this.markers = [];
  this.googleMap = new google.maps.Map(document.getElementById("map"), {
    center: coords,
    zoom: zoom
  });
  this.googleMap.setOptions({styles: styles});
  // this.convertCoords = function(coords) {
  //   var googleCoords = { lat: coords["latitude"], lng: coord["longitude"] };
  //   return googleCoord;
  // };   // not sure if required?
  this.resetCenter = function(coords) {
    this.googleMap.setCenter(coords);
  };
  this.addMarker = function(coords, title) {
    var title = title.toString();
    var icon = {
      url: "./images/venue-icon.png",
      scaledSize: new google.maps.Size(50, 50),
    };
    var marker = new google.maps.Marker( {
      position: coords,
      map: this.googleMap,
      title: title,
      icon: icon,
    });
    this.markers.push(marker);
    return marker;
  };
  this.removeMarkers = function() {
    for (var i = 0; i < this.markers.length; i++ ) {
      this.markers[i].setMap(null);
    }
    this.markers.length = 0;
  };
  this.addInfoWindow = function(coords, title, content) {
    var marker = this.addMarker(coords, title);
    var infowindow = new google.maps.InfoWindow( {
      content: content
    });
    marker.addListener("click", function() {
      infowindow.open(this.map, this);
    });
  };
  this.bindClick = function(callback) {
    google.maps.event.addListener(this.googleMap, "click", function(event) {
      callback({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }.bind(this));
  };
};

module.exports = GigMap;