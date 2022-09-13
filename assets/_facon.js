// Tools
$.fn.alive = function () {
    return this.length > 0;
}

// Declarations
let
    body = $('body'),
    flexwrap = $('.flexwrap'),
    announce = $('#shopify-section-announcement-bar'),
    head = $('#shopify-section-header'),
    main = $('main');



// Init
body.attr('data-loaded', true);



// Resize
$(window).on('orientationchange resize', function (e) {

    // Sticky footer
    flexwrap.css('min-height', $(window).height() - parseFloat(flexwrap.css('margin-top')));

    // Trigger scroll
    $(window).trigger('scroll');
});



// Top
function setTop() {
    let h = 0;

    console.log('top is set');

    h += announce.alive() ? announce.height() : 0;
    if (head.alive()) head.css('top', h);
    h += head.alive() ? head.height() : 0;
    main.css('margin-top', h);

    console.log('top',h);

    $(window).trigger('resize');
}
setTop();