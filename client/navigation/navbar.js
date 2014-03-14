Template.navbar.menuElements = function () {
    return [
        {text: 'Profiles', pageId: 'profiles'},
        {text: 'Master', pageId: 'master'}
    ];
};

Template.navbar.events({
    'click a': function (event) {
        event.preventDefault();
        Router.navigate("pages/" + event.target.getAttribute('data-pageId'), {trigger: true});
    }
});

Handlebars.registerHelper("isSelectedMenuElement", function(actualId) {
    return Session.get('selectedMenuElement') === actualId;
});
