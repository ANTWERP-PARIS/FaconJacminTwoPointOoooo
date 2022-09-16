// Tools
$.fn.alive = function () {
    return this.length > 0;
}

// Declarations
let
    body = $('body'),

    announce = $('#shopify-section-announcement-bar'),
    head = $('#shopify-section-header'),
    submenu = $('header-menu'),
    main = $('main'),
    slideshow = $('.slideshow');



// Init
body.attr('data-loaded', true);

console.log(submenu);



// Resize
$(window).on('orientationchange resize', function (e) {

    // Set Top
    setTop();

    // Slideshow
    slideshow.css('height', $(window).height() - parseFloat(main.css('margin-top')));

    // Trigger scroll
    $(window).trigger('scroll');
});
$(window).trigger('resize');


// Top
function setTop() {
    let h = 0;

    h += announce.alive() ? announce.height() : 0;

    if (head.alive()) head.css('top', h);
    h += head.alive() ? head.height() : 0;

    main.css('margin-top', h);
}
