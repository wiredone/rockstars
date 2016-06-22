
//just incase gigmapper.rocks/user/:id

var User = function(userId) {
  this.userid = userId
  this.url = "http://localhost:3000/user/" + this.userid
//  console.log(this.url); //THIS IS A CONSOLE LOG
  this.getUser = function() {
    var request = new XMLHttpRequest();
    console.log(request);
    request.open("GET", this.url);
    request.onload = function() {
      console.log("here!");
      if (request.status === 200) {
        var user = request.responseText;
        console.log("are we getting here?" + user);
        localStorage.setItem("user", user);
        };
      }
    request.send(null);
  };
}

module.exports = User;
