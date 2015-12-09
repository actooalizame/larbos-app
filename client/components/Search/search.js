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

Template.searchBox.events({
  'change input': function () {
  	var inputLength = jQuery('input[type="text"]').val().length,
  			searchResults = jQuery('.searchResults');
  	function open(){
  		searchResults.removeClass('hidden');
  		if(inputLength===0){
	    	searchResults.addClass('hidden');
    	} 
  	}
 
  	setTimeout(open, 160)
  	
  }
});