// Custom Scripts for Primal Template //
$(document).ready(function () {
  var pageWidth = $(window).width();

  jQuery(function ($) {
    "use strict";
    // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
    var mainbottom = $('#main').offset().top;

    // on scroll,
    $(window).on('scroll', function () {
      // we round here to reduce a little workload
      stop = Math.round($(window).scrollTop());
      if (stop > mainbottom) {
        // $('.navbar').not('.splash .navbar').addClass('past-main');
        // $('.navbar').not('.splash .navbar').addClass('effect-main');
      } else {
        //$('.navbar').not('.splash .navbar').removeClass('past-main');
      }
    });

    $('.sale-flip').each(function () {
      $(this).hide();
      $(this).css("transform", "translateZ(0)");
    });

    function checkElementLocation() {
      var $window = $(window);
      var top_of_screen = $window.scrollTop();
      var bottom_of_window = $window.scrollTop() + $window.height();

      $('.sale-flip').each(function (i) {
        var objectTop = $(this).parent().offset().top
        var objectBottom = objectTop + $(this).parent().outerHeight(true)

        if (scrollUp && objectBottom > top_of_screen) {
          $(this).fadeIn();
        } else if (!scrollUp && objectTop < bottom_of_window) {
          $(this).fadeIn();
        } else {
          $(this).hide();
        }
      });
    }

    var lastScrollTop = 0;
    var scrollUp = false;
    $(window).on('scroll', function () {
      var st = $(this).scrollTop();
      if (st < lastScrollTop) {
        scrollUp = true;
      }
      else {
        scrollUp = false;
      }
      lastScrollTop = st;
      checkElementLocation();
    }).scroll(); //invoke scroll-handler on page-load;

    // Collapse navbar on click
    $(document).on('click.nav', '.navbar-collapse.in', function (e) {
      if ($(e.target).is('a')) {
        $(this).removeClass('in').addClass('collapse');
      }
    });

    const dropdowns = $('.dropdown')
    $(window).on("load resize", function () {
      var $window = this;
      dropdowns.each(function () {
        var $dropdown = $(this);
        var $navbarDropdown = $dropdown.find(".navbarDropdown");
        var $dropdownMenu = $dropdown.find(".dropdown-menu")[0];
        var showClass = "show";
        $navbarDropdown.off("click");
        if ($window.matchMedia("(min-width: 768px)").matches) {
          $dropdown.hover(
            function () {
              const $this = $(this);
              $this.addClass(showClass);
              $this.find($dropdownMenu).addClass(showClass);
            },
            function () {
              const $this = $(this);
              $this.removeClass(showClass);
              $this.find($dropdownMenu).removeClass(showClass);
            }
          );
        } else {
          $dropdown.off("mouseenter mouseleave");
          $navbarDropdown.click(function (e) {
            e.preventDefault();
            const $this = $dropdown;
            console.info($this)
            if ($this.hasClass(showClass) || $this.find($dropdownMenu).hasClass(showClass)) {
              $this.removeClass(showClass);
              $this.find($dropdownMenu).removeClass(showClass);
            } else {
              $this.addClass(showClass);
              $this.find($dropdownMenu).addClass(showClass);
            }
          });
        }
      })
    });

    /*-----------------------------------
    ----------- Scroll To Top -----------
    ------------------------------------*/

    $(window).scroll(function () {
      if ($(this).scrollTop() > 1000) {
        $('#back-top').fadeIn();
      } else {
        $('#back-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#back-top').on('click', function () {
      $('#back-top').tooltip('hide');
      $('body,html').animate({
        scrollTop: 0
      }, 1500);
      return false;
    });



    /*-------- Owl Carousel ---------- */
    $(".expert-list").owlCarousel({

      slideSpeed: 200,
      items: 3,
      singleItem: false,
      autoPlay: true,
      pagination: true
    });


    /* ------ jQuery for Easing min -- */

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 54)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });


    /* --------- Wow Init ------ */

    new WOW().init();


    // Accordion //

    function toggleChevron(e) {
      $(e.target)
        .prev('.panel-heading')
        .find("span.glyphicon")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
    }
    $('#accordion').on('hide.bs.collapse show.bs.collapse', toggleChevron);

    // Image Modal //
    var expanded = false;
    function openImageModal(img) {
      $('#image-modal').css('display', 'flex');
      var imagePath = img.attr('src')
      var title = img.attr('alt')

      $('#modal-content').attr('src', imagePath)
      $('#caption').text(title)
      expanded = true;
    }
    function closeImageModal() {
      $('#image-modal').css('display', 'none');
      expanded = false;
    }

    $("img.expandable").click(function (e) {
      e.stopPropagation();
      openImageModal($(this));
    })

    $(".close").click(function () {
      closeImageModal();
    })

    $(document).keydown(function (event) {
      if (expanded && event.keyCode == 27) {
        closeImageModal();
      }
    });

    window.onclick = function (event) {
      if (expanded && !(event.target.id == "modal-content" || event.target.id == "modal-video-content")) {
        closeImageModal();
      }
    }

    const href = location.href.includes(".html") ? locatiton.href : location.href + ".html"

    // Add active state to navbar
    $('.navbar li.active').removeClass('active');
    $('.navbar a[href="' + href + '"]').closest('li').addClass('active');
    $('.navbar a.dropdown-item[href="' + href + '"]').addClass('active');

    function resizeArtWrapper() {
      // Resize the height
      $('.media-wrapper').each(function () {
        if ($(this).is(':visible')) {
          var width = $(this).width();
          $(this).height(width);
          $(this).css('min-height', width);
        }
      });
    }
    $(window).on('load', function () {
      resizeArtWrapper();
      $('.card .content').each(function () {
        new SimpleBar(this, {
          scrollbarMinSize: 50,
          scrollbarMaxSize: 50
        })
      })
      $('.trait-box').each(function () {
        new SimpleBar(this, {
          scrollbarMinSize: 50,
          scrollbarMaxSize: 50
        })
      })
    })

    $(window).resize(function () {
      if ($(window).width() != pageWidth) {
        pageWidth = $(window).width();
        resizeArtWrapper();
      }
    })
    $('.card .show-more').click(function () {
      $(this).hide();
      $(this).siblings('.card .short-bio').hide();
      $(this).siblings('.card .close-bio').show();
      $(this).siblings('.card .full-bio').show();
    })
    $('.card .close-bio').click(function () {
      $(this).hide();
      $(this).siblings('.card .short-bio').show();
      $(this).siblings('.card .full-bio').hide();
      $(this).siblings('.card .show-more').show();
    })
  });
});

