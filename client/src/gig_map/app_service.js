var GigMapperApp = function(map, cityGeocoder, apiService) {

  this.city = "";
  this.startDate = new Date();
  this.endDate = new Date();
  this.genre = "";
  this.map = map;
  this.cityGeocoder = cityGeocoder;
  this.apiService = apiService;
  // this.location = {};
  // this.userId = "";
  // this.events = [];

  this.setProperties = function() {
    this.setCity();
    this.setGenre();
    this.setStartDate();
    this.setEndDate();
  };

  this.setCity = function() {
    this.city = document.getElementbyId("city-input").value;
  };

  this.setStartDate = function() {
    this.StartDate = document.getElementById("start-date").value;
  };

  this.setEndDate = function() {
    this.EndDate = document.getElementById("end-date").value;
  };

  this.getSelected = function(select) {
    return select.options[select.selectedIndex].value;
  };

  this.setGenre = function() {
    var genreSelect = document.getElementById("genre-drop");
    this.genre = getSelected(genreSelect);
  };

  this.findCityCoords = function() {
    this.cityGeocoder.getCoords(this.city, function(results) {
      if(result["lat"]) {
        this.map.resetCenter(results);
        return results
      } else {
        createCitySelect(results);
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

  this.updateCity = function(citySelect) {
    this.city = getSelected(citySelect);
  };

};

module.exports = GigMapperApp;