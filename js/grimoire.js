/* Lester Lee 2018 */

var filters = {
  'class': [],
  'level': [],
  'text': []
}

var allSpells;
var hiddenSpells = [];
var shownSpells = [];

function refreshFilters() {
  console.log(hiddenSpells.length, shownSpells.length);
  for (var i = 0; i < hiddenSpells.length; i++) {
    hiddenSpells[i].classList.add('is-hidden');
  }
  for (var j = 0; j < shownSpells.length; j++) {
    shownSpells[j].classList.remove('is-hidden');
  }
  hiddenSpells = [], shownSpells = [];
}

function checkFilter(show, ftype, tags) {
  if (show) return show;
  for (var i = 0; i < filters[ftype].length; i++) {
    show = show || tags.includes(filters[ftype][i]);
  }
  return show;
}

function updateFilters() {
  var showClass, showLevel, showText;
  var spell, tags, isVisible;

  for (var i = 0; i < allSpells.length; i++) {
    spell = allSpells[i];
    tags = spell.getAttribute('data-tags').toUpperCase();
    isVisible = spell.getAttribute('data-visible');

    showClass = checkFilter(!filters['class'].length, 'class', tags);
    showLevel = checkFilter(!filters['level'].length, 'level', tags);
    showText = checkFilter(!filters['text'].length, 'text', tags);

    if (showClass && showLevel && showText) {
      if (isVisible === 'false'){
        spell.setAttribute('data-visible', 'true');
        shownSpells.push(spell);
      }
    } else {
      if (isVisible !== 'false')
        spell.setAttribute('data-visible', 'false');
        hiddenSpells.push(spell);
    }
  }

  refreshFilters();
}

function toggleFilter(text, ftype) {
  var filter, list, li, i, tags, idx;
  filter = text.toUpperCase();
  idx = filters[ftype].indexOf(filter);
  if (idx > -1) {
    filters[ftype].splice(idx, 1);
  } else {
    filters[ftype].push(filter)
  }
  updateFilters();
}

function clearFilters() {
  filters = {
    'class': [],
    'level': [],
    'text': []
  };
  updateFilters();
}

$(document).ready(function () {

  $('.Masthead-toggle').on('click', function () {
    $(this).toggleClass('is-active');
  });

  $('.js-clear-filter').on('click', function () {
    $('.js-filter').removeClass('is-active');
    clearFilters();
  });

  $('.js-filter').on('click', function () {
    f = $(this);
    f.toggleClass('is-active');
    toggleFilter(f.attr('data-tag'), f.attr('data-filter-type'));
  });

  $('.Card-desc').on('mousewheel DOMMouseScroll', function (e) {
    // prevent scrolling card from scrolling body
    var e0 = e.originalEvent;
    var delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });

  $('.Masthead-search').on('keyup', function () {
    filter['text'] = $(this)[0].value.toUpperCase().split(",");
    updateFilters();
  });

  allSpells = document.querySelectorAll(".Card");

});
