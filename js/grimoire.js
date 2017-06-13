function toggleFilter(text){
  console.log(text);
}

function clearFilters(){
  console.log("clear filter");
}

$(document).ready(function() {
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

  $('.spell-name').on('click', function () {
    $(this).parent().toggleClass('show-spell');
  });

  $('#spells').load("assets/grimoire_spells.html");

});
