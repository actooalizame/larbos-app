Meteor.publish('initialContacts', function() {
	var user = Meteor.users.findOne({_id:this.userId}),
			userId = user._id;
	return Contacts.find({status:'initial',assignedTo:userId});
});

Meteor.publish('unAnswered', function() {
	var user = Meteor.users.findOne({_id:this.userId}),
			userId = user._id;
	return Contacts.find({status:'unAnswered',assignedTo:userId});
});

Meteor.publish('hasReminder', function() {
	var user = Meteor.users.findOne({_id:this.userId}),
			userId = user._id;
	return Contacts.find({status:'hasReminder',assignedTo:userId});
});


Meteor.publish('hasOrders', function() {
	var user = Meteor.users.findOne({_id:this.userId}),
			userId = user._id;
	return Contacts.find({ordered:true,assignedTo:userId});
});

Meteor.publish('singleContact', function(contactId){
	var user = Meteor.users.findOne({_id:this.userId}),
			userId = user._id;
	return  Contacts.find({_id:contactId,assignedTo:userId});
});

Meteor.publish('contactReminders', function(contactId){
	return Reminders.find({contactId:contactId},{sort:{changed:-1},limit:1});
});

Meteor.publish('contactUnfinishedOrders', function(contactId){
	return Orders.find({contactId:contactId,state:'unfinished'});
});

Meteor.publish('orderProducts', function(orderId){
	return Products.find({orderId:orderId});
});

Meteor.publish('userOrders', function(contactId){
	var user = Meteor.users.findOne({_id:this.userId}),
			userId = user._id;
	return Orders.find({userId:userId});
});

Meteor.publish('userOrdersDate', function(contactId,date){
	var user = Meteor.users.findOne({_id:this.userId}),
			userId = user._id;
	return Orders.find({userId:userId,day:date});
});

Meteor.publish('contactOrders', function(contactId){
	return Orders.find({contactId:contactId});
});

Meteor.publish('contactFinishedOrders', function(contactId){
	return Orders.find({contactId:contactId,state:'finished'});
});

Meteor.publish('contactUnconfirmedOrders', function(contactId){
	return Orders.find({contactId:contactId,status:'Pendiente'});
});