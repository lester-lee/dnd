var filters = [];

function refreshList(text) {
  var spells, i, tags;
  tfilters = text || filters;
  var fi, flen = tfilters.length;
  spells = document.querySelectorAll(".Card");
  for (i = 0; i < spells.length; i++) {
    spell = spells[i];
    tags = spell.getAttribute("data-tags").toUpperCase();
    for (fi = 0; fi < flen; fi++) {
      if (tags.indexOf(tfilters[fi]) <= 0) {
        spell.classList.add('is-hidden');
      }else {
        spell.classList.remove('is-hidden');
      }
    }
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
