var assert = require('chai').assert;
var DateTime = require('../date_time.js');


describe("dateTime", function(){

  beforeEach(function(){
    dt = new DateTime();
  });

  it("should create today's date in format yyyy-mm-dd", function(){
    assert.equal("2016-06-23",dt.dateToday());
  });

  it("should create date 7 days from today's date in format yyyy-mm-dd", function(){
    assert.equal("2016-06-30",dt.dateToday(7));
  });

  it("should format date from yyyy-mm-dd to dd/mm/yyyy", function(){
    assert.equal("28/11/2016",dt.formatDate("2016-11-28"));
  });

  it("should format date from hh:mm:ss to hh:mm", function(){
    assert.equal("19:00",dt.formatTime("19:00:00"));
  });

});