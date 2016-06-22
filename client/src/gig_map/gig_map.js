var GigMap = function(coords, zoom) {
  this.markers = [];
  this.googleMap = new google.maps.Map(document.getElementById("map"), {
    center: coords,
    zoom: zoom
  });
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