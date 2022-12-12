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
    left = [$('#buybar .left'), $('.grid__item.product__media-wrapper'), largemedia],
    right = [$('#buybar .right'), $('.product__info-wrapper.grid__item')],

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
        ww = $(window).width(),
        iw = (largeimg.height()/largeh) * largew;

    const 
        tw = ww/2>iw ? iw : ww/2,
        tv = ww-tw;

    left[0].width(tw - parseFloat(left[0].css('padding-left')) - parseFloat(left[0].css('padding-right')));
    left[1].css('max-width', tw);
    left[2].css('max-width', tw);
    right[0].css('max-width', tv);
    right[1].css('max-width', tv);



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


