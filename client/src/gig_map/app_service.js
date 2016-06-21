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
  };

  this.updateCity = function(citySelect) {
    document.getElementById("city-input").value = this.getSelected(citySelect);
  };

  this.dateToday = function(numDays) {

  var today = new Date();
  if(numDays) {
    var dd = today.getDate() + numDays;
  } else {
    var dd = today.getDate()
  };
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd = "0" + dd
  } 
  if(mm<10) {
      mm = "0" + mm
  }

  today = yyyy + "-" + mm + "-" + dd;
  _.toString(today);
  return today
  };

  this.formatDate = function(date) {
    var splitDate = _.split(date, "-");
    var newDate = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
    return newDate;
  };

  this.formatTime = function(time) {
    var splitTime = _.split(time, ":");
    var newTime = splitTime[0] + ":" + splitTime[1];
    return newTime;
  };

};

module.exports = GigMapperApp;