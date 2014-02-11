Profiles = new Meteor.Collection("profiles");

if (Meteor.isClient) {
  Template.profile_list.profiles = function () {
    return Profiles.find();
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}