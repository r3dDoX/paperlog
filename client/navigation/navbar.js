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
