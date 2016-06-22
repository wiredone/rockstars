
//just incase gigmapper.rocks/user/:id

var User = function(userId) {
  this.userid = userId;
  this.url = "http://localhost:3000/user/" + this.userid;
  this.getUser = function(callback) {
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function() {
      if (request.status === 200) {
        var user = request.responseText;
        localStorage.setItem("user", user);
        callback();
        };
      }
    request.send(null);
  };
}

module.exports = User;
