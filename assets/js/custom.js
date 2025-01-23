$(document).ready(function(){
	"use strict";

/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top
2. welcome animation support
3. owl carousel
======================================*/

    // 1. Scroll To Top 
		$(window).on('scroll',function () {
			if ($(this).scrollTop() > 300) {
				$('.return-to-top').fadeIn();
			} else {
				$('.return-to-top').fadeOut();
			}
		});
		$('.return-to-top').on('click',function(){
				$('html, body').animate({
				scrollTop: 0
			}, 1500);
			return false;
		});

	// 2. welcome animation support

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").removeClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-txt button").removeClass("animated fadeInDown").css({'opacity':'0'});
        });

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").addClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-txt button").addClass("animated fadeInDown").css({'opacity':'0'});
        });
		
		$('.nav a').on('click', function (e) {
			if (!$(this).attr('href').startsWith('#')) {
				return; // Allow normal navigation for external links.
			}
			e.preventDefault();
			// Handle internal scrolling logic here.
		});
		
	
	// 3. owl carousel

		// i.  new-cars-carousel
		
			$("#new-cars-carousel").owlCarousel({
				items: 1,
				autoplay:true,
				loop: true,
				dots:true,
				mouseDrag:true,
				nav:false,
				smartSpeed:1000,
				transitionStyle:"fade",
				animateIn: 'fadeIn',
				animateOut: 'fadeOutLeft'
				// navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
			});


		// ii. .testimonial-carousel
	
		
			var owl=$('.testimonial-carousel');
			owl.owlCarousel({
				items:3,
				margin:0,
				
				loop:true,
				autoplay:true,
				smartSpeed:1000,
				
				//nav:false,
				//navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				
				dots:false,
				autoplayHoverPause:false,
			
				responsiveClass:true,
					responsive:{
						0:{
							items:1
						},
						640:{
							items:2
						},
						992:{
							items:3
						}
					}
				
				
			});

		// iii. .brand-item (carousel)
		
			$('.brand-item').owlCarousel({
				items:6,
				loop:true,
				smartSpeed: 1000,
				autoplay:true,
				dots:false,
				autoplayHoverPause:false,
				responsive:{
						0:{
							items:2
						},
						415:{
							items:2
						},
						600:{
							items:3
						},
						1000:{
							items:6
						}
					}
				});
				
				
				$('.play').on('click',function(){
					owl.trigger('play.owl.autoplay',[1000])
				})
				$('.stop').on('click',function(){
					owl.trigger('stop.owl.autoplay')
				})

});




// home carousel start

const carousel = document.getElementById('carousel');
    let autoScroll; // Variable to store the auto-scroll interval
  
    // Dynamically calculate the width of a single slide
    function calculateScrollAmount() {
      const slide = document.querySelector('.carousel-slide'); // Select one slide
      return slide ? slide.offsetWidth : 0; // Get the width of the slide
    }
  
    // Scroll to the next slide
    function scrollNext() {
      const scrollAmount_ = calculateScrollAmount(); // Width of one slide
      const totalSlides = document.querySelectorAll('.carousel-slide').length; // Total number of slides
      const maxScrollLeft = scrollAmount_ * totalSlides; // Total scrollable width
  
      // Check if we reached the end
      if (carousel.scrollLeft + carousel.offsetWidth >= maxScrollLeft) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' }); // Reset to the start
      } else {
        carousel.scrollBy({ left: scrollAmount_, behavior: 'smooth' }); // Scroll to the next slide
      }
    }
  
    // Scroll to the previous slide
    function scrollPrev() {
      const scrollAmount_ = calculateScrollAmount(); // Width of one slide
  
      // Check if we are at the beginning
      if (carousel.scrollLeft <= 0) {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        const maxScrollLeft = calculateScrollAmount() * totalSlides; // Total scrollable width
      } else {
        carousel.scrollBy({ left: -scrollAmount_, behavior: 'smooth' }); // Scroll to the previous slide
      }
    }
  
    // Initialize the carousel and adjust for mobile
    function initializeCarousel() {
      const scrollAmount_ = calculateScrollAmount(); // Width of one slide
      const isMobile = window.innerWidth <= 768; // Mobile breakpoint
  
      if (isMobile) {
        // Start from the second slide on mobile
        carousel.scrollTo({ left: scrollAmount_, behavior: 'instant' }); // Use 'instant' to avoid animation on load
      } else {
        // Start from the beginning on desktop
        carousel.scrollTo({ left: 0, behavior: 'instant' }); // Reset to the first slide
      }
    }
  
    // Start auto-scroll
    function startAutoScroll() {
      autoScroll = setInterval(() => {
        scrollNext();
      }, 3000); // 2-second interval
    }
  
    // Stop auto-scroll
    function stopAutoScroll() {
      clearInterval(autoScroll);
    }
  
    // Add event listeners for buttons
    document.querySelector('.next-button').addEventListener('click', () => {
      stopAutoScroll(); // Stop auto-scroll on button click
      scrollNext();
    });
  
    document.querySelector('.prev-button').addEventListener('click', () => {
      stopAutoScroll(); // Stop auto-scroll on button click
      scrollPrev();
    });
  
    // Stop auto-scroll on any click inside the carousel
    carousel.addEventListener('click', stopAutoScroll);
    carousel.addEventListener('mouseover', stopAutoScroll); // Stop auto-scroll on mouse over
    carousel.addEventListener('mouseleave', startAutoScroll); // Restart auto-scroll on mouse leave
  
      // Stop auto-scroll on touch (mobile)
    carousel.addEventListener('touchstart', stopAutoScroll); // Pause auto-scroll when the user starts touching
    carousel.addEventListener('touchend', startAutoScroll); // Resume auto-scroll when the user stops touching
  
  
  
    // Initialize the carousel and start auto-scroll
    document.addEventListener('DOMContentLoaded', () => {
      initializeCarousel(); // Adjust the starting position for mobile
      startAutoScroll(); // Start auto-scroll
    });
  
    // Recalculate on window resize
    window.addEventListener('resize', initializeCarousel);
// home carousel end





// Function to get URL parameters (same as before)
function getParameterByName(name, url = window.location.href) { /* ... */ }

document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".product-card");
    const category = getParameterByName('category');
    let selectedTag = category || "all";

    function filterProductCards(tag) {
        if (!productCards) return;

        productCards.forEach(card => {
            const tags = card.getAttribute('data-tags')?.split(',') || [];
            if (tag === 'all' || tags.includes(tag)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterProductCards(selectedTag); // Initial filtering
});