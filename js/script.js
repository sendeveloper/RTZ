$(document).ready(function () {
  var entireHeight;
  var TP = [], POS = [];
  var viewWidth, viewHeight;
  function calcEntireHeight() {
    viewWidth = $(window).width();
    viewHeight = $(document).height();
    if (viewWidth < 600) {
      entireHeight = 3500;
      TP[0] = 0;
      TP[1] = 800;
      TP[2] = 1200;
      TP[3] = entireHeight - viewHeight;  
    }
    else
    {
      entireHeight = 2000;
      TP[0] = 0;
      TP[1] = 200;
      TP[2] = 400;
      TP[3] = entireHeight - viewHeight;
    }
    $('.container').css('height', entireHeight);
  }

  init();
  function init() {
    calcEntireHeight();
    setLayouts();
    console.log(TP, POS);
  }
  function setLayouts() {
    var hei, wid;
    var title, left_text, left_search, right_content;
    hei = $(document).height();
    wid = $(document).width();
    title = getPos($('.title'));
    left_text = getPos($('.left-body-text'));
    left_search = getPos($('.left-body-search'));
    right_content = getPos($('.contents'));
    
    var title_top = (hei/2 - $('.title').height()/2 - title[0]);
    $('.title').css('top', title_top);

    title[0] += title_top;
    title[1] = $('.title').width();

    var left_text_top = title_top - 100;
    $(".left-body-text, .search-container, .contents").css('top', left_text_top);
    POS = [title, left_text, left_search, right_content];
  }
  function getPos(el) {
    var obj = [el.offset().top - $(window).scrollTop(), el.offset().left];
    return obj;
}
  $(window).resize(function(event) {
    calcEntireHeight();
  })
  $('.background').scroll(function (event) {
    var pos = $('.background').scrollTop();
    setTitleZoom(pos, TP[1], TP[0]);
    setLeftOpacity(pos, TP[2], TP[1]);
    setRightScroll(pos, TP[3], TP[2]);
  });
  function setTitleZoom(pos, bottom, top) {
    var diff = (pos - top);
    var diff2 = (bottom - top);
    var opacity, left;
    var zoom;
    if (pos >= bottom){
      zoom = 1 - (bottom-top)/diff2 * 2/5;
      opacity = 1 - (bottom-top)/diff2 * 1/10;
    }
    else{
      zoom = 1 - diff/diff2 * 2/5;
      opacity = 1 - diff/diff2 * 1/10;
    }
    $('.title').css('zoom', zoom);
    $('.title').css('opacity', opacity);
    if (pos >= bottom) {
      left = -(viewWidth/0.6 - POS[0][1]/0.8)/2;
    }
    else
      left = -diff/diff2 * (viewWidth/0.6 - POS[0][1]/0.8)/2;
    $('.title').css('left', left + "px");
    var sPos = $('.background').scrollTop();
    var tranY = diff / zoom;
    $('.title').css('transform', 'translateY(' + tranY + 'px)');
  }
  function setLeftOpacity(pos, bottom, top) {
    var val = pos;
    if (pos < top) val = top;
    if (pos > bottom) val = bottom;
    var opacity = (val - top) / (bottom - top) * 0.9 + 0.0;
    $('.left-body-text, .search-container, .contents').css('opacity', opacity);
    $('.left-body-text, .search-container, .contents').css('transform', 'translateY(' + pos + 'px)');
  }
  function setRightScroll(pos, bottom, top) {
    var val = pos;
    if (pos < top) val = top;
    if (pos > bottom) val = bottom;
  }
})