Profiles = new Meteor.Collection("profiles");

if (Meteor.isClient) {
  Template.profile.selectedProfile = function () {
		return Profiles.findOne({/* TODO select profile with param */}, {fields: {_id: 0}});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}