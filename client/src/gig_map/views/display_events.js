var DisplayEvents = function(app) {
  this.app = app;

  this.render = function(venues) {
    var div = document.getElementById("scroll");

    for(var venue of venues) {
      console.log(venues);
      var venueName = venue.name;
      for(var gig of venue.events) {
        var ul = document.createElement("ul");
        div.appendChild(ul);
        ul.appendChild(this.createLi("Artist: ", gig.artist));
        ul.appendChild(this.createLi("Date: ", this.app.formatDate(gig.startDate)));
        ul.appendChild(this.createLi("Time: ", this.app.formatTime(gig.startTime)));
        ul.appendChild(this.createLi("Venue: ", venueName));
      };
    };
  };

  this.createLi = function (header, content) {
    var li = document.createElement("li");
    li.innerText = header + content;
    return li;
  };

};

module.exports = DisplayEvents;