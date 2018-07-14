var filters = [];

function refreshList(text) {
  var spells, i, tags;
  var show;
  var tfilters = text || filters;

  spells = document.querySelectorAll(".Card");
  for (i = 0; i < spells.length; i++) {
    show = false;
    spell = spells[i];
    tags = spell.getAttribute("data-tags").toUpperCase();
    for (var fi = 0; fi < tfilters.length; fi++) {
      show = show || tags.includes(tfilters[fi]);
    }

    if (show || filters.length == 0) {
      spell.classList.remove('is-hidden');
    } else { spell.classList.add('is-hidden'); }
  }
}

function toggleFilter(text) {
  /* Look for text in filters[]
   * If exists, remove; otherwise, add.
   */

  var filter, list, li, i, tags, idx;
  filter = text.toUpperCase();
  idx = filters.indexOf(filter);
  if (idx > -1) {
    filters.splice(idx, 1);
  } else {
    filters.push(filter)
  }
  refreshList();
}

function clearFilters() {
  filters = [];
  refreshList();
}

$(document).ready(function() {

  $('.Masthead-toggle').on('click', function() {
    $(this).toggleClass('is-active');
  });

  $('.js-clear-filter').on('click', function () {
    $(this).siblings().removeClass('is-active');
    clearFilters();
  });

  $('.js-filter').on('click', function() {
    f = $(this);
    f.toggleClass('is-active');
    toggleFilter(f.attr('data-tag'));
  });

  $('.Card-desc').on('mousewheel DOMMouseScroll', function(e) {
    // prevent scrolling card from scrolling body
    var e0 = e.originalEvent;
    var delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });

  $('.Masthead-search').on('keyup', function() {
    var filter = $(this)[0].value.toUpperCase().split(",");
    refreshList(filter);
  });
});
