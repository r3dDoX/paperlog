Profiles = new Meteor.Collection("profiles");

if (Meteor.isClient) {
  Template.profile.selectedProfile = function () {
		var selectedProfile = Profiles.findOne({/* TODO select profile with param */});

		if(selectedProfile) {
			Session.set('selectedProfile', selectedProfile._id);
		}
		
		return selectedProfile;
  };
	
	Template.profile.events({
		'click span': function(event) {
			toggleInput(event.target);
		},
		
		'submit form': function(event) {
			event.target.getElementsByTagName('input')[0].blur();
			return false;
		}
	});
	
	function toggleInput(spanElement) {
		var value = spanElement.innerHTML,
				name = spanElement.getAttribute('data-name'),
				parentNode = spanElement.parentNode,
				inputElement = undefined,
				spanElementDisplay = spanElement.style.display;
		
		spanElement.style.display = 'none';
		parentNode.insertAdjacentHTML('beforeend', Template.input({name: name, value: value}));
		inputElement = parentNode.getElementsByTagName('input')[0];
		inputElement.focus();
		
		inputElement.addEventListener('blur', function(event) {
			if(inputElement.value) {
				var updateObject = {};
				updateObject[name] = inputElement.value;

				Profiles.update({_id: Session.get('selectedProfile')}, updateObject);
			}
			
			parentNode.removeChild(inputElement);
			spanElement.style.display = spanElementDisplay;
		});
	}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}