Profiles = new Meteor.Collection("profiles");

if (Meteor.isClient) {

	Template.profiles.availableProfiles = function() {
		return Profiles.find({}).fetch();
	}

	Handlebars.registerHelper("isSelectedProfile", function(actualId) {
		return Session.get('selectedProfile') === actualId;
	});

	Template.profiles.events({
		'click a': function(event) {
			var character = Profiles.findOne({characterName: event.target.innerHTML});
			
			if(character) {
				Session.set('selectedProfile', character._id);
			}
		}
	});

	Template.createProfile.events({
		'click button': function(event) {
			var inputElement = event.target.parentNode.parentNode.getElementsByTagName('input')[0],
				characterName = inputElement.value;

			inputElement.value = "";
			inputElement.blur();
			
			if(characterName) {
				Session.set('selectedProfile', 
					Profiles.insert({characterName: characterName})
				);
			}
		}
	});

  Template.profile.selectedProfile = function () {
		var selectedProfile = Profiles.findOne({_id: Session.get('selectedProfile')});
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