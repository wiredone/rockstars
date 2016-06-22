var GigMap = function(coords, zoom) {
  
  var styles = [{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"hue":149},{"saturation":-78},{"lightness":0}]},{"featureType":"road.highway","stylers":[{"hue":-31},{"saturation":-40},{"lightness":2.8}]},{"featureType":"poi","elementType":"label","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"hue":163},{"saturation":-26},{"lightness":-1.1}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"hue":3},{"saturation":-24.24},{"lightness":-38.57}]}]

  this.markers = [];
  this.googleMap = new google.maps.Map(document.getElementById("map"), {
    center: coords,
    zoom: zoom
  });
  this.googleMap.setOptions({styles: styles});
  this.resetCenter = function(coords) {
    this.googleMap.setZoom(11);
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