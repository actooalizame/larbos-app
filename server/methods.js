Meteor.methods({
  'setOnCall': function(contactId){
    Contacts.update(
      { _id: contactId},
      {$set: {status:'onCall'}}
    );
  },
  'setHasReminder': function(contactId){
    Contacts.update(
      { _id: contactId},
      {$set: {
        status:'hasReminder',
        changed: new Date()
        }
      }
    );
  },
  'SetUnAnswered': function(contactId){
    Contacts.update(
      { _id: contactId},
      {$set: {status:'unAnswered'}}
    );
  },

  'setOrdered': function(contactId){
    Contacts.update(
      { _id: contactId },
      {$set: {
        ordered: true,
        changed: new Date()
      }}
    );
  },

  'insertReminder': function(data){
    Reminders.insert({
      contactId: data.contactId,
      hour: data.hours,
      minutes: data.minutes,
      changed: new Date()
    });
  },

  'createOrder': function(data){
    Orders.insert({
      contactId: data.contactId,
      contactName: data.contactName,
      day: data.day,
      state: 'unfinished',
      createdAt: new Date()
    });
  },

  'addProduct': function(data){
    Products.insert({
      orderId: data.orderId,
      productName: data.productName
    });
  },

  'finishOrder': function(orderId){
    Orders.update(
      { _id: orderId },
      {$set: {
        userId: Meteor.userId(),
        state:'finished',
        status:'Pendiente'
      }}
    );
  },

  'confirmOrder': function(orderId){
    Orders.update(
      { _id: orderId },
      {$set: {
        status:'Confirmado'
      }}
    );
  },

  'cancelOrder': function(orderId){
    Orders.update(
      { _id: orderId },
      {$set: {
        status:'Anulado'
      }}
    );
  },

});
