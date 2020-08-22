/*
Used insighst from:
GreedyNav.js - http://lukejacksonn.com/actuate
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2015 Luke Jackson
*/

$(function() {

  var $btn = $("nav.greedy-nav .greedy-nav__toggle");
  var $hlinks = $("nav.greedy-nav .hidden-links");

  var closingTime = 1000;
  var timer;

  // hidden toggler
  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
    clearTimeout(timer);
  });

  $hlinks.on('mouseleave', function() {
    // Mouse has left, start the timer
    timer = setTimeout(function() {
      $hlinks.addClass('hidden');
    }, closingTime);
  }).on('mouseenter', function() {
    // Mouse is back, cancel the timer
    clearTimeout(timer);
  })
    // Close menu on touch on body
  $('body').on('touchstart', function(e){ 
    $hlinks.addClass('hidden');       
  });
    // Touching on the menu itself doesn't deactivate it
  $('.hidden-links, .greedy-nav__toggle').on('touchstart', function(e){
    event.stopPropagation();
  })
});
