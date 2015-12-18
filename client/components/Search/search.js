Template.searchBox.helpers({
  contactsIndex: () => ContactsIndex,

  inputAttributes: function(){
  	let attr = {
  		placeholder: 'Buscar contacto',
  		class: 'form-control'
  	}
  	return attr;
  }	
});
