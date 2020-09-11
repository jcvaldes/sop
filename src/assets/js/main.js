var scrollTo = function(id, posY){
  var $target = $(id);
  if (!$target.length) {
      return;
  }
  scrollTop = $(id).offset().top+posY;

  $('html, body').animate({
    scrollTop: scrollTop
  }, 1000);
}
