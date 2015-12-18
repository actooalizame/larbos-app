FlowRouter.route('/', {
	name: 'home',
	action(){
		ReactLayout.render(MainLayout, {content: <LoginRoot  />});
	}
});

FlowRouter.route('/mis-contactos', {
	name: 'contactList',
	action(){
		ReactLayout.render(MainLayout, {content: <UserLayout  />});
	}
});

FlowRouter.route('/cliente/:contactId', {
	action(params){
		ReactLayout.render(MainLayout, {content: <SingleContact {...params} />});
	}
});