(function($) {
    'use strict'

    // custom scroll bar js
    var windows = $(window);
    $('.custom-scroll').each(function() {
        var ps = new PerfectScrollbar($(this)[0]);
        if (windows.width <= 991) {
            ps.destroy();
        }
    });


    // offcanvas search box js
    $('.search-trigger').on('click', function() {
        $('.off-canvas-search').addClass('show');
    })

    $('.off-canvas-close').on('click', function() {
        $('.off-canvas-search').removeClass('show');
    })


    // Sticky menu
    var $window = $(window)
    $window.on('scroll', function() {
        var scroll = $window.scrollTop()
        if (scroll < 300) {
            $('.sticky').removeClass('is-sticky')
        } else {
            $('.sticky').addClass('is-sticky')
        }
    })


    // Off Canvas Open close
    $('.mobile-menu-btn').on('click', function() {
        $('body').addClass('fix')
        $('.off-canvas-mobile-menu').addClass('open')
    })

    $('.btn-close-off-canvas,.off-canvas-overlay').on('click', function() {
        $('body').removeClass('fix')
        $('.off-canvas-mobile-menu').removeClass('open')
    })

    // offcanvas mobile menu
    var $offCanvasNav = $('.mobile-menu')

    var $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown')

    /* Add Toggle Button With Off Canvas Sub Menu */
    $offCanvasNavSubMenu
        .parent()
        .prepend('<span class="menu-expand"><i></i></span>')

    /* Close Off Canvas Sub Menu */
    $offCanvasNavSubMenu.slideUp()

    /* Category Sub Menu Toggle */
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this)
        if (
            $this
            .parent()
            .attr('class')
            .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
            ($this.attr('href') === '#' || $this.hasClass('menu-expand'))
        ) {
            e.preventDefault()
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('active')
                $this.siblings('ul').slideUp()
            } else {
                $this.parent('li').addClass('active')
                $this
                    .closest('li')
                    .siblings('li')
                    .removeClass('active')
                    .find('li')
                    .removeClass('active')
                $this
                    .closest('li')
                    .siblings('li')
                    .find('ul:visible')
                    .slideUp()
                $this.siblings('ul').slideDown()
            }
        }
    })


    //nice select active start
    $('select').niceSelect();


    // hero slider active js
    $(document).ready(function() {
        var mySwiper = new Swiper('.hero-slider-active', {
            loop: true,
            speed: 1000,
            autoplay: false,
            spaceBetween: 50,
            effect: 'fade',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                clickable: true
            },
        });


        // best product active js
        var mySwiper = new Swiper('.best-product-active', {
            loop: true,
            speed: 1000,
            autoplay: false,
            spaceBetween: 0,
            touchRatio: 0,
            slidesPerView: 3,
            centeredSlides: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
            // Responsive breakpoints
            breakpoints: {
                992: {
                    slidesPerView: 3
                },

                576: {
                    slidesPerView: 2,
                    centeredSlides: false,
                },

                300: {
                    slidesPerView: 1,
                    centeredSlides: false,
                }
            }
        });


        // blog slider actic=ve js
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });

        var mySwiper = new Swiper('.blog-slider-active', {
            loop: true,
            speed: 1000,
            spaceBetween: 30,
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
            thumbs: {
                swiper: galleryThumbs
            }
        });


        // also like product
        var mySwiper = new Swiper('.like-product-carousel', {
            loop: true,
            speed: 1000,
            spaceBetween: 20,
            slidesPerView: 4,
            centeredSlides: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
            // Responsive breakpoints
            breakpoints: {
                1200: {
                    slidesPerView: 4
                },
                992: {
                    slidesPerView: 3
                },
                576: {
                    slidesPerView: 2,
                    centeredSlides: false,
                },
                300: {
                    slidesPerView: 1,
                    centeredSlides: false,
                }
            }
        });


        // product details carousel
        var productNav = new Swiper(".product-nav", {
            loop: false,
            speed: 800,
            slidesPerView: 4,
            spaceBetween: 15,
            direction: 'vertical',
            // Responsive breakpoints
            breakpoints: {
                576: {
                    direction: 'vertical',
                },
                320: {
                    slidesPerView: 4,
                    direction: 'horizontal'
                }
            }
        });

        var productCarousel = new Swiper(".product-carousel", {
            loop: false,
            speed: 800,
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
            thumbs: {
                swiper: productNav
            }
        });


        // similar product
        var mySwiper = new Swiper('.similar-product-carousel', {
            loop: true,
            speed: 1000,
            spaceBetween: 20,
            slidesPerView: 4,
            centeredSlides: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            },
            // Responsive breakpoints
            breakpoints: {
                1200: {
                    slidesPerView: 4
                },
                992: {
                    slidesPerView: 3
                },
                576: {
                    slidesPerView: 2,
                    centeredSlides: false,
                },
                300: {
                    slidesPerView: 1,
                    centeredSlides: false,
                }
            }
        });

    });


    // Background Image JS start
    var bgSelector = $('.bg-img')
    bgSelector.each(function(index, elem) {
        var element = $(elem)
        var bgSource = element.data('bg')
        element.css('background-image', 'url(' + bgSource + ')')
    })


    // Scroll to top active js
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.scroll-top').removeClass('not-visible')
        } else {
            $('.scroll-top').addClass('not-visible')
        }
    })
    $('.scroll-top').on('click', function(event) {
        $('html,body').animate({
                scrollTop: 0
            },
            1000
        )
    })


    // video player active js
    var plyrVideo = new Plyr('.plyr-video'),
        plyrAudio = new Plyr('.plyr-audio'),
        plyrYoutube = new Plyr('.plyr-youtube'),
        plyrVimeo = new Plyr('.plyr-vimeo');


})(jQuery)