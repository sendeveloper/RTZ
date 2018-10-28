$(document).ready(function () {
  var entireHeight;
  var originalPos = [];
  var TP = [], POS = [];
  var viewWidth, viewHeight;

  getOriginalPos();
  init();

  function getOriginalPos() {
    title = getPos($('.title'));
    left_text = getPos($('.left-body-text'));
    left_search = getPos($('.left-body-search'));
    right_content = getPos($('.contents'));
    originalPos = [title, left_text, left_search, right_content];
  }
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
      entireHeight = 3000;
      TP[0] = 0;
      TP[1] = 400;
      TP[2] = 800;
      TP[3] = entireHeight - viewHeight;
    }
    $('.container').css('height', entireHeight);
  }
  function setSVGColor() {
    document.getElementById("svg1").addEventListener("load", function() {
      var doc = this.getSVGDocument();
      var rect = doc.querySelectorAll("path"); // suppose our image contains a <rect>
      $(rect).attr('fill', '#FFF');
    });
    document.getElementById("svg2").addEventListener("load", function() {
      var doc = this.getSVGDocument();
      var rect1 = doc.querySelectorAll("path");
      $(rect1).attr('fill', '#FFF');
    });
  }
  function init() {
    setSVGColor();
    calcEntireHeight();
    setLayouts();

    var fontSize = parseFloat($('.title').css('fontSize')) / 10;
    $('.title').css('opacity', 0.1).css('fontSize', fontSize + 'px');
    $( '.title' ).animate({
      opacity: 1,
      fontSize: fontSize*10 + 'px'
    }, 1000, function() {
      // Animation complete.
    });
  }
  function setLayouts() {
    var hei, wid;
    var title, left_text, left_search, right_content;
    hei = $(document).height();
    wid = $(document).width();
    
    title = [originalPos[0][0], originalPos[0][1]];
    var title_top = (hei/2 - $('.title').height()/2 - title[0]);
    title[0] += title_top;
    title[1] = $('.title').width();

    $('.title').css('top', title_top);

    var left_text_top = title_top - 100;
    $(".left-body-text, .search-container, .contents").css('top', left_text_top);
    POS = [title, left_text, left_search, right_content];
  }
  function getPos(el) {
    var obj = [el.offset().top - $(window).scrollTop(), el.offset().left];
    return obj;
  }
  function updateObjects() {
    var pos = $('.background').scrollTop();
    setTitleZoom(pos, TP[1], TP[0]);
    setLeftOpacity(pos, TP[2], TP[1]);
    setRightScroll(pos, TP[3], TP[2]);
  }
  $(window).resize(function(event) {
    calcEntireHeight();
    setLayouts();
    $('.title').css('opacity', 1).css('fontSize', '');
    updateObjects();
  })
  $('.background').scroll(function (event) {
    updateObjects();
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
    if (pos >= TP[1])
      $('.search-container').css('display', 'block');
    else
      $('.search-container').css('display', 'none');
    $('.left-body-text, .search-container, .contents').css('opacity', opacity);
    $('.left-body-text, .search-container, .contents').css('transform', 'translateY(' + pos + 'px)');
  }
  function setRightScroll(pos, bottom, top) {
    var val = pos;
    if (pos < top) val = top;
    if (pos > bottom) val = bottom;
    var startAngle = (val - top) / (bottom-top) * 70, len, step;
    step = 35;
    $('.contents li').each(function(index, item){
      var angle = step*index - startAngle;
      var opacity = 1-Math.abs(angle)/90;
      $(item).css('transform', 'rotateY(' + angle + 'deg)');
      $(item).css('opacity', opacity);
      if (pos >= TP[1])
        $(item).find('a').css('cursor', 'pointer');
      else
        $(item).find('a').css('cursor', 'initial');
    });
  }
  $('.contents li a').on('click', function(e) {
    e.preventDefault();
    var pos = $('.background').scrollTop();
    if (pos >= TP[1]) {
      var wid = $(document).width();
      var hei = $(document).height();
      var $this = $(this);
      var current = $(this).find('h5');
      var curFont, pos, objWid, top, curHeight;
      $(this).parent().css('transform', 'initial');
      $(this).parent().css('transition', 'initial');
      curFont = parseFloat(current.css('font-size'));
      curHeight = parseFloat(current.css('line-height'));
      pos = current.offset().left;
      top = current.offset().top;
      $('body').find('.clone-h5').remove();
      var obj = $('<h5 class="clone-h5">' + current.html() + '</h5>');
      obj.appendTo('body');
      obj.css('position', 'absolute');
      obj.css('color', '#faf7fb');
      obj.css('width', current.width() + 'px');
      obj.css('font-size', curFont + 'px');
      obj.css('line-height', curHeight + 'px');
      obj.css('left', pos + 'px');
      obj.css('text-align', 'center');
      obj.css('top', top + 'px');
      objWid = ((1000 > wid) ? wid : 1000);
      var movLeft = (wid - objWid)/2;
      var movTop = (hei - obj.height())/2 - 30;

      obj.animate({
        fontSize: (curFont*2) + 'px',
        lineHeight: (curHeight*2) + 'px',
        left: movLeft + 'px',
        top: movTop + 'px',
        width: objWid + 'px',
      }, 500, function() {
        document.location.href = $this.attr('href');
        // Animation complete.
      });
    }
  })
})