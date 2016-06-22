var DateTime = function() {
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
    console.log("date in", date);
    var splitDate = _.split(date, "-");
    var newDate = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
    console.log("date out", newDate);
    return newDate;
  };

  this.formatTime = function(time) {
    var splitTime = _.split(time, ":");
    var newTime = splitTime[0] + ":" + splitTime[1];
    return newTime;
  };
};

module.exports = DateTime;