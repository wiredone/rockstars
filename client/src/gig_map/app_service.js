var GigMapperApp = function(map, cityGeocoder, apiService) {

  this.city = "";
  this.startDate = "";
  this.endDate = "";
  this.genre = "";
  this.map = map;
  this.cityGeocoder = cityGeocoder;
  this.apiService = apiService;
  // this.location = {};
  // this.userId = "";
  // this.events = [];

  this.setProperties = function(citySelect) {
    if(citySelect) {
      this.setCity(citySelect);
    } else {
    this.setCity();
    };
    this.setGenre();
    this.setStartDate();
    this.setEndDate();
  };

  this.setCity = function(citySelect) {
    if(citySelect) {
      this.city = this.getSelected(citySelect);
    } else {
    this.city = document.getElementById("city-input").value;
    };
  };

  this.setStartDate = function() {
    this.startDate = document.getElementById("start-date").value;
  };

  this.setEndDate = function() {
    this.endDate = document.getElementById("end-date").value;
  };

  this.getSelected = function(select) {
    return select.options[select.selectedIndex].value;
  };

  this.setGenre = function() {
    var genreSelect = document.getElementById("genre-drop");
    this.genre = this.getSelected(genreSelect);
  };

  this.findCityCoords = function(callback) {
    this.cityGeocoder.getCoords(this.city, function(results) {
      if(!Array.isArray(results)) {
        this.map.resetCenter(results);
        callback(results);
      } else {
        this.createCitySelect(results);
        callback();
      };
    }.bind(this));
  };

  this.createCitySelect = function(cities) {
    var citySelect = document.getElementById("city-drop");
    for(var city of cities) {
      var option = document.createElement("option");
      option.value = city;
      option.text = city;
      citySelect.appendChild(option);
    };
  };

  // this.updateCity = function(citySelect) {
  //   this.city = this.getSelected(citySelect);
  //   console.log("got here", this.city);
  // };

};

module.exports = GigMapperApp;