
Contacts = new Mongo.Collection('contacts');
ContactsIndex = new EasySearch.Index({
  collection: Contacts,
  fields: ['name'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions: {
    limit: 1
  },
});

Reminders = new Mongo.Collection('reminders');

Orders = new Mongo.Collection('orders');

Products = new Mongo.Collection('products');

/*
Meteor.startup(function () {
  if (Contacts.find({}).count() === 0) {
    var data = JSON.parse(Assets.getText('insert-contacts2.json'));
   
      data.forEach(function (item, index, array) {
            Contacts.insert(item);
        });
  }
});
*/