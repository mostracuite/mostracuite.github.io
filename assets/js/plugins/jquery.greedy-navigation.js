/*
GreedyNav.js - http://lukejacksonn.com/actuate
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2015 Luke Jackson
*/

/**
* emRemToPx.js | @whatsnewsisyphus 
* To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
* see CC0 Public Domain Dedication <http://creativecommons.org/publicdomain/zero/1.0/>.
*/
var emRemToPx = function( value, scope, suffix ) {
  if (!scope || value.toLowerCase().indexOf("rem") >= 0) {
    scope = 'body';
  }
  if (suffix === true) {
    suffix = 'px';
  } else {
    suffix = null;
  }
  var multiplier = parseFloat(value);
  var scopeTest = $('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(scope);
  var scopeVal = scopeTest.height();
  scopeTest.remove();
  return Math.round(multiplier * scopeVal) + suffix;
};

$(function() {

  var $btn = $("nav.greedy-nav .greedy-nav__toggle");
  var $vlinks = $("nav.greedy-nav .visible-links");
  var $hlinks = $("nav.greedy-nav .hidden-links");

  var numOfItems = 0;
  var totalSpace = 0;
  var closingTime = 1000;
  var breakWidths = [];

  // Get initial state
  $vlinks.children().outerWidth(function(i, w) {
    totalSpace += w;
    numOfItems += 1;
    breakWidths.push(totalSpace);
  });

  var availableSpace, numOfVisibleItems, requiredSpace, timer;

  function check() {

    // Get instant state
    availableSpace = $( document ).width() - (emRemToPx('12em')); // do not depent on measuring the items
    numOfVisibleItems = $vlinks.children().length;
    requiredSpace = breakWidths[numOfVisibleItems - 1];

    // There is not enought space
    if (requiredSpace > availableSpace) {
      $vlinks.children().last().prependTo($hlinks);
      numOfVisibleItems -= 1;
      check();
      // There is more than enough space
    } else if (availableSpace > breakWidths[numOfVisibleItems]) {
      $hlinks.children().first().appendTo($vlinks);
      numOfVisibleItems += 1;
      check();
    }
    // Update the button accordingly
    $btn.attr("count", numOfItems - numOfVisibleItems);
    if (numOfVisibleItems === numOfItems) {
      $btn.addClass('hidden');
    } else $btn.removeClass('hidden');
  }

  // Window listeners
  $(window).resize(function() {
    check();
  });

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
  
  check();

});
