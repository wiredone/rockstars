/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// var User = require('./user/user.js');
	// var url = 'http://localhost:3000/user';
	//
	// var displayUser = function(user){
	//
	// }
	
	var User = __webpack_require__(1);
	var OrderService = __webpack_require__(2);
	
	
	var main = function() {
	
	  var coords = {lat: 40.7053111, lng: -74.258188};
	  
	
	  var handleClick = function(event) {
	    if(event.srcElement.id === "search-btn") {
	      app.setProperties();
	    } else {
	      app.setProperties(event.srcElement);
	    };
	    app.findCityCoords(function(coords) {
	      if(coords) {
	        apiService.setLatLng(coords);
	        apiService.setDates(app.startDate, app.endDate);
	        apiService.setGenre(app.genre);
	        apiService.getEvents(function(venues) {
	          for(var venue of venues) {
	            map.addInfoWindow(venue.latLng, "1", "Lovely Shows");
	          };
	        });
	      };
	    });
	
	  };
	
	  document.getElementById("form").addEventListener("submit", function(event) {
	      event.preventDefault();
	      handleClick();
	  });
	
	  document.getElementById("search-btn").addEventListener("click", handleClick);
	
	  document.getElementById("city-drop").addEventListener("change", function(event) {
	      // app.setCity(event.srcElement);
	      handleClick(event);
	
	    });
	};
	
	
	window.onload = main;


/***/ },
/* 1 */
/***/ function(module, exports) {

	var User = function(params){
	  this.username = params.username;
	  this.password = params.password;
	}
	
	
	
	
	
	
	
	module.exports = User;


/***/ },
/* 2 */
/***/ function(module, exports) {



/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map