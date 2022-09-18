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

    slideshow = $('.slideshow'),
    textMedia = $('.image-with-text'),
    featuredCollection = $('.featured-collection-wrapper .collection__title');



// Init
body.attr('data-loaded', true);

submenu.mouseover((e) => {
    console.log($(e.currentTarget).click());
})



// Resize
$(window).on('orientationchange resize', function (e) {

    // Set Top
    setTop();

    // Slideshow
    if(slideshow.alive())
        slideshow.css('height', $(window).height() - parseFloat(main.css('margin-top')));

    // Text with media
    textMedia.each((k,v) => {
        v = $(v);

        let imgs = v.find('.imgs');
        if(!imgs.alive()) return;

        let 
            adapt = $('.image-with-text__height--adapt'),
            textr = $('.image-with-text__height--text')

        console.log(adapt, adapt.alive(), textr, textr.alive());
    });

    

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
    featuredCollection.css('top', h);
}
