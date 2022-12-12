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

    largemedia = $('#large__media'),
    largeimg = largemedia.children('img'),
    largew = largeimg.attr('width'),
    largeh = largeimg.attr('height'),

    textMedia = $('.image-with-tefxt'),
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

    // Large media on product page
    const 
        ww = $(window).width()/2,
        iw = (largeimg.height()/largeh) * largew;

    const tw = ww>iw ? iw : ww;
    console.log('TARGET', tw);





    // Text with media
    textMedia.each((k,v) => {
        v = $(v);

        let imgs = v.find('.imgs');
        if(!imgs.alive()) return;
        imgs = imgs.find('img');
       
        let 
            imgf = imgs.first(), 
            imgw = imgf.data('width'), imgh = imgf.data('height'),
            txth = v.find('.image-with-text__content').height() + 80;

        let vh = $('.image-with-text__height--adapt').alive() ? 
            Math.floor((imgf.width()/imgw) * imgh) : 
            txth;
        if(vh<txth) vh = txth;

        v.height(vh);
        imgs.height(vh);
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


