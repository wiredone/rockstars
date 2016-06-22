var GigMapperApp = function(map, cityGeocoder, apiService) {

  this.city = "";
  this.startDate = "";
  this.endDate = "";
  this.genre = "";
  this.map = map;
  this.cityGeocoder = cityGeocoder;
  this.apiService = apiService;

  this.setProperties = function(citySelect) {
    this.setCity();
    this.setGenre();
    this.setStartDate();
    this.setEndDate();
  };

  this.setCity = function(citySelect) {
    this.city = document.getElementById("city-input").value;
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

  this.findCity = function(event, callback) {
    this.cityGeocoder.getCity(event, this.city, function(results) {
      if(!Array.isArray(results)) {
        this.map.resetCenter(results);
        callback(results);
      } else {
        this.createCitySelect(results);
        callback();
      }
    }.bind(this));
  };

  this.createCitySelect = function(cities) {
    var citySelect = document.getElementById("city-drop");
    while(citySelect.firstChild) {
      citySelect.removeChild(citySelect.firstChild);
    };
    for(var city of cities) {
      var option = document.createElement("option");
      option.value = city;
      option.text = city;
      citySelect.appendChild(option);
    };
    var citySelectDiv = document.getElementById("drop");
    citySelectDiv.style.visibility = "visible";
  };

  this.updateCity = function(citySelect) {
    document.getElementById("city-input").value = this.getSelected(citySelect);
  };
  
};

module.exports = GigMapperApp;