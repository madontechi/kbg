$(document).ready(function() {
    $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      infinite: false,
      appendDots: '.slider-nav',
      dots: true,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prevs">←</button>',
      nextArrow: '<button type="button" class="slick-nexts">→</button>',
      speed: 600 // Syncs with dot animation
    });
  
    const shiftUnit = 20;
    let totalSlides = $('.slider-nav .slick-dots li').length;
    let shiftValue = 0;
    const RIGHT = -1;
    const LEFT = 1;
    const DotsToShow = 5;
  
    if (totalSlides > DotsToShow) {
      $('.slider-nav').addClass("dots-constrained");
    }
  
    initialDotsLayout();
  
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      let reqSlideVal = 0;
  
      $('.slider-nav .slick-dots li').removeClass("dot--medium");
  
      if (nextSlide > currentSlide) {
        reqSlideVal = shiftValueCalculator(currentSlide, nextSlide, RIGHT) * shiftUnit * RIGHT;
      } else {
        reqSlideVal = shiftValueCalculator(currentSlide, nextSlide, LEFT) * shiftUnit;
      }
  
      if (nextSlide > 2 && nextSlide < totalSlides - 3) {
        shiftValue = shiftValue + reqSlideVal;
        $('.slider-nav .slick-dots li').eq(nextSlide + 1).addClass("dot--medium");
        $('.slider-nav .slick-dots li').eq(nextSlide - 1).addClass("dot--medium");
  
      } else if (nextSlide <= 2) {
        shiftValue = 0;
        initialDotsLayout();
      } else if (nextSlide >= totalSlides - 3) {
        shiftValue = (totalSlides - DotsToShow) * shiftUnit * RIGHT;
        lastDotsLayout();
      }
  
      $('.slider-nav .slick-dots').css({ 'transform': 'translateX(' + shiftValue + 'px' + ')' });
    });
  
    function shiftValueCalculator(currentSlide, nextSlide, direction) {
      let slideDifference = 0;
      if (direction === RIGHT) {
        slideDifference = nextSlide - currentSlide;
      } else {
        slideDifference = currentSlide - nextSlide;
      }
  
      switch (slideDifference) {
        case 4: return 2;
        case 3: return 1;
        default: return slideDifference;
      }
    }
  
    function initialDotsLayout() {
      for (let i = 0; i <= 3; i++) {
        $('.slider-nav .slick-dots li').eq(i).addClass("dot--medium");
      }
    }
  
    function lastDotsLayout() {
      for (let i = totalSlides; i >= totalSlides - 4; i--) {
        $('.slider-nav .slick-dots li').eq(i).addClass("dot--medium");
      }
    }
  });
  