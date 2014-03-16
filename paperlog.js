Profiles = new Meteor.Collection("profiles");

if (Meteor.isClient) {
    // HELPERS ----------------------------------
    window.inputTimers = new Array();

    Meteor.startup(function () {
        // code to run on client at startup
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
