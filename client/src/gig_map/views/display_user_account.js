


var UserView = function(user){
  this.user = user;
}

UserView.prototype = {
  render: function(){
    var usernameDisplay = document.getElementById('username');
    var eventsNumberDisplay = document.getElementById('events');

    eventsNumberDisplay.innerText = "I have booked: " + this.user.totalEvents();

    var eventList = document.getElementById('event');

    eventList.innerHTML = ""

    this.populateEventList(eventList, this.user.filteredAccounts('business')) //todo
  },

  createItemForEvent:function(event){
    var eventListItem = document.createElement('li');
    eventListItem.innerText = event.numberOfTickets + " : " + event.price + ":" + event.dateOfPurchase;
    return eventListItem;
  },

  populateEventList:function(listElement, events){
    for(event of events){
      listElement.appendChild(this.createItemForEvent(event));
    }

  }

};
}



module.exports = UserView;
