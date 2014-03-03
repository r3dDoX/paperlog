Profiles = new Meteor.Collection("profiles");

if (Meteor.isClient) {

    Template.navbar.menuElements = function () {
        return [
            {text: 'Profiles', pageId: 'pageProfiles'},
            {text: 'Master', pageId: 'pageMaster'}
        ];
    };

    Template.navbar.events({
        'click a': function (event) {
            var selectedMenuElement = event.target.getAttribute('data-pageId'),
                page = $('#' + selectedMenuElement),
                fadeOut = (page.hasClass('right') ? 'left' : 'right'),
                activePage = $('.page.center');

            if (page.get(0) !== activePage.get(0)) {
                Session.set('selectedMenuElement', selectedMenuElement);

                activePage.removeClass('center').addClass(fadeOut);
                page.removeClass('left right').addClass('center');
            }
        }
    });

    Handlebars.registerHelper("isSelectedMenuElement", function(actualId) {
		return Session.get('selectedMenuElement') === actualId;
	});

	Template.profiles.availableProfiles = function() {
		return Profiles.find({}).fetch();
	};

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
			
			if(characterName) {
				Session.set('selectedProfile', 
					Profiles.insert({characterName: characterName})
				);
			}
		}
	});

	Template.profile.selectedProfile = function () {
		return Profiles.findOne({_id: Session.get('selectedProfile')});
	};
	
	Template.profile.events({
		'change input': function(event) {
			var inputElement = event.target,
				name = inputElement.parentNode.getElementsByTagName('label')[0].getAttribute('for');

			if(inputElement.value) {
				var updateObject = Profiles.findOne({_id: Session.get('selectedProfile')});
				updateObject[name] = inputElement.value;

				Profiles.update({_id: Session.get('selectedProfile')}, updateObject);
			}
		},
		
		'submit form': function(event) {
			event.target.getElementsByTagName('input')[0].blur();
			return false;
		}
	});

	Meteor.startup(function () {
		$('#profileTabs a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
