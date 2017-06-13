var filters = [];

function refreshList(text) {
  var li, i, tags, show;
  tfilters = text || filters;
  var fi, flen = tfilters.length;
  // console.log(tfilters);
  li = $('#spell-container').children();
  for (i = 0; i < li.length; i++) {
    show = true;
    tags = li[i].getAttribute("data-tags").toUpperCase();
    for (fi = 0; fi < flen; fi++) {
      // console.log(tfilters[fi], tags);
      if (tags.indexOf(tfilters[fi]) < 0) {
        show = false;
        break;
      }
    }
    li[i].style.display = show ? "" : "none";
  }
}

function toggleFilter(text) {
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

  tinysort('ul#spell-container>li', {attr:'data-level'}, {attr:'data-tags'});

  $('.toggle-filters').on('click', function() {
    btn = $(this);
    if (btn.attr('data-toggled') == 0) {
      btn.attr('data-toggled', 1);
      $('.spell-filters').removeClass('filters-hide');
      $('.spell-filters').addClass('filters-show');
      btn.removeClass('glyphicon-chevron-down');
      btn.addClass('glyphicon-chevron-up');
    } else {
      btn.attr('data-toggled', 0);
      $('.spell-filters').removeClass('filters-show');
      $('.spell-filters').addClass('filters-hide');
      btn.addClass('glyphicon-chevron-down');
      btn.removeClass('glyphicon-chevron-up');
    }
  });

  $('.spell-filter').on('click', function() {
    f = $(this);
    f.toggleClass('active-filter');
    toggleFilter(f.attr('data-tags'));
  });

  $('.clear-filters').on('click', function() {
    $(this).siblings().removeClass('active-filter');
    clearFilters();
  });

  $('.spell-name').on('click', function() {
    $(this).parent().toggleClass('show-spell');
  });

  $('div').on('mousewheel DOMMouseScroll', function(e) {

    var e0 = e.originalEvent;
    var delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });

  $('.navbar-search').on('keyup', function() {
    var filter = $(this)[0].value.toUpperCase().split(",");
    refreshList(filter);
  });
});
