// Initialise FlexSlider for Carousels
$(window).on("load", function() {
    $('.flexslider').flexslider({
      animation: "slide",
      animationLoop: false,
      directionNav: true,
      slideshow: false,
      itemWidth: 350,
      itemHeight: 150,
      itemMargin: 5,
      touch: true
    });
  });
